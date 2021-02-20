class Line {
  constructor (inputVertices, color = "#000000") {
    this.vertices = inputVertices;
    this.color = color;
  }

  render() {
    const vertexBuffer = createVertexBuffer(this.vertices);
    const vertexShader = createVertexShader();
    const fragmentShader = createFragmentShader(hexToRgb(this.color));
    const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
    associateShaderToObjBuffer(shaderProgram, vertexBuffer);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}