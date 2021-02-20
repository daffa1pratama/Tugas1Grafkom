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

function onChangeColor() { 
    color = document.getElementById("colorPicker").value;
    //TODO: ganti sesuai polygon yang dimau
    glObjects.objects[0].changeColor(color);
    glObjects.renderAll();
}

function onSelectModel() {
  let choice = document.getElementById("choice").value;
  if (choice == 'hexa') {
      glObjects.push(new Hexagon());
  } else {
      glObjects.push(new Octagon());
  }
  glObjects.renderAll();
}

const canvas = document.getElementById("webgl-canvas");
gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
glObjects = new glObjects();
// glObjects.push(new Hexagon());
// glObjects.renderAll();
