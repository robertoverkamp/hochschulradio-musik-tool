let amount;
let svg;
let polygonSides = 3;
let characterSlider;
let amountSlider;
let mood;
let moodSelect;
let scaleFactor;
let scaleSlider;
let flowSelect;
let formatSelect;
let imageDownload;
let videoDownload;
let canvas;
let mediaRecorder;
let recordedChunks = [];
let recording = false;
let totalFrames = 600; 
let currentFrame = 0;
let tempo;
let musicTempo;
let tempoSlider;
let typeLayoutSelect;
let showLogo;
let minAmount = 1;
let amountBase;
let imageContainer;
let rotationAngle;
let amountMultiplikator;

//Einfärbung der Bilder
let tintColor; // Variable für Tint-Farbe
let lastMoodValue = ""; // Speichert die letzte ausgewählte Stimmung


let img;
let img2;
let showImage;
let form;

//typografie
let font; // Globale Variable für die Schriftart
let textArea;
let textArea2;
let textArea3;
let headline1;
let textFields = []; // Array für alle Textfelder

let h1X;
let h1Y;
let h2X;
let h2Y;
let s1X;
let s2X;

let subline1Direction = "";
let headline2Direction = "";

let textColor;
let textBgColor;




function preload() {
  // Schriftart korrekt laden
  font = loadFont('ESKlarheitPlakat-Blk.ttf'); // Pfad zur Schriftartdatei
}

function handleImageUpload(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      loadImage(e.target.result, (loadedImage) => {
        img = loadedImage; // Ersetze das Bild
        grayImage = null;  // Cache zurücksetzen, damit ein neues Graustufenbild erstellt wird
        lastMoodValue = ""; // Stimmung zurücksetzen, um einen neuen Tint-Effekt auszulösen
        imageContainer.style.display = 'block';
        showImage.checked = true;
      });
    };
    reader.readAsDataURL(file);
  }
}


function setup() {
  frameRate(60);
  canvas = createCanvas(800, 800);
  canvas.parent("canvasWrapper");

  characterSlider = document.getElementById('characterSlider');
  amountSlider = document.getElementById('amountSlider');
  moodSelect = document.getElementById('moodSelect');
  mood = moodColors();
  scaleSlider = document.getElementById('sizeSlider');
  flowSelect = document.getElementById('flowSelect');

  formatSelect = document.getElementById('format');
  formatSelect.addEventListener('change', handleFormatChange);

  imageDownload = document.getElementById('imgDownload');
  imageDownload.addEventListener('click', saveImage);

  videoDownload = document.getElementById('videoDownload');
  videoDownload.addEventListener('click', saveVideo);

  tempoSlider = document.getElementById('tempoSlider');

  showImage = document.getElementById('showImage');
  imageContainer = document.getElementById('imageContainer');

  // Event-Listener für Bild-Upload hinzufügen
  let uploadElement = document.getElementById("imageUpload");
  uploadElement.addEventListener("change", handleImageUpload);


  // Ab hier beginnt der typografie Part

  textArea = document.getElementById('headlineText');

  textArea.addEventListener('input', () => {
    textArea.value = textArea.value.toUpperCase();
    restrictHeadline1(); // Begrenzung prüfen
  });


  textArea2 = document.getElementById('headline2Text');
  textArea2.addEventListener('input', () => {
    textArea2.value = textArea2.value.toUpperCase();
    restrictHeadline2(); // Begrenzung prüfen
  });

  textArea3 = document.getElementById('subline1Text');
  textArea3.addEventListener('input', () => {
    textArea3.value = textArea3.value.toUpperCase();
    restrictSubline1(); // Begrenzung prüfen
  });


  textFields = document.querySelectorAll("#headlineText, #headline2Text, #subline1Text");

  typeLayoutSelect = document.getElementById('typeLayoutSelect');

  showLogo = document.getElementById('showLogo');
  imageContainer.style.display = 'none';
}



