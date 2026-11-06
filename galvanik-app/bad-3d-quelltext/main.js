import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* Galvanik-Bad 3D. Einheiten in der Szene: Zentimeter.
   x = Breite (14 cm, links/rechts zu den Anoden), z = Länge (24 cm, entlang der Stäbe), y = Höhe (12 cm). */

const M = 63.546, Z = 2, F = 96485, RHO = 8.96;
const TW = 14, TL = 24, TH = 12, WALL = 0.3, AT = 0.5;
const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const nf = (v, d = 0) => (isFinite(v) ? v : 0).toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtH = h => { if (!isFinite(h)) return "–"; const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return mm === 60 ? `${hh + 1} h` : ((hh ? `${hh} h` : "") + (mm ? ` ${mm} min` : (hh ? "" : "0 min"))).trim(); };
const overlap = (a0, a1, b0, b1) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

const PIECES = {
  ohrring: { n: "Ohrring-Blatt", h: 3, a: 5, asp: 0.8, solid: false, shape: "leaf" },
  blatt45: { n: "Blatt 4 × 5 cm", h: 5, a: 14, asp: 0.8, solid: false, shape: "leaf" },
  stern:   { n: "Stern (Christbaum)", h: 6, a: 16, asp: 1, solid: false, shape: "star" },
  kugel:   { n: "Christbaumkugel", h: 5, a: 78, asp: 1, solid: true, shape: "ball" },
  zapfen:  { n: "Zapfen", h: 5, a: 35, asp: 0.55, solid: true, shape: "cone" },
  ring:    { n: "Ring", h: 2.5, a: 8, asp: 1, solid: true, shape: "ring" },
  rose:    { n: "Rose", h: 6, a: 60, asp: 1, solid: true, shape: "rose" }
};
const JEWELS = {
  auto: ["Automatisch aus der Größe", 0, 0],
  ohrring: ["Ohrringe", 150, 300], ring: ["Ringe", 300, 500], anhaenger: ["Anhänger, Broschen", 300, 500],
  armband: ["Armbänder, Armreifen", 500, 700], christbaum: ["Christbaumschmuck", 150, 300], deko: ["Wanddeko, Rose, große Stücke", 500, 700]
};
const GUARDS = { none: "kein Schutz", box: "durchlöcherte Plastikbox (heute)", bag: "Box mit Anodenbeutel aus Polypropylen" };

const IST = {
  I: 0.8, t: 24, ramp: false,
  V: 3.5, cuso4: 200, acid15: 180, nacl: 0, bright: 4, agit: false, evap: 20, T: 25,
  an: [{ on: true, L: 14, B: 6, z: 0, y0: 0.6, gap: 0 }, { on: true, L: 20, B: 8, z: 0, y0: 0.6, gap: 0 }],
  guard: "box", rods: 3, rod: 1,
  piece: "blatt45", size: 5, sides: 2, n: 1, pz: 0, depth: 1.5, jewel: "auto",
  wireD: 0.8, wireIso: false
};
const VOR = { guard: "bag", evap: 0, nacl: 0.1, ramp: true, wireIso: true, agit: true };
const copy = o => JSON.parse(JSON.stringify(o));
let S = copy(IST);
let sel = "werk";

/* ---------- Geometrie des Aufbaus ---------- */
function layout() {
  const pc = PIECES[S.piece];
  const hL = Math.min(TH - 0.2, S.V * 1000 / (TW * TL));
  const h = S.size, w = h * pc.asp, th = pc.solid ? (pc.shape === "ring" ? h * 0.25 : w) : 0.1;
  const rodsX = S.rods === 3 ? [-1.5, 0, 1.5] : [-0.9, 0.9];
  const rod = Math.min(S.rod, S.rods - 1), px = rodsX[rod];
  const depthMax = Math.max(0, hL - h - 0.5), depth = clamp(S.depth, 0, depthMax);
  const yTop = hL - depth, yBot = yTop - h, yC = (yTop + yBot) / 2;
  const n = S.n, spacing = w + 1, total = (n - 1) * spacing + w;
  const zMax = Math.max(0, TL / 2 - 0.6 - total / 2), pz = clamp(S.pz, -zMax, zMax);
  const zs = Array.from({ length: n }, (_, i) => pz + (i - (n - 1) / 2) * spacing);
  const z0 = pz - total / 2, z1 = pz + total / 2;
  const an = S.an.map((a, i) => {
    const side = i ? 1 : -1, L = Math.min(a.L, TL - 1), B = Math.min(a.B, TH - 0.8);
    const zL = TL / 2 - 0.5 - L / 2, zc = clamp(a.z, -zL, zL);
    const y0 = clamp(a.y0, 0.3, TH - B - 0.1);
    const face0 = TW / 2 - WALL - AT;                // Abstand Mitte → Anodenfläche bei Spalt 0
    const gapMax = Math.max(0, face0 - side * px - th / 2 - 1);
    const gap = clamp(a.gap, 0, gapMax);
    const xFace = side * (face0 - gap);
    const D = side * (xFace - px) - th / 2;
    const yImm = clamp(Math.min(y0 + B, hL) - y0, 0, B);
    const Aimm = L * yImm;
    const cz = total > 0 ? overlap(z0, z1, zc - L / 2, zc + L / 2) / total : 0;
    const cy = h > 0 ? overlap(yBot, yTop, y0, Math.min(y0 + B, hL)) / h : 0;
    return { i, side, on: a.on, L, B, zc, zL, y0, gap, gapMax, xFace, D, Dmax: D + gap, Dmin: D - (gapMax - gap), yImm, Aimm, cz, cy, cover: cz * cy, out: y0 + B > hL };
  });
  return { pc, hL, h, w, th, rodsX, rod, px, depth, depthMax, yTop, yBot, yC, n, spacing, total, zMax, pz, zs, z0, z1, an };
}

/* ---------- Rechenmodell (aus dem Browser-Simulator übernommen, auf zwei frei stellbare Anoden erweitert) ---------- */
function autoJewel(Apc) {
  if (S.piece === "ring") return "ring";
  if (S.piece === "rose") return "deko";
  if (S.piece === "stern" || S.piece === "kugel" || S.piece === "zapfen") return "christbaum";
  return Apc <= 10 ? "ohrring" : Apc <= 40 ? "anhaenger" : "deko";
}

function model() {
  const g = layout(), pc = g.pc, solid = pc.solid, sides = solid ? 1 : S.sides;
  const act = g.an.filter(a => a.on && a.Aimm > 0);
  const wt = a => (a.on && a.Aimm > 0) ? Math.pow(a.Aimm, 0.3) / Math.sqrt(Math.max(0.5, a.D)) * (0.4 + 0.6 * a.cover) : 0;
  const w0 = wt(g.an[0]), w1 = wt(g.an[1]), ws = w0 + w1;
  const D = ws > 0 ? (w0 * g.an[0].D + w1 * g.an[1].D) / ws : 6;
  const area = pc.a * (S.size / pc.h) ** 2;
  const wireImm = g.depth;
  const Aw = S.wireIso ? 0 : Math.PI * (S.wireD / 10) * wireImm * g.n;
  const Apc = area * sides;
  const A = g.n * Apc + Aw;
  const I = act.length ? S.I : 0;
  const j = I / (A / 100);
  const acidG = S.acid15 * 1.102 * 0.15, acid96 = acidG / (1.84 * 0.96);
  const conc = 1 / (1 - S.evap / 100), cuEff = S.cuso4 * conc, acidEff = acidG * conc, cl = S.nacl * 606.6 * conc;
  const crys = S.T < 18 || cuEff > 240 || acidEff > 90;
  const kappa = (0.05 + 0.004 * acidEff) * (1 + 0.015 * (S.T - 22));
  const jMax = Math.max(1, 3 * (1 + 0.025 * (S.T - 22)) * (S.agit ? 1.6 : 1) * (cl < 20 ? 0.8 : 1));
  const glossMin = S.bright <= 0 ? Infinity : (cl < 20 ? 2.0 : 1.0);
  const r = j / jMax;
  const eta = r <= 0.8 ? 0.98 : Math.max(0.6, 0.98 - 0.35 * (r - 0.8));
  const Q = I * S.t * 3600, mAn = Q * M / (Z * F), m = mAn * eta;
  const d = m / (RHO * A) * 1e4;
  const rc = Math.min(r, 1.5);
  const coverAvg = ws > 0 ? (w0 * g.an[0].cover + w1 * g.an[1].cover) / ws : 0;
  const kd = Math.sqrt(5 / Math.max(1, D)), ka = clamp(Math.sqrt(0.27 / kappa), 0.7, 1.6);
  const kg = act.length === 2 ? 0.9 : 1, km = S.agit ? 0.9 : 1, kc = 1 + 0.4 * (1 - coverAvg);
  const k = Math.pow(kd * ka * kg * km * kc, 0.7);
  const edge = Math.min(3.5, 1 + (0.25 + 0.25 * rc) * k);
  const rec = Math.max(0.15, 1 - (0.2 + 0.15 * rc) * k);
  let fL = 1, fR = 1;
  if (sides === 2 && ws > 0) {
    if (act.length === 2) { fL = 2 * w0 / ws; fR = 2 - fL; }
    else { const back = clamp(0.65 * Math.sqrt(D / 5), 0.25, 0.95); if (w0 > 0) { fR = back; fL = 2 - back; } else { fL = back; fR = 2 - back; } }
  }
  const Aeff = act.reduce((s, a) => s + a.Aimm, 0);
  const jA = Aeff > 0 ? I / (Aeff / 100) : 0;
  const U = act.length ? 0.4 + (j / 100) * D / kappa : 0;
  const rate = d / S.t;
  const jewel = S.jewel === "auto" ? autoJewel(Apc) : S.jewel;
  const [jn, tLo, tHi] = JEWELS[jewel];
  const tgt = (tLo + tHi) / 2;
  const st = jl => jl > jMax ? ["bad", "verbrannt"] : !isFinite(glossMin) ? ["warn", "matt"] : jl < glossMin ? ["warn", "matt rosa"] : ["good", "glänzend"];
  const locs = [];
  const add = (n, f) => locs.push({ n, f, dd: d * f, jl: j * f, s: st(j * f) });
  add("Kante", edge * Math.max(fL, fR));
  if (sides === 2) { add("Seite links (zu Anode 1)", fL); add("Seite rechts (zu Anode 2)", fR); }
  else add("Fläche", 1);
  add("Vertiefung", rec * Math.min(fL, fR));
  return { g, pc, sides, area, D, Aw, wireImm, Apc, A, I, j, acidG, acid96, cl, kappa, jMax, glossMin, r, eta, mAn, m, d,
    edge, rec, fL, fR, w0, w1, ws, act, Aeff, conc, cuEff, acidEff, crys, jA, U, rate, jn, tLo, tHi, tgt, tTgt: tgt / rate,
    mPiece: A > 0 ? m * Apc / A : 0, locs, st, iRec: Math.max(0.02, (A - Aw) * 0.015 + Aw * 0.015), coverAvg };
}

/* ---------- 3D-Szene ---------- */
const canvas = $("view"), stage = $("stage");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#dfe5e9");
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;
const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 500);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.dampingFactor = 0.12;
controls.minDistance = 8; controls.maxDistance = 120;
controls.target.set(2, 5, 0);
const VIEWS = {
  schraeg: [30, 30, 46], vorne: [0, 9, 52], oben: [0, 56, 0.01], seite: [54, 10, 0]
};
let camAnim = null;
function setView(k) {
  const to = new THREE.Vector3(...VIEWS[k]).add(new THREE.Vector3(2, 0, 0));
  camAnim = { from: camera.position.clone(), to, t0: performance.now(), tf: new THREE.Vector3(2, 5, 0), ff: controls.target.clone() };
}
camera.position.set(26, 26, 36);

scene.add(new THREE.HemisphereLight("#ffffff", "#8a8f94", 1.4));
const sun = new THREE.DirectionalLight("#ffffff", 2.2); sun.position.set(18, 40, 26); scene.add(sun);
const fill = new THREE.DirectionalLight("#cfe3ff", 0.8); fill.position.set(-30, 14, -20); scene.add(fill);

// Tisch
const table = new THREE.Mesh(new THREE.BoxGeometry(80, 1, 50), new THREE.MeshStandardMaterial({ color: "#c9b79c", roughness: 0.9 }));
table.position.set(6, -0.5, 0); scene.add(table);

const MAT = {
  glass: new THREE.MeshStandardMaterial({ color: "#eaf3f7", transparent: true, opacity: 0.16, roughness: 0.05, depthWrite: false, side: THREE.DoubleSide }),
  liquid: new THREE.MeshStandardMaterial({ color: "#3d8fc7", transparent: true, opacity: 0.30, roughness: 0.2, depthWrite: false }),
  liquidTop: new THREE.MeshStandardMaterial({ color: "#6fb3dc", transparent: true, opacity: 0.35, roughness: 0.1, depthWrite: false, side: THREE.DoubleSide }),
  copper: new THREE.MeshStandardMaterial({ color: "#c46a35", metalness: 0.85, roughness: 0.38 }),
  anode: new THREE.MeshStandardMaterial({ color: "#a65a30", metalness: 0.7, roughness: 0.62 }),
  box: null,
  black: new THREE.MeshStandardMaterial({ color: "#1e2226", roughness: 0.5 }),
  dark: new THREE.MeshStandardMaterial({ color: "#2b2f33", roughness: 0.6 }),
  psu: new THREE.MeshStandardMaterial({ color: "#3a4047", roughness: 0.55 }),
  red: new THREE.MeshStandardMaterial({ color: "#c0362c", roughness: 0.45 }),
  brown: new THREE.MeshStandardMaterial({ color: "#6b4426", roughness: 0.5 }),
  nail: new THREE.MeshStandardMaterial({ color: "#c8264b", roughness: 0.3 }),
  heaterGlass: new THREE.MeshStandardMaterial({ color: "#dfeaf0", transparent: true, opacity: 0.35, roughness: 0.05, depthWrite: false }),
  coil: new THREE.MeshStandardMaterial({ color: "#ff8a3a", emissive: "#ff5a1a", emissiveIntensity: 0.6 }),
  crystal: new THREE.MeshStandardMaterial({ color: "#2f7fd6", roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85 }),
  sludge: new THREE.MeshStandardMaterial({ color: "#26201b", roughness: 1 }),
  bag: new THREE.MeshStandardMaterial({ color: "#f4f1ea", transparent: true, opacity: 0.55, roughness: 1, depthWrite: false, side: THREE.DoubleSide }),
  piece: new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.75, roughness: 0.35, side: THREE.DoubleSide })
};
{ // Lochbox-Textur
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  x.fillStyle = "rgba(255,255,255,0.75)"; x.fillRect(0, 0, 128, 128);
  x.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(16 + i * 32, 16 + k * 32, 9, 0, 7); x.fill(); }
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace;
  MAT.boxTex = tex;
  MAT.box = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, roughness: 0.8, color: "#ffffff" });
}

// Behälter (fest)
const tank = new THREE.Group(); scene.add(tank);
{
  const add = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), MAT.glass); m.position.set(x, y, z); m.userData.part = "bad"; m.renderOrder = 3; tank.add(m); };
  add(TW + 2 * WALL, WALL, TL + 2 * WALL, 0, WALL / 2 - WALL, 0);
  add(WALL, TH, TL, -TW / 2 - WALL / 2, TH / 2, 0); add(WALL, TH, TL, TW / 2 + WALL / 2, TH / 2, 0);
  add(TW + 2 * WALL, TH, WALL, 0, TH / 2, -TL / 2 - WALL / 2); add(TW + 2 * WALL, TH, WALL, 0, TH / 2, TL / 2 + WALL / 2);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(TW + 2 * WALL, TH + WALL, TL + 2 * WALL)), new THREE.LineBasicMaterial({ color: "#8a99a3" }));
  edges.position.y = TH / 2 - WALL / 2; tank.add(edges);
}

const dyn = new THREE.Group(); scene.add(dyn);
const pickables = [];
const partMeshes = {};
function disposeGroup(gr) {
  gr.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.userData && o.material.userData.own) o.material.dispose(); });
  gr.clear();
}
function tag(mesh, part) { mesh.userData.part = part; pickables.push(mesh); (partMeshes[part] = partMeshes[part] || []).push(mesh); return mesh; }

