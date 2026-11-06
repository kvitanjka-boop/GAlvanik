"""
Galvanik-Bad als 3D-Animation in Blender (getestet mit Blender 5.2).

Baut Jojos Kupferbad mit den Maßen aus dem Briefing vom 29. Oktober 2026 und
rendert eine Drehansicht mit Stromfluss (Kupfer-Ionen von beiden Anoden zum Werkstück).

So startest du es:
  A) In Blender: oben auf "Scripting" klicken, "Öffnen" und diese Datei wählen,
     dann auf das Dreieck "Skript ausführen" klicken. Das Modell erscheint.
     Mit F12 ein Bild rendern, mit Strg+F12 die ganze Animation.
  B) Ohne Fenster (rendert das Video direkt):
     blender -b -P galvanik_bad_animation.py -- --render

Alle Maße in Zentimetern. Werte unten in MASSE ändern und das Skript neu ausführen.
"""
import math
import random
import sys

import bpy
from mathutils import Vector

# ---------------------------------------------------------------- Maße und Einstellungen
MASSE = {
    "behaelter_breite": 14.0,   # x, von Anode zu Anode
    "behaelter_laenge": 24.0,   # y, entlang der Kathodenstäbe
    "behaelter_hoehe": 12.0,
    "fuellmenge_liter": 3.5,
    "wand": 0.3,
    "anode1": (14.0, 6.0),      # Länge, Höhe (links)
    "anode2": (20.0, 8.0),      # Länge, Höhe (rechts)
    "anode_dicke": 0.5,
    "anoden_hoehe_ueber_boden": 0.6,
    "kathodenstaebe": 3,
    "blatt": (4.0, 5.0),        # Breite, Höhe des Werkstücks
    "blatt_unter_badspiegel": 1.5,
    "draht_isoliert": False,    # True = Draht im Bad mit Nagellack (rot)
}
VIDEO = {
    "aufloesung": (1280, 720),
    "bilder": 300,              # 300 Bilder bei 25 pro Sekunde = 12 Sekunden
    "fps": 25,
    "samples": 24,
    "ionen": 140,
    "datei": "//galvanik-bad-animation.mp4",
}

CM = 0.01  # Blender rechnet in Metern


def v(x, y, z):
    return Vector((x * CM, y * CM, z * CM))


# ---------------------------------------------------------------- Aufräumen
def neue_szene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.curves, bpy.data.lights, bpy.data.cameras):
        for b in list(coll):
            if b.users == 0:
                coll.remove(b)
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    return sc


# ---------------------------------------------------------------- Materialien
def principled(name, farbe, metall=0.0, rauheit=0.5, transmission=0.0, ior=1.45, alpha=1.0, emission=None, staerke=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*farbe, 1)
    b.inputs["Metallic"].default_value = metall
    b.inputs["Roughness"].default_value = rauheit
    b.inputs["IOR"].default_value = ior
    for key in ("Transmission Weight", "Transmission"):
        if key in b.inputs:
            b.inputs[key].default_value = transmission
            break
    b.inputs["Alpha"].default_value = alpha
    if emission:
        key = "Emission Color" if "Emission Color" in b.inputs else "Emission"
        b.inputs[key].default_value = (*emission, 1)
        b.inputs["Emission Strength"].default_value = staerke
    return m


def lochplastik():
    """Weißes Plastik mit regelmäßigen Löchern (Voronoi ohne Zufall = Lochraster)."""
    m = bpy.data.materials.new("Lochbox")
    m.use_nodes = True
    nt = m.node_tree
    nodes, links = nt.nodes, nt.links
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.92, 0.92, 0.9, 1)
    bsdf.inputs["Roughness"].default_value = 0.6
    out = nodes.get("Material Output")
    tc = nodes.new("ShaderNodeTexCoord")
    vor = nodes.new("ShaderNodeTexVoronoi")
    vor.inputs["Scale"].default_value = 160.0
    vor.inputs["Randomness"].default_value = 0.0
    cmp_ = nodes.new("ShaderNodeMath")
    cmp_.operation = "GREATER_THAN"
    cmp_.inputs[1].default_value = 0.28
    transp = nodes.new("ShaderNodeBsdfTransparent")
    mix = nodes.new("ShaderNodeMixShader")
    links.new(tc.outputs["Object"], vor.inputs["Vector"])
    links.new(vor.outputs["Distance"], cmp_.inputs[0])
    links.new(cmp_.outputs[0], mix.inputs["Fac"])
    links.new(transp.outputs[0], mix.inputs[1])
    links.new(bsdf.outputs[0], mix.inputs[2])
    links.new(mix.outputs[0], out.inputs["Surface"])
    return m


