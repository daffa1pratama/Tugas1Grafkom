// Load canvas attribute
var canvas = document.getElementById('webgl-canvas');
var gl = canvas.getContext('experimental-webgl');

class Line {
  constructor (inputVertices) {
    this.vertices = inputVertices;
  }
  
  init () {
    // Buffer
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Vertex Shader
    var vertCode =
        'attribute vec3 coordinates;' +
        'void main(void) {' +
          ' gl_Position = vec4(coordinates, 1.0);' +
        '}';
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    // Fragment Shader
    var fragCode =
        'void main(void) {' +
          'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
        '}';
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    // Create a shader program object
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Bind shader and buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);


  }

  draw () {
    this.init()

    // Drawl line
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.LINES, 0, 6);
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

  console.log(parsedVertex);

  object = new Line(parsedVertex);
  object.draw();
}