// Farbe einer Stelle aus der örtlichen Stromdichte
const C_SHINY = new THREE.Color("#e8954f"), C_MATTE = new THREE.Color("#e8a796"), C_MATT0 = new THREE.Color("#b98466"), C_BURNT = new THREE.Color("#4a2412");
function colorFor(o, jl, out) {
  const tG = isFinite(o.glossMin) ? smooth(o.glossMin * 0.85, o.glossMin * 1.15, jl) : 0;
  out.copy(isFinite(o.glossMin) ? C_MATTE : C_MATT0).lerp(C_SHINY, tG);
  out.lerp(C_BURNT, smooth(o.jMax * 0.95, o.jMax * 1.12, jl));
  return out;
}

// Gitter-Fläche aus einer Parameterfunktion
function paramGeo(fn, nu, nv) {
  const pos = [], idx = [], info = [];
  const p = new THREE.Vector3();
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) { const inf = fn(i / nu, j / nv, p); pos.push(p.x, p.y, p.z); info.push(inf || {}); }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx); geo.computeVertexNormals();
  geo.userData.info = info;
  return geo;
}

// Flache Teile: lokales Koordinatensystem u = quer (z), v = hoch (y); e = Abstand zum Rand in cm, q = Vertiefung 0..1
function flatGeo(shape, w, h) {
  if (shape === "star") {
    const R = h / 2, Ri = R * 0.45, P5 = 5;
    const rad = th => { const a = ((th / (2 * Math.PI / P5)) % 1 + 1) % 1; const t = Math.abs(a - 0.5) * 2; return Ri + (R - Ri) * t; };
    return paramGeo((u, v, p) => {
      const th = u * 2 * Math.PI + Math.PI / 2, rr = rad(th - Math.PI / 2), r = v * rr;
      p.set(0, R + Math.sin(th) * r - h, Math.cos(th) * r);
      const inner = 1 - smooth(Ri, Ri + (R - Ri) * 0.35, rr);
      return { e: (1 - v) * rr, q: inner * smooth(0.75, 1, v) * 0.8 };
    }, 200, 24);
  }
  const prof = v => Math.pow(Math.sin(Math.PI * clamp(v, 0, 1)), 0.75) * (0.65 + 0.35 * v);
  return paramGeo((u, v, p) => {
    const half = prof(v) * w / 2 * 1.08, x = (u * 2 - 1);
    const z = x * half + Math.sin(v * 9) * 0.04 * w * (1 - Math.abs(x));
    p.set(0, -h + v * h, z);
    const e = Math.min((1 - Math.abs(x)) * half, v * h * 0.5, (1 - v) * h * 0.5 + 0.3);
    // Mittelrippe und Seitenadern als Vertiefung
    const mid = Math.exp(-((x / 0.07) ** 2));
    const vein = Math.exp(-(((((v * 6 - Math.abs(x) * 1.6) % 1) + 1) % 1 - 0.5) ** 2) / 0.012) * 0.6 * (Math.abs(x) < 0.85 ? 1 : 0);
    return { e, q: clamp(Math.max(mid, vein * 0.7), 0, 1) };
  }, 36, 48);
}

function solidGeo(shape, w, h) {
  if (shape === "ball") {
    const R = h / 2;
    return paramGeo((u, v, p) => { const th = u * 2 * Math.PI, ph = v * Math.PI; p.set(R * Math.sin(ph) * Math.cos(th), -R - R * Math.cos(ph), R * Math.sin(ph) * Math.sin(th)); return {}; }, 48, 32);
  }
  if (shape === "cone") {
    return paramGeo((u, v, p) => {
      const th = u * 2 * Math.PI, base = Math.pow(Math.sin(Math.PI * (0.08 + 0.92 * v)), 0.8) * (0.55 + 0.45 * v) * w / 2;
      const scale = 1 + 0.2 * Math.max(0, Math.sin(v * 2 * Math.PI * 6 + Math.sin(th * 5) * 1.2));
      const r = base * scale; p.set(r * Math.cos(th), -h + v * h, r * Math.sin(th)); return {};
    }, 64, 96);
  }
  if (shape === "ring") {
    const R = h / 2 - h * 0.12, rt = h * 0.12;
    return paramGeo((u, v, p) => { const a = u * 2 * Math.PI, b = v * 2 * Math.PI; const rr = R + rt * Math.cos(b); p.set(rt * Math.sin(b) * 1.8, -h / 2 + rr * Math.sin(a), rr * Math.cos(a)); return {}; }, 64, 24);
  }
  // Rose
  const R = h / 2;
  return paramGeo((u, v, p) => {
    const th = u * 2 * Math.PI, ph = v * Math.PI * 0.92;
    const k = 0.82 + 0.18 * Math.pow(Math.abs(Math.cos(2.5 * th + 7 * ph)), 0.6);
    const r = R * k * (0.75 + 0.25 * Math.sin(ph));
    p.set(r * Math.sin(ph) * Math.cos(th), -R - r * Math.cos(ph) * 0.95, r * Math.sin(ph) * Math.sin(th)); return {};
  }, 96, 64);
}

function colorSolid(geo, o, f) {
  const pos = geo.attributes.position, nor = geo.attributes.normal, n = pos.count;
  const col = new Float32Array(n * 3), c = new THREE.Color();
  geo.computeBoundingBox(); const ctr = new THREE.Vector3(); geo.boundingBox.getCenter(ctr);
  let rMax = 0; const v = new THREE.Vector3(), nn = new THREE.Vector3();
  for (let i = 0; i < n; i++) rMax = Math.max(rMax, v.fromBufferAttribute(pos, i).sub(ctr).length());
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i).sub(ctr); nn.fromBufferAttribute(nor, i);
    const rN = v.length() / rMax, dir = v.normalize();
    const edgeW = smooth(0.82, 1, rN), recW = clamp(-nn.dot(dir) * 1.4, 0, 1) + clamp(0.55 - rN, 0, 0.55);
    // Seite zur stärkeren Anode bekommt mehr
    const sideF = 1 + (nn.x < 0 ? (o.fL - 1) : (o.fR - 1)) * Math.abs(nn.x) * 0.5;
    const fl = f * sideF * (1 + (o.edge - 1) * edgeW) * (1 - (1 - o.rec) * clamp(recW, 0, 1));
    colorFor(o, o.j * fl, c); col.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
}
function colorFlat(geo, o, sideF) {
  const info = geo.userData.info, n = info.length, col = new Float32Array(n * 3), c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const { e, q } = info[i];
    const fl = sideF * (1 + (o.edge - 1) * Math.exp(-((e / 0.3) ** 2))) * (1 - (1 - o.rec) * q);
    colorFor(o, o.j * fl, c); col.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
}

function tube(points, r, mat, part) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r, 8, false), mat);
  m.userData.noBox = true;
  if (part) tag(m, part);
  dyn.add(m); return m;
}
function cyl(r, len, mat, part) { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 16), mat); if (part) tag(m, part); dyn.add(m); return m; }
function box(w, h, d, mat, part) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); if (part) tag(m, part); dyn.add(m); return m; }

// Display des Netzgeräts
const lcdCanvas = document.createElement("canvas"); lcdCanvas.width = 512; lcdCanvas.height = 192;
const lcdTex = new THREE.CanvasTexture(lcdCanvas); lcdTex.colorSpace = THREE.SRGBColorSpace;
function drawLCD(o) {
  const x = lcdCanvas.getContext("2d");
  x.fillStyle = "#101a15"; x.fillRect(0, 0, 512, 192);
  x.font = "bold 66px Consolas, monospace"; x.textBaseline = "middle"; x.textAlign = "right";
  x.fillStyle = "#ff5d4d"; x.fillText(nf(o.U, 2), 200, 72);
  x.fillStyle = "#7ff0a8"; x.fillText(nf(o.I, 2), 440, 72);
  x.font = "32px Consolas, monospace"; x.fillStyle = "#9fb5aa"; x.textAlign = "left";
  x.fillText("V", 210, 78); x.fillText("A", 450, 78);
  x.textAlign = "left"; x.font = "26px Segoe UI, sans-serif"; x.fillText("RUZIZAO SPS-W3010 · CC", 20, 160);
  lcdTex.needsUpdate = true;
}

