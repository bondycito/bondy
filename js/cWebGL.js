var gl;
function iniciarGL(canvas) {
  try {
    gl = canvas.getContext("webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) { }
  if (!gl) {
    alert("Perdone, no se pudo inicializar WebGL");
  }
}
function conseguirShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }
  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }
  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else { return null; }
  gl.shaderSource(shader, str);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}
var shaderPrograma;
function iniciarShaders() {
  var fragmentoShader = conseguirShader(gl, "shader-fs");
  var verticeShader = conseguirShader(gl, "shader-vs");
  shaderPrograma = gl.createProgram();
  gl.attachShader(shaderPrograma, verticeShader);
  gl.attachShader(shaderPrograma, fragmentoShader);
  gl.linkProgram(shaderPrograma);
  if (!gl.getProgramParameter(shaderPrograma, gl.LINK_STATUS)) {
    alert("Perdone, no pudo inicializarse el shaders");
  }
  gl.useProgram(shaderPrograma);
  shaderPrograma.verticePosAtributo = gl.getAttribLocation(shaderPrograma, "aVerticeP");
  gl.enableVertexAttribArray(shaderPrograma.verticePosAtributo);
  shaderPrograma.texturaCoordAtributo = gl.getAttribLocation(shaderPrograma, "aTexturaCoord");
  gl.enableVertexAttribArray(shaderPrograma.texturaCoordAtributo);
  shaderPrograma.pMatrizUniforme = gl.getUniformLocation(shaderPrograma, "uPMatriz");
  shaderPrograma.mvMatrizUniforme = gl.getUniformLocation(shaderPrograma, "uMVMatriz");
  shaderPrograma.muestraUniforme = gl.getUniformLocation(shaderPrograma, "uMuestra");
}
function cargarManijaTextura(textura) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, textura[0]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textura[0].imagen);
	
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, textura[1]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textura[1].imagen);
	
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.bindTexture(gl.TEXTURE_2D, textura[2]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textura[2].imagen);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
function cargarManija(direccion){
  var textura3D= Array();
  var figura= new Image();
  for (var i= 0; i<3; i++){
	var textura= gl.createTexture();
	textura.imagen= figura;
	textura3D.push(textura);
  }
  figura.onload = function () {
	cargarManijaTextura(textura3D);
  };
  figura.src = direccion;
  return textura3D;
}
var solidoTextura= Array();
function iniciartextura(nro, nombre) {
  for(var i= 0; i<nro; i++){
    solidoTextura.push(cargarManija("img/"+nombre+i+".gif"));
  }
}
var mvMatriz = mat4.create();
var mvMatrizPila = [];
var pMatriz = mat4.create();
function mvApilarMatriz() {
  var copia = mat4.create();
  mat4.set(mvMatriz, copia);
  mvMatrizPila.push(copia);
}
function mvDesapilarMatriz() {
  if (mvMatrizPila.length == 0) {
    throw "Desapilada invalida!";
  }
  mvMatriz = mvMatrizPila.pop();
}
function modificarMatrizUniforme() {
  gl.uniformMatrix4fv(shaderPrograma.pMatrizUniforme, false, pMatriz);
  gl.uniformMatrix4fv(shaderPrograma.mvMatrizUniforme, false, mvMatriz);
}
function sexRad(angulo) {
  return angulo * Math.PI / 180;
}
//... control[embudo, z, arriba/abajo, izquierda/derecha, x]
var control= [0, -15, 0, 0,0];
var actualKeyPrecionado = {};
function manejoKeyAbajo(evento) {
  actualKeyPrecionado[evento.keyCode] = true;
  //... embudo

  if (String.fromCharCode(evento.keyCode) == "F") {
    control[0] += 1;
    if (control[0] == 3) {
      control[0] = 0;
    }
  }
  ///
  if (evento.key === "ArrowRight") {
    efecto[1] -= 5;
    if (efecto[1] < -360)
      efecto[1] = 0;
  }
  if (evento.key === "ArrowLeft") {
    efecto[1] += 5;
    if (efecto[1] > 360)
      efecto[1] = 0;
  }
  if (String.fromCharCode(evento.keyCode) == "W"){
    if (efecto[2]>-28)
      efecto[2] -= 5;
  }
  if (String.fromCharCode(evento.keyCode) == "S"){
    if (efecto[2]<10)
      efecto[2] += 5;
  }

  if (String.fromCharCode(evento.keyCode) == "A"){
    if (efecto[7]>-17)
      efecto[7] -= 5;
  }
  if (String.fromCharCode(evento.keyCode) == "D"){
    if (efecto[7]<17)
      efecto[7] += 5;
  }
}
function manejoKeyArriba(evento) {
  actualKeyPrecionado[evento.keyCode] = false;
}
// Función para comprobar si un punto está dentro del polígono
function puntoEnPoligono(x, z, vertices) {
  let dentro = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      let xi = vertices[i][0], zi = vertices[i][1];
      let xj = vertices[j][0], zj = vertices[j][1];
      let intersect = ((zi > z) != (zj > z)) && (x < (xj - xi) * (z - zi) / (zj - zi) + xi);
      if (intersect) dentro = !dentro;
  }
  return dentro;
}

// Vértices del polígono
const vertices = [
  [-4.43, -5.12],
  [4.43, -5.12],
  [38.81, -40],
  [-38.81, -40]
];


