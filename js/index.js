class glObjects {
  constructor(controlPoint) {
    this.controlPoint = controlPoint;
    this.objects = [];
  }

  push(glObject) {
    this.objects.push(glObject);
  }

  update() {
    this.objects.forEach(object => object.render());
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

const canvas = document.getElementById("webgl-canvas");
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects();