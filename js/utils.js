function createVertexBuffer(vertices) {
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind the buffer
  return vertexBuffer;
}

function createIndexBuffer(indices) {
  let indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return indexBuffer;
}

function createVertexShader() {
  const vertexCode = `
    attribute vec3 coordinates;
    void main(void) {
      gl_Position = vec4(coordinates, 1.0);
      gl_PointSize = 8.0;
    }`;
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexCode); // Attach vertex shader source code
  gl.compileShader(vertexShader);
  return vertexShader;
}

function createFragmentShader(rgbArray) {
  const fragCode = `void main(void) { gl_FragColor = vec4(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, 1); }`;
  let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);
  return fragShader;
}

function createShaderProgram(vertexShader, fragmentShader) {
  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  return shaderProgram;
}

function associateShaderToObjBuffer(shaderProgram, vertexBuffer, indexBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  if (indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  const coord = gl.getAttribLocation(shaderProgram, "coordinates");
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);
}

function clearCanvas() {
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16) / 255); //[r, g, b] at 1 scale
}

function euclideanDistance(a, b) {
  return a
      .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
      .reduce((sum, now) => sum + now) // sum
      ** (1/2)
}