function draw() {

  if (formatSelect.value === "rect") {
    minAmount = 1;
    amountMultiplikator = 1;
  } else if (formatSelect.value === "reel") {
    minAmount = 1;
    amountMultiplikator = 1;
  } else if (formatSelect.value === "poster") {
    minAmount = 1;
    amountMultiplikator = 1;
  } else if (formatSelect.value === "banner") {
    minAmount = 2;
    amountMultiplikator = 2;
  }

  amountBase = map(amountSlider.value, 0, 100, minAmount, 21) * amountMultiplikator;



  // Berechne die Anzahl der Spalten und Reihen basierend auf der Canvas-Größe
  let tileSize = width / amountBase; // Zellgröße basierend auf Canvas-Breite
  let amountX = int(width / tileSize); // Anzahl der Spalten
  let amountY = int(height / tileSize); // Anzahl der Reihen

  scaleFactor = map(scaleSlider.value, 0, 100, 0.09, 2.3);

  // Setze den Hintergrund basierend auf der Mood-Selection

    if (moodSelect.value === 'color1') {
    background(0);
    fill(mood.color1[0]);
    textBgColor = mood.color1[2];
    textColor = mood.color1[0];
    tintColor = 255, 255, 255; // Farbe für Tint setzen
  } else if (moodSelect.value === 'color2') {
    background(mood.color2[0]);
    fill(mood.color2[1]);
    textBgColor = mood.color2[0];
    textColor = mood.color2[2];
    tintColor = hexToRGB(mood.color2[0]); 
}   else if (moodSelect.value === 'color3') {
    background(mood.color3[0]);
    fill(mood.color3[1]);
    textBgColor = mood.color3[1];
    textColor = 0;
    tintColor = hexToRGB(mood.color3[0]);
}   else if (moodSelect.value === 'color4') {
    background(mood.color4[0]);
    fill(mood.color4[2]);
    textBgColor = mood.color4[1];
    textColor = mood.color4[3];
    tintColor = hexToRGB(mood.color4[3]);
  } else if (moodSelect.value === 'color5') {
    background(mood.color5[0]);
    fill(mood.color5[2]);
    textBgColor = mood.color5[1];
    textColor = mood.color5[2];
    tintColor = hexToRGB(mood.color5[0]);
  } else if (moodSelect.value === 'color6') {
    background(mood.color6[0]);
    fill(mood.color6[1]);
    textBgColor = mood.color6[0];
    textColor = mood.color6[1];
    tintColor = hexToRGB(mood.color6[0]);
  } else if (moodSelect.value === 'color7') {
    background(mood.color7[2]);
    fill(mood.color7[1]);
    textBgColor = mood.color7[2];
    textColor = mood.color7[0];
    tintColor = hexToRGB(mood.color7[2]);
  } else if (moodSelect.value === 'color8') {
    background(mood.color8[0]);
    fill(mood.color8[1]);
    textBgColor = mood.color8[2];
    textColor = mood.color8[0];
    tintColor = hexToRGB(mood.color8[0]);
  } else if (moodSelect.value === 'color9') {
    background(mood.color9[0]);
    fill(mood.color9[2]);
    textBgColor = mood.color9[1];
    textColor = mood.color9[0];
    tintColor = hexToRGB(mood.color9[0]);
  }

if (img && showImage.checked) {

  let canvasAspect = width / height; // Verhältnis des Canvas
  let imgAspect = img.width / img.height; // Verhältnis des Bildes

  let drawWidth, drawHeight;

   // Vergleiche das Verhältnis des Bildes mit dem Canvas
   if (canvasAspect > imgAspect) {
    // Breiter Canvas: Bildhöhe anpassen, Breite überragen lassen
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    // Höherer Canvas: Bildbreite anpassen, Höhe überragen lassen
    drawWidth = height * imgAspect;
    drawHeight = height;
  }

  if (moodSelect.value !== lastMoodValue) {
    // Aktualisiere nur, wenn sich die Stimmung ändert
    lastMoodValue = moodSelect.value;
    grayImage = createGrayImage(); // Erstelle Graustufenbild nur einmal
  }

  if (grayImage) {

    imageMode(CENTER);
    tint(tintColor); // Einfärben des Bildes
    image(grayImage, width / 2, height / 2, drawWidth, drawHeight); // Bild zeichnen
    noTint(); // Nach dem Zeichnen kein Tint anwenden, um andere Bilder nicht zu beeinflussen
  }
}


  noStroke();

  push();
  characterGrid(amountX, amountY);
  pop();

  push();
  typeLayout1();
  headline(h1X, h1Y); // Zeichnet die Überschrift (Text und Rechtecke)
  headlineTwo(h2X, h2Y, headline2Direction); // Zeichnet die Überschrift (Text und Rechtecke)
  sublineOne(s1X, s1Y, subline1Direction);
  pop();

  if (recording) {
    currentFrame++;
    if (currentFrame >= totalFrames) {
      stopRecording();
    }
  }
}



