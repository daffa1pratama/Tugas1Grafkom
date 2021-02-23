class Hexagon {
    constructor(centerPoint, color = "#000000") {
        this.color = color;
        this.centerPoint = centerPoint;
        this.calculateVertices(centerPoint);
    }

    calculateVertices(centerPoint) {
        // Titik titik
        this.vertex1_x = -0.05+centerPoint.x; //1
        this.vertex1_y = 0.1+centerPoint.y; 
        this.vertex2_x = -0.1+centerPoint.x; 
        this.vertex2_y = 0+centerPoint.y; //3
        this.vertex3_x = -0.05+centerPoint.x; //1
        this.vertex3_y = -0.1+centerPoint.y;
        this.vertex4_x = 0.05+centerPoint.x; //2
        this.vertex4_y = -0.1+centerPoint.y;
        this.vertex5_x = 0.1+centerPoint.x;
        this.vertex5_y = 0+centerPoint.y; //3
        this.vertex6_x = 0.05+centerPoint.x; //2
        this.vertex6_y = 0.1+centerPoint.y;

        this.vertices = [
            this.vertex1_x, this.vertex1_y, 0,
            this.vertex2_x, this.vertex2_y, 0,
            this.vertex3_x, this.vertex3_y, 0,
            this.vertex4_x, this.vertex4_y, 0,
            this.vertex5_x, this.vertex5_y, 0,
            this.vertex6_x, this.vertex6_y, 0,
        ];
    }

    isCoordinateInside(canvasCoordinate) {
        return false;
    }

    move(newCenterPoint) {
        this.centerPoint = newCenterPoint;
        this.calculateVertices(newCenterPoint);
    }

    // changeColor(new_color) {
    //     this.color = new_color;
    // }

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
        this.color = color;
        this.centerPoint = centerPoint;
        this.calculateVertices(centerPoint);
    }

    calculateVertices(centerPoint) {
        // Titik titik
        this.vertex1_x = -0.05+centerPoint.x; 
        this.vertex1_y = 0.1+centerPoint.y; 
        this.vertex2_x = -0.1+centerPoint.x; 
        this.vertex2_y = 0.05+centerPoint.y; 
        this.vertex3_x = -0.1+centerPoint.x; 
        this.vertex3_y = -0.05+centerPoint.y;
        this.vertex4_x = -0.05+centerPoint.x; 
        this.vertex4_y = -0.1+centerPoint.y;
        this.vertex5_x = 0.05+centerPoint.x;
        this.vertex5_y = -0.1+centerPoint.y; 
        this.vertex6_x = 0.1+centerPoint.x; 
        this.vertex6_y = -0.05+centerPoint.y;
        this.vertex7_x = 0.1+centerPoint.x; 
        this.vertex7_y = 0.05+centerPoint.y;
        this.vertex8_x = 0.05+centerPoint.x; 
        this.vertex8_y = 0.1+centerPoint.y;

        this.vertices = [
            this.vertex1_x, this.vertex1_y, 0,
            this.vertex2_x, this.vertex2_y, 0,
            this.vertex3_x, this.vertex3_y, 0,
            this.vertex4_x, this.vertex4_y, 0,
            this.vertex5_x, this.vertex5_y, 0,
            this.vertex6_x, this.vertex6_y, 0,
            this.vertex7_x, this.vertex7_y, 0,
            this.vertex8_x, this.vertex8_y, 0,
        ];
    }

    isCoordinateInside(canvasCoordinate) {
        return false;
    }

    move(newCenterPoint) {
        this.centerPoint = newCenterPoint;
        this.calculateVertices(newCenterPoint);
    }

    // changeColor(new_color) {
    //     this.color = new_color;
    // }

    render() {
        const vertexBuffer = createVertexBuffer(this.vertices);
        const vertexShader = createVertexShader();
        const fragmentShader = createFragmentShader(hexToRgb(this.color));
        const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
        associateShaderToObjBuffer(shaderProgram, vertexBuffer, false);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
    }
}

class Polygon {
    constructor(inputVertices, color) {
        this.color = color;
        this.centerPoint = new Point(0,0);
        this.inputVertices = inputVertices;
        this.vertices = [];
        this.calculateVertices(this.centerPoint);
    }

    calculateVertices(centerPoint) {
        for (let i=0; i<this.inputVertices.length; i++) {
            if ((i+1)%3 == 1) {
                this.vertices.push(this.inputVertices[i]+centerPoint.x);
            } else if ((i+1)%3 == 2) {
                this.vertices.push(this.inputVertices[i]+centerPoint.y);
            } else {
                this.vertices.push(0);
            }
        }
    }

    isCoordinateInside(canvasCoordinate) {
        return false;
    }

    move(newCenterPoint) {
        this.centerPoint = newCenterPoint;
        this.calculateVertices(newCenterPoint);
    }

    render() {
        const vertexBuffer = createVertexBuffer(this.vertices);
        const vertexShader = createVertexShader();
        const fragmentShader = createFragmentShader(hexToRgb(this.color));
        const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
        associateShaderToObjBuffer(shaderProgram, vertexBuffer, false);
        gl.drawArrays( gl.TRIANGLE_FAN, 0, this.vertices.length / 3);
    }
}