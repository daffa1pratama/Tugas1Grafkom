const WEBGL_CANVAS_ID = "webgl-canvas";
const COLOR_PICKER_ID = "colorPicker";
const SQUARE_SIZE_ID = "squareSize";
const INPUT_MODEL_ID = "input-model";
const SAVE_FILENAME_ID = "filename";
const ANY_OBJECT_SELECTED_ID = "anyObjectSelected";
const MODE_NAME = "mode";

let nVertexPolygon;
let nClicked = 0;
let isOnDrawing = false;

const MODE = {
  CREATE: "CREATE",
  MOVE: "MOVE",
  RESIZE: "RESIZE",
  UPDATE_COLOR: "UPDATE_COLOR"
};

const MODEL = {
  LINE: "LINE",
  SQUARE: "SQUARE",
  POLYGON: "POLYGON",
  HEXAGON: "HEXAGON",
  OCTAGON: "OCTAGON"
}

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
  glObjects.controlPoint.move(translatedMidPoint);
  if (getMode() === MODE.MOVE && glObjects.selectedObject) {
    glObjects.selectedObject.move(translatedMidPoint);
  }
  glObjects.renderAll();
};

document.getElementById(WEBGL_CANVAS_ID).onclick = function (event) {
  const cursorPoint = convertClientPosToCanvasPoint(
    event.clientX,
    event.clientY
  );
  if (glObjects.selectedModel === MODEL.SQUARE || glObjects.selectedModel === MODEL.POLYGON || glObjects.selectedModel === MODEL.HEXAGON || glObjects.selectedModel === MODEL.OCTAGON) {
    handleCanvasClickForSquareAndPolygon(cursorPoint);
  } else if (glObjects.selectedModel === MODEL.LINE) {
    handleCanvasClickForLine(cursorPoint);
  }
};

function handleCanvasClickForSquareAndPolygon(cursorPoint) {
  if (getMode() === MODE.CREATE) {
    let input_model = glObjects.selectedModel;
    if (input_model === MODEL.SQUARE) {
      glObjects.push(
        new Square(
          cursorPoint,
          getSquareSize(),
          glObjects.controlPoint.color
      ));
    } else if (input_model === MODEL.HEXAGON) {
      glObjects.push(
        new Hexagon(
          cursorPoint,
          glObjects.controlPoint.color
      ));
    } else if (input_model === MODEL.OCTAGON) {
      glObjects.push(
        new Octagon(
          cursorPoint,
          glObjects.controlPoint.color
      ));
    } else {
        if(isOnDrawing) {
          glObjects.pushPolygonVertex(cursorPoint);
          nClicked += 1;
        }
        if(nClicked == nVertexPolygon) {
          isOnDrawing = false;
          nClicked = 0;
          glObjects.push(new Polygon(glObjects.vertexPolygon, glObjects.controlPoint.color));
          glObjects.vertexPolygon = [];
        }
    }

    glObjects.renderAll();
  } else if (getMode() === MODE.MOVE) {
    glObjects.selectedObject
      ? glObjects.updateSelectedObject(null)
      : glObjects.updateSelectedObject(cursorPoint);
  } else if (getMode() === MODE.UPDATE_COLOR || getMode() === MODE.RESIZE) {
    glObjects.updateSelectedObject(cursorPoint);
    if (getMode() === MODE.UPDATE_COLOR) {
      glObjects.updateSelectedObjectColor();
      glObjects.updateSelectedObject(null);
    } else {
      glObjects.resizeSelectedObject();
    }
  }
}

function handleCanvasClickForLine(cursorPoint) {
  if (getMode() === MODE.CREATE) {
    if (glObjects.linePoints.length) {
      glObjects.push(new Line(glObjects.linePoints[0], cursorPoint, glObjects.controlPoint.color));
      glObjects.linePoints.pop();
    } else {
      glObjects.linePoints.push(cursorPoint);
    }
  } else if (getMode() === MODE.MOVE) {
    glObjects.selectedObject
      ? glObjects.updateSelectedObject(null)
      : glObjects.updateSelectedObject(cursorPoint);
  }
}

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

var upload = document.getElementById('inputfile');
  
  // Make sure the DOM element exists
  if (upload) {
    upload.addEventListener('change', function() {
      // Make sure a file was selected
      if (upload.files.length > 0) {
        var reader = new FileReader(); // File reader to read the file 
        
        // This event listener will happen when the reader has read the file
        reader.addEventListener('load', function() {
          var result = JSON.parse(reader.result); // Parse the result into an object 
          
          for (let j=0; j<result.length; j++) {
            if (result[j].model == "Line") {
              var firstPoint = []; 
              var secondPoint = []; 
              for (let i = 0; i < result[j].vertices.length; i++) {
                firstPoint.push(result[j].vertices[i]);
                secondPoint.push(result[j].vertices[i+3]);
              }
              glObjects.push(new Line(firstPoint, secondPoint, result[j].color));
              glObjects.renderAll();
            } else {
              glObjects.push(new Polygon(result[j].vertices, result[j].color));
              glObjects.renderAll();
            }
          }
        });

        reader.readAsText(upload.files[0]); // Read the uploaded file
      }
    });

  }

document.getElementById(INPUT_MODEL_ID).onchange = function() {
  glObjects.selectedModel = document.getElementById(INPUT_MODEL_ID).value;
  if(glObjects.selectedModel == MODEL.POLYGON){
    document.getElementById("nVertex-container").innerHTML = '<br> <label>Jumlah Vertex</label> <input type="number" id="nVertex" min="3" value="3"> <button onclick="onDrawPolygon()">Draw Polygon!</button>';
  } else {
    document.getElementById("nVertex-container").innerHTML = '';
  }
}

function onDrawPolygon() {
  nVertexPolygon = document.getElementById("nVertex").value;
  isOnDrawing = true;
}

class glObjects {
  constructor(controlPoint) {
    this.controlPoint = controlPoint;
    this.selectedObject = null;
    this.objects = [];
    this.selectedModel = MODEL.LINE;
    this.linePoints = [];
    this.vertexPolygon = [];
  }

  pushPolygonVertex(clickedpoint){
    this.vertexPolygon.push(clickedpoint.x);
    this.vertexPolygon.push(clickedpoint.y);
    this.vertexPolygon.push(0);
  }

  push(glObject) {
    this.objects.push(glObject);
  }

  updateSelectedObject(canvasCoordinate) {
    const result = canvasCoordinate
      ? this.objects.filter((obj) => obj.isCoordinateInside(canvasCoordinate))
      : [];
    if (this.selectedModel === MODEL.SQUARE || this.selectedModel === MODEL.POLYGON || this.selectedModel === MODEL.HEXAGON || this.selectedModel === MODEL.OCTAGON) {
      this.selectedObject = result.length ? result[0] : null;
    } else {
      this.selectedObject = result.length ? result[0].getClosestPoint(canvasCoordinate) : null;
    }
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

  save() {
    return this.objects.map(obj => obj.toJson());
  }

  renderAll() {
    clearCanvas();
    this.controlPoint.render();
    this.objects.forEach((object) => object.render());
    if (this.selectedObject) {
      document.getElementById(ANY_OBJECT_SELECTED_ID).innerHTML = '<b>An Object has Selected!</b>';
    } else {
      document.getElementById(ANY_OBJECT_SELECTED_ID).innerHTML = 'No Object has Selected';
    }
  }
}

const canvas = document.getElementById(WEBGL_CANVAS_ID);
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects((controlPoint = new Point(0, 0)));
glObjects.renderAll();

var saveData = (function () { 
  var a = document.createElement("a"); 
  document.body.appendChild(a); 
  a.style = "display: none";
  return function () { 
      var json = JSON.stringify(glObjects.save()),
          blob = new Blob([json], {type: "application/json"}), 
          url = window.URL.createObjectURL(blob); 
      a.href = url; 
      a.download = document.getElementById(SAVE_FILENAME_ID).value;
      a.click(); 
      window.URL.revokeObjectURL(url); 
  }; 
}()); 