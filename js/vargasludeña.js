var gl;
function iniciarGL(canvas) {
    try {
        gl = canvas.getContext("webgl");
        gl.puertoVistaAncho = canvas.width;
        gl.puertoVistaAlto = canvas.height;
    } catch (e) { }
    if (!gl) {
        alert("No puede iniciarse webGL en este navegador");
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
        if (k.nodeType == 3)
            str += k.textContent;
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
var programaShader;
function iniciarShaders() {
    var fragmentoShader = conseguirShader(gl, "shader-fs");
    var verticeShader = conseguirShader(gl, "shader-vs");
    programaShader = gl.createProgram();
    gl.attachShader(programaShader, verticeShader);
    gl.attachShader(programaShader, fragmentoShader);
    gl.linkProgram(programaShader);
    if (!gl.getProgramParameter(programaShader, gl.LINK_STATUS)) {
        alert("No pueden iniciarse los shaders");
    }
    gl.useProgram(programaShader);
    programaShader.atribPosVertice = gl.getAttribLocation(programaShader, "aPosVertice");
    gl.enableVertexAttribArray(programaShader.atribPosVertice);
    //... Definimos Shaders para el color
    programaShader.vertColorAtributo = gl.getAttribLocation(programaShader, "aVerticeColor");
    gl.enableVertexAttribArray(programaShader.vertColorAtributo);
    ///... Fin de Shaders para el color
    programaShader.pMatrizUniforme = gl.getUniformLocation(programaShader, "uPMatriz");
    programaShader.mvMatrizUniforme = gl.getUniformLocation(programaShader, "umvMatriz");
}
//... se modifica puntos poligono por tratarse de 3D
function puntosPoligono(pPuntos, pArista){
    var pol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pol);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pPuntos), gl.STATIC_DRAW);
    pol.itemTam = 3;
    pol.numItems = pArista;
    return pol;
}
function colorPoligono(pColor, pVertice, pArista){
    var polC = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, polC);
    var color= [];
    for (var i in pColor){
        var c= pColor[i];
        for(var j= 0; j<pVertice; j++){
            color= color.concat(c);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    polC.itemTam = 4;
    polC.numItems = pArista;
    return polC;
}
var tri1, tri1C;
var cua1, cua1C;
function iniciarBuffers() {

cua13= puntosPoligono([// frente
    -0.25,2.5,-0.25,
    -0.25,2.5,0.25,
    0.25,2.5,-0.25,
    0.25,2.5,0.25,

    0.25,2.5,0.25,
    0,3,0,
    0.25,2.5,-0.25,

    -0.25,2.5,0.25,
    0,3,0,
    0.25,2.5,0.25,

    0.25,2.5,0.25,
    0,3,0,
    0.25,2.5,-0.25,

    0.25,2.5,-0.25,
    0,3,0,
    -0.25,2.5,-0.25,
], 16);
cua13C= colorPoligono([
    [0.5, 0.5, 0.5, 1.0], // frente
    [0.5, 0.5, 0.5, 1.0], // cara atras
    [0.5, 0.5, 0.5, 1.0], // cara superior
    [0.5, 0.5, 0.5, 1.0], // cara inferior
    [0.5, 0.5, 0.5, 1.0], // cara derecha
    [0.5, 0.5, 0.5, 1.0] // cara izquierda
], 4, 24);
    //... puntos del cubo
    cua1= puntosPoligono([// frente
	  0,1,0,
      1,1,0,
      0,0,0,
      1.5,0,0,

      1.5,0,0,
      1,1,0,
      1.5,0,-1.5,
      1,1,-1,
        
      1,1,-1,
      0,1,-1,
      1.5,0,-1.5,
      0,0,-1.5,

      0,0,-1.5,
      0,0,0,
      0,1,-1,
      0,1,0,

      0,1,0,
      0,1,-1,
      1,1,0,
      1,1,-1,

      0,0,-1.5,
      0,0,0,
      1.5,0,-1.5,
      1.5,0,0

    ], 24);
    cua2= puntosPoligono([// frente
    0,1,0,
    0,1,1,
    1,1,0,
    1,1,1,

    1,1,1,
    1,1,0,
    1.5,0,1.5,
    1.5,0,0,

    1.5,0,0,
    0,0,0,
    1,1,0,
    0,1,0,
    
    0,0,0,
    1.5,0,0,
    0,0,1.5,
    1.5,0,1.5,

    1.5,0,1.5,
    1,1,1,
    0,0,1.5,
    0,1,1,

    0,1,1,
    0,1,0,
    0,0,1.5,
    0,0,0

  ], 24);

  cua3= puntosPoligono([// frente
   0,0,0,
   0,0,1.5,
   0,1,0,
   0,1,1,

   0,1,1,
   0,0,1.5,
   -1,1,1,
   -1.5,0,1.5,

   -1.5,0,1.5,
   -1.5,0,0,
   -1,1,1,
   -1,1,0,

   -1,1,0,
   0,1,0,
   -1.5,0,0,
   0,0,0,

   0,0,0,
   0,0,1,
   -1.5,0,0,
   -1.5,0,1.5,

  0,1,0,
  0,1,1,
  -1,1,0,
  -1,1,1
  ], 24);
  cua4= puntosPoligono([// frente
  0,1,-1,
  0,1,0,
  0,0,-1,
  0,0,0,

  0,0,0,
  -1.5,0,0,
  0,1,0,
  -1,1,0,

  -1,1,0,
  -1,1,-1,
  -1.5,0,0,
  -1.5,0,-1.5,    

  0,0,0,
  0,0,-1.5,
  -1.5,0,0,
  -1.5,0,-1.5,

  -1.5,0,-1.5,
  0,0,-1.5,
  -1,1,-1,
  0,1,-1,

  0,1,-1,
  0,1,0,
  -1,1,-1,
  -1,1,0
  ], 24);

  cua5= puntosPoligono([// frente
  1,1,-1,
  1,1,0,
  0,1,-1,
  0,1,0,
   
  0,1,0,
  0,1,-1,
  0,2,0,
  0,2,-0.5,

  0,2,-0.5,
  0,2,0,
  0.5,2,0,
  0.5,2,-0.5,

  0.5,2,-0.5,
  0.5,2,0,
  1,1,-1,
  1,1,0,

  1,1,0,
  0.5,2,-0.5,
  0,1,-1,
  0,2,-0.5,

  0,1,0,
  1,1,0,
  0,2,0,
  0.5,2,0
  ], 24);

  cua6= puntosPoligono([// frente
  0,1,0,
  1,1,0,
  0,2,0,
  0.5,2,0,

  0.5,2,0,
  0,2,0,
  0.5,2,0.5,
  0,2,0.5,

  0,2,0.5,
  0.5,2,0.5,
  0,1,1,
  1,1,1,

  1,1,1,
  1,1,0,
  0.5,2,0.5,
  0.5,2,0,

  0,1,0,
  0,1,1,
  1,1,0,
  1,1,1,

  0,2,0,
  0,2,0.5,
  0,1,0,
  0,1,1
  ], 24);

  cua7= puntosPoligono([// frente
  0,1,0,
  0,1,1,
  -1,1,0,
  -1,1,1,

  -1,1,1,
  -1,1,0,
  -0.5,2,0.5,
  -0.5,2,0,

  -0.5,2,0,
  -0.5,2,0.5,
  0,2,0,
  0,2,0.5,

  0,2,0.5,
  0,2,0,
  0,1,1,
  0,1,0,

  0,1,0,
  -1,1,0,
  0,2,0,
  -0.5,2,0,

  0,2,0.5,
  -0.5,2,0.5,
  0,1,1,
  -1,1,1
  ], 24);

  cua8= puntosPoligono([// frente
  0,1,0,
  0,1,-1,
  -1,1,0,
  -1,1,-1,

  -1,1,-1,
  -1,1,0,
  -0.5,2,-0.5,
  -0.5,2,0,

  -0.5,2,0,
  -0.5,2,-0.5,
  0,2,0,
  0,2,-0.5,

  0,2,-0.5,
  0,2,0,
  0,1,-1,
  0,1,0,

  0,1,0,
  -1,1,0,
  0,2,0,
  -0.5,2,0,

  0,2,-0.5,
  -0.5,2,-0.5,
  0,1,-1,
  -1,1,-1
  ], 24);

  cua9= puntosPoligono([// frente
  0.5,2,-0.5,
  0.5,2,0,
  0,2,-0.5,
  0,2,0,

  0,2,0,
  0,2,-0.5,
  0,2.5,0,
  0,2.5,-0.25,

  0,2.5,-0.25,
  0,2.5,0,
  0.25,2.5,-0.25,
  0.25,2.5,0,

  0.25,2.5,0,
  0.25,2.5,-0.25,
  0.5,2,0,
  0.5,2,0,

  0.5,2,0,
  0,2,0,
  0.25,2.5,0,
  0,2.5,0,

  0,2.5,-0.25,
  0.25,2.5,-0.25,
  0,2,-0.5,
  0.5,2,-0.5
  ], 24);
  cua10= puntosPoligono([// frente
  0.5,2,0.5,
  0.5,2,0,
  0,2,0.5,
  0,2,0,

  0,2,0,
  0,2,0.5,
  0,2.5,0,
  0,2.5,0.25,

  0,2.5,0.25,
  0,2.5,0,
  0.25,2.5,0.25,
  0.25,2.5,0,

  0.25,2.5,0,
  0.25,2.5,0.25,
  0.5,2,0,
  0.5,2,0,

  0.5,2,0,
  0,2,0,
  0.25,2.5,0,
  0,2.5,0,

  0,2.5,0.25,
  0.25,2.5,0.25,
  0,2,0.5,
  0.5,2,0.5
  ], 24);
  cua11= puntosPoligono([// frente
  -0.5,2,0.5,
  -0.5,2,0,
  0,2,0.5,
  0,2,0,

  0,2,0,
  0,2,0.5,
  0,2.5,0,
  0,2.5,0.25,

  0,2.5,0.25,
  0,2.5,0,
  -0.25,2.5,0.25,
  -0.25,2.5,0,

  -0.25,2.5,0,
  -0.25,2.5,0.25,
  -0.5,2,0,
  -0.5,2,0,

  -0.5,2,0,
  0,2,0,
  -0.25,2.5,0,
  0,2.5,0,

  0,2.5,0.25,
  -0.25,2.5,0.25,
  0,2,0.5,
  -0.5,2,0.5
  ], 24);
  cua12= puntosPoligono([// frente
  -0.5,2,-0.5,
  -0.5,2,0,
  0,2,-0.5,
  0,2,0,

  0,2,0,
  0,2,-0.5,
  0,2.5,0,
  0,2.5,-0.25,

  0,2.5,-0.25,
  0,2.5,0,
  -0.25,2.5,-0.25,
  -0.25,2.5,0,

  -0.25,2.5,0,
  -0.25,2.5,-0.25,
  -0.5,2,0,
  -0.5,2,0,

  -0.5,2,0,
  0,2,0,
  -0.25,2.5,0,
  0,2.5,0,

  0,2.5,-0.25,
  -0.25,2.5,-0.25,
  0,2,-0.5,
  -0.5,2,-0.5
  ], 24);
    //... Color del cuadrado
    cua1C= colorPoligono([
        [1, 0, 0.5, 1.0], // frente
        [1, 0, 0.5, 1.0], // cara atras
        [1, 0, 0.5, 1.0], // cara superior
        [1, 0, 0.5, 1.0], // cara inferior
        [1, 0, 0.5, 1.0], // cara derecha
        [1, 0, 0.5, 1.0] // cara izquierda
    ], 4, 24);
    cua2C= colorPoligono([
        [0.0, 0.0, 1.0, 1.0], // frente
        [0.0, 0.0, 1.0, 1.0], // cara atras
        [0.0, 0.0, 1.0, 1.0], // cara superior
        [0.0, 0.0, 1.0, 1.0], // cara inferior
        [0.0, 0.0, 1.0, 1.0], // cara derecha
        [0.0, 0.0, 1.0, 1.0] // cara izquierda
    ], 4, 24);
    cua3C= colorPoligono([
        [1.0, 1.0, 0.0, 1.0], // frente
        [1.0, 1.0, 0.0, 1.0], // cara atras
        [1.0, 1.0, 0.0, 1.0], // cara superior
        [1.0, 1.0, 0.0, 1.0], // cara inferior
        [1.0, 1.0, 0.0, 1.0], // cara derecha
        [1.0, 1.0, 0.0, 1.0] // cara izquierda
    ], 4, 24);

    cua4C= colorPoligono([
        [0.0, 1.0, 1.0, 1.0], // frente
        [0.0, 1.0, 1.0, 1.0], // cara atras
        [0.0, 1.0, 1.0, 1.0], // cara superior
        [0.0, 1.0, 1.0, 1.0], // cara inferior
        [0.0, 1.0, 1.0, 1.0], // cara derecha
        [0.0, 1.0, 1.0, 1.0] // cara izquierda
    ], 4, 24);

    cua5C= colorPoligono([
        [0.0, 0.0, 1.0, 1.0], // frente
        [0.0, 0.0, 1.0, 1.0], // cara atras
        [0.0, 0.0, 1.0, 1.0], // cara superior
        [0.0, 0.0, 1.0, 1.0], // cara inferior
        [0.0, 0.0, 1.0, 1.0], // cara derecha
        [0.0, 0.0, 1.0, 1.0] // cara izquierda
    ], 4, 24);

    cua6C= colorPoligono([
        [0.0, 1.0, 0.0, 1.0], // frente
        [0.0, 1.0, 0.0, 1.0], // cara atras
        [0.0, 1.0, 0.0, 1.0], // cara superior
        [0.0, 1.0, 0.0, 1.0], // cara inferior
        [0.0, 1.0, 0.0, 1.0], // cara derecha
        [0.0, 1.0, 0.0, 1.0] // cara izquierda
    ], 4, 24);
    cua7C= colorPoligono([
        [1.0, 0.5, 0.0, 1.0], // frente
        [1.0, 0.5, 0.0, 1.0], // cara atras
        [1.0, 0.5, 0.0, 1.0], // cara superior
        [1.0, 0.5, 0.0, 1.0], // cara inferior
        [1.0, 0.5, 0.0, 1.0], // cara derecha
        [1.0, 0.5, 0.0, 1.0] // cara izquierda
    ], 4, 24);
    cua8C= colorPoligono([
        [1.0, 1, 0.0, 1.0], // frente
        [1.0, 1, 0.0, 1.0], // cara atras
        [1.0, 1, 0.0, 1.0], // cara superior
        [1.0, 1, 0.0, 1.0], // cara inferior
        [1.0, 1, 0.0, 1.0], // cara derecha
        [1.0, 1, 0.0, 1.0] // cara izquierda
    ], 4, 24);
    cua9C= colorPoligono([
        [0.0, 1, 0.0, 1.0], // frente
        [0.0, 1, 0.0, 1.0], // cara atras
        [0.0, 1, 0.0, 1.0], // cara superior
        [0.0, 1, 0.0, 1.0], // cara inferior
        [0.0, 1, 0.0, 1.0], // cara derecha
        [0.0, 1, 0.0, 1.0] // cara izquierda
    ], 4, 24);
    cua10C= colorPoligono([
        [1.0, 0, 1.0, 1.0], // frente
        [1.0, 0, 1.0, 1.0], // cara atras
        [1.0, 0, 1.0, 1.0], // cara superior
        [1.0, 0, 1.0, 1.0], // cara inferior
        [1.0, 0, 1.0, 1.0], // cara derecha
        [1.0, 0, 1.0, 1.0] // cara izquierda
    ], 4, 24);
    cua11C= colorPoligono([
        [0.0, 1, 1.0, 1.0], // frente
        [0.0, 1, 1.0, 1.0], // cara atras
        [0.0, 1, 1.0, 1.0], // cara superior
        [0.0, 1, 1.0, 1.0], // cara inferior
        [0.0, 1, 1.0, 1.0], // cara derecha
        [0.0, 1, 1.0, 1.0] // cara izquierda
    ], 4, 24);
    cua12C= colorPoligono([
        [1.0, 0.5, 0.0, 1.0], // frente
        [1.0, 0.5, 0.0, 1.0], // cara atras
        [1.0, 0.5, 0.0, 1.0], // cara superior
        [1.0, 0.5, 0.0, 1.0], // cara inferior
        [1.0, 0.5, 0.0, 1.0], // cara derecha
        [1.0, 0.5, 0.0, 1.0] // cara izquierda
    ], 4, 24);
}
var mvMatriz = mat4.create();
var pMatriz = mat4.create();
function modificarMatrizUniforme() {
    gl.uniformMatrix4fv(programaShader.pMatrizUniforme, false, pMatriz);
    gl.uniformMatrix4fv(programaShader.mvMatrizUniforme, false, mvMatriz);
}
function triangulo(pTriangulo, pTrianguloC, pTraslacion, pAngulo, pEjeRotacion, pEscala){
    mat4.identity(mvMatriz);
    mat4.translate(mvMatriz, pTraslacion);
    mat4.rotate(mvMatriz, pAngulo, pEjeRotacion);
    mat4.scale(mvMatriz, pEscala);
    gl.bindBuffer(gl.ARRAY_BUFFER, pTriangulo);
    gl.vertexAttribPointer(programaShader.atribPosVertice, pTriangulo.itemTam, gl.FLOAT, false, 0, 0);
    //... Aplicando color
    gl.bindBuffer(gl.ARRAY_BUFFER, pTrianguloC);
    gl.vertexAttribPointer(programaShader.vertColorAtributo, pTrianguloC.itemTam, gl.FLOAT, false, 0, 0);
    //... Fin aplicando color
    modificarMatrizUniforme();
    gl.drawArrays(gl.TRIANGLES, 0, pTriangulo.numItems);
}
function poligono(pPoligono, pPoligonoC, pTraslacion, pAngulo, pEjeRotacion, pEscala){
    mat4.identity(mvMatriz);
    mat4.translate(mvMatriz, pTraslacion);
    mat4.rotate(mvMatriz, pAngulo, pEjeRotacion);
    mat4.scale(mvMatriz, pEscala);
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligono);
    gl.vertexAttribPointer(programaShader.atribPosVertice, pPoligono.itemTam, gl.FLOAT, false, 0, 0);
    //... Aplicando color
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligonoC);
    gl.vertexAttribPointer(programaShader.vertColorAtributo, pPoligonoC.itemTam, gl.FLOAT, false, 0, 0);
    //... Fin aplicando color
    modificarMatrizUniforme();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pPoligono.numItems);
}