// Ionen-Teilchen
const ION_N = 420;
const ionGeo = new THREE.BufferGeometry();
const ionPos = new Float32Array(ION_N * 3);
ionGeo.setAttribute("position", new THREE.BufferAttribute(ionPos, 3));
const ionSprite = (() => { const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d"); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 30); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.4, "rgba(120,190,255,0.9)"); gr.addColorStop(1, "rgba(60,140,230,0)"); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); return t; })();
const ions = new THREE.Points(ionGeo, new THREE.PointsMaterial({ size: 0.42, map: ionSprite, transparent: true, depthWrite: false, color: "#3d8fd6" }));
ions.renderOrder = 5; scene.add(ions);
const ionState = Array.from({ length: ION_N }, () => ({ a: new THREE.Vector3(), b: new THREE.Vector3(), p: Math.random(), on: false }));
const bubGeo = new THREE.BufferGeometry(); const BUB_N = 120; const bubPos = new Float32Array(BUB_N * 3);
bubGeo.setAttribute("position", new THREE.BufferAttribute(bubPos, 3));
const bubbles = new THREE.Points(bubGeo, new THREE.PointsMaterial({ size: 0.35, color: "#ffffff", transparent: true, opacity: 0.8, depthWrite: false }));
scene.add(bubbles);
const bubState = Array.from({ length: BUB_N }, () => ({ x: (Math.random() - 0.5) * 3, z: (Math.random() - 0.5) * 20, y: Math.random() * 10, s: 2 + Math.random() * 2 }));

let O = null, G = null, hangAnim = null;
function rand(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function build(o) {
  pickables.length = 0; for (const k in partMeshes) delete partMeshes[k];
  disposeGroup(dyn);
  const g = o.g; G = g;
  const lift = hangAnim ? hangAnim.lift : 0;

  // Elektrolyt
  const liq = new THREE.Mesh(new THREE.BoxGeometry(TW - 0.02, g.hL, TL - 0.02), MAT.liquid);
  liq.position.set(0, g.hL / 2, 0); liq.renderOrder = 2; tag(liq, "bad"); dyn.add(liq);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(TW - 0.02, TL - 0.02), MAT.liquidTop);
  top.rotation.x = -Math.PI / 2; top.position.y = g.hL; top.renderOrder = 4; tag(top, "bad"); dyn.add(top);
  // Verdunstungsrand
  if (S.evap > 0) {
    const ring = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(TW, 0.01, TL)), new THREE.LineBasicMaterial({ color: "#6a8fa6" }));
    ring.position.y = Math.min(TH - 0.2, g.hL / (1 - S.evap / 100)); dyn.add(ring);
  }

  // Anoden mit Lochbox
  g.an.forEach((a, i) => {
    const part = "an" + i;
    if (!a.on) return;
    const pl = box(AT, a.B, a.L, MAT.anode, part);
    pl.position.set(a.xFace + a.side * AT / 2 * -1 * -1 + (a.side < 0 ? -AT / 2 : AT / 2), a.y0 + a.B / 2, a.zc);
    // Lochbox: Rückwand an der Behälterwand bzw. hinter der Anode
    const bh = Math.min(TH - 0.3, a.y0 + a.B + 1.2), bw = Math.abs(a.xFace) - (TW / 2 - WALL - AT - 1.2 - 0) > 0 ? 1.2 : 1.2;
    const xBack = a.side * (TW / 2 - 0.05), xFront = a.xFace - a.side * 0.35;
    const depth = Math.abs(xBack - xFront), xMid = (xBack + xFront) / 2;
    const bm = S.guard === "none" ? null : MAT.box;
    if (bm) {
      const mk = (w, h, d, x, y, z, rx, ry) => { const geo = new THREE.BoxGeometry(w, h, d); const m = new THREE.Mesh(geo, bm); m.position.set(x, y, z); tag(m, part); dyn.add(m); return m; };
      const L2 = a.L + 1.2;
      MAT.boxTex.repeat.set(L2 / 3, bh / 3);
      mk(0.08, bh, L2, xFront, bh / 2, a.zc);
      mk(depth, 0.08, L2, xMid, 0.04, a.zc);
      mk(depth, bh, 0.08, xMid, bh / 2, a.zc - L2 / 2); mk(depth, bh, 0.08, xMid, bh / 2, a.zc + L2 / 2);
      if (S.guard === "bag") {
        const bag = new THREE.Mesh(new THREE.BoxGeometry(AT + 0.5, a.B + 0.6, a.L + 0.5), MAT.bag);
        bag.position.set(a.xFace + (a.side < 0 ? -AT / 2 : AT / 2), a.y0 + a.B / 2, a.zc); bag.renderOrder = 3; tag(bag, part); dyn.add(bag);
      }
    }
    // Anschlussdraht zum Pluspol
    const xw = a.xFace + (a.side < 0 ? -AT / 2 : AT / 2), zEnd = a.zc + a.L / 2 - 0.6;
    tube([[xw, a.y0 + a.B - 0.3, zEnd], [xw, TH + 0.8, zEnd], [xw + a.side * 0.5, TH + 3, zEnd - 1], [10, TH + 2, -2], [16.6, 2.2, -2.6]], 0.12, i ? MAT.brown : MAT.copper, part);
  });

  // Kathodenstäbe
  const rodY = TH + 0.25;
  g.rodsX.forEach((x, k) => {
    const r = cyl(0.25, TL + 3, MAT.copper, "stab"); r.rotation.x = Math.PI / 2; r.position.set(x, rodY, 0.5);
  });
  const bar = cyl(0.2, Math.abs(g.rodsX[g.rodsX.length - 1] - g.rodsX[0]) + 0.6, MAT.copper, "stab");
  bar.rotation.z = Math.PI / 2; bar.position.set((g.rodsX[0] + g.rodsX[g.rodsX.length - 1]) / 2, rodY + 0.35, TL / 2 + 1.5);
  tube([[g.rodsX[g.rodsX.length - 1], rodY + 0.4, TL / 2 + 1.5], [8, TH + 3, 4], [18.4, 2.2, -2.6]], 0.13, MAT.black, "stab");

  // Werkstücke mit Draht
  const pc = g.pc;
  g.zs.forEach((zc, k) => {
    const yTop = g.yTop + lift;
    // Draht: über dem Bad blank, darunter isoliert oder blank
    const wr = Math.max(0.05, S.wireD / 20) * 1.6;
    const above = rodY - Math.max(g.hL, yTop);
    if (above > 0) { const c1 = cyl(wr, above, MAT.copper, "draht"); c1.position.set(g.px, Math.max(g.hL, yTop) + above / 2, zc); }
    const imm = Math.max(0, g.hL - yTop);
    if (imm > 0) { const c2 = cyl(wr * (S.wireIso ? 1.6 : 1), imm, S.wireIso ? MAT.nail : MAT.copper, "draht"); c2.position.set(g.px, yTop + imm / 2, zc); }
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.32, wr, 8, 20, Math.PI * 1.3), MAT.copper);
    hook.position.set(g.px, rodY + 0.05, zc); hook.rotation.y = Math.PI / 2; hook.rotation.z = -0.2; tag(hook, "draht"); dyn.add(hook);
    // Öse
    const oese = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 8, 20), MAT.copper);
    oese.position.set(g.px, yTop + 0.1, zc); oese.rotation.y = Math.PI / 2; tag(oese, "werk"); dyn.add(oese);
    let geo;
    if (!pc.solid) {
      const w = g.w;
      const front = flatGeo(pc.shape, w, g.h); colorFlat(front, o, o.sides === 2 ? o.fL : 1);
      const m1 = new THREE.Mesh(front, MAT.piece); m1.position.set(g.px - 0.04, yTop, zc); tag(m1, "werk"); dyn.add(m1);
      const back = flatGeo(pc.shape, w, g.h);
      if (o.sides === 2) colorFlat(back, o, o.fR);
      else { const n = back.userData.info.length, col = new Float32Array(n * 3); const c = new THREE.Color("#5b8f3a"); for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3); back.setAttribute("color", new THREE.BufferAttribute(col, 3)); }
      const m2 = new THREE.Mesh(back, o.sides === 2 ? MAT.piece : MAT.leafBack); m2.position.set(g.px + 0.04, yTop, zc); tag(m2, "werk"); dyn.add(m2);
    } else {
      geo = solidGeo(pc.shape, g.w, g.h); colorSolid(geo, o, 1);
      const m = new THREE.Mesh(geo, MAT.piece); m.position.set(g.px, yTop, zc); tag(m, "werk"); dyn.add(m);
    }
  });

  // Heizstab in der Ecke
  const hx = -TW / 2 + 1.4, hz = TL / 2 - 1.4, hb = 1.2, hLen = 10;
  const hg = cyl(0.75, hLen, MAT.heaterGlass, "heiz"); hg.position.set(hx, hb + hLen / 2, hz); hg.renderOrder = 3;
  const coil = cyl(0.45, 6, MAT.coil, "heiz"); coil.position.set(hx, hb + 3.5, hz);
  MAT.coil.emissiveIntensity = clamp((S.T - 18) / 10, 0.1, 1.2);
  const cap = cyl(0.85, 2.6, MAT.black, "heiz"); cap.position.set(hx, hb + hLen + 1.3, hz);
  const knob = cyl(0.55, 0.6, MAT.dark, "heiz"); knob.position.set(hx, hb + hLen + 2.9, hz);
  const clip = box(0.4, 2.5, 1.6, MAT.black, "heiz"); clip.position.set(-TW / 2 - 0.2, TH - 1.4, hz);
  tube([[hx, hb + hLen + 3.1, hz], [hx - 2, TH + 5, hz + 3], [-12, 0.3, TL / 2 + 5]], 0.12, MAT.black, "heiz");

  // Netzgerät
  const psu = box(12, 7, 9, MAT.psu, "netz"); psu.position.set(19, 3.5, -8);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 2.5), new THREE.MeshBasicMaterial({ map: lcdTex, toneMapped: false }));
  face.position.set(19, 5.2, -3.48); tag(face, "netz"); dyn.add(face);
  [[13.6, 2.2, "#c0362c"], [15.4, 2.2, "#1e2226"]].forEach(([x, y, c]) => { const t = cyl(0.35, 0.8, new THREE.MeshStandardMaterial({ color: c }), "netz"); t.rotation.x = Math.PI / 2; t.position.set(x + 3, y, -3.2); });
  [20.6, 22.2].forEach(x => { const kb = cyl(0.55, 0.7, MAT.dark, "netz"); kb.rotation.x = Math.PI / 2; kb.position.set(x, 2.2, -3.2); });
  drawLCD(o);

  // Kristalle und Schlamm
  const rnd = rand(7);
  if (o.crys) {
    const cg = new THREE.OctahedronGeometry(0.28);
    for (let i = 0; i < 46; i++) {
      const m = new THREE.Mesh(cg, MAT.crystal);
      const onWall = i % 3 === 0;
      if (onWall) m.position.set((rnd() - 0.5) * TW * 0.9, g.hL + 0.2 + rnd() * (TH - g.hL - 0.3), (rnd() < 0.5 ? -1 : 1) * (TL / 2 - 0.15));
      else { const side = rnd() < 0.5 ? -1 : 1; m.position.set(side * (TW / 2 - 0.8 - rnd() * 2), 0.15, (rnd() - 0.5) * TL * 0.8); }
      m.scale.setScalar(0.6 + rnd() * 1.1); m.rotation.set(rnd() * 3, rnd() * 3, 0); tag(m, "bad"); dyn.add(m);
    }
  }
  if (S.guard !== "bag") {
    const sg = new THREE.SphereGeometry(0.09, 6, 4);
    for (let i = 0; i < (S.guard === "none" ? 120 : 60); i++) { const m = new THREE.Mesh(sg, MAT.sludge); m.position.set((rnd() - 0.5) * 7, 0.06, (rnd() - 0.5) * TL * 0.85); tag(m, "bad"); dyn.add(m); }
  }

  highlight();
  setupIons(o);
}
MAT.leafBack = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, side: THREE.DoubleSide });

