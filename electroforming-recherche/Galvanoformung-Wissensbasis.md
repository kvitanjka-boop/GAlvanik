# Galvanoformung (Electroforming) mit Kupfer – Wissensbasis

*Recherche vom 25.10.2026 für Jojo, am selben Tag gegen die Originalquellen nachgeprüft und korrigiert (siehe Kapitel 15). Quellen sind am Ende jedes Abschnitts und gesammelt in Kapitel 14 verlinkt. Wo ich selbst gerechnet oder etwas gefolgert habe, steht das ausdrücklich dabei („eigene Rechnung“, „Einschätzung“).*

---

## 0. Das Wichtigste zuerst: was das für deinen Aufbau bedeutet

Ich habe deine 14 bisherigen Chats gelesen (Säurebad 3–3,5 L, 200 g/L Kupfersulfat, 180–200 ml/L 15 %ige Schwefelsäure, Tifoo-Glanzzusatz 4 ml/L, vorverkupferte Blätter, Problem „mattrosa in den Vertiefungen“, später „bräunlich verbrannt“). Im Vergleich mit den Fachquellen fallen fünf Punkte auf:

| # | Dein Stand | Was die Quellen sagen | Einschätzung |
|---|---|---|---|
| 1 | **Kein Chlorid** im Bad (eigene Mischung mit destilliertem Wasser, keine Salzsäure/Salz – *Annahme aus den Chats; falls du doch Tifoo-Fertigelektrolyt verwendest, gilt das nicht sicher*) | Glanz-Kupferbäder brauchen **40–100 mg/L Chlorid** (meist 60–70 mg/L). Zu wenig Chlorid → kein Glanz, raue Schichten, Anbrennen | **Wahrscheinlich ein Hauptgrund** für „mattrosa“ (Think & Tinker: unter 20 ppm Chlorid wird die Schicht matt). Belegt ist das für Industrie-Glanzsysteme; ob der Tifoo-Zusatz genauso reagiert, sagt Tifoo nicht. |
| 2 | Schwefelsäure ca. **30–33 g/L** (200 ml × 15 %) | Üblich für Formung/Glanz: **50–75 g/L** | Zu wenig Säure → schlechtere Leitfähigkeit und Streufähigkeit, Vertiefungen bleiben matt, Kanten brennen schneller an. |
| 3 | 0,56–0,8 A auf ein 6×6-cm-Blatt (beidseitig 72 cm²) = **0,8–1,1 A/dm²** | Tifoo-Glanzkupfer: **1–2 A/dm²** nötig für Glanz | An der Untergrenze. In Vertiefungen kommt nur ein Bruchteil davon an → dort matt. |
| 4 | Abstand Anode–Werkstück **1 cm** (Okt.), vorher 5–7 cm | Industrie 15–30 cm; Hobby mindestens einige cm, Anodenfläche ≥ 2× Werkstückfläche | 1 cm ist viel zu nah: Kanten und Spitzen ziehen den Strom → dort Anbrennen (bräunlich), Mulden bekommen fast nichts. |
| 5 | ein „sauberes Kupferstück“ als Anode (laut Chat), beim 1-cm-Versuch nur auf einer Seite; keine Anodenbeutel, kaum Badbewegung | **Phosphorhaltige Kupferanoden (0,03–0,08 % P je nach Quelle)** in PP-Beuteln, Werkstückbewegung oder Luft, Filtration | Reines Kupfer/Schrott bildet Schlamm und Partikel → Rauigkeit, Glanzzusatz-Verbrauch. |

**Konkrete Vorschläge (Reihenfolge = Wirkung):**

1. **Chlorid zugeben:** pro Liter ca. **0,1 g Kochsalz** (jodfrei) oder ca. **0,16 ml Salzsäure 33 %**. Für 3,5 L also ~0,35 g NaCl. Nicht mehr – zu viel Chlorid lässt sich nur durch Verdünnen wieder senken. *(eigene Rechnung für 60 mg/L Cl⁻)*
2. **Säure anheben** auf ~55–60 g/L. Für dein **bestehendes 3,5-L-Bad**: mit Batteriesäure 37 % ca. **210 ml** zugeben (Kupfersulfat sinkt dabei nur leicht auf ~190 g/L). Mit deiner 15 %igen Säure bräuchtest du ~820 ml, das verdünnt das Kupfer auf ~160 g/L – daher lieber Batteriesäure. Für ein **neues** Bad: ca. 130 ml Batteriesäure 37 % pro Liter. *(eigene Rechnung mit Dichten 1,10 bzw. 1,28 g/ml; vorher an einer kleinen Probe testen)*
3. **Abstand 5–10 cm**, Anoden auf **beiden Seiten**, Anodenfläche mindestens doppelt so groß wie die Blattfläche. Blatt alle 15–30 min drehen/umhängen.
4. **Stromdichte 1,5–2 A/dm²** fürs Glanzen (bei 72 cm² ≈ 1,1–1,4 A), die ersten 1–2 Minuten etwas höher, dann absenken. Bei Anbrennen 20 % runter.
5. **Badbewegung** (Werkstück bewegen, Aquarium-Luftsprudler oder deine Schlauchpumpe) – ohne Bewegung verarmt das Bad an der Oberfläche.
6. **Test mit einer Münze** (Gateros-„10p-Test“): blanke, gereinigte Münze 10 min beschichten (Gateros nennt dafür keine Stromdichte; ich würde 1,5 A/dm² nehmen). Wird sie glänzend, ist das Bad in Ordnung und das Problem liegt am Werkstück (Vorbehandlung, Leitlack). Bleibt sie mattrosa, liegt es am Bad.

