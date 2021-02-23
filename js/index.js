const WEBGL_CANVAS_ID = 'webgl-canvas';
const COLOR_PICKER_ID = 'colorPicker';
let selected = null;

function getSquareSize(inputId = 'squareSize') {
  return document.getElementById(inputId).value / 100;
}

function convertClientPosToCanvasPoint(x, y) {
  const canvasPos = canvas.getBoundingClientRect();
  const centerCanvasPosX = canvasPos.left + canvasPos.width / 2;
  const centerCanvasPosY = canvasPos.top + canvasPos.height / 2;
  return new Point(
    (x - centerCanvasPosX) / (canvasPos.width / 2),
    -1 * (y - centerCanvasPosY) / (canvasPos.height / 2)
  );
}

document.getElementById(WEBGL_CANVAS_ID).onmousemove = function (event) {
  const translatedMidPoint = convertClientPosToCanvasPoint(event.clientX, event.clientY);
  glObjects.controlPoint.move(translatedMidPoint.x, translatedMidPoint.y);
  glObjects.renderAll();
}

document.getElementById(WEBGL_CANVAS_ID).onclick = function (event) {
  const translatedMidPoint = convertClientPosToCanvasPoint(event.clientX, event.clientY);
  selected = document.getElementById("choice").value;
  if (selected == 'hexa') {
    glObjects.push(new Hexagon(translatedMidPoint));
  } else if (selected == 'octa') {
    glObjects.push(new Octagon(translatedMidPoint));
  } else {
    console.log("pick object!");
  }
  glObjects.renderAll();
}

document.getElementById(COLOR_PICKER_ID).onchange = function() {
  glObjects.controlPoint.color = this.value;
  glObjects.renderAll();
  console.log(backRGB);
}

class glObjects {
  constructor(controlPoint) {
    this.controlPoint = controlPoint;
    this.objects = [];
  }

  push(glObject) {
    this.objects.push(glObject);
  }

  renderAll() {
    clearCanvas();
    this.controlPoint.render();
    this.objects.forEach(object => object.render());
  }
}

function onChangeColor() { 
    color = document.getElementById("colorPicker").value;
    //TODO: ganti sesuai polygon yang dimau
    glObjects.objects[0].changeColor(color);
    glObjects.renderAll();
}

const canvas = document.getElementById("webgl-canvas");
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects(controlPoint = new Point(0,0));
// glObjects.push(new Hexagon());
glObjects.renderAll();
