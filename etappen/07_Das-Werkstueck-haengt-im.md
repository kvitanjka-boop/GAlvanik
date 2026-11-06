# Etappe 7 – Das Werkstück hängt im Bad (Verkupfern)

*Erzählt am 26.10.2026*

### Ausgangslage

- Werkstück: das mit Leitlack lackierte Baumblatt, **4 × 5 cm, einseitig beschichtet**
- Es hängt im Elektrolyt.

### Was zu bedenken ist

- Stromparameter
- Temperatur des Elektrolyts
- Säuregehalt des Elektrolyts
- Drahtverbindungen, Anode und Kathode
- **Stromdichte einstellen: Ampere und Volt**

### Offene Fragen

- [x] Welche Stromdichte, wie viel Ampere und wie viel Volt für das 4 × 5 cm-Blatt, einseitig?
- [x] Welche Badtemperatur und welcher Säuregehalt während des Verkupferns?
- [x] Worauf ist bei den Drahtverbindungen, der Anode und der Kathode zu achten?
- [x] Erklärung: Wie wirken sich diese Dinge auf den **Transport der Kupferionen** und auf die Beschichtung aus?
  - Stromdichte
  - Zusammensetzung des Elektrolyts
  - Zustand des Elektrolyts
  - Abstand zwischen Anode und Werkstück

### Schichtdicke passend zum Schmuckstück

Die Verkupferungsdicke lässt sich nicht bei allem gleich anwenden. Ist die Schicht zu dick und das Stück zu schwer, taugt es nicht als **Ohrring**, und auch eine **Brosche** wird dann zu schwer. Größe, Gewicht und Dicke der Verkupferung müssen zusammen bedacht werden.

- [x] Welche Schichtdicke und welches Gewicht passen für Ohrringe, Broschen und Anhänger?
- [x] Wie hängen Größe des Blatts, Schichtdicke und Gewicht zusammen?

### Wunsch für später

Den ganzen Prozess soll später eine **Simulations-App** bildlich darstellen (siehe `galvanik-app/`).

*Die abgehakten Fragen sind unten in der Ausarbeitung beantwortet (26.10.2026).*

---

## Ausarbeitung (26.10.2026)

*Kennzeichnung: **[Quelle]** = steht so in einer Fachquelle (Links am Ende). **[Rechnung]** = selbst gerechnet, Rechenweg dabei. **[Einschätzung]** = meine Schlussfolgerung, nicht direkt belegt. **[Erfahrung]** = Bericht einer einzelnen Person.*

### Kurz gesagt: das 4 × 5-cm-Blatt, einseitig

| Was | Wert |
|---|---|
| Fläche (einseitig) | ca. **14 cm² = 0,14 dm²** (+ Öse/Draht) |
| Ziel-Stromdichte Formen | **1,5 A/dm²** |
| Ziel-Strom | **ca. 0,21 A** (210 mA) |
| Start bei Leitlack | **ca. 0,02–0,03 A**, dann in Stufen steigern |
| Glanzphase am Ende | 1–2 A/dm² → **0,14–0,28 A**, 10–15 min |
| Spannung | Netzteil auf **Konstantstrom**, Spannungsgrenze **~2 V**; angezeigt werden meist 0,8–2 V |
| Temperatur | **22–24 °C** (Etappe 1) |
| Säure | **ca. 58 g/L** (Etappe 1) |
| Wachstum | **ca. 20 µm pro Stunde** bei 1,5 A/dm² |
| Ohrring (leicht) | ca. **0,15–0,2 mm** → **8–10 h** |

### 1. Strom ausrechnen

**Formel** [Quelle: Wissensbasis Kap. 2]
Strom (A) = Fläche (dm²) × Stromdichte (A/dm²). 1 dm² = 100 cm².

**Für das 4 × 5-cm-Blatt** [Rechnung]
- Fläche einseitig ca. 14 cm² (Etappe 3) = 0,14 dm². Dazu Öse und eingetauchter Draht, grob +1 cm² → **0,15 dm²**.
- Bei **1,5 A/dm²** (Praxiswert fürs Kunst-Electroforming, Wissensbasis Kap. 6.1): 0,15 × 1,5 = **0,22 A**.
- Bei 1 A/dm²: 0,15 A. Bei 2 A/dm²: 0,30 A.
- **Beidseitig** beschichtet (ca. 29 cm² inkl. Öse): doppelter Strom, **ca. 0,43 A** bei 1,5 A/dm².

