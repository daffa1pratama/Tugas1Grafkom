class Point {
  constructor(x, y, color = "#000000") {
    this.x = x;
    this.y = y;
    this.vertices =  [x, y, 0];
    this.color = color;
  }

  move(newCoordinate) {
    this.x = newCoordinate.x;
    this.y = newCoordinate.y;
    this.vertices =  [newCoordinate.x, newCoordinate.y, 0];
  }

  render() {
    const vertexBuffer = createVertexBuffer(this.vertices);
    const vertexShader = createVertexShader();
    const fragmentShader = createFragmentShader(hexToRgb(this.color));
    const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
    associateShaderToObjBuffer(shaderProgram, vertexBuffer);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
