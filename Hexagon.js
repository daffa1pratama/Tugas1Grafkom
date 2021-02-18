// Load canvas
var canvas = document.getElementById("webgl-canvas");
var gl = canvas.getContext('experimental-webgl');
let red = (document.getElementById("R").value) / 50;
let green = (document.getElementById("G").value) / 50;
let blue = (document.getElementById("B").value) / 50;

class Hexagon {
    constructor(r, g, b, o) {
        // Titik titik
        this.vertices = [
            -0.25, 0.5,
            -0.5, 0,
            -0.25, -0.5,
            0.25, -0.5,
            0.5, 0,
            0.25, 0.5
        ];

        this.color = new Array(r, g, b, o);
    }

    changeColor(r, g, b) {
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
    }

    init() {
        // Buffer
        var vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
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
                    'gl_FragColor = vec4(' + 
                        this.color[0] + ',' + this.color[1] + ',' + 
                        this.color[2] + ',' + this.color[3] + ');' +
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
    }

    drawHexagon() {
        // draw polygon
        this.init();
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 6);
    }
}

let hex = new Hexagon(red, green, blue, 1.0);
hex.drawHexagon();

function onButtonChange() { 
    red = (document.getElementById("R").value) / 50;
    green = (document.getElementById("G").value) / 50;
    blue = (document.getElementById("B").value) / 50;
    hex.changeColor(red, green, blue);
    hex.drawHexagon();
}