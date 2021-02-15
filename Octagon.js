// Load canvas
var canvas = document.getElementById("CAD-canvas");
var gl = canvas.getContext('experimental-webgl');

// Titik titik
var vertices = [
    -0.5, 1,
    -1, 0.5,
    -1, -0.5,
    -0.5, -1,
    0.5, -1,
    1, -0.5,
    1, 0.5,
    0.5, 1
];

// Buffer
var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Shader
var vertexCode =
    'attribute vec4 coordinates;' +
    'void main(void) {' +
        'gl_Position = coordinates;' +
    '}';
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexCode);
gl.compileShader(vertexShader);

var fragmentCode = 
    'void main(void) {' +
            'gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' +
        '}';
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentCode);
gl.compileShader(fragmentShader);

// create program to combile shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Combine shader and buffer
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var coordinate = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coordinate, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordinate);

// draw polygon
gl.clearColor(1.0, 1.0, 1.0, 1.0);

gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);

gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);