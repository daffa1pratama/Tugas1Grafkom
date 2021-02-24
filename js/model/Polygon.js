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

    getClosestPoint(canvasCoordinate) {
        let nIntersection = 0;
        let arr_point = convertVerticesToPoint(this.vertices);
        let nVertex = arr_point.length;
        for(let k=1; k<nVertex; k++) {
            let vertex1 = arr_point[k-1];
            let vertex2 = arr_point[k];
            if ((vertex1.y == vertex2.y) && (vertex1.y == canvasCoordinate.y) && (canvasCoordinate.x > min(vertex1.x, vertex2.x)) && (canvasCoordinate.x < max(vertex1.x, vertex2.x))) {
                return true;
            }
            if ((canvasCoordinate.y > min(vertex1.y, vertex2.y)) && (canvasCoordinate.y <= max(vertex1.y, vertex2.y)) && (canvasCoordinate.x <= max(vertex1.x, vertex2.x)) && vertex1.y != vertex2.y) {
                let x_intersection = (canvasCoordinate.y - vertex1.y) * (vertex2.x - vertex1.x) / (vertex2.y - vertex1.y) + vertex1.x;
                if (x_intersection == canvasCoordinate.x) {
                    return true;
                }
                if (vertex1.x == vertex2.x || canvasCoordinate.x <= x_intersection) {
                    nIntersection += 1;
                }
            }
        }
        if ((nIntersection % 2) != 0) {
            return true;
        } else {
            return false;
        }
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

    getClosestPoint(canvasCoordinate) {
        let nIntersection = 0;
        let arr_point = convertVerticesToPoint(this.vertices);
        let nVertex = arr_point.length;
        for(let k=1; k<nVertex; k++) {
            let vertex1 = arr_point[k-1];
            let vertex2 = arr_point[k];
            if ((vertex1.y == vertex2.y) && (vertex1.y == canvasCoordinate.y) && (canvasCoordinate.x > min(vertex1.x, vertex2.x)) && (canvasCoordinate.x < max(vertex1.x, vertex2.x))) {
                return true;
            }
            if ((canvasCoordinate.y > min(vertex1.y, vertex2.y)) && (canvasCoordinate.y <= max(vertex1.y, vertex2.y)) && (canvasCoordinate.x <= max(vertex1.x, vertex2.x)) && vertex1.y != vertex2.y) {
                let x_intersection = (canvasCoordinate.y - vertex1.y) * (vertex2.x - vertex1.x) / (vertex2.y - vertex1.y) + vertex1.x;
                if (x_intersection == canvasCoordinate.x) {
                    return true;
                }
                if (vertex1.x == vertex2.x || canvasCoordinate.x <= x_intersection) {
                    nIntersection += 1;
                }
            }
        }
        if ((nIntersection % 2) != 0) {
            return true;
        } else {
            return false;
        }
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
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 8);
    }
}

class Polygon {
    constructor(inputVertices, color) {
        this.color = color;
        this.inputVertices = inputVertices;
        this.centerPoint = this.getCenterPoint(this.inputVertices);
        this.vertices = [];
        this.convertInputToVertices(this.centerPoint);
    }

    getCenterPoint(inputVertices) {
        let arr_point = convertVerticesToPoint(inputVertices);
        let min_x = arr_point[0].x;
        let max_x = arr_point[0].x;
        let min_y = arr_point[0].y;
        let max_y = arr_point[0].y;
        for (let l=1; l<arr_point.length; l++) {
            if (min_x > arr_point[l].x) {
                min_x = arr_point[l].x; 
            } else if (max_x < arr_point[l].x) {
                max_x = arr_point[l].x;
            }

            if (min_y > arr_point[l].y) {
                min_y = arr_point[l].y;
            } else if (max_y < arr_point[l].y) {
                max_y = arr_point[l].y;
            }
        }

        let center_x = (min_x + max_x) / 2;
        let center_y = (min_y + max_y) / 2;
        return new Point(center_x, center_y); 
    }

    calculateVertices(centerPoint) {
        for (let l=0; l<this.vertices.length; l++) {
            if((l+1)%3 == 1) {
                this.vertices[l] = this.vertices[l] - this.oldCenterPoint.x + centerPoint.x;
            } else if ((l+1)%3 == 2) {
                this.vertices[l] =  this.vertices[l] - this.oldCenterPoint.y + centerPoint.y;
            }
        }
    }

    convertInputToVertices(centerPoint) {
        for (let i=0; i<this.inputVertices.length; i++) {
            if ((i+1)%3 == 1) {
                this.vertices.push(this.inputVertices[i]);
            } else if ((i+1)%3 == 2) {
                this.vertices.push(this.inputVertices[i]);
            } else {
                this.vertices.push(0);
            }
        }
    }

    getClosestPoint(canvasCoordinate) {
        let nIntersection = 0;
        let arr_point = convertVerticesToPoint(this.vertices);
        let nVertex = arr_point.length;
        if (nVertex == 3) {
            return this.isInsideTriangle(arr_point, canvasCoordinate);
        }
        for(let k=1; k<nVertex; k++) {
            let vertex1 = arr_point[k-1];
            let vertex2 = arr_point[k];
            if ((vertex1.y == vertex2.y) && (vertex1.y == canvasCoordinate.y) && (canvasCoordinate.x > min(vertex1.x, vertex2.x)) && (canvasCoordinate.x < max(vertex1.x, vertex2.x))) {
                return true;
            }
            if ((canvasCoordinate.y > min(vertex1.y, vertex2.y)) && (canvasCoordinate.y <= max(vertex1.y, vertex2.y)) && (canvasCoordinate.x <= max(vertex1.x, vertex2.x)) && vertex1.y != vertex2.y) {
                let x_intersection = (canvasCoordinate.y - vertex1.y) * (vertex2.x - vertex1.x) / (vertex2.y - vertex1.y) + vertex1.x;
                if (x_intersection == canvasCoordinate.x) {
                    return true;
                }
                if (vertex1.x == vertex2.x || canvasCoordinate.x <= x_intersection) {
                    nIntersection += 1;
                }
            }
        }
        if ((nIntersection % 2) != 0) {
            return true;
        } else {
            return false;
        }
    }

    isInsideTriangle(arr_point, canvasCoordinate) {
        let a = this.area(arr_point[0].x, arr_point[0].y, arr_point[1].x, arr_point[1].y, arr_point[2].x, arr_point[2].y);
        let a1 = this.area(canvasCoordinate.x, canvasCoordinate.y, arr_point[1].x, arr_point[1].y, arr_point[2].x, arr_point[2].y);
        let a2 = this.area(arr_point[0].x, arr_point[0].y, canvasCoordinate.x, canvasCoordinate.y, arr_point[2].x, arr_point[2].y);
        let a3 = this.area(arr_point[0].x, arr_point[0].y, arr_point[1].x, arr_point[1].y, canvasCoordinate.x, canvasCoordinate.y);
        return a == (a1+a2+a3) ? true : false;
    }

    area(x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    }

    move(newCenterPoint) {
        this.oldCenterPoint = this.centerPoint;
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

function max(a, b) {
    return a>=b ? a : b;
}

function min(a, b) {
    return a<=b ? a : b;
}

function convertVerticesToPoint(vertices) {
    let arr = [];
    for (let j=0; j<vertices.length; j++) {
        if ((j+1)%3 == 1) {
            arr.push(new Point(vertices[j], vertices[j+1]));
        }
    }
    return arr;
}