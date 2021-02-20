class Hexagon {
    constructor(color = "#000000") {
        // Titik titik
        this.vertices = [
            -0.05, 0.1, 0,
            -0.1, 0, 0,
            -0.05, -0.1, 0,
            0.05, -0.1, 0,
            0.1, 0, 0,
            0.05, 0.1, 0
        ];

        this.color = color;
    }

    changeColor(new_color) {
        this.color = new_color;
    }

    render() {
        const vertexBuffer = createVertexBuffer(this.vertices);
        const vertexShader = createVertexShader();
        const fragmentShader = createFragmentShader(hexToRgb(this.color));
        const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
        associateShaderToObjBuffer(shaderProgram, vertexBuffer, false);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 6);
    }
}

class Octagon {
    constructor(color = "#000000") {
        // Titik titik
        this.vertices = [
            -0.25, 0.5, 0,
            -0.5, 0.25, 0,
            -0.5, -0.25, 0,
            -0.25, -0.5, 0,
            0.25, -0.5, 0,
            0.5, -0.25, 0,
            0.5, 0.25, 0,
            0.25, 0.5, 0,
        ];

        this.color = color;
    }

    changeColor(new_color) {
        this.color = new_color;
    }

    render() {
        const vertexBuffer = createVertexBuffer(this.vertices);
        const vertexShader = createVertexShader();
        const fragmentShader = createFragmentShader(hexToRgb(this.color));
        const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
        associateShaderToObjBuffer(shaderProgram, vertexBuffer, false);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
    }
}