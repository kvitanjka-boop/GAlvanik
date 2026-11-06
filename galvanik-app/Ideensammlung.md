# Galvanik-Simulations-App: Ideensammlung

## Grundidee

Eine App, die den gesamten Galvanik- und Elektroforming-Prozess abbildet. Der Nutzer sieht Parameter, kann sie verändern, und das Endresultat passt sich live an. Die App dient dazu, Vorgänge zu prüfen, zu verstehen und zu planen.

## Parameter der ersten Version

- Stromstärke
- Abscheidezeit
- Badtemperatur
- Fläche des Werkstücks
- Elektrodenabstand (ab Version 2)

## Grafische Darstellung

- Querschnitt des Beckens mit Anode, Kathode, Elektrolyt und Ionenfluss
- Prozess in einzelne Teile aufgeteilt, die man per Klick genauer ansehen kann
- Anzeige des Endresultats: berechnete Schichtdicke

## Berechnungsgrundlage

- Faradaysches Gesetz für die Schichtdicke
- Stromausbeute als Korrekturfaktor
- Vereinfachte Stromverteilung: Kanten dicker, Vertiefungen dünner
- Elektrodenabstand verstärkt oder mildert diesen Unterschied (näher = ungleichmäßiger)

## Startannahme

- Kupferabscheidung im sauren Kupferbad
- Umsetzung als kleine Web-App

## Wünsche aus Jojos Praxis (26.10.2026)

- Ganzen Prozess bildlich zeigen, Beispiel: lackiertes Baumblatt 4 × 5 cm, einseitig, im Bad
- Zeigen, wie Stromdichte (Ampere/Volt), Elektrolytzusammensetzung und -zustand (Säure, Temperatur) und Abstand Anode–Werkstück den Kupferionen-Transport und die Beschichtung beeinflussen
- Größe des Werkstücks eingeben und daraus den Schmucktyp ableiten (Ohrhänger oder Kettenanhänger)
- Grundlage: Jojos Etappen in `electroforming-recherche/Erfahrungen-Jojo.md`

## Offene Fragen

- Weitere Metalle wie Nickel oder Silber?
