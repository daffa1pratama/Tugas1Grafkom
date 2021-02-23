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
  } else if (getMode() === MODE.UPDATE_COLOR || getMode() === MODE.RESIZE) {
    glObjects.updateSelectedObject(translatedMidPoint);
    if (getMode() === MODE.UPDATE_COLOR) {
      glObjects.updateSelectedObjectColor();
      glObjects.updateSelectedObject(null);
    } else {
      glObjects.resizeSelectedObject();
    }
  }
};

document.getElementById(COLOR_PICKER_ID).onchange = function () {
  glObjects.controlPoint.color = this.value;
  glObjects.renderAll();
};

document.getElementById(SQUARE_SIZE_ID).oninput = function () {
  if (getMode() === MODE.RESIZE && glObjects.selectedObject) {
    glObjects.resizeSelectedObject();
    glObjects.renderAll();
  }
}

function drawLine() {
  var vertex1 = document.getElementById("vertex1").value;
  var vertex2 = document.getElementById("vertex2").value;
  var parsedVertex = [];

  vertex1 = vertex1.split(" ");
  vertex1.forEach(element => {
    parsedVertex.push(parseFloat(element));
  });
  
  vertex2 = vertex2.split(" ");
  vertex2.forEach(element => {
    parsedVertex.push(parseFloat(element));
  });
  
  glObjects.push(new Line(parsedVertex));
  glObjects.renderAll();
}

function editLine(x) {
  var newVertex = document.getElementById("newvertex").value;
  var obj = glObjects.objects[glObjects.objects.length - 1];
  console.log(obj.vertices);

  var parsedVertex = [];

  newVertex = newVertex.split(" ");
  newVertex.forEach(element => {
    parsedVertex.push(parseFloat(element));
  });

  if (x == 1) {
    for (let i = 0; i < 3; i++) {
      obj.vertices[i] = parsedVertex[i];
    }
  } else {
    for (let i = 3; i < 6; i++) {
      obj.vertices[i] = parsedVertex[i - 3];
    }
  }

  glObjects.objects[glObjects.objects.length - 1] = obj;

  glObjects.update();
}

document.getElementById('inputfile').addEventListener('change', function() {   
  var fr = new FileReader(); 
  fr.onload = function(){ 
      var inputValue = fr.result.split('\n');
      var color = inputValue.pop();
      var parsedInput = [];
      var parsedVertex = [];
      inputValue.forEach(element1 => {
        parsedInput = element1.split(' ');
        parsedInput.forEach(element2 => {
          parsedVertex.push(parseFloat(element2));
        });
      });
      console.log(parsedVertex);
      console.log(color);
      glObjects.push(new Line(parsedVertex, color));
      glObjects.renderAll();
      
  } 
  fr.readAsText(this.files[0]); 
})

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

  resizeSelectedObject() {
    this.selectedObject.resize(getSquareSize());
  }

  update() {
    this.objects.forEach(object => object.render());
  }

  renderAll() {
    clearCanvas();
    this.controlPoint.render();
    this.objects.forEach((object) => object.render());
    if (this.selectedObject) {
      document.getElementById("anyObjectSelected").innerHTML = '<b>An Object has Selected!</b>';
    } else {
      document.getElementById("anyObjectSelected").innerHTML = 'No Object has Selected';
    }
  }
}

const canvas = document.getElementById(WEBGL_CANVAS_ID);
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects((controlPoint = new Point(0, 0)));
glObjects.renderAll();
