const WEBGL_CANVAS_ID = 'webgl-canvas';
const COLOR_PICKER_ID = 'colorPicker';

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
  glObjects.push(new Square(translatedMidPoint));
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

const canvas = document.getElementById(WEBGL_CANVAS_ID);
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects(controlPoint = new Point(0,0));
glObjects.renderAll();
console.log(canvas.getBoundingClientRect());