let tiempo = 0;
let velocidadCaminata = 0.15;
function manejoKeys() {
  if (actualKeyPrecionado[38]) { // Flecha hacia arriba
    let anguloRad = sexRad(efecto[1]);

    // Calcular desplazamiento en los ejes x y z
    let desplazamientoX = Math.sin(anguloRad) * 0.05;
    let desplazamientoZ = Math.cos(anguloRad) * 0.05;

    // Calcular nueva posición propuesta
    let nuevaX = control[4] + desplazamientoX;
    let nuevaZ = control[1] + desplazamientoZ;

    // Verificar si la nueva posición está dentro del polígono
    if (puntoEnPoligono(nuevaX, nuevaZ, vertices)) {
        control[1] = nuevaZ;
        control[4] = nuevaX;
    }

    tiempo += velocidadCaminata; // Avanza el tiempo de animación
  }

  if (actualKeyPrecionado[40]) { // Flecha hacia abajo
    let anguloRad = sexRad(efecto[1]);

    // Calcular desplazamiento en los ejes x y z
    let desplazamientoX = Math.sin(anguloRad) * 0.05;
    let desplazamientoZ = Math.cos(anguloRad) * 0.05;

    // Calcular nueva posición propuesta
    let nuevaX = control[4] - desplazamientoX;
    let nuevaZ = control[1] - desplazamientoZ;

    // Verificar si la nueva posición está dentro del polígono
    if (puntoEnPoligono(nuevaX, nuevaZ, vertices)) {
        control[1] = nuevaZ;
        control[4] = nuevaX;
    }

    tiempo += velocidadCaminata; // Avanza el tiempo de animación
  }

  if (actualKeyPrecionado[37]){ // Flecha izquierda
    control[3] -= 0.05; 
    tiempo += velocidadCaminata; // Avanza el tiempo de animación
  }
  if (actualKeyPrecionado[39]){ // Flecha derecha
    control[3] += 0.05; 
    tiempo += velocidadCaminata; // Avanza el tiempo de animación
  }
  

  if (!actualKeyPrecionado[38] && !actualKeyPrecionado[40] && !actualKeyPrecionado[37] && !actualKeyPrecionado[39]) {
    tiempo = 0; // Resetea el tiempo si no se presiona ninguna tecla de movimiento
  }

  // Movimiento de los brazos
  efecto[3] = Math.sin(tiempo) * 0.1; // Oscila los brazos
  
}

function puntosSolido(vertices, col, fil){
  var puntos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, puntos);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  puntos.itemColumna = col;
  puntos.itemFila = fil;
  return puntos;
}
function texturaSolido(coord, col, fil){
  var textura = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textura);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coord), gl.STATIC_DRAW);
  textura.itemColumna = col;
  textura.itemFila = fil;
  return textura;
}
function indiceSolido(indice, col, fil){
  var indiceSol = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceSol);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indice), gl.STATIC_DRAW);
  indiceSol.itemColumna = col;
  indiceSol.itemFila = fil;
  return indiceSol;
}
// ptoSolido, textSolido, indSolido, textura, ex, ey, ez, tx, ty, tz, ang1, rx1, ry1, rz1, ang1, rx2, ry2, rz2
function dibujarSolido(ptoSolido, textSolido, indSolido, textura, ex, ey, ez, tx, ty, tz, ang1, rx1, ry1, rz1, ang2, rx2, ry2, rz2, ang3, rx3, ry3, rz3){
  mat4.identity(mvMatriz);
  mat4.scale(mvMatriz, [ex, ey, ez]);
  mat4.translate(mvMatriz, [tx, ty, tz]);
  mat4.rotate(mvMatriz, sexRad(ang1), [rx1, ry1, rz1]);
  mat4.rotate(mvMatriz, sexRad(ang2), [rx2, ry2, rz2]);
  mat4.rotate(mvMatriz, sexRad(ang3), [rx3, ry3, rz3]);
	
  gl.bindBuffer(gl.ARRAY_BUFFER, ptoSolido);
  gl.vertexAttribPointer(shaderPrograma.verticePosAtributo, ptoSolido.itemColumna, gl.FLOAT, false, 0, 0);
	
  gl.bindBuffer(gl.ARRAY_BUFFER, textSolido);
  gl.vertexAttribPointer(shaderPrograma.texturaCoordAtributo, textSolido.itemColumna, gl.FLOAT, false, 0, 0);
		
  gl.activeTexture(gl.TEXTURE0);	
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.uniform1i(shaderPrograma.muestraUniforme, 0);
	
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indSolido);
  modificarMatrizUniforme();
  gl.drawElements(gl.TRIANGLES, indSolido.itemFila, gl.UNSIGNED_SHORT, 0);
}
//... [ultimoTiempo, rotY, rotX, rotC, trasBx, trasBz, rotM,otraRotacionEn X]
var efecto= [0, 0, 0, 0, 2, 0, 10,0];
function animacion() {
  var tiempoActual = new Date().getTime();
  if (efecto[0] != 0) {
    var lapso = tiempoActual - efecto[0];
  }
  efecto[0] = tiempoActual;
}
function momento() {
  requestAnimFrame(momento);
  manejoKeys();
  dibujarEscena();
  animacion();
}