def elektrolyt():
    m = principled("Elektrolyt", (0.55, 0.8, 0.95), rauheit=0.02, transmission=1.0, ior=1.33)
    nt = m.node_tree
    vol = nt.nodes.new("ShaderNodeVolumeAbsorption")
    vol.inputs["Color"].default_value = (0.15, 0.5, 0.95, 1)
    vol.inputs["Density"].default_value = 9.0
    sca = nt.nodes.new("ShaderNodeVolumeScatter")
    sca.inputs["Color"].default_value = (0.6, 0.8, 1.0, 1)
    sca.inputs["Density"].default_value = 0.6   # etwas trüb, wie auf den Fotos
    add = nt.nodes.new("ShaderNodeAddShader")
    nt.links.new(vol.outputs[0], add.inputs[0])
    nt.links.new(sca.outputs[0], add.inputs[1])
    nt.links.new(add.outputs[0], nt.nodes.get("Material Output").inputs["Volume"])
    return m


# ---------------------------------------------------------------- Bausteine
def quader(name, groesse, mitte, mat):
    bpy.ops.mesh.primitive_cube_add(size=1, location=v(*mitte))
    o = bpy.context.object
    o.name = name
    o.scale = (groesse[0] * CM, groesse[1] * CM, groesse[2] * CM)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(mat)
    return o


def zylinder(name, r, laenge, mitte, mat, achse="z", ecken=32):
    bpy.ops.mesh.primitive_cylinder_add(radius=r * CM, depth=laenge * CM, location=v(*mitte), vertices=ecken)
    o = bpy.context.object
    o.name = name
    if achse == "y":
        o.rotation_euler = (math.pi / 2, 0, 0)
    elif achse == "x":
        o.rotation_euler = (0, math.pi / 2, 0)
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def kabel(name, punkte, r, mat):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = r * CM
    cu.bevel_resolution = 4
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(len(punkte) - 1)
    for p, xyz in zip(sp.bezier_points, punkte):
        p.co = v(*xyz)
        p.handle_left_type = p.handle_right_type = "AUTO"
    o = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(mat)
    return o


def blatt(name, breite, hoehe, mitte, mat):
    """Blatt als Fläche in der y-z-Ebene (zeigt zu beiden Anoden), Stiel oben."""
    nu, nv = 28, 40
    verts, faces = [], []
    for j in range(nv + 1):
        t = j / nv
        prof = math.sin(math.pi * t) ** 0.75 * (0.65 + 0.35 * t)
        for i in range(nu + 1):
            s = i / nu * 2 - 1
            half = prof * breite / 2 * 1.08
            y = s * half + math.sin(t * 9) * 0.04 * breite * (1 - abs(s))
            z = -hoehe + t * hoehe
            # Mittelrippe leicht eingedrückt
            x = -0.06 * math.exp(-((s / 0.08) ** 2)) + 0.25 * (1 - abs(s)) * math.sin(math.pi * t) * 0.3
            verts.append(v(mitte[0] + x, mitte[1] + y, mitte[2] + z))
    for j in range(nv):
        for i in range(nu):
            a = j * (nu + 1) + i
            faces.append((a, a + 1, a + nu + 2, a + nu + 1))
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    mod = o.modifiers.new("Dicke", "SOLIDIFY")
    mod.thickness = 0.08 * CM
    mod.offset = 0
    for p in me.polygons:
        p.use_smooth = True
    me.materials.append(mat)
    return o