Quellen: [Jentner Kupferbad sauer JE540 (PDF)](https://cdn.jentner-plating.com/media/16/10/a3/1713269217/Kupferbad-sauer_PBde_1270000_DEU.pdf), [Tifoo Glanzkupfer-Anleitung (PDF)](https://www.tifoo.de/media/e2/be/68/1695107912/de_anleitung_01-10.pdf), [Gateros Electroforming Tutorial](https://www.gaterosplating.co.uk/electroforming-support), [Think & Tinker Troubleshooting](https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm), [Copper Gleam 2001 TDS (PDF)](https://insulectro.com/wp-content/uploads/2021/10/Copper-Gleam-2001-Acid-Copper.pdf)

---

## 1. Was ist Galvanoformung?

**Galvanisieren / Verkupfern** = eine dünne Metallschicht (wenige µm) auf einen Gegenstand, der danach der Träger bleibt.
**Galvanoformung (Galvanoplastik, Electroforming)** = so viel Metall abscheiden (meist 0,1 mm bis mehrere mm), dass die Metallschicht **selbst tragfähig** ist. Das Modell (der „Kern“, englisch *mandrel*) bleibt entweder drin (Blatt, Muschel, Stein) oder wird danach entfernt (Wachs, niedrigschmelzende Legierung, 3D-Druck).

Typische Anwendungen: Schmuck aus Naturobjekten (Blätter, Rinde, Physalis, Muscheln), Hohlformen, Kunst/Skulptur, Repliken, Präzisionsteile (Düsen, Wellenleiter, Formen) in der Industrie.

Das Prinzip ist identisch mit dem Verkupfern: Kupfer-Anode (+) löst sich, Kupfer-Ionen wandern durch den Elektrolyten und scheiden sich am Werkstück (−, Kathode) ab. Der Unterschied liegt in **Zeit, Dicke, Badpflege und Spannungsarmut** der Schicht.

Quellen: [Skyjems – Encyclopedia Electroforming](https://skyjems.ca/pages/encyclopedia-electroforming), [Spektrum Lexikon „Verkupfern“](https://www.spektrum.de/lexikon/chemie/verkupfern/9741)

---

## 2. Physik: wie schnell wächst das Kupfer? (Faraday)

Kupfer aus saurem Bad (Cu²⁺): **1,186 g pro Amperestunde**, Stromausbeute fast 100 %.

Daraus *(eigene Rechnung, Dichte 8,96 g/cm³)*:

| Stromdichte | Zuwachs pro Stunde | für 0,1 mm | für 0,2 mm | für 0,3 mm |
|---|---|---|---|---|
| 0,5 A/dm² | ~6,6 µm | 15 h | 30 h | 45 h |
| 1 A/dm² | ~13 µm | 7,5 h | 15 h | 23 h |
| 1,5 A/dm² | ~20 µm | 5 h | 10 h | 15 h |
| 2 A/dm² | ~26 µm | 3,8 h | 7,5 h | 11 h |
| 3 A/dm² | ~40 µm | 2,5 h | 5 h | 7,5 h |

Das stimmt mit Jentner überein („ca. 1 µm/min bei 5 A/dm²“). **Tifoos Angabe „ca. 60 µm/h“ bei 1–2 A/dm² ist physikalisch zu hoch** – rechne lieber mit 13–26 µm/h.

**Faustformeln:**
- Strom (A) = Fläche (dm²) × Stromdichte (A/dm²). 1 dm² = 100 cm².
- Fläche immer **beidseitig** und inklusive Draht/Stiel rechnen.
- Blattfläche schätzen: Umriss auf Karopapier zeichnen, Kästchen zählen, × 2 (beide Seiten). Ein Blatt 6 × 2,5 cm hat grob 10 cm² pro Seite, also ~20 cm² gesamt *(Einschätzung: Blattform ≈ 65–70 % des Rechtecks)*.

**Umrechnung amerikanischer Angaben** (die meisten Hobby-Anleitungen):
- 1 A/in² = 15,5 A/dm² · 0,1 A/in² = **1,55 A/dm²** · 0,05 A/in² = **0,78 A/dm²**
- 10–30 ASF (A pro Quadratfuß) = **1,1–3,2 A/dm²**

Quellen: [Jentner JE540](https://jentner-plating.com/en/Plating-Electrolytes/Non-Precious-Metal-Electrolyte/Copper-baths), [Tifoo-Anleitung](https://www.tifoo.de/media/e2/be/68/1695107912/de_anleitung_01-10.pdf), [finishing.com – Electroplating Math](https://finishingandcoating.com/index.php/plating/2347-electroplating-math)

---

## 3. Der Elektrolyt: saures Kupferbad

### 3.1 Bestandteile und ihre Aufgabe

| Bestandteil | Aufgabe | Zu wenig | Zu viel |
|---|---|---|---|
| **Kupfersulfat-Pentahydrat** (CuSO₄·5H₂O) | liefert Kupfer | Anbrennen an Kanten | Vertiefungen matt, Kristalle fallen aus (besonders bei Kälte) |
| **Schwefelsäure** (H₂SO₄) | Leitfähigkeit, Streufähigkeit, löst Anode gleichmäßig | Anbrennen, schlechte Streuung, matte Mulden | Anode passiviert, Kupfersulfat kristallisiert aus |
| **Chlorid** (aus HCl oder NaCl) | aktiviert die Glanzzusätze, gleichmäßige Anodenauflösung | kein Glanz, rau, Anbrennen, Pitting | grauer Film auf der Anode, Schlamm, weniger Einebnung |
| **Glanzzusatz / Brightener** (organisch, meist geheim) | feinkörnige, glatte, glänzende Schicht; verhindert „Bäumchen“ (Dendriten) | matt, lachsrosa, rau | spröde Schicht, Dendriten |

Faustregel: **Kupfersulfat + Schwefelsäure zusammen nicht über 300 g/L** ([PF Online, Hull Cell Teil II](https://pfonline.com/articles/the-hull-cell-key-to-better-electroplating-part-ii)).

### 3.2 Rezepturen im Vergleich (umgerechnet auf 1 Liter)

| Quelle | CuSO₄·5H₂O | H₂SO₄ | Chlorid | Zusatz | Stromdichte | Temp. |
|---|---|---|---|---|---|---|
| **Jentner JE540** (Industrie, Glanz) | ~220 g (= 55 g/L Cu) | 60 g (55–75) | 70 mg (50–100) | fertig angesetzt | 1–6 A/dm² | 20–27 °C |
| **Mickelson-Standard** (Kunst-Electroforming, r/Electroforming) | ~240 g | ~32 ml (Konzentration nicht angegeben; falls konzentriert ≈ 56 g) | – (nicht genannt) | ~2,6 ml/L | 0,01 A/in² ≈ 0,16 A/dm² (deutlich niedriger als alle anderen Quellen) | — |
| **Think & Tinker** (Hobby/Platinen) | 75 g | ~286 ml Batteriesäure 35 % (≈ 120 g) | ~0,13–0,17 ml HCl 35 % (60–75 mg) | Copper Gleam | 1,1–3,2 A/dm² | Raumtemp. |
| **Copper Gleam 2001** (Glanz, Leiterplatte) | 75 g | 175 g | 60 mg (40–80) | Carrier 10 ml + Additiv 1 ml | 1,5–3 A/dm² | 21–27 °C |
| **Tifoo Glanzkupfer** (Fertigbad) | nicht veröffentlicht (nur Tifoos *Kupferelektrolyt sauer* nennt 10–<20 % Kupfersulfat) | nicht veröffentlicht (Kupferelektrolyt sauer: 1–<5 %) | nicht genannt | 4 ml/L Glanzzusatz | 1–2 A/dm² | — |
| **Dein Bad** | 200 g ✓ | ~30–33 g ⚠ | **0** ⚠ | Tifoo 4 ml/L | 0,8–1,1 A/dm² ⚠ | Raumtemp. |

Für **Galvanoformung** (dicke Schichten) nimmt man die „hoch-Kupfer“-Variante (200–250 g/L Kupfersulfat, 50–75 g/L Säure). Die „hoch-Säure“-Varianten (Copper Gleam, Think & Tinker) sind für Leiterplatten mit Bohrlöchern optimiert.

**Mein Rezeptvorschlag für 1 L neues Formungsbad** *(abgeleitet aus Jentner + Mickelson; eigene Rechnung)*:
- 700–750 ml destilliertes Wasser (lauwarm, ~40 °C)
- **≈130 ml Batteriesäure 37 %** langsam einrühren (≈ 60 g/L H₂SO₄) – immer **Säure ins Wasser**
- **210–220 g Kupfersulfat-Pentahydrat** lösen
- **0,1 g Kochsalz** oder **0,16 ml Salzsäure 33 %** (≈ 60 mg/L Chlorid)
- auf 1 L auffüllen, abkühlen lassen, filtrieren
- Glanzzusatz nach Herstellerangabe (Tifoo: 4 ml/L)

> Hinweis zum Tifoo-Glanzzusatz: Er ist auf Tifoos eigenen Glanzkupferelektrolyten abgestimmt. Ob dieser Chlorid enthält, steht weder in der Anleitung noch im Sicherheitsdatenblatt – eine kurze Mail an Tifoo (tifoo@marawe.de) klärt das. Alle Industrie-Glanzsysteme, die ich gefunden habe, brauchen Chlorid.

### 3.3 Ansetzen – Reihenfolge und Fehler

1. Gefäß aus PP, PE, PVC oder Glas (Jentner: PPH/PP/PE).
2. Wasser vorlegen, **Säure langsam ins Wasser** (nie umgekehrt – Spritzgefahr).
3. Kupfersulfat lösen (warmes Wasser hilft; Think & Tinker heizt auf 49 °C).
4. Chlorid in kleinen Schritten.
5. Abkühlen lassen auf 20–27 °C, filtrieren.
6. **„Einarbeiten“**: ein frisches Bad läuft oft erst nach einigen Amperestunden optimal. Ein Stück Kupferblech 1–2 h bei niedriger Stromdichte (0,3–0,5 A/dm²) beschichten („Dummy-Plating“) *(Einschätzung aus Industriepraxis)*.

**Kristalle am Boden** = Bad zu konzentriert oder zu kalt. Etwas erwärmen und mit destilliertem Wasser verdünnen.

Quellen: [Jentner JE540](https://cdn.jentner-plating.com/media/16/10/a3/1713269217/Kupferbad-sauer_PBde_1270000_DEU.pdf), [r/Electroforming Wiki](https://axebps-redlib.hf.space/r/Electroforming/wiki), [Think & Tinker Rezept](https://www.thinktink.com/stack/volumes/voliii/consumbl/cplatmix.htm), [Copper Gleam TDS](https://insulectro.com/wp-content/uploads/2021/10/Copper-Gleam-2001-Acid-Copper.pdf), [Tifoo SDB](https://blog.zhdk.ch/werkstattlehreenglish/files/2023/03/tifoo-glanzkupferelektrolyt-sdb.pdf), [finishing.com Hobby-Diskussion](https://finishing.com/00/85p3.shtml)

---

## 4. Glanzzusatz (Brightener) im Detail

- Glanzzusätze sind organische Verbindungen (Systeme aus „Carrier“, „Brightener“, „Leveler“), deren Rezeptur geheim ist. Sie werden **mit dem Kupfer eingebaut und verbraucht**.
- **Verbrauch nach Amperestunden:**
  - Mickelson/Caswell-Typ: **10 ml pro 40 Ah** (≈ 1 ml pro 5 h bei 1 A)
  - Copper Gleam: 0,1–0,3 ml pro Ah
  - Bei Tifoo nicht angegeben → nach Optik bzw. Münztest nachdosieren.
- **Aktivkohle entfernt Glanzzusatz.** Ein Aktivkohlefilter (z. B. in Haushalts-Wasserfiltern!) zieht den Brightener heraus. Für deine Schlauchpumpen-Filteranlage nur **reine PP-Sedimentkartuschen (1–10 µm)** verwenden, keine Kohle. Think & Tinker rät generell von Haushalts-Wasserfiltern ab, weil viele aus Baumwolle gewickelt sind und von der Säure angegriffen werden.
- Aktivkohle bewusst einsetzen, wenn das Bad organisch verschmutzt ist (nach langem Betrieb, braun-grauer Schlamm, nichts glänzt mehr): danach komplett neu dosieren. Wie gut die Behandlung war, zeigt ein Testblech: **ohne Zusatz scheidet das Bad mattrosa ab** – genau das Bild, das du hattest.
- Kein PEG/Miralax als Ersatz (Enchanted Leaves).
- Umrühren nach Zugabe: ja, kurz und sanft.

Quellen: [r/Electroforming Wiki](https://axebps-redlib.hf.space/r/Electroforming/wiki), [Copper Gleam TDS](https://insulectro.com/wp-content/uploads/2021/10/Copper-Gleam-2001-Acid-Copper.pdf), [Ganoksin Workshop-Notizen](https://www.ganoksin.com/article/notes-electroforming-workshop/), [Enchanted Leaves Tutorial](https://enchantedleaves.com/pages/electroforming-tutorial-free-step-by-step-guide-to-making-copper-electroformed-jewelry-learn-how-to-electroform), [Think & Tinker Troubleshooting](https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm)

---

## 5. Das Modell (Kern / Mandrel)

### 5.1 Zwei Arten

| Art | Beispiele | Besonderheit |
|---|---|---|
| **Bleibender Kern** | Blätter, Rinde, Physalis, Muscheln, Steine, Kristalle, Holz | muss versiegelt werden, sonst „blutet“ er aus (blaue Kristalle Tage später) |
| **Verlorener Kern** | Wachs, niedrigschmelzende Legierung (Cerrolow/Cerroshield), 3D-Druck, Alufolie | nach dem Formen ausschmelzen/auflösen; Schicht muss selbsttragend sein (≥ 0,2–0,3 mm) |

Metallische Kerne aus Kupfer/Messing brauchen keinen Leitlack. **Stahl, Edelstahl, Zink, Zinn-Blei** gehen nicht direkt ins saure Bad (Kupfer haftet nicht/wird zementiert).

Beispiel verlorener Kern (RepRap-Düse): Wachsmodell → Silikonform → Cerroshield-Legierung gegossen → 8 h verkupfert → in kochendem Wasser ausgeschmolzen.

### 5.2 Naturobjekte vorbereiten (Blätter)

1. **Trocknen/stabilisieren:** pressen (1 Woche), bügeln zwischen Backpapier, Silikasand; für biegsame Blätter 1:1 Glycerin/warmes Wasser einige Tage.
2. **Versiegeln:** mehrere dünne Schichten Polyurethan-/Acryllack, Holzversiegler, Haarspray (für zarte Teile als erste Schicht) oder Tauchen. Poröse Stücke besonders dick. **6–24 h aushärten lassen**, sonst reißt der Leitlack.
3. **Draht anbringen** (Kupferdraht, ggf. mit Kleber fixieren), dann **über den Draht mitlackieren**, damit Draht und Lack eine leitende Einheit bilden.

### 5.3 Leitlack – Arten und Startzeit

| Leitlack | Startzeit (bis Kupfer sichtbar) | Bemerkung |
|---|---|---|
| **Silber** | 2–5 min | schnellster, gleichmäßigster Start, teuer |
| **Kupfer** | 15–60 min | Tifoo, eBay-Sprays; oft verdünnen |
| **Nickel** | ähnlich Kupfer | günstig, funktioniert gut |
| **Graphit** | bis 2 h | billig, DIY möglich; dünne Schicht, nur mit dest. Wasser verdünnen |

(Startzeiten: Gateros)

- **Trocknen:** Gateros 24 h bei Raumtemperatur oder 2 h bei 60 °C; Tifoo-Kupferleitlack ~12 h. Kein heißer Föhn (Blasen).
- 2–3 dünne Schichten, 20–25 min Pause dazwischen; die Fläche muss **durchgehend** leitend verbunden sein – Inseln wachsen nicht.
- **DIY-Graphitlack:** 2 TL Graphitpulver + 1 TL Acryl-Glanzlack gründlich mischen; Leitfähigkeit mit Multimeter prüfen (einige hundert Ohm auf einer Linie).
- Prüfen: Multimeter vom Draht zu verschiedenen Stellen – überall muss Durchgang sein.

### 5.4 Deine „vorverkupferten“ Blätter

Wenn du ein bereits verkupfertes Blatt ins Glanzbad gibst:
1. Entfetten (Spülmittel + weiche Bürste, oder Elektroreiniger), gut spülen.
2. **Dekapieren:** 30–60 s in 5–10 % Schwefelsäure (oder Zitronensäure-Lösung), um die Oxidhaut zu entfernen *(Einschätzung; Gateros/Rio Grande empfehlen „pickle“)*.
3. Mit destilliertem Wasser spülen und **sofort mit eingeschaltetem Strom** ins Bad hängen.

Quellen: [Rio Grande / Sherri Haab E3 Duo Anleitung (PDF)](https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf), [Gateros Tutorial](https://www.gaterosplating.co.uk/electroforming-support), [Enchanted Leaves](https://enchantedleaves.com/pages/electroforming-tutorial-free-step-by-step-guide-to-making-copper-electroformed-jewelry-learn-how-to-electroform), [Found by Dawn Teil 1](https://foundbydawn.co.uk/blogs/news/copper-electroforming-part-1), [Ganoksin: Leitende Beschichtungen](https://orchid.ganoksin.com/t/electroforming/1727), [Graphitlack-Rezept (Univ. Washington, DOCX)](https://www.cei.washington.edu/wordpress/wp-content/uploads/2015/09/Graphite-Paint.docx), [RepRap Electroformed Nozzle](https://reprap.org/wiki/Electroformed_Nozzle)

---

## 6. Betriebsparameter

### 6.1 Stromdichte und Strom

| Quelle | Angabe | in A/dm² |
|---|---|---|
| Gateros | 0,05–0,1 A/in², Start 0,05 | 0,8–1,55 |
| Sherri Haab / Rio Grande, Enchanted Leaves, Electroforming Artist | 0,1 A/in² | 1,55 |
| Tifoo Glanzkupfer | 1–2 A/dm² | 1–2 |
| Jentner JE540 | 1–6 A/dm² | 1–6 (mit Bewegung/Filtration) |
| Think & Tinker | 10–30 ASF | 1,1–3,2 |
| r/Electroforming-Wiki (Mickelson) | 0,01 A/in² | 0,16 (Ausreißer) |

**Praxis für Kunst-Electroforming:** **~1–1,5 A/dm²**, Glanzphase bis 2 A/dm².

**Strom-Rampe** (Rio Grande):
- Netzteil im **Konstantstrom-Modus (CC)**, Spannungsbegrenzung (CV) etwa 2–3 V.
- Erste 1–2 Minuten etwas höher (Leitlack schnell schließen), dann auf Zielwert senken.
- Beispiel: 2,5-cm-Anhänger 0,5 A für ein paar Minuten, dann 0,1–0,25 A für einige Stunden. Bei durchgehend 2 A: Kupfer wächst als bröseliger Klumpen am Draht.
- Bei leitlackierten Teilen erst klein anfangen und den Strom mit wachsender Kupferfläche erhöhen.

**Spannung** ergibt sich aus Strom, Fläche, Abstand und Badzusammensetzung. Typisch **0,8–2,5 V** (Jentner), Tifoo 1–1,5 V. Steigt die Spannung bei gleichem Strom stark, ist ein Kontakt schlecht oder die Anode passiviert.

### 6.2 Temperatur

**20–27 °C** (Jentner, Copper Gleam), Hobby 15–30 °C (Gateros). Zu warm → dumpf, rau, rosa, mehr Brightener-Verbrauch; zu kalt → langsam, fleckig, Kristalle. Im Winter Aquariumheizer (Glas, keine Kunststoffteile ins Bad).

### 6.3 Anoden

- **Phosphorhaltiges Kupfer (CuP, „PDO“; Gateros 0,04–0,06 % P, Jentner 0,03–0,06 %, Copper Gleam 0,04–0,08 %)** – bildet einen schwarzen Film, der gleichmäßig löst und wenig Schlamm erzeugt. **Keine Kupferrohre/Schrott**, kein sauerstofffreies Kupfer (Gateros, Think & Tinker).
- Tifoo gibt den P-Gehalt seiner Anode nicht an.
- **Anodenfläche ≥ 2× Werkstückfläche** (1,5–3×).
- **Anodenbeutel** aus Polypropylen (< 10 µm, ideal 1 µm) fangen Schlamm ab.
- Anodenfilm lesen (Think & Tinker): dunkelbraun bis schwarz = normal; hell- bis mittelbraun = zu wenig Chlorid; loser grauer Film = zu viel Chlorid.
- Passivierte (stumpfe, nicht lösende) Anode: mit Stahlwolle abreiben.

### 6.4 Abstand und Geometrie

- Industrie: **15–30 cm** (Copper Gleam). Hobby: mindestens 5–10 cm (ein Forumsteilnehmer auf finishing.com schreibt „mindestens 10 cm“; das ist eine Praxisangabe, keine Norm).
- **Anoden rundum oder beidseitig**, Werkstück mittig.
- Kanten und Spitzen bekommen immer mehr Strom („Kanteneffekt“), Mulden weniger. Bei großem Abstand gleicht sich das besser aus – darum glänzten bei dir nur die Rosenkanten.
- Werkstück darf die Anode nie berühren (Kurzschluss).

### 6.5 Badbewegung

- Ohne Bewegung verarmt das Bad an der Werkstückoberfläche → Anbrennen schon bei kleiner Stromdichte, matte Stellen.
- Optionen: Werkstück alle 15–30 min drehen, **Aquarium-Luftsprudler** (Luft unter dem Werkstück, **nicht unter der Anode**), Magnetrührer, Umwälzung mit Pumpe.

### 6.6 Filtration

- **PP-Kartuschen 1–10 µm**, keine Aktivkohle im Normalbetrieb.
- Industrie: 5 Badumwälzungen pro Stunde. Deine Schlauchpumpe (~3 L/h) ist dafür sehr langsam, für ein kleines Kunstbad aber ausreichend *(Einschätzung)*.
- Einfach: nach Gebrauch durch Kaffeefilter gießen.
- Pumpe/Schläuche: säurefest (PP, PE, PVC, PTFE, Silikon/Norprene bei Schlauchpumpen).

Quellen: [Gateros](https://www.gaterosplating.co.uk/electroforming-support), [Rio Grande E3 Duo](https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf), [Interweave Studio Notes](https://www.interweave.com/article/jewelry/studio-notes-electroforming-electrifying), [Copper Gleam TDS](https://insulectro.com/wp-content/uploads/2021/10/Copper-Gleam-2001-Acid-Copper.pdf), [Think & Tinker Troubleshooting](https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm), [Think & Tinker Hull Cell](https://www.thinktink.com/stack/volumes/volvi/hullcell.htm), [Ganoksin Workshop](https://www.ganoksin.com/article/notes-electroforming-workshop/), [Electroforming Artist Tipps](https://electroformingartist.com/electroforming-tips/), [finishing.com](https://finishing.com/00/85p3.shtml)

---

## 7. Zeit, Dicke, innere Spannung

- **Kontrollen:** nach 5–15 min erste kleine mattrosa Inseln (normal), nach 20–30 min sollte fast alles mattkupfern sein (Gateros).
- **Gesamtzeit Kunst-Electroforming:** 2–12 h (Rio Grande), 4–24+ h (Enchanted Leaves), größere Stücke 24–36 h. Dünne Blätter brauchen extra Zeit, damit sie stabil werden.
- Draht nach 30–60 min umsetzen, wenn er nicht ins Stück einwachsen soll.
- **Glanzschicht auf schon geformtem Teil:** Tifoo 10–15 min bei 1–2 A/dm².
- **Innere Spannung:** Zug- oder Druckspannung in der Schicht. Hohe Spannung → Verzug, Risse, Ablösen vom Kern. Einflüsse: Stromdichte, Additive, Verunreinigungen, Temperatur, Bewegung, Welligkeit (Ripple) des Netzteils. Glanzkupfer ist **weniger duktil** – für Schmuck in Ordnung. Messung industriell mit Biegestreifen.
- Kurze Stromunterbrechungen sind bei Kupfer „wahrscheinlich kein Problem“ (Ted Mooney, finishing.com), bei Nickel dagegen schon.

Quellen: [Gateros](https://www.gaterosplating.co.uk/electroforming-support), [Rio Grande](https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf), [Stein: Stress in Electroformed Metals](https://www.finishing.com/library/stein/stresspaper.html), [finishing.com](https://finishing.com/00/85p3.shtml)

---

## 8. Fehlerbilder – Ursachen – Abhilfe

| Fehlerbild | Häufige Ursachen | Abhilfe |
|---|---|---|
| **Mattrosa / lachsfarben** | zu wenig Glanzzusatz; **kein/zu wenig Chlorid**; zu geringe Stromdichte; Bad zu warm | Chlorid prüfen/zugeben, Glanzzusatz nachdosieren, Stromdichte auf 1,5–2 A/dm², Münztest |
| **Nur Kanten glänzen, Mulden matt** | Kanteneffekt, Abstand zu klein, zu wenig Säure, zu viel Kupfer, zu wenig Glanzzusatz | Abstand 5–10 cm, Anoden beidseitig, Säure auf 55–75 g/L, Werkstück drehen |
| **Bräunlich, „verbrannt“, pulvrig** | Stromdichte zu hoch (lokal an Kanten!), zu wenig Bewegung, zu wenig Kupfer oder Säure | Strom −20 %, Abstand vergrößern, bewegen, Chemie prüfen |
| **Knötchen, Dendriten („Bäumchen“), bröselig** | Strom zu hoch, zu wenig/zu viel Glanzzusatz | Strom senken, Brightener korrigieren |
| **Rau, Partikel** | Anodenschlamm, keine Beutel, kein Filter, Schrott-Anode, zu viel Chlorid, Kalk (Leitungswasser) | P-Kupferanode in PP-Beutel, filtrieren, nur dest. Wasser |
| **Brauner Schlamm im Bad** | unreine Anoden, keine Filtration, zu kleine Anodenfläche | filtern, P-Anoden, Flächenverhältnis 2:1 |
| **Fleckig, langsam** | zu kalt, Leitlack zu dünn/unterbrochen | Bad wärmen, Lack nachbessern, Durchgang messen |
| **Strom schwankt, nichts passiert** | Kontakt unterbrochen, Klemme korrodiert | Verbindungen reinigen/ersetzen; Spannung direkt an Anode und Werkstück messen |
| **Pitting (Löcher)** | zu wenig Chlorid, Luftblasen, Fett | Chlorid, Bewegung, besser entfetten |
| **Blaue Kristalle Tage später** | Versiegelung undicht, Elektrolyt im Kern | besser versiegeln, abwechselnd heiß/kalt spülen (3×) |
| **Bunte Flecken nach dem Bad** | schlecht gespült | in Pickle/Zitronensäure spülen, dann dest. Wasser |
| **Kratzer werden nicht aufgefüllt** | zu viel Kupfer, zu wenig Säure/Glanzzusatz | Säure und Brightener erhöhen |

**Problem eingrenzen** (Ted Mooney, finishing.com): erst einen **sauberen, abgebeizten Messingschlüssel oder eine Kupfermünze** beschichten. Wird der schön, liegt das Problem am Werkstück, nicht am Bad.

**Hull-Zelle** (für später): kleine trapezförmige Testzelle (267 ml), Testblech bei 2 A für 10 min. Das Blech zeigt auf einen Blick alle Stromdichten: Anbrennen nur ganz außen (über 45 ASF ≈ 4,8 A/dm²), unter 40 ASF (≈ 4,3 A/dm²) spiegelblank und mattrosa im Niedrigbereich = zu wenig Glanzzusatz. Lohnt sich ab regelmäßiger Arbeit *(Preis habe ich nicht recherchiert)*.

Quellen: [Gateros Troubleshooting](https://www.gaterosplating.co.uk/electroforming-support), [Think & Tinker Troubleshooting](https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm), [PF Online Hull Cell II](https://pfonline.com/articles/the-hull-cell-key-to-better-electroplating-part-ii), [Think & Tinker Hull Cell](https://www.thinktink.com/stack/volumes/volvi/hullcell.htm), [finishing.com](https://finishing.com/00/85p3.shtml)

---

## 9. Badpflege

- Verdunstung mit **destilliertem Wasser** (am besten dem gesammelten Spülwasser) ausgleichen.
- Glanzzusatz nach Amperestunden nachdosieren (Strom × Stunden notieren – ein kleines **Badbuch** lohnt sich).
- Kupfer, Säure und Chlorid regelmäßig prüfen; Analyse lohnt sich laut Jentner ab ca. 10 L Badvolumen, darunter lieber nach einigen Monaten neu ansetzen.
- Workshop-Praxis: Bad alle 4–6 Monate gründlich filtrieren, danach Glanzzusatz ergänzen.
- Bad abdecken (Staub), kühl aber nicht kalt lagern.

Quellen: [Jentner](https://cdn.jentner-plating.com/media/16/10/a3/1713269217/Kupferbad-sauer_PBde_1270000_DEU.pdf), [Ganoksin Workshop](https://www.ganoksin.com/article/notes-electroforming-workshop/), [Rio Grande](https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf)

---

## 10. Nachbearbeitung (Schmuck)

1. **Spülen** in destilliertem Wasser, Säure neutralisieren (Natronlösung), trocknen.
2. **Grate** feilen/schleifen; Kanten entgraten (Ohrringe!).
3. **Polieren:** Messingbürste (verdichtet und glänzt), Stahlwolle, Dremel mit Drahtbürste, Trommelpoliermaschine (Edelstahlkugeln).
4. **Patina:** Schwefelleber (verdünnt, warm, langsam), mehrere dünne Lagen, dazwischen mit feiner Messingbürste und etwas Schwefelleber verdichten → blau-schwarz/Gunmetal. Galvanogeformtes Kupfer ist sehr dicht und glatt, Patina haftet schlechter als auf Guss. Teil vorher im warmen Wasser anwärmen.
   - Alternativen: Selendioxid-Patina, Blau/Grün-Patina, Flamme (Anlauffarben), hartgekochtes Ei im Beutel.
   - **Elektrochemisches Patinieren** ist möglich (deine frühere Frage), wird aber in den Quellen nicht im Detail beschrieben.
5. **Versiegeln:** Klarlack (Spraylack, Autoklarlack, Nikolas), mikrokristallines Wachs (Renaissance Wax) oder Lack; bei Hautkontakt (Ringe) besonders wichtig, sonst grüne Verfärbung.
6. Optional **Überziehen** mit Silber/Gold (dann Nickel-Sperrschicht beachten – Nickel ist allergen und stark gesundheitsgefährlich, siehe SDB).

Quellen: [Ganoksin – Patina auf Electroforms](https://orchid.ganoksin.com/t/issues-applying-patina-to-copper-electroformed-piece/42996), [Rio Grande](https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf), [Enchanted Leaves](https://enchantedleaves.com/pages/electroforming-tutorial-free-step-by-step-guide-to-making-copper-electroformed-jewelry-learn-how-to-electroform)

---

## 11. Ausrüstung für ein Hobby-Setup

| Teil | Empfehlung |
|---|---|
| **Netzteil** | Labornetzteil mit **Konstantstrom (CC)**, 0–15 V / 0–5 A, mA-Anzeige; geringe Welligkeit |
| **Wanne** | PP, PE, PVC oder Glas; in säurefeste Auffangwanne stellen. Für 3D-Druck: PETG oder PP besser als PLA; Schichtlinien abdichten (z. B. Epoxid-Beschichtung), vorher mit Wasser auf Dichtheit testen *(Einschätzung)* |
| **Anoden** | phosphorhaltiges Kupferblech, ≥ 2× Werkstückfläche, in PP-Anodenbeuteln; Anodenhaken aus Titan oder Kupfer oberhalb des Bads |
| **Kathodenschiene** | Kupferrohr/-stange über dem Bad, Werkstück an Kupferdraht |
| **Bewegung** | Aquarium-Luftpumpe mit PVC-Sprudelrohr oder Magnetrührer |
| **Filter** | PP-Wickel-/Vlieskartusche 1–10 µm; Schlauchpumpe mit säurefestem Schlauch |
| **Heizung** | Aquarium-Glasheizer, Thermometer |
| **Messen** | Multimeter, Waage (0,01 g), Messzylinder, pH-Streifen (pH < 1) |
| **Schutz** | Nitril-/Butylhandschuhe, Schutzbrille, Schürze, gute Lüftung |

Größe wählen nach Werkstück + Abstand: Werkstück mittig, je 5–10 cm zu den Anoden, 3–5 cm Bad unter dem Werkstück.

Quellen: [Ganoksin Workshop](https://www.ganoksin.com/article/notes-electroforming-workshop/), [r/Electroforming Wiki](https://axebps-redlib.hf.space/r/Electroforming/wiki), [Jentner](https://cdn.jentner-plating.com/media/16/10/a3/1713269217/Kupferbad-sauer_PBde_1270000_DEU.pdf)

---

## 12. Sicherheit und Entsorgung

**Gefahren:** Das verlinkte PDF enthält zwei Tifoo-Datenblätter. Das für den **Glanzkupferelektrolyten** (2013) nennt nur alte R-Sätze: R 36/38 (reizt Augen und Haut) und R 50/53 (sehr giftig für Wasserorganismen). Das für den **Kupferelektrolyt sauer** (2012) nennt u. a. H302, H314, H315, H319, H290, **H400/H410** und **Wassergefährdungsklasse 3**. Das Ropertz-Datenblatt für ein ähnliches Bad nennt WGK 2. Für dein selbst angesetztes Bad (konzentrierter als die Fertigbäder) gilt sinngemäß dasselbe.

**Schutz:**
- Schutzbrille, Butyl- oder Nitrilhandschuhe, Schürze; gute Lüftung (Luftsprudler erzeugt Säurenebel).
- **Immer Säure ins Wasser**, nie Wasser in Säure.
- Nicht essen/trinken am Arbeitsplatz; Kinder/Haustiere fern; Chemikalien beschriftet im Originalbehälter, getrennt von Laugen.
- Erste Hilfe: Haut mit viel Wasser spülen; Augen lange spülen und Arzt; nach Verschlucken Mund ausspülen, Wasser trinken, **kein Erbrechen**.
- Beim Schleifen/Polieren Staubmaske.

**Entsorgung:**
- **Nie in Abfluss, Toilette, Garten.** Auch Spülwasser enthält Kupfer → sammeln und zum Auffüllen des Bads verwenden („Standspüle“).
- Altes Bad, verbrauchte Filter, Anodenschlamm: **Problemstoffsammelstelle / Altstoffsammelzentrum (Österreich)** bzw. Schadstoffmobil/Wertstoffhof (Deutschland). Abfallschlüssel laut Tifoo-SDB (Kupferelektrolyt sauer): 110198* (Produkt), 150110* (verschmutzte Verpackung). Kosten bei der Gemeinde erfragen.
- Volumen verringern: Restkupfer mit kleinem Strom auf Kupferblech „herausarbeiten“ (Gateros: 12 h bei niedrigem Strom). Die Restsäure bleibt aber Problemstoff.

Quellen: [Tifoo Glanzkupfer SDB](https://blog.zhdk.ch/werkstattlehreenglish/files/2023/03/tifoo-glanzkupferelektrolyt-sdb.pdf), [SDB Kupferelektrolyt sauer (Ropertz)](https://blog.zhdk.ch/werkstattlehre/files/2020/05/Kupferelektrolyt_sauer.pdf), [oesterreich.gv.at – Problemstoffe](https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/abfall/problemstoffe), [r/Electroforming Wiki](https://axebps-redlib.hf.space/r/Electroforming/wiki)

---

## 13. Bezugsquellen

**Deutschsprachiger Raum**
- **Tifoo** (Regensburg) – Glanzkupferelektrolyt, Glanzzusatz, Kupferleitlack, Kupferanode 8×5 cm (6,50 €): [tifoo.de/kupferanode](https://www.tifoo.de/kupferanode), [FAQ](https://www.tifoo.de/faq/)
- **Jentner Plating** (Pforzheim) – Kupferbad sauer JE540 (Profi-Glanzbad, phosphorhaltige Anoden): [jentner-plating.com](https://jentner-plating.com/en/Plating-Electrolytes/Non-Precious-Metal-Electrolyte/Copper-baths)
- **Real-Gold** – Glanzkupferelektrolyt sauer: [real-gold.de](https://www.real-gold.de/Kupfer-sauer-Glanzkupfer-Elektrolyt/BMG-095.4)
- **eBay** – Kupfer-/Silberleitlack-Sprays: [ebay.de/shop/leitlack](https://www.ebay.de/shop/leitlack)
- Kupfersulfat, Batteriesäure, Salzsäure: Chemikalienhandel, Baumarkt/Kfz-Bedarf (Batteriesäure 37 %).

**International (Spezialisten fürs Kunst-Electroforming)**
- **Gateros Plating** (UK) – Kits, Silberleitlack, PDO-Anoden, sehr gute Anleitung: [gaterosplating.co.uk](https://www.gaterosplating.co.uk/electroforming-support)
- **Rio Grande / Sherri Haab (Enviro-Tech)**, **Caswell**, **Midas** (USA) – Lösungen, Brightener, Leitlacke
- **Think & Tinker** (USA) – Anodenkörbe, Hull-Zellen, Chemie-Know-how: [thinktink.com](https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm)
- **Abrimagery** – Kupfer-Electroforming-Lösung und Leitlack: [abrimagery.com](https://abrimagery.com/products/copper-electroforming-solution)
- **Enchanted Leaves** – Leaf-Tutorials, Graphitlack: [enchantedleaves.com](https://enchantedleaves.com/pages/electroforming-tutorial-free-step-by-step-guide-to-making-copper-electroformed-jewelry-learn-how-to-electroform)

**Community / Weiterlernen**
- [finishing.com](https://finishing.com/00/85p3.shtml) – Fachforum seit 1989 (Ted Mooney u. a.)
- [Ganoksin / Orchid](https://orchid.ganoksin.com/t/electroforming/1727) – Goldschmiede-Forum
- r/Electroforming (Reddit) inkl. Wiki
- Asterion „Finishing Calculations“-App für Fläche/Strom: [PF Online](https://www.pfonline.com/articles/asterion-launches-new-app-for-finishing-calculations)

---

## 14. Alle Quellen

1. Jentner – Kupferbad sauer JE540, Produktblatt: https://cdn.jentner-plating.com/media/16/10/a3/1713269217/Kupferbad-sauer_PBde_1270000_DEU.pdf
2. Jentner – Kupferbäder Übersicht: https://jentner-plating.com/en/Plating-Electrolytes/Non-Precious-Metal-Electrolyte/Copper-baths
3. Tifoo – Glanzkupferelektrolyt Anleitung: https://www.tifoo.de/media/e2/be/68/1695107912/de_anleitung_01-10.pdf
4. Tifoo – Glanzkupferelektrolyt Sicherheitsdatenblatt: https://blog.zhdk.ch/werkstattlehreenglish/files/2023/03/tifoo-glanzkupferelektrolyt-sdb.pdf
5. Tifoo – Kupferanode: https://www.tifoo.de/kupferanode
6. Gateros Plating – Electroforming Tutorial: https://www.gaterosplating.co.uk/electroforming-support
7. Rio Grande / Sherri Haab – E3 Duo Electroforming Instructions: https://products.riogrande.com/content/Instruction-Sheets/Haab-E3-Duo-Electroforming-IS.pdf
8. Enchanted Leaves – Electroforming Tutorial: https://enchantedleaves.com/pages/electroforming-tutorial-free-step-by-step-guide-to-making-copper-electroformed-jewelry-learn-how-to-electroform
9. Electroforming Artist – 10 Tipps: https://electroformingartist.com/electroforming-tips/
10. Interweave – Studio Notes Electroforming: https://www.interweave.com/article/jewelry/studio-notes-electroforming-electrifying
11. r/Electroforming Wiki (Mickelson-Rezept): https://axebps-redlib.hf.space/r/Electroforming/wiki
12. Think & Tinker – Troubleshooting Acid Copper: https://www.thinktink.com/stack/volumes/volvi/trblshtcu.htm
13. Think & Tinker – Badrezept: https://www.thinktink.com/stack/volumes/voliii/consumbl/cplatmix.htm
14. Think & Tinker – Hull Cell: https://www.thinktink.com/stack/volumes/volvi/hullcell.htm
15. Copper Gleam 2001 – Technisches Datenblatt: https://insulectro.com/wp-content/uploads/2021/10/Copper-Gleam-2001-Acid-Copper.pdf
16. PF Online – The Hull Cell, Part II: https://pfonline.com/articles/the-hull-cell-key-to-better-electroplating-part-ii
17. finishing.com – Hobby-Electroforming-Diskussion: https://finishing.com/00/85p3.shtml
18. Stein – Stress in Electroformed Metals: https://www.finishing.com/library/stein/stresspaper.html
19. Ganoksin – Notes from an Electroforming Workshop: https://www.ganoksin.com/article/notes-electroforming-workshop/
20. Ganoksin/Orchid – Leitende Beschichtungen: https://orchid.ganoksin.com/t/electroforming/1727
21. Ganoksin/Orchid – Patina auf Electroforms: https://orchid.ganoksin.com/t/issues-applying-patina-to-copper-electroformed-piece/42996
22. Found by Dawn – Copper Electroforming Teil 1: https://foundbydawn.co.uk/blogs/news/copper-electroforming-part-1
23. Univ. Washington – Graphitlack-Rezept: https://www.cei.washington.edu/wordpress/wp-content/uploads/2015/09/Graphite-Paint.docx
24. RepRap – Electroformed Nozzle: https://reprap.org/wiki/Electroformed_Nozzle
25. Skyjems – Encyclopedia Electroforming: https://skyjems.ca/pages/encyclopedia-electroforming
26. Ropertz – SDB Kupferelektrolyt sauer: https://blog.zhdk.ch/werkstattlehre/files/2020/05/Kupferelektrolyt_sauer.pdf
27. oesterreich.gv.at – Problemstoffe: https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/abfall/problemstoffe

---

## 15. Prüfprotokoll (25.10.2026)

Alle Zahlen wurden gegen den Originaltext der Quellen geprüft (wörtliche Zitate abgerufen), und alle eigenen Rechnungen wurden nachgerechnet. Korrigiert wurde:

1. **Tifoo-Datenblatt:** Zusammensetzung (10–<20 % Kupfersulfat, 1–<5 % Schwefelsäure), H-Sätze, WGK 3 und Abfallschlüssel stammen aus dem Blatt für *Kupferelektrolyt sauer*, nicht für den *Glanzkupferelektrolyten*. Die Zusammensetzung des Glanzkupferbads ist nicht veröffentlicht.
2. **Säure anheben:** Die frühere Angabe „350 ml 15 %ige Säure pro Liter“ galt nur für ein neues Bad. Für dein bestehendes Bad gibt es jetzt eine eigene Rechnung (Batteriesäure ~210 ml auf 3,5 L).
3. **Mickelson-Rezept:** Die Säurekonzentration ist dort nicht angegeben, „konzentriert“ war meine Annahme. Ergänzt wurde seine Stromregel 0,01 A/in², die als Ausreißer gekennzeichnet ist.
4. **Hull-Zelle:** 45 ASF sind 4,8 A/dm² (vorher 4,5). Der Preis war nicht belegt und wurde entfernt.
5. **„Mindestens 10 cm Abstand“** stammt von einem Forumsteilnehmer, nicht von einem Experten. **Stromunterbrechungen:** Die Quelle sagt „wahrscheinlich kein Problem“, nicht „harmlos“.
6. **Münztest:** Gateros nennt keine Stromdichte. 1,5 A/dm² ist mein Vorschlag.
7. **Deine Anode:** Im Chat ist von einem „sauberen Kupferstück“ die Rede. Dass es eine Tifoo-Anode war, ist nicht belegt.
8. **Phosphorgehalt der Anoden:** Die Spanne ist jetzt je Quelle angegeben (0,03–0,08 %).

Bestätigt wurden: Faraday-Tabelle (1,186 g/Ah → 13,2 µm/h bei 1 A/dm²), Umrechnungen A/in² und ASF, Chlorid-Mengen (0,1 g NaCl bzw. 0,16 ml HCl 33 % pro Liter für 60 mg/L), deine Stromdichten (0,56/0,7/0,8 A auf 72 cm² = 0,78/0,97/1,11 A/dm²), Tifoo-Angaben (1–2 A/dm², 1–1,5 V, 60 µm/h, 10–15 min), Jentner-Werte, Copper-Gleam-Werte, Gateros-Werte, Rio-Grande-Zitate, Aktivkohle entfernt Glanzzusatz (Ganoksin), Hull-Zellen-Deutung und Anodenfilm-Farben (Think & Tinker).

Weiterhin **nicht belegt, nur Einschätzung**: Einarbeiten eines frischen Bads, Dekapieren in 5–10 % Schwefelsäure, PETG statt PLA für 3D-gedruckte Wannen, Neutralisieren mit Natron, ob der Tifoo-Glanzzusatz Chlorid braucht.