const selBox = new THREE.Box3Helper(new THREE.Box3(), new THREE.Color("#1f6fe0")); scene.add(selBox);
function highlight() {
  const ms = (partMeshes[sel] || []).filter(m => !m.userData.noBox && m.material !== MAT.liquid && m.material !== MAT.liquidTop);
  if (!ms.length || sel === "bad") { selBox.visible = false; }
  else { const b = selBox.box.makeEmpty(); ms.forEach(m => { m.updateMatrixWorld(); b.expandByObject(m); }); b.expandByScalar(0.25); selBox.visible = true; }
  MAT.liquid.opacity = sel === "bad" ? 0.42 : 0.30;
}

function setupIons(o) {
  const g = o.g, act = g.an.filter(a => a.on && a.Aimm > 0);
  const tot = Math.min(ION_N, Math.round(40 + 220 * clamp(o.I / 1.2, 0, 1.6)));
  const shares = act.map(a => (a.i ? o.w1 : o.w0) / (o.ws || 1));
  ionState.forEach((q, i) => {
    q.on = i < tot && act.length > 0;
    if (!q.on) return;
    let r = (i / tot), k = 0; while (k < act.length - 1 && r > shares[k]) { r -= shares[k]; k++; }
    q.an = act[k]; respawn(q, true);
  });
  ions.material.size = 0.42;
}
function respawn(q, rp) {
  const g = G, a = q.an; if (!a) return;
  const yMax = Math.min(a.y0 + a.B, g.hL - 0.2);
  q.a.set(a.xFace, a.y0 + Math.random() * Math.max(0.2, yMax - a.y0), a.zc + (Math.random() - 0.5) * a.L);
  const zc = g.zs[Math.floor(Math.random() * g.zs.length)];
  const yTop = g.yTop + (hangAnim ? hangAnim.lift : 0);
  const hw = (g.pc.solid ? g.w / 2 : 0.05) * -a.side;
  q.b.set(g.px + hw * 0.6, yTop - g.h * (0.1 + 0.8 * Math.random()), zc + (Math.random() - 0.5) * g.w * 0.8);
  q.p = rp ? Math.random() : 0;
  q.wob = Math.random() * 6.28;
}

/* ---------- Auswahl, Hover, Ziehen ---------- */
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
const tip = $("tip");
const NAMES = { netz: "Netzgerät", bad: "Elektrolyt (Bad)", heiz: "Heizstab", an0: "Anode 1 (links)", an1: "Anode 2 (rechts)", stab: "Kathodenstäbe", draht: "Aufhängedraht", werk: "Werkstück" };
function pick(ev) {
  const r = canvas.getBoundingClientRect();
  mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  const hits = ray.intersectObjects([...pickables, ...tank.children.filter(c => c.isMesh)], false);
  const solid = hits.find(h => h.object.userData.part && h.object.userData.part !== "bad");
  const any = hits.find(h => h.object.userData.part);
  return solid || any || null;
}
let drag = null, downAt = null;
canvas.addEventListener("pointerdown", ev => {
  downAt = { x: ev.clientX, y: ev.clientY };
  if (ev.button !== 0) return;
  const h = pick(ev);
  if (h && h.object.userData.part === sel && (sel === "an0" || sel === "an1" || sel === "werk")) {
    const x = sel === "werk" ? G.px : G.an[+sel[2]].xFace;
    const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), -x);
    const p0 = new THREE.Vector3(); ray.ray.intersectPlane(plane, p0);
    const st = sel === "werk" ? { z: S.pz, y: S.depth } : { z: S.an[+sel[2]].z, y: S.an[+sel[2]].y0 };
    drag = { part: sel, plane, p0, st };
    controls.enabled = false; canvas.setPointerCapture(ev.pointerId); canvas.style.cursor = "grabbing";
  }
});
canvas.addEventListener("pointermove", ev => {
  if (drag) {
    const r = canvas.getBoundingClientRect();
    mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const p = new THREE.Vector3(); if (!ray.ray.intersectPlane(drag.plane, p)) return;
    const dz = p.z - drag.p0.z, dy = p.y - drag.p0.y;
    if (drag.part === "werk") { S.pz = drag.st.z + dz; S.depth = drag.st.y - dy; const g = layout(); S.pz = g.pz; S.depth = g.depth; }
    else { const a = S.an[+drag.part[2]]; a.z = drag.st.z + dz; a.y0 = drag.st.y + dy; const g = layout(); a.z = g.an[+drag.part[2]].zc; a.y0 = g.an[+drag.part[2]].y0; }
    update();
    return;
  }
  const h = pick(ev);
  if (h) { tip.style.display = "block"; tip.textContent = NAMES[h.object.userData.part] + (h.object.userData.part === sel && /an|werk/.test(sel) ? " · ziehen zum Verschieben" : " · klicken zum Bearbeiten"); const r = stage.getBoundingClientRect(); tip.style.left = (ev.clientX - r.left) + "px"; tip.style.top = (ev.clientY - r.top) + "px"; canvas.style.cursor = "pointer"; }
  else { tip.style.display = "none"; canvas.style.cursor = "grab"; }
});
canvas.addEventListener("pointerup", ev => {
  if (drag) { drag = null; controls.enabled = true; canvas.releasePointerCapture(ev.pointerId); canvas.style.cursor = "pointer"; return; }
  if (ev.button !== 0 || !downAt || Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y) > 5) return;
  const h = pick(ev);
  if (h) select(h.object.userData.part);
});
canvas.addEventListener("pointerleave", () => { tip.style.display = "none"; });

