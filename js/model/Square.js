class Square {
  constructor(centerPoint, size = 1, color = "#000000") {
    this.color = color;
    this.size = size;
    this.indices = [3, 2, 1, 3, 1, 0];
    this.calculateEdgesPosition(centerPoint);
  }

  calculateEdgesPosition(centerPoint) {
    const offset = this.size / 2;
    this.left = centerPoint.x - offset;
    this.top = centerPoint.y + offset;
    this.right = centerPoint.x + offset;
    this.bottom = centerPoint.y - offset;
    this.vertices = [
      this.left, this.top, 0,
      this.left, this.bottom, 0,
      this.right, this.bottom, 0,
      this.right, this.top, 0,
    ];
  }

  resize() {
    
  }

  move() {

  }

  render() {
    const vertexBuffer = createVertexBuffer(this.vertices);
    const indexBuffer = createIndexBuffer(this.indices);
    const vertexShader = createVertexShader();
    const fragmentShader = createFragmentShader(hexToRgb(this.color));
    const shaderProgram = createShaderProgram(vertexShader, fragmentShader);
    associateShaderToObjBuffer(shaderProgram, vertexBuffer, indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}
