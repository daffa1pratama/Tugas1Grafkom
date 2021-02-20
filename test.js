var canvas = document.getElementById("webgl-canvas");
var gl = canvas.getContext('experimental-webgl');
var shaderProgram;
var shaderProgram1;
let color = hexToRgb(document.getElementById("colorPicker").value);
let red = color[0] / 255;
let green = color[1] / 255;
let blue = color[2] / 255;
console.log(color);
let object = null;

// function main() {
//     // vertexshader
//     var vertexCode =
//         'attribute vec4 coordinates;' +
//         'void main(void) {' +
//             'gl_Position = coordinates;' +
//         '}';
//     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vertexShader, vertexCode);
//     gl.compileShader(vertexShader);

//     var fragmentCode = 
//     'void main(void) {' +
//             'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
//         '}';
//     var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//     gl.shaderSource(fragmentShader, fragmentCode);
//     gl.compileShader(fragmentShader);

//     // create program to combile shader program
//     program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     //gl.linkProgram(program);
//     gl.useProgram(program);

//     drawOct();
// }

// function drawOct() {
//     var n = 8;
//     var vertices = [
//         -0.25, 0.5,
//         -0.5, 0.25,
//         -0.5, -0.25,
//         -0.25, -0.5,
//         0.25, -0.5,
//         0.5, -0.25,
//         0.5, 0.25,
//         0.25, 0.5
//     ];

//     var vertexBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//     var coordinate = gl.getAttribLocation(program, "coordinates");
//     gl.vertexAttribPointer(coordinate, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(coordinate);

//     gl.clearColor(1.0, 1.0, 1.0, 1.0);
//     gl.enable(gl.DEPTH_TEST);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.viewport(0, 0, canvas.width, canvas.height);
//     gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
// }

function hexToRgb(hex) {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16)); //[r, g, b]
}

function init() {
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
                'gl_FragColor = vec4(' + 
                    color[0] + ',' + color[1] + ',' + 
                    color[2] + ',' + '1' + ');' +
            '}';
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentCode);
    gl.compileShader(fragmentShader);

    // create program to combile shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // gl.useProgram(shaderProgram);

    var fragmentCode1 = 
    'void main(void) {' +
            'gl_FragColor = vec4(' + 
                '0' + ',' + '1' + ',' + 
                color[2] + ',' + '1' + ');' +
        '}';
    var fragmentShader1 = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader1, fragmentCode1);
    gl.compileShader(fragmentShader1);

    // create program to combile shader program
    shaderProgram1 = gl.createProgram();
    gl.attachShader(shaderProgram1, vertexShader);
    gl.attachShader(shaderProgram1, fragmentShader1);
    gl.linkProgram(shaderProgram1);
    // gl.useProgram(shaderProgram1);

    drawAll();
}

function drawAll() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    drawHexa();
    drawOct();
}

function octagonBuffer() {
    vertices = [
        -0.5, 0.25,
        -0.75, 0,
        -0.75, -0.5,
        -0.5, -0.75,
        0, -0.75,
        0.25, -0.5,
        0.25, 0,
        0, 0.25
    ];
    // Buffer
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // Combine shader and buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coordinate = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coordinate, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinate);
}

function hexagonBuffer() {
    vertices = [
        -0.25, 0.5,
        -0.5, 0,
        -0.25, -0.5,
        0.25, -0.5,
        0.5, 0,
        0.25, 0.5
    ];
    // Buffer
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // Combine shader and buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coordinate = gl.getAttribLocation(shaderProgram1, "coordinates");
    gl.vertexAttribPointer(coordinate, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinate);
}

function drawOct() {
    octagonBuffer();
    // gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // gl.enable(gl.DEPTH_TEST);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(shaderProgram);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
}

function drawHexa() {
    hexagonBuffer();
    gl.useProgram(shaderProgram1);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 6);
}

// function draw() {
//     // draw polygon
//     init();
//     gl.clearColor(1.0, 1.0, 1.0, 1.0);
//     gl.enable(gl.DEPTH_TEST);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.viewport(0, 0, canvas.width, canvas.height);
//     gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
// }

init();