/* ---------- Editor ---------- */
const getK = k => k.split(".").reduce((o, p) => o[p], S);
const setK = (k, v) => { const ps = k.split("."), last = ps.pop(); ps.reduce((o, p) => o[p], S)[last] = v; };
const R = (k, label, min, max, step, unit, hint, ext) => ({ t: "r", k, label, min, max, step, unit, hint, ...ext });

function anodeCtrls(i) {
  return o => {
    const a = o.g.an[i];
    return [
      { t: "c", k: `an.${i}.on`, label: "Anode hängt im Bad" },
      R(`an.${i}.L`, "Länge (entlang der Wand)", 3, 23, 0.5, "cm"),
      R(`an.${i}.B`, "Höhe", 2, 11, 0.5, "cm", a.out ? "Ragt aus dem Elektrolyt, nur der nasse Teil zählt." : ""),
      { t: "r", k: `D.${i}`, label: "Abstand zum Werkstück", min: +a.Dmin.toFixed(1), max: +a.Dmax.toFixed(1), step: 0.1, unit: "cm", hint: "Die Anode rückt dabei von der Wand weg zur Mitte.",
        get: () => +layout().an[i].D.toFixed(1), set: v => { const L = layout().an[i]; S.an[i].gap = clamp(L.gap + (L.D - v), 0, L.gapMax); } },
      R(`an.${i}.z`, "Position entlang der Länge", -11, 11, 0.5, "cm", "0 = Mitte des Behälters"),
      R(`an.${i}.y0`, "Höhe über dem Boden", 0.3, 9, 0.1, "cm"),
      { t: "s", k: "guard", label: "Schutz um die Anoden", opts: Object.entries(GUARDS) }
    ];
  };
}
const PARTS = {
  werk: { n: "Werkstück", intro: "Das lackierte Stück am Draht. Mit der Maus ziehen, um es entlang der Länge oder in der Tiefe zu verschieben.",
    ctrls: o => [
      { t: "s", k: "piece", label: "Art des Stücks", opts: Object.entries(PIECES).map(([k, p]) => [k, p.n]) },
      R("size", "Größe (Höhe)", 1, Math.min(10, +(o.g.hL - 0.5).toFixed(1)), 0.1, "cm", `Fläche pro Seite ca. ${nf(o.area, 1)} cm²`),
      ...(o.pc.solid ? [] : [{ t: "s", k: "sides", label: "Beschichtet", opts: [[2, "beidseitig"], [1, "einseitig"]] }]),
      R("n", "Anzahl Stücke am Stab", 1, 6, 1, "Stk"),
      R("depth", "Abstand Oberkante bis Badspiegel", 0, +o.g.depthMax.toFixed(1), 0.1, "cm"),
      R("pz", "Position entlang der Länge", -11, 11, 0.5, "cm", "0 = Mitte des Behälters"),
      { t: "s", k: "jewel", label: "Verwendung (Zielschicht)", opts: Object.entries(JEWELS).map(([k, v]) => [k, v[0]]) },
      { t: "b", id: "hang2", label: "Werkstück neu einhängen" }
    ],
    facts: o => fl([["Fläche gesamt", nf(o.Apc * o.g.n, 1) + " cm²"], ["Abstand zu Anode 1", o.g.an[0].on ? nf(o.g.an[0].D, 1) + " cm" : "–"], ["Abstand zu Anode 2", o.g.an[1].on ? nf(o.g.an[1].D, 1) + " cm" : "–"], ["Kupfer pro Stück", nf(o.mPiece, 1) + " g"]]) },
  an0: { n: "Anode 1 (links)", intro: "Kupfer-Reststück, 0,5 cm dick, in der Lochbox an der linken Wand. Mit der Maus ziehen zum Verschieben.", ctrls: anodeCtrls(0), facts: o => anodeFacts(o, 0) },
  an1: { n: "Anode 2 (rechts)", intro: "Kupfer-Reststück, 0,5 cm dick, in der Lochbox an der rechten Wand. Mit der Maus ziehen zum Verschieben.", ctrls: anodeCtrls(1), facts: o => anodeFacts(o, 1) },
  netz: { n: "Netzgerät RUZIZAO SPS-W3010", intro: "Der Strom wird fest eingestellt (Konstantstrom). Die Spannung stellt sich selbst ein.",
    ctrls: o => [R("I", "Stromstärke", 0.05, 3, 0.01, "A"), R("t", "Badzeit", 1, 72, 0.5, "h"),
      { t: "c", k: "ramp", label: "Strom am Anfang langsam hochfahren" },
      { t: "b", id: "autoI", label: `Strom passend zur Fläche: ${nf(o.iRec, 2)} A` }],
    facts: o => fl([["Spannung (ca.)", nf(o.U, 1) + " V"], ["Stromdichte Werkstück", nf(o.j, 2) + " A/dm²"], ["Leistung", nf(o.U * o.I, 1) + " W"], ["Kupfer abgeschieden", nf(o.m, 1) + " g"]]) },
  bad: { n: "Elektrolyt", intro: "Alle Mengen pro 1 Liter, unten auf die Füllmenge hochgerechnet.",
    ctrls: o => [R("V", "Füllmenge", 1, 4, 0.1, "L", `Füllhöhe ${nf(o.g.hL, 1)} cm`), R("cuso4", "Kupfersulfat pro Liter", 100, 260, 5, "g"),
      R("acid15", "Schwefelsäure 15 % pro Liter", 0, 500, 5, "ml"), R("nacl", "Kochsalz pro Liter", 0, 0.3, 0.01, "g"),
      R("bright", "Glanzzusatz Tifoo pro Liter", 0, 10, 0.5, "ml"), R("evap", "Verdunstet seit dem Ansetzen", 0, 40, 1, "%"),
      { t: "c", k: "agit", label: "Luftsprudler (Bewegung im Bad)" }],
    facts: o => fl([["Für " + nf(S.V, 1) + " L: Kupfersulfat", nf(S.cuso4 * S.V) + " g"], ["Schwefelsäure 15 %", nf(S.acid15 * S.V) + " ml"], ["oder 96 %", nf(o.acid96 * S.V, 0) + " ml"], ["Glanzzusatz", nf(S.bright * S.V, 1) + " ml"], ["Säure im Bad", nf(o.acidEff, 0) + " g/L"], ["Chlorid", nf(o.cl, 0) + " mg/L"]]) },
  heiz: { n: "Heizstab", intro: "Aquarium-Heizstab aus Glas, schwarz, am Rand des Behälters.",
    ctrls: o => [R("T", "Badtemperatur", 14, 35, 0.5, "°C")],
    facts: o => fl([["Grenzstromdichte", nf(o.jMax, 1) + " A/dm²"], ["Leitfähigkeit", nf(o.kappa, 2) + " S/cm"], ["Kristallgefahr", o.crys ? "ja" : "nein"]]) },
  stab: { n: "Kathodenstäbe (Minuspol)", intro: "Kupferstäbe der Länge nach über der Mitte, sie liegen auf dem Rand auf.",
    ctrls: o => [{ t: "s", k: "rods", label: "Anzahl Stäbe", opts: [[2, "2 Stäbe"], [3, "3 Stäbe"]] },
      { t: "s", k: "rod", label: "Werkstück hängt am Stab", opts: (S.rods === 3 ? ["links", "Mitte", "rechts"] : ["links", "rechts"]).map((n, i) => [i, n]) }],
    facts: o => fl([["Abstand zu Anode 1", o.g.an[0].on ? nf(o.g.an[0].D, 1) + " cm" : "–"], ["Abstand zu Anode 2", o.g.an[1].on ? nf(o.g.an[1].D, 1) + " cm" : "–"]]) },
  draht: { n: "Aufhängedraht", intro: "Dünner Kupferdraht vom Stab zum Werkstück.",
    ctrls: o => [R("wireD", "Drahtdicke", 0.2, 2, 0.1, "mm"), { t: "c", k: "wireIso", label: "Draht unter dem Badspiegel isoliert" }],
    facts: o => fl([["Draht im Bad", nf(o.wireImm * o.g.n, 1) + " cm"], ["Blanke Drahtfläche", nf(o.Aw, 2) + " cm²"], ["Anteil am Strom", nf(o.A > 0 ? o.Aw / o.A * 100 : 0, 0) + " %"]]) }
};
function fl(rows) { return rows.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join(""); }
function anodeFacts(o, i) {
  const a = o.g.an[i];
  if (!a.on) return fl([["Status", "nicht im Bad"]]);
  const share = o.ws > 0 ? (i ? o.w1 : o.w0) / o.ws : 0;
  return fl([["Fläche im Elektrolyt", nf(a.Aimm, 0) + " cm²"], ["Abstand zum Werkstück", nf(a.D, 1) + " cm"], ["Anteil am Strom", nf(share * 100, 0) + " %"], ["Gegenüber vom Werkstück", nf(a.cover * 100, 0) + " %"], ["Anoden-Stromdichte", nf(o.jA, 2) + " A/dm²"]]);
}