def text(name, inhalt, ort, groesse, mat, drehung=(math.pi / 2, 0, 0)):
    bpy.ops.object.text_add(location=v(*ort), rotation=drehung)
    o = bpy.context.object
    o.name = name
    o.data.body = inhalt
    o.data.size = groesse * CM
    o.data.align_x = "CENTER"
    o.data.materials.append(mat)
    return o


# ---------------------------------------------------------------- Aufbau
def baue(sc):
    M = MASSE
    W, L, H, WD = M["behaelter_breite"], M["behaelter_laenge"], M["behaelter_hoehe"], M["wand"]
    hL = min(H - 0.2, M["fuellmenge_liter"] * 1000 / (W * L))

    glas = principled("Glas", (0.95, 0.98, 1.0), rauheit=0.02, transmission=1.0, ior=1.5)
    kupfer = principled("Kupfer glänzend", (0.93, 0.52, 0.32), metall=1.0, rauheit=0.18)
    kupfer_alt = principled("Kupfer Anode", (0.55, 0.2, 0.08), metall=0.65, rauheit=0.45)
    schwarz = principled("Schwarz", (0.02, 0.02, 0.025), rauheit=0.35)
    rot = principled("Rot", (0.7, 0.05, 0.04), rauheit=0.35)
    braun = principled("Braun", (0.25, 0.12, 0.05), rauheit=0.4)
    nagellack = principled("Nagellack", (0.75, 0.04, 0.15), rauheit=0.15)
    gehaeuse = principled("Netzgerät", (0.025, 0.028, 0.032), rauheit=0.35)
    tisch = principled("Tisch", (0.55, 0.42, 0.28), rauheit=0.75)
    heizglas = principled("Heizstab Glas", (0.9, 0.95, 1.0), rauheit=0.05, transmission=1.0, ior=1.5)
    gluehen = principled("Heizwendel", (1.0, 0.4, 0.1), emission=(1.0, 0.35, 0.08), staerke=3.0)
    ion = principled("Kupfer-Ion", (0.2, 0.6, 1.0), emission=(0.25, 0.65, 1.0), staerke=12.0)
    lcd_rot = principled("Anzeige rot", (1, 0.2, 0.15), emission=(1, 0.2, 0.12), staerke=6)
    lcd_gruen = principled("Anzeige grün", (0.4, 1, 0.6), emission=(0.4, 1, 0.55), staerke=6)
    kristall = principled("Kristall", (0.1, 0.45, 0.95), rauheit=0.05, transmission=0.6, ior=1.5)
    box_mat = lochplastik()

    # Tisch
    quader("Tisch", (90, 60, 1), (6, 0, -0.5), tisch)

    # Behälter aus Glas
    quader("Boden", (W + 2 * WD, L + 2 * WD, WD), (0, 0, -WD / 2 + 0.001), glas)
    quader("Wand links", (WD, L, H), (-W / 2 - WD / 2, 0, H / 2), glas)
    quader("Wand rechts", (WD, L, H), (W / 2 + WD / 2, 0, H / 2), glas)
    quader("Wand vorne", (W + 2 * WD, WD, H), (0, -L / 2 - WD / 2, H / 2), glas)
    quader("Wand hinten", (W + 2 * WD, WD, H), (0, L / 2 + WD / 2, H / 2), glas)

    # Elektrolyt
    quader("Elektrolyt", (W - 0.02, L - 0.02, hL), (0, 0, hL / 2), elektrolyt())

    # Anoden in Lochboxen
    anoden = []
    for i, (al, ah) in enumerate((M["anode1"], M["anode2"])):
        seite = -1 if i == 0 else 1
        ad = M["anode_dicke"]
        x_face = seite * (W / 2 - WD - ad)
        x_mitte = x_face + seite * ad / 2
        z0 = M["anoden_hoehe_ueber_boden"]
        quader(f"Anode {i + 1}", (ad, al, ah), (x_mitte, 0, z0 + ah / 2), kupfer_alt)
        anoden.append((x_face, al, z0, min(z0 + ah, hL - 0.2)))
        # Lochbox: Vorderwand, Boden, zwei Stirnseiten
        bl, bh = al + 1.2, min(H - 0.3, z0 + ah + 1.2)
        x_back, x_front = seite * (W / 2 - 0.05), x_face - seite * 0.35
        tiefe, xm = abs(x_back - x_front), (x_back + x_front) / 2
        quader(f"Lochbox {i + 1} vorne", (0.12, bl, bh), (x_front, 0, bh / 2), box_mat)
        quader(f"Lochbox {i + 1} Boden", (tiefe, bl, 0.12), (xm, 0, 0.06), box_mat)
        quader(f"Lochbox {i + 1} Ende a", (tiefe, 0.12, bh), (xm, -bl / 2, bh / 2), box_mat)
        quader(f"Lochbox {i + 1} Ende b", (tiefe, 0.12, bh), (xm, bl / 2, bh / 2), box_mat)
        # Anschlussdraht zum Pluspol
        y_end = -al / 2 + 0.6
        kabel(f"Anodendraht {i + 1}", [(x_mitte, y_end, z0 + ah - 0.3), (x_mitte, y_end, H + 0.8),
                                       (x_mitte + seite * 0.5, y_end - 2, H + 3), (12, -12, H + 1), (17.5, -15.5, 2.2)],
              0.12, kupfer if i == 0 else braun)

    # Kathodenstäbe der Länge nach
    n = M["kathodenstaebe"]
    xs = [-1.5, 0, 1.5] if n == 3 else [-0.9, 0.9]
    stab_z = H + 0.25
    for k, x in enumerate(xs):
        zylinder(f"Kathodenstab {k + 1}", 0.25, L + 3, (x, -0.5, stab_z), kupfer, achse="y")
    zylinder("Querstab", 0.2, abs(xs[-1] - xs[0]) + 0.6, ((xs[0] + xs[-1]) / 2, -L / 2 - 1.5, stab_z + 0.35), kupfer, achse="x")
    kabel("Kathodenkabel", [(xs[-1], -L / 2 - 1.5, stab_z + 0.4), (10, -L / 2 - 3, H + 3), (19.5, -15.5, 2.2)], 0.13, schwarz)

    # Werkstück: Blatt am Draht, mittlerer Stab
    bb, bh = M["blatt"]
    px = xs[len(xs) // 2]
    y_top = hL - M["blatt_unter_badspiegel"]
    blatt_obj = blatt("Blatt", bb, bh, (px, 0, y_top), kupfer)
    draht_r = 0.06
    zylinder("Draht oben", draht_r, stab_z - hL, (px, 0, (stab_z + hL) / 2), kupfer, ecken=12)
    zylinder("Draht im Bad", draht_r * (1.6 if M["draht_isoliert"] else 1), hL - y_top, (px, 0, (hL + y_top) / 2),
             nagellack if M["draht_isoliert"] else kupfer, ecken=12)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.22 * CM, minor_radius=0.05 * CM, location=v(px, 0, y_top + 0.1),
                                     rotation=(0, math.pi / 2, 0))
    bpy.context.object.data.materials.append(kupfer)

    # Heizstab in der Ecke
    hx, hy = -W / 2 + 1.4, L / 2 - 1.4
    zylinder("Heizstab Glas", 0.75, 10, (hx, hy, 6.2), heizglas)
    zylinder("Heizwendel", 0.4, 6, (hx, hy, 4.7), gluehen)
    zylinder("Heizstab Kappe", 0.85, 2.6, (hx, hy, 12.5), schwarz)
    zylinder("Regler", 0.55, 0.6, (hx, hy, 14.1), schwarz)
    kabel("Heizkabel", [(hx, hy, 14.3), (hx - 2, hy + 3, H + 5), (-14, L / 2 + 6, 0.3)], 0.12, schwarz)

    # Netzgerät
    quader("Netzgerät", (12, 9, 7), (19, -10, 3.5), gehaeuse)
    text("Anzeige Volt", "1.23 V", (16.3, -14.55, 4.6), 1.3, lcd_rot)
    text("Anzeige Ampere", "0.80 A", (21.5, -14.55, 4.6), 1.3, lcd_gruen)
    text("Typ", "RUZIZAO SPS-W3010", (19, -14.55, 6.0), 0.6, principled("Schrift", (0.8, 0.8, 0.8)))
    zylinder("Pluspol", 0.35, 0.8, (17.5, -14.8, 2.2), rot, achse="y")
    zylinder("Minuspol", 0.35, 0.8, (19.5, -14.8, 2.2), schwarz, achse="y")

    # Kristalle am Boden und dunkle Partikel (wie auf den Fotos)
    rnd = random.Random(3)
    for k in range(36):
        seite = -1 if k % 2 else 1
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=(0.15 + rnd.random() * 0.2) * CM,
                                              location=v(seite * (W / 2 - 0.8 - rnd.random() * 2.2), (rnd.random() - 0.5) * L * 0.8, 0.15))
        o = bpy.context.object
        o.rotation_euler = (rnd.random() * 3, rnd.random() * 3, 0)
        o.data.materials.append(kristall)

    return {"hL": hL, "anoden": anoden, "px": px, "y_top": y_top, "bb": bb, "bh": bh, "ion": ion, "blatt": blatt_obj}


# ---------------------------------------------------------------- Stromfluss: Kupfer-Ionen
def ionen(sc, info):
    rnd = random.Random(11)
    mesh = None
    frames = VIDEO["bilder"]
    for k in range(VIDEO["ionen"]):
        x_face, al, z0, z1 = info["anoden"][k % 2]
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.11 * CM, segments=10, ring_count=6)
        o = bpy.context.object
        o.name = f"Ion {k + 1}"
        if mesh is None:
            o.data.materials.append(info["ion"])
            mesh = o.data
        else:
            old = o.data
            o.data = mesh
            bpy.data.meshes.remove(old)
        dauer = rnd.randint(45, 80)
        start = -rnd.randint(0, dauer)
        while start < frames + 1:
            a = (x_face, (rnd.random() - 0.5) * al * 0.9, z0 + rnd.random() * (z1 - z0))
            seite = -1 if x_face < 0 else 1
            b = (info["px"] + seite * 0.08, (rnd.random() - 0.5) * info["bb"] * 0.7, info["y_top"] - info["bh"] * (0.15 + 0.7 * rnd.random()))
            mitte = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (rnd.random() - 0.5) * 1.2, (a[2] + b[2]) / 2 + (rnd.random() - 0.5) * 1.0)
            for f, p, s in ((start, a, 0.0), (start + 4, a, 1.0), (start + dauer // 2, mitte, 1.0), (start + dauer - 3, b, 1.0), (start + dauer - 1, b, 0.0)):
                o.location = v(*p)
                o.scale = (s, s, s)
                o.keyframe_insert("location", frame=f)
                o.keyframe_insert("scale", frame=f)
            start += dauer
        ad = o.animation_data.action
        # Blender 5 speichert Kurven in Ebenen/Kanälen; beide Wege abdecken
        kurven = getattr(ad, "fcurves", None)
        if kurven is None:
            kurven = [fc for layer in ad.layers for strip in layer.strips for bag in strip.channelbags for fc in bag.fcurves]
        for fc in kurven:
            for kp in fc.keyframe_points:
                kp.interpolation = "BEZIER"


# ---------------------------------------------------------------- Licht, Kamera, Render
def licht_und_kamera(sc, info):
    world = bpy.data.worlds.new("Raum") if not sc.world else sc.world
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (0.55, 0.6, 0.66, 1)
    bg.inputs["Strength"].default_value = 0.25

    def area(name, ort, groesse, energie, ziel=(0, 0, 4)):
        d = bpy.data.lights.new(name, "AREA")
        d.size = groesse * CM
        d.energy = energie
        o = bpy.data.objects.new(name, d)
        o.location = v(*ort)
        sc.collection.objects.link(o)
        c = o.constraints.new("TRACK_TO")
        e = bpy.data.objects.new(name + " Ziel", None)
        e.location = v(*ziel)
        sc.collection.objects.link(e)
        c.target = e
        return o

    area("Hauptlicht", (30, -35, 45), 40, 28)
    area("Fülllicht", (-40, -10, 25), 50, 10)
    area("Gegenlicht", (0, 40, 30), 30, 14)

    ziel = bpy.data.objects.new("Kameraziel", None)
    ziel.location = v(3, -4, 4.5)
    sc.collection.objects.link(ziel)
    dreh = bpy.data.objects.new("Kameradrehung", None)
    dreh.location = v(0, 0, 0)
    sc.collection.objects.link(dreh)
    cd = bpy.data.cameras.new("Kamera")
    cd.lens = 32
    cam = bpy.data.objects.new("Kamera", cd)
    cam.location = v(0, -58, 28)
    cam.parent = dreh
    sc.collection.objects.link(cam)
    t = cam.constraints.new("TRACK_TO")
    t.target = ziel
    sc.camera = cam
    # Langsame Drehung um 360 Grad, kippt dabei leicht
    f = VIDEO["bilder"]
    dreh.rotation_euler = (0, 0, math.radians(-35))
    dreh.keyframe_insert("rotation_euler", frame=1)
    dreh.rotation_euler = (0, 0, math.radians(-35 + 360))
    dreh.keyframe_insert("rotation_euler", frame=f + 1)
    cam.location = v(0, -58, 28)
    cam.keyframe_insert("location", frame=1)
    cam.location = v(0, -44, 16)
    cam.keyframe_insert("location", frame=f // 2)
    cam.location = v(0, -58, 28)
    cam.keyframe_insert("location", frame=f + 1)
    for ob in (dreh,):
        ad = ob.animation_data.action
        kurven = getattr(ad, "fcurves", None)
        if kurven is None:
            kurven = [fc for layer in ad.layers for strip in layer.strips for bag in strip.channelbags for fc in bag.fcurves]
        for fc in kurven:
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"


def render_einstellungen(sc):
    sc.render.engine = "CYCLES"
    sc.cycles.samples = VIDEO["samples"]
    sc.cycles.use_denoising = True
    sc.cycles.max_bounces = 12
    sc.cycles.transmission_bounces = 12
    sc.cycles.transparent_max_bounces = 16
    sc.cycles.volume_bounces = 1
    sc.render.resolution_x, sc.render.resolution_y = VIDEO["aufloesung"]
    sc.render.resolution_percentage = 100
    sc.render.fps = VIDEO["fps"]
    sc.frame_start, sc.frame_end = 1, VIDEO["bilder"]
    sc.view_settings.view_transform = "AgX" if "AgX" in [i.identifier for i in sc.view_settings.bl_rna.properties["view_transform"].enum_items] else "Filmic"
    sc.view_settings.exposure = -1.2
    try:
        sc.view_settings.look = "AgX - Punchy"
    except TypeError:
        pass
    sc.render.filepath = VIDEO["datei"]
    try:
        sc.render.image_settings.media_type = "VIDEO"   # Blender 5
    except (AttributeError, TypeError):
        pass
    try:
        sc.render.image_settings.file_format = "FFMPEG"
        sc.render.ffmpeg.format = "MPEG4"
        sc.render.ffmpeg.codec = "H264"
        sc.render.ffmpeg.constant_rate_factor = "HIGH"
    except TypeError:
        sc.render.image_settings.file_format = "PNG"     # Einzelbilder, falls kein Video möglich


def main():
    sc = neue_szene()
    info = baue(sc)
    ionen(sc, info)
    licht_und_kamera(sc, info)
    render_einstellungen(sc)
    sc.frame_set(1)
    args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    if "--render" in args:
        bpy.ops.render.render(animation=True)


main()
