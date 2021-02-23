const WEBGL_CANVAS_ID = "webgl-canvas";
const COLOR_PICKER_ID = "colorPicker";
const SQUARE_SIZE_ID = "squareSize";
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
    let input_model = document.getElementById("input-model").value;
    if (input_model == "square") {
      glObjects.push(
        new Square(
          translatedMidPoint,
          getSquareSize(),
          glObjects.controlPoint.color
      ));
    } else if (input_model == "hexagon") {
      glObjects.push(
        new Hexagon(
          translatedMidPoint,
          glObjects.controlPoint.color
      ));
    } else if (input_model == "octagon") {
      glObjects.push(
        new Octagon(
          translatedMidPoint,
          glObjects.controlPoint.color
      ));
    } else {
        if(isOnDrawing) {
          glObjects.pushPolygonVertex(translatedMidPoint);
          console.log(translatedMidPoint);
          nClicked += 1;
          console.log(nClicked);
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

  glObjects.renderAll();
}

var upload = document.getElementById('inputfile');
  
  // Make sure the DOM element exists
  if (upload) 
  {
    upload.addEventListener('change', function() {
      // Make sure a file was selected
      if (upload.files.length > 0) 
      {
        var reader = new FileReader(); // File reader to read the file 
        
        // This event listener will happen when the reader has read the file
        reader.addEventListener('load', function() {
          var result = JSON.parse(reader.result); // Parse the result into an object 
          
          console.log(result);
          // console.log(result.model);
          // console.log(result.vertices);
          // console.log(result.color);
          for (let j=0; j<result.length; j++) {
            if (result[j].model == "Line") {
              glObjects.push(new Line(result[j].vertices, result[j].color));
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

document.getElementById("input-model").onchange = function() {
  if(document.getElementById("input-model").value == "polygon"){
    document.getElementById("nVertex-container").innerHTML = '<br> <label>Jml Vertex</label> <input type="number" id="nVertex" min="3" value="3"> <button onclick="onDrawPolygon()">Draw Polygon!</button>';
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
    this.selectedObject = result.length ? result[0] : null;
    console.log(this.selectedObject);
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