function buildParts() {
  $("parts").innerHTML = Object.keys(PARTS).map(k => `<button data-part="${k}" aria-pressed="${k === sel}">${NAMES[k]}</button>`).join("");
  $("parts").querySelectorAll("button").forEach(b => b.addEventListener("click", () => select(b.dataset.part)));
}
function buildEditor() {
  const p = PARTS[sel], o = O || model();
  $("edTitle").textContent = p.n; $("edIntro").textContent = p.intro;
  $("parts").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.part === sel));
  const cs = p.ctrls(o); buildEditor.cs = cs;
  $("edCtrls").innerHTML = cs.map((c, ix) => {
    const hint = c.hint ? `<small id="h_${ix}">${c.hint}</small>` : `<small id="h_${ix}"></small>`;
    if (c.t === "r") return `<div class="ctrl"><label for="c${ix}r">${c.label}</label><div class="rowc"><input type="range" id="c${ix}r" data-ix="${ix}" min="${c.min}" max="${c.max}" step="${c.step}"><span class="num"><input type="number" id="c${ix}n" data-ix="${ix}" min="${c.min}" max="${c.max}" step="${c.step}" aria-label="${c.label} in ${c.unit}"><span class="unit">${c.unit}</span></span></div>${hint}</div>`;
    if (c.t === "s") return `<div class="ctrl"><label class="lbl" for="c${ix}s">${c.label}</label><select id="c${ix}s" data-ix="${ix}">${c.opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>${hint}</div>`;
    if (c.t === "c") return `<div class="ctrl tog"><input type="checkbox" id="c${ix}c" data-ix="${ix}"><label for="c${ix}c">${c.label}</label></div>`;
    return `<div class="ctrl"><button type="button" id="${c.id}">${c.label}</button></div>`;
  }).join("");
  syncInputs();
  $("edCtrls").querySelectorAll("[data-ix]").forEach(el => {
    const c = cs[+el.dataset.ix];
    const set = v => c.set ? c.set(v) : setK(c.k, v);
    if (el.type === "checkbox") el.addEventListener("change", () => { set(el.checked); update(true); });
    else if (el.tagName === "SELECT") el.addEventListener("change", () => {
      const v = isNaN(+el.value) ? el.value : +el.value; set(v);
      if (c.k === "piece") { S.size = PIECES[v].h; startHang(); }
      if (c.k === "rods") S.rod = Math.min(S.rod, S.rods - 1);
      update(true);
    });
    else if (el.type === "range") el.addEventListener("input", () => { set(+el.value); update(false, el); });
    else {
      el.addEventListener("input", () => { const v = parseFloat(String(el.value).replace(",", ".")); if (!isFinite(v)) return; set(clamp(v, +el.min, +el.max)); update(false, el); });
      el.addEventListener("change", () => syncInputs());
    }
  });
  const ai = $("autoI"); if (ai) ai.addEventListener("click", () => { S.I = Math.round(model().iRec * 100) / 100; update(true); });
  const h2 = $("hang2"); if (h2) h2.addEventListener("click", startHang);
  $("edFacts").innerHTML = p.facts(o);
}
function syncInputs(skip) {
  const cs = buildEditor.cs || [];
  $("edCtrls").querySelectorAll("[data-ix]").forEach(el => {
    if (el === skip) return;
    const c = cs[+el.dataset.ix];
    const v = c.get ? c.get() : getK(c.k);
    if (el.type === "checkbox") el.checked = !!v; else el.value = typeof v === "number" ? +v.toFixed(2) : v;
  });
}
function refreshRanges(o) {
  // Grenzen, die von der Geometrie abhängen, ohne den Editor neu aufzubauen
  const fresh = PARTS[sel].ctrls(o), cs = buildEditor.cs || [];
  fresh.forEach((c, ix) => {
    if (c.t !== "r" || !cs[ix]) return;
    for (const s of ["r", "n"]) { const el = $(`c${ix}${s}`); if (el && document.activeElement !== el) { el.min = c.min; el.max = c.max; } }
    const h = $(`h_${ix}`); if (h) h.textContent = c.hint || "";
  });
}
function select(k) { sel = k; buildEditor(); build(O); }

/* ---------- Ergebnis ---------- */
function diagnose(o) {
  const L = [];
  const kante = o.locs[0], vert = o.locs[o.locs.length - 1];
  if (!o.act.length) { L.push(["bad", "<b>Keine Anode im Elektrolyt.</b> Ohne Anode fließt kein Strom."]); return L; }
  if (o.r > 1) L.push(["bad", `<b>Strom zu hoch für die Fläche.</b> ${nf(o.j, 1)} A/dm² liegt über der Grenze von ${nf(o.jMax, 1)}. Passend wären ca. ${nf(o.iRec, 2)} A.`]);
  else if (o.j > 2) L.push(["warn", `<b>Stromdichte hoch:</b> ${nf(o.j, 1)} A/dm². Für Glanzkupfer sind 1–2 A/dm² üblich, also ca. ${nf(o.iRec, 2)} A.`]);
  else if (o.j < 1) L.push(["warn", `<b>Stromdichte niedrig:</b> ${nf(o.j, 2)} A/dm². Unter 1 A/dm² wird es eher matt.`]);
  if (kante.s[0] === "bad") L.push(["bad", `<b>Kanten verbrennen:</b> dort ca. ${nf(kante.jl, 1)} A/dm², Grenze ${nf(o.jMax, 1)} A/dm².`]);
  if (vert.s[1] === "matt rosa") L.push(["warn", `<b>Vertiefungen bleiben matt rosa:</b> dort nur ca. ${nf(vert.jl, 2)} A/dm², Glanz braucht mindestens ${nf(o.glossMin, 1)}.`]);
  o.g.an.forEach((a, i) => {
    if (!a.on) return;
    if (a.Aimm <= 0) L.push(["warn", `<b>Anode ${i + 1} liegt über dem Badspiegel</b> und arbeitet nicht.`]);
    else if (a.cover < 0.6) L.push(["warn", `<b>Anode ${i + 1} steht nicht gegenüber:</b> nur ${nf(a.cover * 100, 0)} % des Werkstücks liegen ihr gegenüber. Der Strom kommt schräg, die Ränder zur Anode hin werden dicker.`]);
    if (a.out && a.Aimm > 0) L.push(["warn", `<b>Anode ${i + 1} ragt aus dem Bad.</b> Nur ${nf(a.Aimm, 0)} von ${nf(a.L * a.B, 0)} cm² arbeiten.`]);
    if (a.D < 3) L.push(["warn", `<b>Anode ${i + 1} sehr nah:</b> ${nf(a.D, 1)} cm. Empfohlen 5–6 cm.`]);
  });
  if (o.act.length === 2 && o.sides === 2 && Math.abs(o.fL - o.fR) > 0.25) L.push(["warn", `<b>Seiten ungleich:</b> links ${nf(o.fL * 100, 0)} %, rechts ${nf(o.fR * 100, 0)} % der mittleren Dicke. Abstände angleichen oder Stück nach der halben Zeit umdrehen.`]);
  if (o.act.length === 1 && o.sides === 2) L.push(["warn", "<b>Nur eine Anode:</b> Die abgewandte Seite wird dünner. Nach der halben Zeit umdrehen."]);
  if (o.cl < 20) L.push(["warn", "<b>Kein Chlorid:</b> Der Glanzzusatz wirkt schlechter, Kanten brennen früher. Vorschlag 0,1 g Kochsalz pro Liter."]);
  if (o.acidG < 45) L.push(["warn", `<b>Wenig Säure:</b> ${nf(o.acidG, 0)} g/L. Üblich sind 50–70 g/L, mit weniger Säure verteilt sich der Strom ungleicher.`]);
  if (!S.ramp) L.push(["warn", "<b>Kein Hochfahren:</b> Am Anfang fließt der Strom nur über Öse und Draht und brennt dort an. Erst ¼ des Stroms für 30–60 min."]);
  if (S.guard === "none") L.push(["warn", "<b>Kein Anodenschutz:</b> Anodenschlamm macht das Bad trüb und gibt raue Knötchen."]);
  else if (S.guard === "box") L.push(["warn", "<b>Lochbox statt Beutel:</b> Grober Schlamm bleibt drin, feine dunkle Partikel kommen durch (auf deinen Fotos am Boden). Ein PP-Beutel in der Box hält sie zurück."]);
  if (o.A > o.Aeff / 2 || o.jA > 2) L.push(["warn", `<b>Anode knapp:</b> Werkstück ${nf(o.A, 0)} cm², Anode wirksam ${nf(o.Aeff, 0)} cm². Die Anode sollte doppelt so groß sein.`]);
  if (S.T < 18) L.push(["warn", "<b>Bad zu kalt:</b> Unter 18 °C kristallisiert Kupfersulfat aus, an Boden und Anode."]);
  else if (S.T > 30) L.push(["bad", "<b>Bad zu warm:</b> Über 30 °C zersetzt sich der Glanzzusatz schneller."]);
  if (o.cuEff > 240 || o.acidEff > 90) L.push(["warn", `<b>Kristalle:</b> Durch Verdunstung sind es jetzt ca. ${nf(o.cuEff, 0)} g/L Kupfersulfat. Das erklärt die blauen Kristalle an Wand und Deckel. Mit destilliertem Wasser auffüllen.`]);
  if (!L.length) L.push(["good", "<b>Aufbau passt.</b> Kanten und Vertiefungen liegen im Glanzbereich."]);
  return L.sort((a, b) => (a[0] === "bad" ? 0 : 1) - (b[0] === "bad" ? 0 : 1));
}
function renderResults(o) {
  const flat = o.locs[1];
  $("dMain").textContent = nf(flat.dd, flat.dd < 10 ? 1 : 0);
  $("dSub").textContent = "= " + nf(flat.dd / 1000, 3) + " mm nach " + fmtH(S.t) + " bei " + nf(o.I, 2) + " A";
  $("mJ").textContent = nf(o.j, 2) + " A/dm²";
  $("mU").textContent = nf(o.U, 1) + " V";
  $("mM").textContent = nf(o.m, 1) + " g";
  $("mP").textContent = nf(o.mPiece, 1) + " g";
  $("mT").textContent = o.jn.split(",")[0] + ", " + nf(o.tLo / 1000, 2) + "–" + nf(o.tHi / 1000, 2) + " mm";
  $("mTT").textContent = fmtH(o.tTgt);
  $("locTbl").innerHTML = `<thead><tr><th>Stelle</th><th class="n">A/dm²</th><th class="n">Dicke</th><th>Aussehen</th></tr></thead><tbody>` +
    o.locs.map(l => `<tr><td>${l.n}</td><td class="n">${nf(l.jl, 2)}</td><td class="n">${nf(l.dd)} µm</td><td><span class="chip ${l.s[0]}">${l.s[1]}</span></td></tr>`).join("") + "</tbody>";
  $("diag").innerHTML = diagnose(o).map(([c, t]) => `<li class="${c}">${t}</li>`).join("");
  $("formula").textContent = `d = I·t·η·M / (z·F·ρ·A) = ${nf(o.I, 2)} A · ${nf(S.t * 3600)} s · ${nf(o.eta, 2)} · 63,55 g/mol / (2 · 96 485 C/mol · 8,96 g/cm³ · ${nf(o.A, 1)} cm²) = ${nf(o.d, 1)} µm im Durchschnitt`;
}

function update(rebuild, skip) {
  O = model();
  build(O); renderResults(O);
  if (rebuild) { buildEditor(); return; }
  refreshRanges(O); syncInputs(skip);
  $("edFacts").innerHTML = PARTS[sel].facts(O);
}

function preset(p, btn) {
  S = copy(IST); Object.assign(S, copy(p));
  if (p === VOR) {
    const o = model();
    S.I = Math.round(o.iRec * 100) / 100;
    S.t = Math.ceil(o.tgt / (13.2 * 1.5 * 0.98) * 2) / 2;
  }
  $("pIst").setAttribute("aria-pressed", btn === "pIst"); $("pVor").setAttribute("aria-pressed", btn === "pVor");
  update(true);
}
$("pIst").addEventListener("click", () => preset({}, "pIst"));
$("pVor").addEventListener("click", () => preset(VOR, "pVor"));
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));

/* ---------- Einhängen mit Nagellack-Hinweis ---------- */
const toast = $("toast");
function startHang() {
  hangAnim = { t0: performance.now(), lift: TH + 3 - (layout().yTop - layout().h) };
  toast.classList.add("on");
  $("tIso").textContent = S.wireIso ? "Ist schon isoliert" : "Draht ist isoliert";
}
$("hang").addEventListener("click", () => { startHang(); update(); });
$("tIso").addEventListener("click", () => { S.wireIso = true; toast.classList.remove("on"); update(true); });
$("tNo").addEventListener("click", () => { toast.classList.remove("on"); });

/* ---------- Schleife ---------- */
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / Math.max(1, h); camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (camAnim) {
    const t = clamp((now - camAnim.t0) / 700, 0, 1), e = t * t * (3 - 2 * t);
    camera.position.lerpVectors(camAnim.from, camAnim.to, e); controls.target.lerpVectors(camAnim.ff, camAnim.tf, e);
    if (t >= 1) camAnim = null;
  }
  if (hangAnim) {
    const t = clamp((now - hangAnim.t0) / 1800, 0, 1), e = 1 - Math.pow(1 - t, 3);
    const L0 = hangAnim.L0 ?? (hangAnim.L0 = hangAnim.lift);
    hangAnim.lift = L0 * (1 - e);
    build(O);
    if (t >= 1) { hangAnim = null; build(O); }
  }
  // Ionen wandern von den Anoden zum Werkstück
  const speed = 0.12 + 0.5 * clamp(O.j / 2, 0, 2);
  const arr = ionGeo.attributes.position.array;
  ionState.forEach((q, i) => {
    if (!q.on || hangAnim) { arr[i * 3 + 1] = -100; return; }
    q.p += dt * speed * (0.6 + 0.8 * ((i * 7919) % 100) / 100);
    if (q.p >= 1) respawn(q, false);
    const s = Math.sin(q.p * Math.PI);
    arr[i * 3] = q.a.x + (q.b.x - q.a.x) * q.p;
    arr[i * 3 + 1] = q.a.y + (q.b.y - q.a.y) * q.p + Math.sin(q.wob + q.p * 6) * 0.25 * s;
    arr[i * 3 + 2] = q.a.z + (q.b.z - q.a.z) * q.p + Math.cos(q.wob + q.p * 5) * 0.35 * s;
  });
  ionGeo.attributes.position.needsUpdate = true;
  const ba = bubGeo.attributes.position.array;
  bubState.forEach((b, i) => {
    if (!S.agit) { ba[i * 3 + 1] = -100; return; }
    b.y += dt * b.s; if (b.y > G.hL) b.y = 0.2;
    ba[i * 3] = b.x + Math.sin(b.y * 3 + i) * 0.1; ba[i * 3 + 1] = b.y; ba[i * 3 + 2] = b.z;
  });
  bubGeo.attributes.position.needsUpdate = true;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

buildParts();
O = model();
resize();
update(true);
setView("schraeg");
requestAnimationFrame(frame);
window.__app = { S, update, model: () => O, select, setView, startHang };
