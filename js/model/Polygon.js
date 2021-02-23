class Hexagon {
    constructor(centerPoint, color = "#000000") {
        // Titik titik
        this.vertices = [
            -0.05+centerPoint.x, 0.1+centerPoint.y, 0,
            -0.1+centerPoint.x, 0+centerPoint.y, 0,
            -0.05+centerPoint.x, -0.1+centerPoint.y, 0,
            0.05+centerPoint.x, -0.1+centerPoint.y, 0,
            0.1+centerPoint.x, 0+centerPoint.y, 0,
            0.05+centerPoint.x, 0.1+centerPoint.y, 0,
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
    constructor(centerPoint, color = "#000000") {
        // Titik titik
        this.vertices = [
            -0.05+centerPoint.x, 0.1+centerPoint.y, 0,
            -0.1+centerPoint.x, 0.05+centerPoint.y, 0,
            -0.1+centerPoint.x, -0.05+centerPoint.y, 0,
            -0.05+centerPoint.x, -0.1+centerPoint.y, 0,
            0.05+centerPoint.x, -0.1+centerPoint.y, 0,
            0.1+centerPoint.x, -0.05+centerPoint.y, 0,
            0.1+centerPoint.x, 0.05+centerPoint.y, 0,
            0.05+centerPoint.x, 0.1+centerPoint.y, 0,
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