**Quellen für die Stromdichte** [Quelle: Wissensbasis Kap. 6.1]
Gateros 0,8–1,55 A/dm²; Sherri Haab/Rio Grande, Enchanted Leaves, Electroforming Artist 1,55 A/dm² (= 0,1 A/in²); Tifoo-Glanzkupfer 1–2 A/dm²; Jentner 1–6 A/dm² (mit Bewegung).

### 2. Die Strom-Rampe für ein leitlackiertes Blatt

Ein frisch lackiertes Blatt leitet zuerst nur schlecht; das Kupfer wächst vom Draht aus über die Fläche. Darum **klein anfangen**. [Quelle: Electro Jeweler Jordan, Rio Grande]

Jordans Rampe (Blatt mit 58 cm², Leitfaden Etappe 4) übertragen auf **Jojos 15 cm²** [Rechnung: Jordans Werte × 15/58]:

| Zeitpunkt | Strom | Was man sehen sollte |
|---|---|---|
| Start | **0,03 A** | nach 5–15 min erste mattrosa Inseln (Gateros) |
| nach 10 min | **0,05 A** | Kupfer breitet sich vom Draht her aus |
| nach 30–40 min | **0,13 A** | fast alles mattkupfern (Gateros: nach 20–30 min) |
| ~95 % bedeckt (1–2 h) | **0,22 A** | Zielwert 1,5 A/dm² |
| später | **0,25 A** | wenn Kanten hell, Mitte matt → Strom etwas höher |
| letzte 10–15 min | **0,25–0,3 A** | Glanzphase (Tifoo: 1–2 A/dm²) |

**Was die Bilder sagen** [Quelle: Jordan, Leitfaden Etappe 4]
- Bläschen am Draht + dunkelbraunes Pulver → **Start zu hoch**.
- Kanten hell, Mitte matt → Strom **zu niedrig** für die gewachsene Fläche.
- Mitte hell, Kanten matt → **Glanzzusatz** geht aus.
- Braun, „verbrannt“ → Strom zu hoch, Abstand zu klein, zu wenig Bewegung (Wissensbasis Kap. 8).

### 3. Volt: was die Spannung bedeutet

- Netzteil im **Konstantstrom-Modus (CC)** betreiben: Man stellt den **Strom** ein, die Spannung stellt sich selbst ein. Spannungsgrenze auf **ca. 2 V** setzen. [Quelle: Sherri Haab/Interweave „2 V mehr als genug“; Ted Mooney: 6 V viel zu viel, ~1,5 V]
- Typische angezeigte Spannung **0,8–2,5 V** (Jentner), Tifoo 1–1,5 V. [Quelle]
- Die Spannung hängt ab von Abstand, Säuregehalt, Temperatur und Kontakten. **Steigt sie bei gleichem Strom stark**, ist ein Kontakt schlecht oder die Anode passiviert. [Quelle: Wissensbasis Kap. 6.1]
- **Nicht nach Volt arbeiten**, sondern nach Ampere: Die gleiche Spannung gibt je nach Abstand und Bad ganz unterschiedliche Ströme. [Einschätzung]

### 4. Badtemperatur und Säure während des Verkupferns

- **22–24 °C**, Heizstab auf 24 °C (Etappe 1). Zu warm → matter, rauer, rosa; zu kalt → langsam, fleckig, Kristalle. [Quelle: Wissensbasis Kap. 6.2]
- **Säure ca. 58 g/L**, Kupfersulfat 200 g/L, Chlorid ca. 60 mg/L (Vermutung, Etappe 1).
- Während eines 36-h-Laufs: Füllstand und Temperatur **morgens und abends** prüfen, Wasser bis zur Marke nachfüllen. [Einschätzung]

### 5. Drahtverbindungen, Anode, Kathode

Ausführlich in Etappe 2 und 4. Kurzfassung:
- **Plus (rot) an die Anoden**, **Minus (schwarz) an das Werkstück**. Falsch herum löst sich das Werkstück auf! [Quelle: Tifoo-Anleitung; Einschätzung zur Folge]
- Anoden beidseitig, Fläche ~2×, 5–10 cm Abstand, in Beuteln.
- Klemmen oberhalb des Bads, blank; Durchgang vorher messen.

### 6. Wie Stromdichte, Bad und Abstand den Kupferionen-Transport beeinflussen

**So kommt das Kupfer aufs Blatt** [Quelle: Wissensbasis Kap. 1; Chemie]
1. An der **Anode** gibt Kupfer zwei Elektronen ab und geht als **Cu²⁺-Ion** in Lösung.
2. Die Ionen bewegen sich auf drei Wegen zum Blatt:
   - **Wanderung** im elektrischen Feld (Migration),
   - **Diffusion** von viel zu wenig Konzentration,
   - **Strömung** durch Rühren oder Luft (Konvektion).
