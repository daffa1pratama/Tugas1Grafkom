const WEBGL_CANVAS_ID = "webgl-canvas";
const COLOR_PICKER_ID = "colorPicker";
const SQUARE_SIZE_ID = "squareSize";
const MODE_NAME = "mode";

const MODE = {
  CREATE: "CREATE",
  MOVE: "MOVE",
  RESIZE: "RESIZE",
  UPDATE_COLOR: "UPDATE_COLOR"
};

function getSquareSize(inputId = SQUARE_SIZE_ID) {
  return document.getElementById(inputId).value / 100;
}

function getMode() {
  return Array.prototype.slice
    .call(document.getElementsByName(MODE_NAME), 0)
    .filter((obj) => obj.checked)[0].value;
}

function convertClientPosToCanvasPoint(x, y) {
  const canvasPos = canvas.getBoundingClientRect();
  const centerCanvasX = canvasPos.width / 2;
  const centerCanvasY = canvasPos.height / 2;
  const centerCanvasPosX = canvasPos.left + centerCanvasX;
  const centerCanvasPosY = canvasPos.top + centerCanvasY;
  return new Point(
    (x - centerCanvasPosX) / centerCanvasX,
    (-1 * (y - centerCanvasPosY)) / centerCanvasY
  );
}

document.getElementById(WEBGL_CANVAS_ID).onmousemove = function (event) {
  const translatedMidPoint = convertClientPosToCanvasPoint(
    event.clientX,
    event.clientY
  );
  glObjects.controlPoint.move(translatedMidPoint.x, translatedMidPoint.y);
  if (getMode() === MODE.MOVE && glObjects.selectedObject) {
    glObjects.selectedObject.move(translatedMidPoint);
  }
  glObjects.renderAll();
};

document.getElementById(WEBGL_CANVAS_ID).onclick = function (event) {
  const translatedMidPoint = convertClientPosToCanvasPoint(
    event.clientX,
    event.clientY
  );
  if (getMode() === MODE.CREATE) {
    glObjects.push(
      new Square(
        translatedMidPoint,
        getSquareSize(),
        glObjects.controlPoint.color
      )
    );
    glObjects.renderAll();
  } else if (getMode() === MODE.MOVE) {
    glObjects.selectedObject
      ? glObjects.updateSelectedObject(null)
      : glObjects.updateSelectedObject(translatedMidPoint);
  } else if (getMode() === MODE.UPDATE_COLOR) {
    glObjects.updateSelectedObject(translatedMidPoint);
    glObjects.updateSelectedObjectColor();
    glObjects.updateSelectedObject(null);
  }
};

document.getElementById(COLOR_PICKER_ID).onchange = function () {
  glObjects.controlPoint.color = this.value;
  glObjects.renderAll();
};

class glObjects {
  constructor(controlPoint) {
    this.controlPoint = controlPoint;
    this.selectedObject = null;
    this.objects = [];
  }

  push(glObject) {
    this.objects.push(glObject);
  }

  updateSelectedObject(canvasCoordinate) {
    const result = canvasCoordinate
      ? this.objects.filter((obj) => obj.isCoordinateInside(canvasCoordinate))
      : [];
    this.selectedObject = result.length ? result[0] : null;
  }

  updateSelectedObjectColor() {
    this.selectedObject.color = this.controlPoint.color;
  }

  renderAll() {
    clearCanvas();
    this.controlPoint.render();
    this.objects.forEach((object) => object.render());
  }
}

const canvas = document.getElementById(WEBGL_CANVAS_ID);
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects((controlPoint = new Point(0, 0)));
glObjects.renderAll();
