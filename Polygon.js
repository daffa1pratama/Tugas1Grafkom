// Load canvas
var canvas = document.getElementById("webgl-canvas");
var gl = canvas.getContext('experimental-webgl');
let color = hexToRgb(document.getElementById("colorPicker").value);
let red = color[0] / 255;
let green = color[1] / 255;
let blue = color[2] / 255;
let object = [];

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

    draw() {
        // draw polygon
        this.init();
        // gl.clearColor(1.0, 1.0, 1.0, 1.0);
        // gl.enable(gl.DEPTH_TEST);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 6);
    }
}

class Octagon {
    constructor(r, g, b, o) {
        // Titik titik
        this.vertices = [
            -0.5, 0.25,
            -0.75, 0,
            -0.75, -0.5,
            -0.5, -0.75,
            0, -0.75,
            0.25, -0.5,
            0.25, 0,
            0, 0.25
        ];

        this.color = new Array(r, g, b, o);
    }

    changeColor(r, g, b) {
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
    }

    init() {
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

        // Buffer
        var vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        //gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        // Combine shader and buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        var coordinate = gl.getAttribLocation(shaderProgram, "coordinates");
        gl.vertexAttribPointer(coordinate, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coordinate);
    }

    draw() {
        // draw polygon
        this.init();
        // gl.clearColor(1.0, 1.0, 1.0, 1.0);
        // gl.enable(gl.DEPTH_TEST);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
    }
}

function onButtonChange() { 
    color = hexToRgb(document.getElementById("colorPicker").value);
    red = color[0] / 255;
    green = color[1] / 255;
    blue = color[2] / 255;
    object[1].changeColor(red, green, blue);
    //object[1].draw();
    renderAll();
}

function onSelect() {
    //console.log(document.getElementById("choice").value);
    let choice = document.getElementById("choice").value;
    if (choice == 'hexa') {
        hex = new Hexagon(red, green, blue, 1.0);
        object.push(hex);
    } else {
        oct = new Octagon(red, green, blue, 1.0);
        object.push(oct);
    }
    console.log(object.length);
    renderAll();
}

function renderAll() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    for (let i = 0; i< object.length; i++) {
        object[i].draw();
    }
}

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