3. Direkt am Blatt bildet sich eine dünne, ruhige **Grenzschicht**, durch die die Ionen nur per Diffusion kommen. Dort nimmt jedes Ion zwei Elektronen auf und wird **Kupfermetall**.

**Stromdichte**
- Mehr Strom = mehr Ionen pro Sekunde = schnelleres Wachstum (Faraday: 1,186 g Kupfer pro Amperestunde). [Quelle: Wissensbasis Kap. 2]
- Ist der Strom **höher, als Ionen nachkommen** können, verarmt die Grenzschicht: Das Kupfer wächst pulvrig, braun, „verbrannt“ oder als Knötchen und Bäumchen. [Quelle: Wissensbasis Kap. 8; Einschätzung zur Erklärung]
- Ist der Strom **zu niedrig**, bleibt die Schicht matt oder lachsrosa, weil der Glanzzusatz erst ab ca. 1 A/dm² richtig wirkt. [Quelle: Tifoo]
- **Kanten und Spitzen** bekommen immer mehr Strom als Mulden („Kanteneffekt“). [Quelle: Wissensbasis Kap. 6.4]

**Zusammensetzung des Elektrolyts**
- **Kupfersulfat** liefert die Ionen. Zu wenig → die Grenzschicht verarmt schneller → Anbrennen an Kanten. [Quelle: Wissensbasis Kap. 3.1]
- **Schwefelsäure** macht das Bad leitfähig. Mehr Säure → Strom verteilt sich gleichmäßiger, auch Mulden bekommen Kupfer („Streufähigkeit“). Zu wenig → Kanten verbrennen, Mulden matt. [Quelle: Wissensbasis Kap. 3.1]
- **Chlorid** und **Glanzzusatz** steuern, *wie* das Kupfer wächst (feinkörnig, glatt, glänzend), nicht *wie viel*. [Quelle: Wissensbasis Kap. 3.1, 4]

**Zustand des Elektrolyts**
- **Temperatur:** wärmer → Ionen bewegen sich schneller, aber der Glanzzusatz wird schneller verbraucht; kälter → langsamer, fleckig, Kristalle. [Quelle: Wissensbasis Kap. 6.2]
- **Bewegung:** Rühren macht die Grenzschicht dünner → mehr Ionen kommen nach → höhere Stromdichte ohne Anbrennen möglich. [Quelle: Wissensbasis Kap. 6.5; Jentner 1–6 A/dm² nur mit Bewegung]
- **Verschmutzung** (Partikel, organische Stoffe) → raue oder matte Schicht. [Quelle: Wissensbasis Kap. 8]
- **Verdunstung** → zu konzentriert → Kristalle (Etappe 1).

**Abstand Anode–Werkstück**
- **Klein** (1 cm): Das Feld ist ungleichmäßig, Kanten ziehen fast den ganzen Strom → Kanten verbrennen, Mulden matt (Jojos Oktober-Versuch). [Quelle: Wissensbasis Kap. 0]
- **5–10 cm**: gleichmäßiger, empfohlen. [Quelle: Wissensbasis Kap. 6.4]
- **Sehr groß** ohne Abschirmung: In einem Praxisbericht wurden bei 20 cm die Kanten wieder zu dick. [Erfahrung: finishing.com 246/45]
- Größerer Abstand braucht etwas mehr **Spannung** für den gleichen Strom. [Einschätzung, Ohmsches Gesetz]

**Für die Simulations-App** [Einschätzung]: Diese vier Stellschrauben (Stromdichte, Zusammensetzung, Zustand, Abstand) sind genau die Regler, die die App zeigen soll. Notiert in `galvanik-app/Ideensammlung.md`.

### 7. Schichtdicke, Gewicht und Schmucktyp

**Wachstum** [Quelle + Rechnung]: Kupfer wächst bei **1 A/dm² ca. 13 µm/h**, bei **1,5 A/dm² ca. 20 µm/h**, bei 2 A/dm² ca. 26 µm/h (Wissensbasis Kap. 2). Tifoos Angabe „60 µm/h“ ist physikalisch zu hoch.

**Gewicht des Kupfers auf dem 4 × 5-cm-Blatt** [Rechnung: Fläche × Dicke × 8,96 g/cm³; Zeit bei 1,5 A/dm²]

