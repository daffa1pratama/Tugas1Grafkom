const MARGIN_ERROR_ONCLICK = 0.05;

class Line {
  constructor (firstPoint, secondPoint, color = "#000000") {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.vertices = [
      firstPoint.x, firstPoint.y, 0,
      secondPoint.x, secondPoint.y, 0,
    ];
    this.color = color;
  }

  isCoordinateInside(canvasCoordinate) {
    // check if coordinate inside line object
    return Math.abs(this.firstPoint.x - canvasCoordinate.x) <= MARGIN_ERROR_ONCLICK && 
      Math.abs(this.firstPoint.y - canvasCoordinate.y) <= MARGIN_ERROR_ONCLICK ||
      Math.abs(this.secondPoint.x - canvasCoordinate.x) <= MARGIN_ERROR_ONCLICK && 
      Math.abs(this.secondPoint.y - canvasCoordinate.y) <= MARGIN_ERROR_ONCLICK;
  }

  getClosestPoint(canvasCoordinate)  {
    const canvasCoordinateArray = [canvasCoordinate.x, canvasCoordinate.y];
    const firstPointCoordinateArray = [this.firstPoint.x, this.firstPoint.y];
    const secondPointCoordinateArray = [this.secondPoint.x, this.secondPoint.y];
    return euclideanDistance(canvasCoordinateArray, firstPointCoordinateArray)  > euclideanDistance(canvasCoordinateArray, secondPointCoordinateArray)
      ? this.secondPoint
      : this.firstPoint;
  }

  render() {
    this.vertices = [
      this.firstPoint.x, this.firstPoint.y, 0,
      this.secondPoint.x, this.secondPoint.y, 0,
    ];
    const vertexBuffer = createVertexBuffer(this.vertices);
    const vertexShader = createVertexShader();
    const fragmentShader = createFragmentShader(hexToRgb(this.color));
    const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
    associateShaderToObjBuffer(shaderProgram, vertexBuffer);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}