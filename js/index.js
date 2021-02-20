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
    this.objects.forEach(object => object.render());
  }
}

function drawLine() {
  var vertex1 = document.getElementById("vertex1").value;
  var vertex2 = document.getElementById("vertex2").value;
  var parsedVertex = [];

  vertex1 = vertex1.split(",");
  vertex1.forEach(element => {
    parsedVertex.push(parseFloat(element));
  });
  
  vertex2 = vertex2.split(",");
  vertex2.forEach(element => {
    parsedVertex.push(parseFloat(element));
  });
  
  glObjects.push(new Line(parsedVertex));
  glObjects.renderAll();
}

const canvas = document.getElementById("webgl-canvas");
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects();