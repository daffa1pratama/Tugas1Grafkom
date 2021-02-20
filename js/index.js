class glObjects {
  constructor() {
    this.objects = [];
  }

  push(glObject) {
    this.objects.push(glObject);
  }

  renderAll() {
    clearCanvas();
    this.objects.forEach(object => object.render());
  }
}

const canvas = document.getElementById("webgl-canvas");
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects();
glObjects.push(new Square(new Point(0,0)));
glObjects.renderAll();