function characterGrid(amountX, amountY) {

  let tileWidth = width / amountX;  // Zellbreite basierend auf der Canvas-Breite
  let tileHeight = height / amountY; // Zellhöhe basierend auf der Canvas-Höhe
  let size = min(tileWidth, tileHeight) * scaleFactor; // Größe der Elemente (Skalierungsfaktor angewendet)
  let tempo = map(tempoSlider.value, 0, 100, 0.01, 2);

  push();
  translate(tileWidth / 2, tileHeight / 2); // Zentriere jedes Polygon in der Zelle

  for (let x = 0; x < amountX; x++) {
    for (let y = 0; y < amountY; y++) {
      let centerX = tileWidth * x;
      let centerY = tileHeight * y;

      let adjustedSize = size;
      let xPositionUpdate = centerX;

      // Flow Zustand abfragen
      if (flowSelect.value === 'noise') {
        let noiseValue = noise(x * 0.1, y * 0.1, frameCount * (tempo/20));
        let scaleFactor = map(noiseValue, 0, 1, 0.01, 2);
        adjustedSize = size * scaleFactor;
      } else if (flowSelect.value === 'flow') {
        let sinMovement = sin(radians(frameCount * tempo + x * 10 + y * 20)) * 100;
        xPositionUpdate = centerX + sinMovement;
      } else if (flowSelect.value === 'pulse') {
        let posX = floor(amountX / 2) * tileWidth;
        let posY = floor(amountY / 2) * tileHeight;
        let distanceToCenter = dist(centerX, centerY, posX, posY);
        adjustedSize = size * map(sin((frameCount * (tempo*3)) / -30 + distanceToCenter / 60), -1, 1, 0.1, 1.3);
      } else if (flowSelect.value === 'tischtuch') {      
        let timeFactor = sin((frameCount * (tempo/15)) + (x * 0.08) + (y * 0.08));
        let scaleFactor = map(timeFactor, -1, 1, 0.2, 2);
        // Organische Wellenbewegung für Kreise
        adjustedSize = size * scaleFactor;
      }
      
      // Wähle die geometrische Form basierend auf dem Slider-Wert
      let sliderValue = parseInt(characterSlider.value);
      if (sliderValue <= 7) {
        triangle3(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 7 && sliderValue <= 14) {
        polygon4(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 14 && sliderValue <= 21) {
        polygon8(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 21 && sliderValue <= 28) {
        ellipse(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 28 && sliderValue <= 35) {
        Kleeblatt(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 35 && sliderValue <= 42) {
        wurfsternRund(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 42 && sliderValue <= 49) {
        fish(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 49 && sliderValue <= 56) {
        sound(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 56 && sliderValue <= 63) {
        sternRund(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 63 && sliderValue <= 70) {
        batman(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 70 && sliderValue <= 77) {
        reverseO(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 77 && sliderValue <= 84) {
        chip(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 84 && sliderValue <= 91) {
        starship(xPositionUpdate, centerY, adjustedSize);
      } else if (sliderValue > 91 && sliderValue <= 100) {
        wurfstern(xPositionUpdate, centerY, adjustedSize);
      }
   }
  }
  pop();
  
}


function createGrayImage() {
  // Graustufen-Kopie des Bildes erstellen
  let grayImg = createImage(img.width, img.height);
  grayImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  grayImg.filter(GRAY); // Graustufenfilter anwenden
  return grayImg;
}


function hexToRGB(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b]; // Rückgabe als RGB-Array
}


function polygon8(x, y, size){
  let sides = 8; // Anzahl der Ecken

  noStroke();

  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / sides) {
    let px = x + cos(i) * (size/2); // Berechne Eckpunkte relativ zu x, y
    let py = y + sin(i) * (size/2);
    vertex(px, py);
  }
  endShape(CLOSE);
}

function triangle3(x, y, size) {
  let halfSize = size/2; // Größe für die Berechnung der Eckpunkte

  // Zeichne das Dreieck relativ zu x, y
  triangle(
    x, y - halfSize,           // Oberer Punkt
    x + halfSize, y + halfSize, // Rechter unterer Punkt
    x - halfSize, y + halfSize  // Linker unterer Punkt
  );
}

function polygon4(x, y, size) {
  let sides = 4; // Anzahl der Ecken

  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / sides) {
    let px = x + cos(i) * size/2; // Berechne Eckpunkte relativ zu x, y
    let py = y + sin(i) * size/2;
    vertex(px, py);
  }
  endShape(CLOSE);
}

function handleFormatChange() {
  const artboard = document.getElementById("artboard"); // Artboard-Element abrufen

  // Verhalten je nach Auswahl im Dropdown
  if (formatSelect.value === 'rect') {
    resizeCanvas(800, 800); // Quadratisches Format
    artboard.style.scale = "0.96"; // Standard-Skalierung
  } else if (formatSelect.value === 'reel') {
    resizeCanvas(600, 1067); // Hochformat
    artboard.style.scale = "0.72"; // Kleinere Skalierung für REEL

  } else if (formatSelect.value === 'poster') {
    resizeCanvas(566, 800); 
    // resizeCanvas(437, 800); 
    artboard.style.scale = "0.96";

  } else if (formatSelect.value === 'banner') {
    resizeCanvas(800, 200); 
    artboard.style.scale = "0.96";
    
  } else {
    resizeCanvas(800, 800); // Standard-Fall
    artboard.style.scale = "0.96"; // Standard-Skalierung
  }
}

function saveImage() {
  saveCanvas('canvas', 'png');  // Canvas als PNG speichern
}


// Von diesem Code verstehe ich gar nichts


function saveVideo() {
  if (!recording) {
    // Initialisiere den MediaRecorder für den Canvas-Stream
    let stream = canvas.elt.captureStream(60);
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    // Event: Frame-Daten sammeln
    mediaRecorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Event: Aufnahme beenden und speichern
    mediaRecorder.onstop = saveRecording;

    // Starte die Aufnahme
    recordedChunks = [];
    recording = true;
    currentFrame = 0;
    mediaRecorder.start();
    console.log("Videoaufnahme gestartet...");
  }
}

function stopRecording() {
  console.log("Videoaufnahme beendet.");
  recording = false;
  mediaRecorder.stop();
}

function saveRecording() {
  // Video als Blob speichern
  let blob = new Blob(recordedChunks, { type: "video/webm" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "canvas_recording.webm";
  a.click();
  URL.revokeObjectURL(url);
  console.log("Video gespeichert!");
}

function Kleeblatt(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(454, 354);
  bezierVertex(405.73, 298.8, 800, 0, 400, 0);
  bezierVertex(0, 0, 394.27, 298.8, 346, 354);
  bezierVertex(300.86, 405.62, 0, 0, 0, 400);
  bezierVertex(0, 800, 300.86, 394.38, 346, 446);
  bezierVertex(394.27, 501.2, 0, 800, 400, 800);
  bezierVertex(800, 800, 405.73, 501.2, 454, 446);
  bezierVertex(499.14, 394.38, 800, 800, 800, 400);
  bezierVertex(800, 0, 499.14, 405.62, 454, 354);
  endShape(CLOSE);
  
  pop();
}

function wurfsternRund(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(621,342);
  bezierVertex(590.59,380.8,557.64,401.99,509.65999999999997,390.67);
  bezierVertex(486.02,385.09000000000003,463.08,376.42,446,363);
  bezierVertex(425.16,346.63,413.6,317.95,407.24,289.17);
  bezierVertex(398.24,248.46,418,199,454.4,178.88);
  bezierVertex(533.83,134.95,513.86,0.81,400,0.02);
  vertex(400,0);
  bezierVertex(399.83,0,399.67,0,399.5,0);
  bezierVertex(399.33,0,399.17,0,399,0);
  vertex(399,0.02);
  bezierVertex(285.14,0.81,265.16999999999996,134.95000000000002,344.61,178.88000000000002);
  bezierVertex(381,199.00000000000003,400.76,248.46000000000004,391.77,289.17);
  bezierVertex(385.40999999999997,317.95000000000005,373.84,346.63,353.01,363);
  bezierVertex(335.93,376.42,312.99,385.1,289.35,390.67);
  bezierVertex(241.36,401.99,208.42000000000002,380.8,178.01000000000002,342);
  bezierVertex(120,268,-1,303.2,-1,400);
  bezierVertex(-1,496.8,120,532,178,458);
  bezierVertex(208.41,419.2,241.36,398.01,289.34000000000003,409.33);
  bezierVertex(312.98,414.90999999999997,335.92,423.58,353,437);
  bezierVertex(373.84,453.37,385.4,482.05,391.76,510.83);
  bezierVertex(400.76,551.54,381,601,344.6,621.12);
  bezierVertex(265.16,665.04,285.13,799.19,398.99,799.98);
  vertex(398.99,800);
  bezierVertex(399.16,800,399.32,800,399.49,800);
  bezierVertex(399.66,800,399.82,800,399.99,800);
  vertex(399.99,799.98);
  bezierVertex(513.85,799.19,533.82,665.05,454.38,621.12);
  bezierVertex(417.99,601,398.23,551.54,407.22,510.83);
  bezierVertex(413.58000000000004,482.04999999999995,425.15000000000003,453.37,445.98,437);
  bezierVertex(463.06,423.58,486,414.9,509.64,409.33);
  bezierVertex(557.63,398.01,590.5699999999999,419.2,620.98,458);
  bezierVertex(678.98,532,799.98,496.8,799.98,400);
  bezierVertex(799.98,303.2,678.98,268,620.98,342);
  endShape();
  
  
  pop();
}

function sternRund(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(552.02,251.02);
  bezierVertex(514.03,203.02,476.06,0.15,400.06,0);
  vertex(400.06,0);
  bezierVertex(324.06,0.13,286.03,202.98,248.02,250.98);
  bezierVertex(212.81,295.45,-0.99,307.94,-1,399.94);
  bezierVertex(-1.01,491.94,212.78,504.5,247.98,548.98);
  bezierVertex(285.96999999999997,596.99,323.94,799.85,399.94,800);
  vertex(399.94,800);
  bezierVertex(475.94,799.87,513.97,597.02,551.98,549.02);
  bezierVertex(587.2,504.54999999999995,800.99,492.06,801,400.05999999999995);
  bezierVertex(801.01,308.0599999999999,587.22,295.49999999999994,552.02,251.01999999999995);
  endShape();
  pop();
}

function wurfstern(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(668.01,346);
  bezierVertex(668.01,346,458.33,156.77,448.01,139);
  bezierVertex(431.17,110,399.5,2.1100000000000136,399.5,2.1100000000000136);
  bezierVertex(399.5,2.1100000000000136,367.83,109.99000000000001,350.99,139);
  bezierVertex(340.67,156.77,130.99,346,130.99,346);
  vertex(-1,400);
  vertex(131,454);
  bezierVertex(131,454,340.68,643.23,351,661);
  bezierVertex(367.84,690,399.51,797.89,399.51,797.89);
  bezierVertex(399.51,797.89,431.18,690.01,448.02,661);
  bezierVertex(458.34,643.23,668.02,454,668.02,454);
  vertex(800.02,400);
  vertex(668.02,346);
  endShape();
  
  
  pop();
}

function starship(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(500,364);
  bezierVertex(492.14,350.47,473.46,286.04,454.28,215.06);
  bezierVertex(430.15,125.8,399.5,2.28,399.5,2.28);
  bezierVertex(399.5,2.28,368.85,125.79,344.72,215.06);
  bezierVertex(325.53000000000003,286.04,306.85,350.47,299,364);
  bezierVertex(288.68,381.77,-1,400,-1,400);
  bezierVertex(-1,400,288.68,418.23,299,436);
  bezierVertex(306.86,449.53,325.54,513.96,344.72,584.94);
  bezierVertex(368.85,674.21,399.5,797.72,399.5,797.72);
  bezierVertex(399.5,797.72,430.15,674.21,454.28,584.94);
  bezierVertex(473.46999999999997,513.96,492.15,449.5300000000001,500,436.00000000000006);
  bezierVertex(510.32,418.2300000000001,800,400.00000000000006,800,400.00000000000006);
  bezierVertex(800,400.00000000000006,510.32,381.77000000000004,500,364.00000000000006);
  endShape();
  
  pop();
}

function batman(x, y, size) {
push();
translate(x, y);  // Zentriere die Form an den übergebenen Positionen
scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)

beginShape();
vertex(600,600);
bezierVertex(196,502,800,400,800,400);
bezierVertex(800,400,196,298,600,200);
bezierVertex(686.4,179.04,565.02,208.84,482,159);
bezierVertex(421.07,122.43,400,0,400,0);
bezierVertex(400,0,378.93,122.43,318,159);
bezierVertex(234.98000000000002,208.84,113.6,179.04,200,200);
bezierVertex(604,298,0,400,0,400);
bezierVertex(0,400,604,502,200,600);
bezierVertex(113.6,620.96,234.98,591.16,318,641);
bezierVertex(378.93,677.57,400,800,400,800);
bezierVertex(400,800,421.07,677.5699999999999,482,641);
bezierVertex(565.02,591.16,686.4,620.96,600,600);
endShape();
pop();
}

function holyRect(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(400,0);
  vertex(0,400);
  vertex(400,800);
  vertex(800,400);
  vertex(400,0);
  endShape();
  vertex(400,652.84);
  bezierVertex(400,513.2,286.8,400,147.16,400);
  bezierVertex(286.79999999999995,400,400,286.8,400,147.16);
  bezierVertex(400,286.79999999999995,513.2,400,652.84,400);
  bezierVertex(513.2,400,400,513.2,400,652.84);
  endShape();
  
  pop();
  }

function chip(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  beginShape();
vertex(724,347.06);
bezierVertex(669.68,348.15,698.31,378.06,668,378.06);
bezierVertex(634,378.06,604,316.06,547,316.06);
bezierVertex(486.87,316.06,506,380.06,480,381.06);
bezierVertex(456.76,381.95,419.24,404.9,420,369.06);
bezierVertex(420.66,338.18,491.84000000000003,308.05,493,251.06);
bezierVertex(494,202.06,417,174.32999999999998,417,132.06);
bezierVertex(417,113.47,458.85,85.65,459,62.06);
bezierVertex(459.21,29.39,400,0.5700000000000003,400,0.5700000000000003);
bezierVertex(392.27,4.4,341.78,29.38,341.99,62.06);
bezierVertex(342.14,85.65,383.99,113.47,383.99,132.06);
bezierVertex(383.99,174.33,306.99,202.06,307.99,251.06);
bezierVertex(309.15000000000003,308.05,380.33000000000004,338.18,380.99,369.06);
bezierVertex(381.75,404.9,344.23,381.95,320.99,381.06);
bezierVertex(294.99,380.06,314.12,316.06,253.99,316.06);
bezierVertex(196.99,316.06,166.99,378.06,132.99,378.06);
bezierVertex(102.68,378.06,131.31,348.15,76.99000000000001,347.06);
bezierVertex(26.98,346.06,-0.02,400.06,-0.02,400.06);
bezierVertex(-0.02,400.06,26.98,454.06,76.98,453.06);
bezierVertex(131.3,451.97,102.67,422.06,132.98000000000002,422.06);
bezierVertex(166.98000000000002,422.06,196.98000000000002,484.06,253.98000000000002,484.06);
bezierVertex(314.11,484.06,294.98,420.06,320.98,419.06);
bezierVertex(344.22,418.17,381.74,395.22,380.98,431.06);
bezierVertex(380.32,461.94,309.14,492.07,307.98,549.06);
bezierVertex(306.98,598.06,383.98,625.79,383.98,668.06);
bezierVertex(383.98,686.65,342.13,714.4699999999999,341.98,738.06);
bezierVertex(341.77000000000004,770.7299999999999,392.26,795.7199999999999,399.99,799.55);
bezierVertex(399.99,799.55,459.2,770.74,458.99,738.06);
bezierVertex(458.84000000000003,714.4699999999999,416.99,686.65,416.99,668.06);
bezierVertex(416.99,625.79,493.99,598.06,492.99,549.06);
bezierVertex(491.83,492.06999999999994,420.65,461.93999999999994,419.99,431.05999999999995);
bezierVertex(419.23,395.2199999999999,456.75,418.16999999999996,479.99,419.05999999999995);
bezierVertex(505.99,420.05999999999995,486.86,484.05999999999995,546.99,484.05999999999995);
bezierVertex(603.99,484.05999999999995,633.99,422.05999999999995,667.99,422.05999999999995);
bezierVertex(698.3,422.05999999999995,669.67,451.96999999999997,723.99,453.05999999999995);
bezierVertex(773.99,454.05999999999995,800.99,400.05999999999995,800.99,400.05999999999995);
bezierVertex(800.99,400.05999999999995,773.99,346.05999999999995,723.99,347.05999999999995);
endShape();

  
  pop();
  }

function blob(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(800,400);
  bezierVertex(800,320,562.95,346.79,560,299);
  bezierVertex(555,218,759,143,700,79);
  bezierVertex(641,15,540,158,491,99);
  bezierVertex(442,40,461,0,400,0);
  bezierVertex(339,0,358,40,309,99);
  bezierVertex(260,158,159,15,100,79);
  bezierVertex(41,143,245,218,240,299);
  bezierVertex(237.05,346.79,0,320,0,400);
  bezierVertex(0,480,237.05,453.21,240,501);
  bezierVertex(245,582,41,657,100,721);
  bezierVertex(159,785,260,642,309,701);
  bezierVertex(358,760,339,800,400,800);
  bezierVertex(461,800,442,760,491,701);
  bezierVertex(540,642,641,785,700,721);
  bezierVertex(759,657,555,582,560,501);
  bezierVertex(562.95,453.21,800,480,800,400);
  endShape();
  
  pop();
  }

function sound(x, y, size) {
  push();
  translate(x, y);  // Zentriere die Form an den übergebenen Positionen
  scale(size / 800);  // Skaliere die Form auf die gewünschte Größe
  translate(-400, -400); // Verschiebe das Zentrum der Form auf (0, 0)
  
  beginShape();
  vertex(687,370);
  vertex(620,311);
  vertex(579,360);
  vertex(533,184);
  vertex(479,352);
  vertex(400,0);
  vertex(321,352);
  vertex(267,184);
  vertex(221,360);
  vertex(180,311);
  vertex(113,370);
  vertex(0,400);
  vertex(113,430);
  vertex(180,489);
  vertex(221,440);
  vertex(267,616);
  vertex(321,448);
  vertex(400,800);
  vertex(479,448);
  vertex(533,616);
  vertex(579,440);
  vertex(620,489);
  vertex(687,430);
  vertex(800,400);
  vertex(687,370);
  endShape();
  
  
  pop();
}

function kiss (x, y, size) {
push();
translate(x, y); 
scale(size / 800); 
translate(-400, -400);

beginShape();
vertex(663,400);
bezierVertex(760.47,400,826.55,299.4,786.3199999999999,210.62);
bezierVertex(735.9499999999999,99.46000000000001,508.37999999999994,359.59000000000003,469.1499999999999,316);
bezierVertex(432.4799999999999,275.26,711.02,53.39999999999998,577.1899999999999,7.3700000000000045);
bezierVertex(489.91999999999996,-22.639999999999997,399.15,42.82000000000001,399.15,135.11);
bezierVertex(399.15,42.83000000000001,308.38,-22.639999999999986,221.10999999999999,7.370000000000019);
bezierVertex(87.27999999999997,53.40000000000002,365.80999999999995,275.26,329.15,316);
bezierVertex(289.92,359.59,62.35,99.47,11.98,210.62);
bezierVertex(-28.249999999999996,299.4,37.83,400,135.29999999999998,400);
bezierVertex(37.829999999999984,400,-28.25000000000003,500.6,11.97999999999999,589.38);
bezierVertex(62.34999999999999,700.54,289.91999999999996,440.40999999999997,329.15,484);
bezierVertex(365.82,524.74,87.27999999999997,746.6,221.10999999999996,792.63);
bezierVertex(308.37999999999994,822.65,399.15,757.18,399.15,664.89);
bezierVertex(399.15,757.17,489.91999999999996,822.64,577.1899999999999,792.63);
bezierVertex(711.02,746.6,432.48999999999995,524.74,469.1499999999999,484);
bezierVertex(508.37999999999994,440.40999999999997,735.9499999999999,700.53,786.3199999999999,589.38);
bezierVertex(826.55,500.6,760.4699999999999,400,663,400);
endShape(CLOSE);
pop();
}

function fish(x, y, size) {

push();
translate(x, y); 
scale(size / 800); 
translate(-400, -400);

beginShape();
vertex(800,400);
bezierVertex(800,400,507,141,648,358);
bezierVertex(648,358,317,111,600,200);
bezierVertex(670.77,222.26,400,0,400,0);
bezierVertex(400,0,129.23000000000002,222.26,200,200);
bezierVertex(483,111,152,358,152,358);
bezierVertex(293,141,0,400,0,400);
bezierVertex(0,400,293,659,152,442);
bezierVertex(152,442,483,689,200,600);
bezierVertex(129.23000000000002,577.74,400,800,400,800);
bezierVertex(400,800,670.77,577.74,600,600);
bezierVertex(317,689,648,442,648,442);
bezierVertex(507,659,800,400,800,400);
endShape();
pop();
}

function X(x, y, size) {
  
  push();
  translate(x, y); 
  scale(size / 800); 
  translate(-400, -400);
  
  beginShape();
  vertex(621,400);
  vertex(755,329);
  vertex(800,0);
  vertex(467,43);
  vertex(400,179);
  vertex(333,43);
  vertex(0,0);
  vertex(45,329);
  vertex(179,400);
  vertex(45,471);
  vertex(0,800);
  vertex(333,757);
  vertex(400,621);
  vertex(467,757);
  vertex(800,800);
  vertex(755,471);
  vertex(621,400);
  endShape();
  
  pop();
  }

  function reverseO(x, y, size) {
  
    push();
    translate(x, y); 
    scale(size / 800); 
    translate(-400, -400);
    
    beginShape();
    vertex(395,0);
    bezierVertex(395,0,395,400,-5,400);
    bezierVertex(395,400,395,800,395,800);
    bezierVertex(395,800,395,400,795,400);
    bezierVertex(395,400,395,0,395,0);
    endShape();
    
    
    pop();
    }





function complexShape(x, y, size) {
  size = size - size/5.1;
  let points = [
    { type: "M", x: 273.88, y: 43.49 },
    { type: "L", x: 280.71, y: 73.74 },
    { type: "L", x: 306.93, y: 57.18 },
    { type: "C", x1: 356.76, y1: 25.71, x2: 414.68, y2: 83.63, x: 383.21, y: 133.46 },
    { type: "L", x: 366.65, y: 159.68 },
    { type: "L", x: 396.9, y: 166.51 },
    { type: "C", x1: 454.38, y1: 179.49, x2: 454.38, y2: 261.4, x: 396.9, y: 274.39 },
    { type: "L", x: 366.65, y: 281.22 },
    { type: "L", x: 383.21, y: 307.44 },
    { type: "C", x1: 414.68, y1: 357.27, x2: 356.76, y2: 415.19, x: 306.93, y: 383.72 },
    { type: "L", x: 280.71, y: 367.16 },
    { type: "L", x: 273.88, y: 397.41 },
    { type: "C", x1: 260.9, y1: 454.89, x2: 179, y2: 454.89, x: 166.01, y: 397.41 },
    { type: "L", x: 159.18, y: 367.16 },
    { type: "L", x: 132.96, y: 383.72 },
    { type: "C", x1: 83.13, y1: 415.19, x2: 25.21, y2: 357.27, x: 56.68, y: 307.44 },
    { type: "L", x: 73.24, y: 281.22 },
    { type: "L", x: 43, y: 274.39 },
    { type: "C", x1: -14.48, y1: 261.4, x2: -14.48, y2: 179.49, x: 43, y: 166.51 },
    { type: "L", x: 73.24, y: 159.68 },
    { type: "L", x: 56.68, y: 133.46 },
    { type: "C", x1: 25.21, y1: 83.63, x2: 83.13, y2: 25.71, x: 132.96, y: 57.18 },
    { type: "L", x: 159.18, y: 73.74 },
    { type: "L", x: 166.01, y: 43.49 },
    { type: "C", x1: 179, y1: -14, x2: 260.9, y2: -14, x: 273.88, y: 43.49 }
  ];

  let minX = Math.min(...points.map(p => (p.x !== undefined ? p.x : Infinity)));
  let maxX = Math.max(...points.map(p => (p.x !== undefined ? p.x : -Infinity)));
  let minY = Math.min(...points.map(p => (p.y !== undefined ? p.y : Infinity)));
  let maxY = Math.max(...points.map(p => (p.y !== undefined ? p.y : -Infinity)));
  let width = maxX - minX;
  let height = maxY - minY;

  // Form zeichnen
  beginShape();
  for (let p of points) {
    if (p.type === "M" || p.type === "L") {
      vertex(
        x + ((p.x - minX) / width - 0.5) * size,
        y + ((p.y - minY) / height - 0.5) * size
      );
    } else if (p.type === "C") {
      bezierVertex(
        x + ((p.x1 - minX) / width - 0.5) * size,
        y + ((p.y1 - minY) / height - 0.5) * size,
        x + ((p.x2 - minX) / width - 0.5) * size,
        y + ((p.y2 - minY) / height - 0.5) * size,
        x + ((p.x - minX) / width - 0.5) * size,
        y + ((p.y - minY) / height - 0.5) * size
      );
    }
  }
  endShape(CLOSE);
}

function complexShape2(x, y, size) {
  let points = [
    { type: "M", x: 432.03, y: 220.38 },
    { type: "C", x1: 319.56, y1: 230.63, x2: 230.46, y2: 319.74, x: 220.2, y: 432.21 },
    { type: "C", x1: 209.95, y1: 319.74, x2: 120.84, y2: 230.63, x: 8.37, y: 220.38 },
    { type: "C", x1: 120.84, y1: 210.13, x2: 209.95, y2: 121.02, x: 220.2, y: 8.55 },
    { type: "C", x1: 230.46, y1: 121.02, x2: 319.56, y2: 210.13, x: 432.03, y: 220.38 }
  ];

  let minX = Math.min(...points.map(p => p.x ?? Infinity));
  let maxX = Math.max(...points.map(p => p.x ?? -Infinity));
  let minY = Math.min(...points.map(p => p.y ?? Infinity));
  let maxY = Math.max(...points.map(p => p.y ?? -Infinity));
  let width = maxX - minX;
  let height = maxY - minY;

  beginShape();
  for (let p of points) {
    if (p.type === "M" || p.type === "L") {
      vertex(
        x + ((p.x - minX) / width - 0.5) * size,
        y + ((p.y - minY) / height - 0.5) * size
      );
    } else if (p.type === "C") {
      bezierVertex(
        x + ((p.x1 - minX) / width - 0.5) * size,
        y + ((p.y1 - minY) / height - 0.5) * size,
        x + ((p.x2 - minX) / width - 0.5) * size,
        y + ((p.y2 - minY) / height - 0.5) * size,
        x + ((p.x - minX) / width - 0.5) * size,
        y + ((p.y - minY) / height - 0.5) * size
      );
    }
  }
  endShape(CLOSE);
}


function complexShape3(x, y, size) {
  let points = [
    { x: 220.35, y: 0 },
    { x: 148.38, y: 142.38 },
    { x: 0, y: 178.25 },
    { x: 96.38, y: 265.38 },
    { x: 0.38, y: 441.38 },
    { x: 213.88, y: 292.88 },
    { x: 441.38, y: 441.38 },
    { x: 327.38, y: 264.38 },
    { x: 440.7, y: 176.44 },
    { x: 290.38, y: 141.38 },
    { x: 220.35, y: 0 }
  ];

  let minX = Math.min(...points.map(p => p.x));
  let maxX = Math.max(...points.map(p => p.x));
  let minY = Math.min(...points.map(p => p.y));
  let maxY = Math.max(...points.map(p => p.y));

  let width = maxX - minX;
  let height = maxY - minY;

  beginShape();
  for (let p of points) {
    let px = x + ((p.x - minX) / width - 0.5) * size;
    let py = y + ((p.y - minY) / height - 0.5) * size;
    vertex(px, py);
  }
  endShape(CLOSE);
}