| Mittlere Dicke | einseitig (14 cm²) | beidseitig (28 cm²) | Zeit bei 1,5 A/dm² |
|---|---|---|---|
| 0,05 mm | 0,6 g | 1,3 g | 2,5 h |
| 0,1 mm | 1,3 g | 2,5 g | 5 h |
| 0,2 mm | 2,5 g | 5,0 g | 10 h |
| 0,3 mm | 3,8 g | 7,5 g | 15 h |
| 0,5 mm | 6,3 g | 12,5 g | 25 h |
| 0,7 mm | 8,8 g | 17,6 g | 35 h |

Dazu kommen Blatt, Lack und Öse (grob 0,2–0,5 g) [Einschätzung]. Kanten werden dicker als die Mitte.

**Jojos 36 Stunden** [Rechnung]: Bei durchgehend 1,5 A/dm² wären das ca. **0,7 mm** und auf dem einseitigen 4 × 5-Blatt ca. **9 g pro Stück**. Für Ohrringe ist das schwer. Bei niedrigerem Strom (z. B. 0,8 A/dm²) wären es nach 36 h ca. 0,38 mm und knapp 5 g.

**Wie schwer darf was sein?**

| Schmuck | Gewicht | Herkunft | Dicke auf 4 × 5-Blatt |
|---|---|---|---|
| **Ohrring** | leicht **1–3 g**, für langes Tragen **unter 7 g** pro Stück | [Quelle: Robinson's Jewelers] Goldschmiede: „Maximum 10 g, am besten 5 g“, „über ~6 g wird es unbequem“ [Erfahrung: Ganoksin] | einseitig **0,15–0,2 mm** (2–2,5 g), beidseitig **0,1 mm** (2,5 g) |
| **Kettenanhänger** | 5–15 g gut tragbar | [Einschätzung] | **0,2–0,4 mm** |
| **Brosche** | so leicht, dass Stoff nicht zieht; ca. 5–15 g | [Einschätzung] | **0,2–0,3 mm** |
| **Fingerring** | braucht Stabilität | Galvanoformen mit **1,5–2 mm** Wand gelten als robust für normales Tragen [Quelle: Skyjems] | Ringschiene dick formen oder Draht-/Ringkern einbauen |

- Galvanogeformte Wände liegen typischerweise bei **0,5–3 mm**; **1,5–2 mm** Kupfer ist „robust für normales Tragen“. [Quelle: Skyjems] Das gilt für Hohlformen. Bei Blättern mit Kern reicht weniger, weil das Blatt mitträgt. [Einschätzung]
- **Faustregel** [Einschätzung]: **Ohrringe 8–10 h**, **Anhänger und Broschen 12–20 h**, **Ringe deutlich länger** oder mit Metallkern. Größere Blätter entsprechend dünner, damit das Gewicht passt.
- **Im Badbuch notieren**: Strom × Stunden = Amperestunden. 1 Ah = 1,186 g Kupfer. So lässt sich das Gewicht vorher planen. [Quelle: Wissensbasis Kap. 2, 9]

### ✅ Checkliste Etappe 7

- [ ] Fläche gemessen (4 × 5-Blatt einseitig ~15 cm² inkl. Öse)
- [ ] Zielstrom = Fläche (dm²) × 1,5 → ~0,22 A
- [ ] CC-Modus, Spannungsgrenze 2 V, Plus an Anode, Minus an Blatt
- [ ] Start 0,03 A, Rampe nach Tabelle
- [ ] Zielgewicht festgelegt (Ohrring ≤ 3 g) → Zeit aus der Tabelle
- [ ] Temperatur, Füllstand, Kontakte 2× täglich prüfen
- [ ] Amperestunden ins Badbuch

### Quellen

- [Tifoo – Glanzkupfer-Anleitung (PDF)](https://www.tifoo.de/media/e2/be/68/1695107912/de_anleitung_01-10.pdf) – 1–2 A/dm², 1–1,5 V
- [Electro Jeweler Jordan – Leaf Tutorial (YouTube)](https://www.youtube.com/watch?v=EqYfubVu2_4) – Strom-Rampe
- [Gateros Plating](https://www.gaterosplating.co.uk/electroforming-support) – Startzeiten, Stromdichte
- [Interweave – Studio Notes (Sherri Haab)](https://www.interweave.com/article/jewelry/studio-notes-electroforming-electrifying) – CC-Modus, 2 V
- [Robinson's Jewelers – Is 3 grams heavy for an earring?](https://robinsonsjewelers.com/blogs/news/is-3-grams-heavy-for-an-earring) – 1–3 g leicht, unter 7 g
- [Ganoksin – Weight on the ears](https://orchid.ganoksin.com/t/weight-on-the-ears/30391) – Goldschmiede-Erfahrungen
- [Skyjems – Encyclopedia Electroforming](https://skyjems.ca/pages/encyclopedia-electroforming) – Wandstärken 0,5–3 mm, 1,5–2 mm robust
- [finishing.com 246/45](https://www.finishing.com/246/45.shtml) – Abstand 10 vs. 20 cm
- Projektdateien: Galvanoformung-Wissensbasis.md (Kap. 0–9), Leitfaden-Etappen.md (Etappe 4), Etappen 1–3

---

## Nachtrag nach dem Briefing (29.10.2026)

*Jojos Antworten: [18_Briefing-Antworten.md](18_Briefing-Antworten.md). Neue Rechnungen mit Jojos echten Einstellungen, dazu die **Fehlerdiagnose**. Kennzeichnung wie oben.*

### Jojos Einstellung heute (Ist)

- Strom **fest** auf 0,5 / 0,8 / 1,0 oder 1,2 A, **ohne Hochfahren**, **24–36 h** (manchmal 38 oder 48 h) am Stück.
- Probleme: **Kanten verbrennen**, Glanzzusatz legt sich an Kanten schneller ab, **Vertiefungen bleiben matt rosa**.
- Kein Badbuch, kein Wiegen.

### 1. Der wichtigste Befund: Strom passend zur Fläche

Entscheidend ist nicht der Strom in Ampere, sondern die **Stromdichte** = Strom ÷ Fläche. Tifoo-Glanzkupfer will **1–2 A/dm²**. [Quelle: Tifoo via Wissensbasis]

**Jojos Ströme auf einem Blatt 4 × 5 cm** [Rechnung]
| Strom | einseitig (14 cm²) | beidseitig (28 cm²) | passt zu einer Fläche von (bei 1,5 A/dm²) | Kupfer in 24 h / 36 h |
|---|---|---|---|---|
| 0,5 A | **3,6 A/dm²** | 1,8 A/dm² | **33 cm²** | 14 g / 21 g |
| 0,8 A | **5,7 A/dm²** | 2,9 A/dm² | **53 cm²** | 23 g / 34 g |
| 1,0 A | **7,1 A/dm²** | 3,6 A/dm² | **67 cm²** | 28 g / 43 g |
| 1,2 A | **8,6 A/dm²** | 4,3 A/dm² | **80 cm²** | 34 g / 51 g |

- Für **ein** Blatt 4 × 5 cm ist das **2- bis 8-mal zu viel** Strom. Die Spitzen und Kanten bekommen noch mehr ab als der Durchschnitt → **verbrennen**.
- **Faraday-Probe:** 1,2 A × 36 h = 43 Ah → **51 g Kupfer**. Das ist das Gewicht eines großen Löffels. Wenn danach nur ein paar Blätter mit zusammen 10–20 g aus dem Bad kommen, ging der Rest in Knollen, verbrannte Kanten und den Draht. Darum lohnt sich das **Wiegen**. [Rechnung, 1,186 g pro Ah]
- Jojos Ströme passen gut zu **größeren Stücken** (eine Rose ca. 60 cm² → 0,9 A) oder zu **mehreren Stücken gleichzeitig**.

**Faustregel** [Rechnung]
```
Strom (A) = leitende Fläche (cm²) × 0,015      (für 1,5 A/dm²)
           Bereich: × 0,010 (1 A/dm²) bis × 0,020 (2 A/dm²)
```
Die **Fläche** ist alles, was Leitlack hat (beidseitig = beide Seiten zählen) plus der Draht unter Wasser.

**Fläche schätzen** [Einschätzung]: Blätter ca. **65–70 %** des umschließenden Rechtecks (Etappe 7 oben). Oder: Umriss auf Millimeterpapier zeichnen und Kästchen zählen (1 cm² = 100 Kästchen à 1 mm²).

### 2. Tabelle Stück → Strom → Zeit → Dicke → Gewicht (Aufgabe 21 und 26)

Bei **1,5 A/dm²** wachsen ca. **20 µm pro Stunde**. [Rechnung, 13,2 µm/h bei 1 A/dm²]

| Stück (Annahme) | Fläche | Strom | 0,15 mm | 0,3 mm | 0,5 mm | 0,7 mm |
|---|---|---|---|---|---|---|
| Ohrring-Blatt 3 × 2,5 cm, einseitig | 5 cm² | **0,07 A** | 8 h · 0,7 g | 15 h · 1,3 g | 25 h · 2,2 g | 35 h · 3,1 g |
| Ohrring-Blatt, beidseitig | 10 cm² | **0,15 A** | 8 h · 1,3 g | 15 h · 2,7 g | 25 h · 4,5 g | 35 h · 6,3 g |
| Blatt 4 × 5, einseitig | 14 cm² | **0,21 A** | 8 h · 1,9 g | 15 h · 3,8 g | 25 h · 6,3 g | 35 h · 8,8 g |
| Blatt 4 × 5, beidseitig | 28 cm² | **0,42 A** | 8 h · 3,8 g | 15 h · 7,5 g | 25 h · 12,5 g | 35 h · 17,6 g |
| Ring (Blatt + Schiene) | 8 cm² | **0,12 A** | 8 h · 1,1 g | 15 h · 2,2 g | 25 h · 3,6 g | 35 h · 5,0 g |
| Zapfen 5 cm | ca. 35 cm² | **0,53 A** | 8 h · 4,7 g | 15 h · 9,4 g | 25 h · 15,7 g | 35 h · 22 g |
| Rose | ca. 60 cm² | **0,90 A** | 8 h · 8,1 g | 15 h · 16 g | 25 h · 27 g | 35 h · 38 g |

[Rechnung: Gewicht = Fläche × Dicke × 8,96 g/cm³; die Flächen sind Annahmen, bei echten Stücken messen]

**Was das für Jojos Schmuck heißt** [Einschätzung, Gewichte aus Etappe 10]
| Schmuckart | Zieldicke | Badzeit bei 1,5 A/dm² |
|---|---|---|
| **Ohrringe** (unter 3 g je Stück) | 0,15–0,3 mm | **8–15 h** |
| **Ringe** | 0,3–0,5 mm (muss Druck aushalten) | **15–25 h** |
| **Anhänger, Broschen** | 0,3–0,5 mm | **15–25 h** |
| **Armbänder, Armreifen** | 0,5–0,7 mm | **25–35 h** |
| **Christbaumschmuck** | 0,15–0,3 mm (leicht, hängt am Zweig) | **8–15 h** |
| **Wanddeko, Rose, große Stücke** | 0,5–0,7 mm | **25–35 h** |

- Jojos 24–48 h sind für **Armbänder, Rosen, Wanddeko** richtig, für **Ohrringe zu lang** (zu schwer).
- Wer einen ganzen Tag im Bad will (z. B. über Nacht + Tag), kann die Stromdichte auf **1 A/dm²** senken: dann wachsen ca. 13 µm/h, 0,3 mm in 23 h. Unter 1 A/dm² wird es bei Tifoo eher matt. [Quelle + Einschätzung]

**Formeln für die Tabelle / App** (Variablen) [Rechnung]
```
Fläche A (cm²), Stromdichte j (A/dm²), Zieldicke d (µm), Stückzahl n
Strom I (A)         = n × A × j ÷ 100
Wachstum (µm/h)     = 13,2 × j            (bei 100 % Ausbeute; real ca. 95 %)
Badzeit t (h)       = d ÷ Wachstum
Kupfer gesamt (g)   = I × t × 1,186
Gewicht pro Stück   = A × d ÷ 10 000 × 8,96   (+ Gewicht des Kerns)
```

### 2a. Beim Einhängen: Draht im Bad isolieren (Jojos Hinweis, 29.10.)

> **Hinweis beim Einhängen:** Der Draht, der im Elektrolyt hängt, wird am besten **mit Nagellack isoliert**. Im Bad sollen nur das **Werkstück** und die **Anoden** blankes Kupfer zeigen, sonst scheidet sich auch am Draht Kupfer ab.

[Jojos Erfahrung; Begründung: Rechnung + Einschätzung]
- **Warum es zählt:** Blanker Draht unter Wasser ist **Kathodenfläche**. Er nimmt Strom und Kupfer weg, die für das Werkstück gedacht sind. Bei kleinen Stücken ist das viel: 5 cm Draht mit 0,8 mm Durchmesser haben ca. **1,3 cm²**, das ist schon ein Viertel eines kleinen Ohrring-Blatts (5 cm²). Dazu wächst am Draht eine dicke Kupferwurst, die man später abzwicken muss.
- **Wie:** Den Draht vom Werkstück (Öse) bis knapp über den Badspiegel mit **2 Schichten Nagellack** streichen und trocknen lassen. Die **Kontaktstelle an der Öse** und das obere Ende an der Kathodenstange bleiben **blank**.
- **Mit isoliertem Draht** stimmt auch die Strom-Rechnung (Fläche × 0,015 A), weil nur noch die Werkstückfläche zählt.
- **Für die App:** Dieser Hinweis erscheint **nur im Schritt „Werkstück einhängen“** (Jojos Wunsch).

### 3. Strom langsam hochfahren? (Aufgabe 22)

- **Ja, für die erste halbe bis ganze Stunde.** Frischer Leitlack aus Bronzepulver leitet schlechter als Kupfer. Am Anfang fließt der ganze Strom über die Stelle beim Draht/der Öse. Mit vollem Strom brennt es dort an, bevor das Blatt bedeckt ist. [Quelle: Etappe 7 oben, Jordan-Rampe; Einschätzung]
- **Einfach:** erst **¼ des Zielstroms** für 30–60 min, dann voll. Beispiel Blatt 4 × 5 beidseitig: 0,1 A → nach 45 min 0,42 A.

### 4. Timer (Aufgabe 26)

[Einschätzung]
- Das Netzgerät schaltet nicht von selbst ab. Eine **Zeitschaltuhr** oder **WLAN-Steckdose** vor dem Netzgerät schaltet nach X Stunden den Strom ab.
- Danach das Stück **bald** herausnehmen: Ohne Strom löst das saure Bad die frische Oberfläche langsam an und sie wird fleckig.
- Im Badbuch Start- und Endzeit notieren. In der Simulations-App: Fläche + Zieldicke eingeben → Strom und Timerzeit erscheinen.

### 5. Wiegen (Aufgabe 25)

- Eine **Feinwaage** (0,01 g, ca. 15–25 €) reicht. Vor dem Bad (mit Leitlack und Öse) und nach dem Bad (trocken) wiegen. [Einschätzung]
- **Dicke** = Gewichtszunahme (g) ÷ (8,96 × Fläche in cm²) × 10 000 → in µm. Beispiel: +2,5 g auf 28 cm² → **100 µm** = 0,1 mm. [Rechnung]
- **Ausbeute-Probe:** erwartetes Kupfer = Ah × 1,186 g. Ist die Zunahme viel kleiner, geht Kupfer an den Draht, an Knollen, oder der Strom ist zu hoch. [Rechnung]
- **Lohnt es sich?** Ja, am Anfang bei jedem Durchgang, bis die Tabellen stimmen. Danach nur noch bei neuen Stückarten. Für Ohrringe ist das Gewicht ohnehin ein Verkaufsargument („nur 2 g“).

### 6. Badbuch-Vorlage (Aufgabe 24)

| Nr. | Datum Start | Stück(e) | Fläche cm² | Strom A | Spannung V | Temp. °C | Abstand cm | Std. | Ah | Ah gesamt (Bad) | Gewicht vor/nach g | Aussehen | Wasser/Glanz nachgefüllt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 30.10. 18:00 | Blatt Birke beidseitig | 28 | 0,1→0,42 | 1,4 | 25 | 6 | 15 | 6,3 | 6,3 | 1,2 / 8,6 | glänzend, Kante ok | – |

- **Spannung** mit notieren: Bei festem Strom zeigt das Netzgerät die Spannung an. **Steigt** sie bei gleichem Strom (z. B. über 2,5–3 V), ist ein **Kontakt schlecht**, die Anode **verkrustet** oder die Fläche zu klein. [Quelle: Wissensbasis Kap. 6]
- **Leitfähigkeit des Bads** lässt sich zu Hause nicht gut messen. Die Spannung bei gleichem Strom, Abstand und Fläche ist ein guter Ersatz: Wird sie über Wochen höher, lässt das Bad nach. [Einschätzung]
- Als **Tabelle** (Excel/Google Sheets) mit den Formeln aus Abschnitt 2 kann man sie für jedes Projekt wiederverwenden. [Einschätzung]

### 7. Fehlerdiagnose: verbrannte Kanten, matt rosa Vertiefungen, fehlende Stellen (Aufgabe 23)

**Warum Kanten verbrennen und der Glanz sich dort zuerst ablegt** [Chemie + Quelle: Wissensbasis Kap. 15]
- Der Strom drängt sich an **Kanten und Spitzen** (wie Wind um eine Hausecke). Dort ist die Stromdichte oft **2–3-mal** so hoch wie auf der Fläche, in **Vertiefungen** nur ein Bruchteil.
- Bis ca. 2–3 A/dm² gibt das an den Kanten **Glanz**. Darüber kommt nicht genug Kupfer aus dem Bad nach → das Kupfer wächst **pulvrig, braun, rau** = „verbrannt“.
- In den **Vertiefungen** kommt zu wenig Strom an. Unter ca. 1 A/dm² wirkt Tifoos Glanzzusatz kaum → **matt rosa**.
- Glanz an den Kanten und matt in den Mulden sind also **zwei Seiten derselben ungleichen Stromverteilung**.

**Die Ursachen in Jojos Aufbau, nach Gewicht geordnet** [Einschätzung]
| # | Ursache | Wirkung | Abhilfe |
|---|---|---|---|
| 1 | **Strom zu hoch für die Fläche** (Abschnitt 1) | Kanten weit über 3 A/dm² → verbrannt | Strom = Fläche × 0,015 |
| 2 | **Aufhängung:** Stücke schief, an den Enden der Stäbe oder höher als die Anoden; ungleiche Anoden (84 und 160 cm²) | Spitzen, die zur Anode zeigen, verbrennen; eine Seite wird dicker | gerade, im mittleren Bereich, 1,5–6 cm über dem Boden hängen, umdrehen (Etappe 2, Nachtrag). *Der Aufbau mit zwei Anoden links und rechts und 5–6 cm Abstand ist an sich richtig.* |
| 3 | **Kein Chlorid** | Glanzzusatz wirkt nicht richtig → matt, schneller verbrannt | 0,1 g Salz/L (Etappe 1) |
| 4 | **Wenig Säure** (30 g/L) | Bad leitet schlechter → Strom noch stärker zu den Kanten, Mulden noch schwächer | beim Neuansatz 55 g/L testen (Etappe 1) |
| 5 | **Bad steht still**, Kristalle, konzentriert, trüb | an den Kanten fehlt Kupfer-Nachschub → verbrennt früher; Schlamm → Knötchen | Luftsprudler oder Rühren, filtern, Wasser nachfüllen, Anodenbeutel |
| 6 | **Kein Hochfahren** | am Anfang verbrennt es an der Öse/am Draht | ¼ Strom für 30–60 min |

**Fehlende Stellen** (Babyschuh, schwache Stellen an der Spitze) [Einschätzung]
- Kupfer wächst nur, wo der Leitlack **zusammenhängend** mit dem Draht verbunden ist. Eine **Insel** ohne Verbindung bleibt leer.
- Auf **Wachs** haftet Zaponlack schlecht und reißt beim Biegen; auf saugendem Leder/Stoff zieht er ein und bleibt zu dünn.
- **Abhilfe:** Vorher versiegeln, Leitlack **2 Schichten**, mit dem **Multimeter** prüfen (Etappe 3), eventuell mehrere Kontaktpunkte (zweiter Draht) und zuerst niedriger Strom. Details in Etappe 11.

**Testreihe: eine Sache nach der anderen ändern** [Einschätzung]
Immer **dasselbe Teststück** (z. B. ein Kupferblech-Streifen 2 × 5 cm, in der Mitte zu einem **V** gebogen: das Innere des V ist die „Vertiefung“, die Außenkante die „Kante“; oder immer dieselbe Blattsorte), **4 h** bei gleichem Strom:
1. **Test 1:** nur den **Strom passend zur Fläche** einstellen (1,5 A/dm²), Stück gerade im mittleren Bereich aufhängen. Das ist die wichtigste Änderung.
2. **Test 2:** + 0,1 g Salz pro Liter.
3. **Test 3:** + Bad bewegen (Luftsprudler).
4. **Test 4:** Neuansatz mit 55 g/L Säure.
Nach jedem Test: Foto, Gewicht, ins Badbuch. So sieht man, welcher Schritt wie viel bringt.

*Profis machen das mit einer „Hull-Zelle“ (schräges Blech, zeigt alle Stromdichten auf einmal). Das V-Blech ist die einfache Variante.* [Quelle: Think & Tinker via Wissensbasis]

### ✅ Checkliste Etappe 7 (neu)

- [ ] Fläche geschätzt (Rechteck × 0,65, oder Millimeterpapier), beidseitig doppelt
- [ ] Strom = Fläche × 0,015 A; erst ¼ für 30–60 min
- [ ] Zeit nach Schmuckart (Ohrringe 8–15 h, Anhänger 15–25 h, Armband/Rose 25–35 h)
- [ ] Draht im Bad mit Nagellack isoliert, nur Werkstück und Anoden blank
- [ ] Zeitschaltuhr gesetzt
- [ ] vorher/nachher gewogen, ins Badbuch mit Spannung und Temperatur
- [ ] Testreihe mit V-Blech: Geometrie → Chlorid → Bewegung → Säure

### Noch offen nach dem Briefing

- [ ] Jojo macht Test 1 und berichtet (Foto + Badbuch-Zeile)
