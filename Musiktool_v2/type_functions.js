
//Typografie Funktionen
function typeLayout1(){

  if (typeLayoutSelect.value === 'typeLayout1'){
    h1X = 0;
    h1Y = 0;
    h2X = 0;
    h2Y = height/2;
    s1X = 0;
    s1Y = height;
    subline1Direction = "bottom";
    headline2Direction = "top" ;
  } else if (typeLayoutSelect.value === 'typeLayout2'){
    h1X = 0;
    h1Y = 0;
    h2X = width/2;
    h2Y = height/2;
    s1X = 0;
    s1Y = height;
    subline1Direction = "bottom";
    headline2Direction = "top";
  } else if (typeLayoutSelect.value === 'typeLayout3'){
    h1X = 0;
    h1Y = 0;
    h2X = width/2;
    h2Y = height/2;
    s1X = width/2;
    s1Y = height;
    subline1Direction = "bottom";
    headline2Direction = "top";
  } else if (typeLayoutSelect.value === 'typeLayout4'){
    h1X = 0;
    h1Y = 0;
    h2X = width/2;
    h2Y = height/2;
    s1X = 0;
    s1Y = height;
    subline1Direction = "top"; 
    headline2Direction = "bottom";
  }
  }  

function headline(headline1positionX, headline1positionY) {
 
  let textOffset = 10;

  let headlineX = headline1positionX + textOffset; // X-Position des Texts
  let headlineY = headline1positionY + textOffset; // Y-Position der ersten Zeile


  let lineSpacing = -33; // Abstand zwischen den Zeilen

  // Textinhalt aus dem Textarea holen
  if (textArea) {
    headline1 = textArea.value;
  } else {
    headline1 = ""; // Fallback: kein Text
  }

  // Textinhalt in Zeilen aufteilen
  let lines = headline1.split("\n");

  // Textgröße einstellen
  textFont(font);
  textSize(84);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim(); // Aktuelle Zeile (Whitespace entfernen)

    if (line.length > 0) { // Nur wenn die Zeile nicht leer ist
      let lineWidth = textWidth(line); // Breite der aktuellen Zeile
      let lineHeight = textAscent() + textDescent(); // Höhe der aktuellen Zeile

      // Farbfeld zeichnen
      fill(textBgColor); // Hintergrundfarbe
      noStroke(); // Keine Umrandung
      rectMode(CORNER);
      rect(headlineX - textOffset, headlineY - textOffset + i * (lineHeight + lineSpacing), lineWidth + textOffset * 2, (lineHeight - 40) + textOffset * 2);

      // Text zeichnen
      fill(textColor); // Textfarbe
      textAlign(LEFT, TOP); // Textausrichtung
      let textHeight = textAscent() - textDescent();
      let yOffset = -textHeight / 5; // Vertikales Offset, um den Text zu zentrieren
      text(line, headlineX, yOffset + i * (lineHeight + lineSpacing));
    }
  }
}

function headlineTwo(headline2positionX, headline2positionY) {
 
  let textOffset = 10;

  let headlineX = headline2positionX + textOffset; // X-Position des Texts
  let headlineY = headline2positionY + textOffset; // Y-Position der ersten Zeile


  let lineSpacing = -33; // Abstand zwischen den Zeilen

  // Textinhalt aus dem Textarea holen
  if (textArea) {
    headline2 = textArea2.value;
  } else {
    headline2 = ""; // Fallback: kein Text
  }

  // Textinhalt in Zeilen aufteilen
  let lines = headline2.split("\n");

  // Textgröße einstellen
  textFont(font);
  textSize(84);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim(); // Aktuelle Zeile (Whitespace entfernen)

    if (line.length > 0) { // Nur wenn die Zeile nicht leer ist
      let lineWidth = textWidth(line); // Breite der aktuellen Zeile
      let lineHeight = textAscent() + textDescent(); // Höhe der aktuellen Zeile

      // Farbfeld zeichnen
      fill(textBgColor); // Hintergrundfarbe
      noStroke(); // Keine Umrandung
      rectMode(CORNER);
      rect(headlineX - textOffset, headlineY - textOffset + i * (lineHeight + lineSpacing), lineWidth + textOffset * 2, (lineHeight - 40) + textOffset * 2);

      // Text zeichnen
      fill(textColor); // Textfarbe
      textAlign(LEFT, TOP); // Textausrichtung
      let textHeight = textAscent() - textDescent();
      let yOffset = -textHeight / 2.8; // Vertikales Offset, um den Text zu zentrieren
      text(line, headlineX, headlineY + yOffset + i * (lineHeight + lineSpacing));
    }
  }
}

function sublineOne(subline1positionX, subline1positionY, subline1Direction) {
  let textOffset = 10;

  let sublineX = subline1positionX + textOffset; // X-Position des Texts
  let sublineY = subline1positionY - textOffset; // Y-Position des Bodens des Textfelds

  let lineSpacing = -10; // Abstand zwischen den Zeilen

  // Textinhalt aus dem Textarea holen
  if (textArea3) {
    subline1 = textArea3.value.trim();  // Inhalt des Textarea
  } else {
    subline1 = ""; // Fallback: kein Text
  }
 
  let finalLines = subline1.split("\n");

  if (showLogo.checked) {
  
  // Stelle sicher, dass die letzten beiden Zeilen immer "HOCHSCHULRADIO AACHEN" sind
  finalLines = finalLines.filter((line) => line.trim() !== ""); // Leere Zeilen entfernen

  finalLines.push(""); // Füge eine leere Zeile hinzu, falls nötig
  
  finalLines.push("HOCHSCHULRADIO", "AACHEN");
  
} else {

  finalLines = finalLines.filter((line) => line.trim() !== ""); // Leere Zeilen entfernen

  }

  // Textgröße einstellen
  textFont(font);
  textSize(35);

  let lineHeight = textAscent() + textDescent();
  let startY;

  // Bestimme die Startposition basierend auf der Textausrichtung
  if (subline1Direction === "bottom") {
    startY = sublineY - (finalLines.length - 1.41) * (lineHeight + lineSpacing); // Start von unten
  } else if (subline1Direction === "top") {
    startY = sublineY - height / 2 + textOffset * 4; // Start von oben
  }

  // Zeichne alle Zeilen (inkl. der letzten beiden festen Zeilen)
  for (let i = 0; i < finalLines.length; i++) {
    let line = finalLines[i].trim();

    if (line.length > 0) {
      let lineWidth = textWidth(line);

      // Bestimme die Y-Position basierend auf der Textausrichtung
      let yPos = subline1Direction === "bottom"
        ? startY + i * (lineHeight + lineSpacing) // Von unten nach oben
        : startY + i * (lineHeight + lineSpacing); // Von oben nach unten

      // Farbfeld zeichnen
      fill(textBgColor);
      noStroke();
      rectMode(CORNER);
      rect(sublineX - textOffset, yPos - lineHeight, lineWidth + textOffset * 1.8, lineHeight - textOffset / 2);

      // Text zeichnen
      fill(textColor);
      textAlign(LEFT, BASELINE);
      let textHeight = textAscent() - textDescent();
      let yOffset = -textHeight / 2.8; // Vertikales Offset, um den Text zu zentrieren
      text(line, sublineX, yPos + yOffset * 1.3);
    }
  }
}

function restrictHeadline1() {
  let maxWidth = width - (width/8); // Maximale Breite - 1/50 der Breite, damit es genau passt
  let maxHeight = height / 2 + (height/5); // Maximale Höhe + 1/5 der Höhe, damit es genau passt
  let lines = textArea.value.split("\n"); // Aktuelle Zeilen

  let validLines = [];
  let currentHeight = 0;
  textFont(font);
  textSize(75);

  for (let line of lines) {
    let lineWidth = textWidth(line);

    // Zeile kürzen, wenn sie zu breit ist
    while (lineWidth > maxWidth) {
      line = line.slice(0, -1); // Kürze Zeichen von rechts
      lineWidth = textWidth(line); // Breite erneut berechnen
    }

    let lineHeight = textAscent() + textDescent();

    // Überprüfe, ob die Höhe überschritten wird
    if (currentHeight + lineHeight > maxHeight) {
      break; // Stoppe, wenn die maximale Höhe erreicht ist
    }

    validLines.push(line);
    currentHeight += lineHeight + 10; // Zeilenhöhe + Abstand
  }

  // Aktualisiere den Text im Textfeld
  textArea.value = validLines.join("\n");
}

function restrictHeadline2() {
  let maxWidth = width / 2 - (width/15); // Maximale Breite - 1/50 der Breite, damit es genau passt
  let maxHeight = height / 2 + (height/5); // Maximale Höhe + 1/5 der Höhe, damit es genau passt
  let lines = textArea2.value.split("\n"); // Aktuelle Zeilen

  let validLines = [];
  let currentHeight = 0;
  textFont(font);
  textSize(75);

  for (let line of lines) {
    let lineWidth = textWidth(line);

    // Zeile kürzen, wenn sie zu breit ist
    while (lineWidth > maxWidth) {
      line = line.slice(0, -1); // Kürze Zeichen von rechts
      lineWidth = textWidth(line); // Breite erneut berechnen
    }

    let lineHeight = textAscent() + textDescent();

    // Überprüfe, ob die Höhe überschritten wird
    if (currentHeight + lineHeight > maxHeight) {
      break; // Stoppe, wenn die maximale Höhe erreicht ist
    }

    validLines.push(line);
    currentHeight += lineHeight + 10; // Zeilenhöhe + Abstand
  }

  // Aktualisiere den Text im Textfeld
  textArea2.value = validLines.join("\n");
}

function restrictSubline1() {
  let maxWidth = width / 2 + (width*0.5); // Maximale Breite - 1/50 der Breite, damit es genau passt
  let maxHeight = height / 2 + (height*0.5); // Maximale Höhe + 1/5 der Höhe, damit es genau passt
  let lines = textArea3.value.split("\n"); // Aktuelle Zeilen

  let validLines = [];
  let currentHeight = 0;
  textFont(font);
  textSize(75);

  for (let line of lines) {
    let lineWidth = textWidth(line);

    // Zeile kürzen, wenn sie zu breit ist
    while (lineWidth > maxWidth) {
      line = line.slice(0, -1); // Kürze Zeichen von rechts
      lineWidth = textWidth(line); // Breite erneut berechnen
    }

    let lineHeight = textAscent() + textDescent();

    // Überprüfe, ob die Höhe überschritten wird
    if (currentHeight + lineHeight > maxHeight) {
      break; // Stoppe, wenn die maximale Höhe erreicht ist
    }

    validLines.push(line);
    currentHeight += lineHeight + 10; // Zeilenhöhe + Abstand
  }

  // Aktualisiere den Text im Textfeld
  textArea3.value = validLines.join("\n");
}