var rotarTri = 0, rotarCua= 0, escalaCua= 0.1,escalaCua1= 0.1;
var roty=6,roty1=-10,rotx=6,rotx1=-6,rotx2=0,ecala1=6;
var roty3=4;
function dibujarEscena() {
    setTimeout(aux222, 1000);
    setTimeout(aux111, 1000); 
    setTimeout(aux333, 1000); 
    setTimeout(aux444, 3000);
    setTimeout(aux555, 1000);
    setTimeout(aux777, 5000);
    setTimeout(aux888, 15000);
    
    
    
    gl.viewport(0, 0, gl.puertoVistaAncho, gl.puertoVistaAlto);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(70, gl.puertoVistaAncho / gl.puertoVistaAlto, 0.1, 100.0, pMatriz);
    poligono(cua1, cua1C, [rotx, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua2, cua2C, [0, roty1, -6.0], 0, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua3, cua3C, [rotx1, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua4, cua4C, [rotx1, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [1,1, 1]);
    poligono(cua5, cua5C, [0, roty, -6.0], rotarTri*Math.PI/180, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua6, cua6C, [0, roty, -6.0], rotarTri*Math.PI/180, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua7, cua7C, [0, roty, -6.0], rotarTri*Math.PI/180, [0.0, 1.0, 0.0], [1, 1, 1]);
    poligono(cua8, cua8C, [0, roty, -6.0], rotarTri*Math.PI/180, [0.0, 1.0, 0.0], [1, 1, 1]);

    poligono(cua9, cua9C, [0, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [escalaCua1, escalaCua1, escalaCua1]);
    poligono(cua10, cua10C, [0, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [escalaCua1, escalaCua1, escalaCua1]);
    poligono(cua11, cua11C, [0, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [escalaCua1, escalaCua1, escalaCua1]);
    poligono(cua12, cua12C, [0, -1.0, -6.0], 0, [0.0, 1.0, 0.0], [escalaCua1, escalaCua1, escalaCua1]);

    poligono(cua13, cua13C, [0, roty3, -6.0], 0, [0.0, 1.0, 0.0], [1, 1, 1]);
}
var ultimoTiempo= 0, signo= 1;
function aux222() {
    if (roty >= -1) {
        if (ultimoTiempo != 0) {
            var lapso = 5.1;
            rotarTri += (200 * lapso) / 1000.0;
        }
        roty -= 0.01;
    } else {
        // Si alcanza el límite de rotación, reiniciar rotarTri
        rotarTri = 0;
    }
}
function aux555(){
    if(roty1<=-1.1){
        roty1+=0.1;
    }
}
function aux888(){
    if(roty3>=-1){
        roty3-=0.03;
    }
}

function aux111(){
    if(rotx>=0.1){
        rotx-=0.1;
    }
}
function aux333(){
    if(rotx1<=-0.1){
        rotx1+=0.1;
    }
}
function aux444(){
    if(ecala1>=1){
        ecala1-=0.1;
    }
}
function aux777(){
    if(rotx2<=-0.1){
        rotx2=0.1;
    }
}
var tiempo = 0;
var ultimoTiempo = 0,
    signo = 1;
var signoEscalado = 1; 
var espera = 8000; 
var tiempo = 0; 
var detenerAnimacion = false; 
var escalacuafinal=1;

function animacion() {
    var tiempoAhora = new Date().getTime();
    if (ultimoTiempo != 0) {
        var lapso = tiempoAhora - ultimoTiempo;
        rotarCua += (200 * lapso) / 1000.0;
        if (!detenerAnimacion) {
            if (tiempo < espera) {
                tiempo += lapso;
            } else {
                escalaCua1 += signoEscalado * (0.5 * lapso) / 1000.0;
            }
        }
    }
    if (rotarCua >= 360)
        rotarCua = 0;
    if (escalaCua1 >= 1.0 || escalaCua1 <= 0.1) {
        signoEscalado = signoEscalado * (-1); 
    }
    function detenerDespuesDeTiempo(tiempoEspera) {
        setTimeout(function() {
            escalaCua1=escalacuafinal;
            detenerAnimacion = true;
        }, tiempoEspera);
    }
    detenerDespuesDeTiempo(13470); 
    
    ultimoTiempo = tiempoAhora;
}



function mover(){
    dibujarEscena();
    animacion();
    requestAnimFrame(mover);
}
function webGLEjecutar() {
    var canvas = document.getElementById("leccion03-3D");
    iniciarGL(canvas);
    iniciarShaders();
    iniciarBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    mover();
}