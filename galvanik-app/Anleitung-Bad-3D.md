# Galvanik-Bad 3D: Anleitung

Stand: 29. Oktober 2026

## 1. Die Desktop-App öffnen (Windows)

1. `Galvanik-Bad-3D.exe` aus dem Ordner `galvanik-app` herunterladen, zum Beispiel auf den Desktop.
2. Doppelklick auf die Datei. Es muss nichts installiert werden.
3. Beim ersten Start zeigt Windows vielleicht „Der Computer wurde durch Windows geschützt“. Das kommt, weil das Programm nicht bei Microsoft registriert ist. Auf **Weitere Informationen** klicken, dann auf **Trotzdem ausführen**.
4. Das Fenster „Galvanik-Bad 3D“ geht auf. Zum Beenden einfach das Fenster schließen.

Die App braucht kein Internet. Sie nutzt die Anzeige, die in Windows 10 und 11 schon eingebaut ist (WebView2).

**Mac:** Es gibt auch eine Mac-Version. Bei Bedarf einfach sagen, dann lege ich sie dazu. Notlösung für jeden Rechner: `bad-3d-quelltext/Galvanik-Bad-3D.html` mit Doppelklick öffnen. Dann läuft dieselbe App im Browser.

## 2. Bedienung

| Was | Wie |
|---|---|
| Drehen und kippen | linke Maustaste gedrückt halten und ziehen |
| Verschieben | rechte Maustaste gedrückt halten und ziehen |
| Zoomen | Mausrad |
| Teil bearbeiten | Teil anklicken (Anode, Werkstück, Netzgerät, Bad, Heizstab, Stäbe, Draht) oder oben rechts die Knöpfe nutzen |
| Anode oder Werkstück verschieben | erst anklicken (blauer Rahmen), dann mit der Maus ziehen |
| Feste Ansichten | Knöpfe „Schräg“, „Vorne“, „Oben“, „Seite“ |
| Aufbau laden | „Mein Aufbau heute“ (Werte aus dem Briefing) oder „Vorschlag aus Etappe 2 und 7“ |
| Einhängen | „Werkstück einhängen“: Das Stück senkt sich ins Bad, dazu kommt der Hinweis zum Draht |

Rechts steht zu jedem Teil, was man ändern kann: Größe, Position, Abstand zum Werkstück, Strom, Badzeit, Temperatur, Rezept pro Liter, Drahtdicke. Alles wird sofort neu gerechnet und im Bild gezeigt.

**Farben am Werkstück:** orange glänzend = gut, rosa = matt rosa (zu wenig Strom an dieser Stelle), dunkelbraun = verbrannt (zu viel Strom). Die blauen Punkte sind Kupfer-Ionen auf dem Weg von den Anoden zum Werkstück. Je mehr Strom, desto mehr und schneller.

**Unten rechts:** Schichtdicke, Stromdichte, Spannung, Kupfermenge, Zeit bis zur Zielschicht, eine Tabelle für Kante, Seiten und Vertiefung und eine Liste mit Hinweisen.

## 3. Das Rechenmodell

Es ist dasselbe Modell wie im Browser-Simulator (`galvanik-simulator.html`):

- Faraday: 1,186 g Kupfer pro Amperestunde, Dichte 8,96 g/cm³, Stromausbeute 98 %. Kurz vor der Grenzstromdichte sinkt die Ausbeute.
- Grenzstromdichte ca. 3 A/dm² bei 22 °C, plus 2,5 % pro °C. Ohne Chlorid 20 % weniger, mit Luftsprudler mehr.
- Kanten bekommen mehr Strom, Vertiefungen weniger. Der Unterschied wird größer bei hohem Strom, kleinem Abstand, wenig Säure und wenn die Anode nicht genau gegenüber steht.

Neu in der 3D-App:

- Beide Anoden lassen sich einzeln verschieben. Der Abstand jeder Anode zum Werkstück wird aus der Lage berechnet.
- Nur der Teil einer Anode, der im Elektrolyt steht, zählt.
- Steht eine Anode nicht gegenüber vom Werkstück (seitlich oder zu tief), bekommt sie weniger Strom und die Verteilung wird ungleicher.
- Bei beidseitigen Stücken bekommt die Seite zur näheren oder größeren Anode mehr Kupfer.
- Der Draht zählt bis zur Oberkante des Werkstücks mit, solange er nicht isoliert ist.

Alles sind Schätzungen zum Vergleichen und Planen. Eine Probe im echten Bad ersetzen sie nicht.

## 4. Die schöne Animation (Blender)

- `galvanik-bad-animation.mp4`: fertiges Video, 12 Sekunden Drehansicht um das Bad mit dem Stromfluss.
- `galvanik_bad_animation.py`: das Skript, das das Modell in Blender baut und das Video rendert.

**Selbst rendern:**

1. Blender herunterladen (kostenlos, blender.org) und öffnen.
2. Oben auf den Reiter **Scripting** klicken.
3. Im Textfeld auf **Öffnen** klicken und `galvanik_bad_animation.py` wählen.
4. Auf das Dreieck **Skript ausführen** klicken. Das Bad wird gebaut.
5. **F12** zeigt ein einzelnes Bild, **Strg+F12** rendert das ganze Video. Es landet neben der .blend-Datei. Vorher speichern.

Ganz oben im Skript stehen die Maße (`MASSE`) und die Video-Einstellungen (`VIDEO`). Dort kann man Zahlen ändern, zum Beispiel `"draht_isoliert": True` oder eine andere Blattgröße, und das Skript neu ausführen. Ein Video mit 1280 × 720 Bildpunkten braucht auf einem normalen Laptop ein bis drei Stunden. Mit `"samples": 8` geht es schneller, sieht aber körniger aus.

## Dateien

| Datei | Wofür |
|---|---|
| `Galvanik-Bad-3D.exe` | die Desktop-App für Windows |
| `galvanik-bad-animation.mp4` | die fertige Animation |
| `galvanik_bad_animation.py` | Blender-Skript |
| `bad-3d-quelltext/` | Quelltext der App und die Notlösung als HTML-Datei |
