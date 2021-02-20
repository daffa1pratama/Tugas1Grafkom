class Point {
  constructor(x, y, color = "#000000") {
    this.x = x;
    this.y = y;
    this.vertices =  [x, y, 0];
    this.color = color;
  }

  move(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.vertices =  [newX, newY, 0];
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