function verticeCuboFrente(){
  var vertice = [
  // Front face
    -1.5, 0.5, -0.5,
    1.5, 0.5, -0.5,
    1.5, 3.5, -0.5,
    -1.5, 3.5, -0.5
  ];
  return vertice;
}
function verticeCuboAtras(){
  var vertice = [
  // Back face
    -1.5, 0.5, -4.0,
    -1.5, 2.5, -4.0,
    1.5, 2.5, -4.0,
    1.5, 0.5, -4.0
  ];
  return vertice;
}
function verticeCuboArriba(){
  var vertice = [
  // Top face
    -1.5, 2.5, -4.0,
    -1.5, 3.5, -0.5,
    1.5, 3.5, -0.5,
    1.5, 2.5, -4
  ];
  return vertice;
}
function verticeCuboAbajo(){
  var vertice = [
  // Bottom face
    -1.5, 0.5, -4.0,
    1.5, 0.5, -4.0,
    1.5, 0.5, -0.5,
    -1.5, 0.5, -0.5
  ];
  return vertice;
}
function verticeCuboDerecha(){
  var vertice = [
  // Right face
    1.5, 0.5, -4.0,
    1.5, 2.5, -4.0,
    1.5, 3.5, -0.5,
    1.5, 0.5, -0.5
  ];
  return vertice;
}
function verticeCuboIzquierda(){
  var vertice = [
  // Left face
    -1.5, 3.5, -0.5,
    -1.5, 2.5, -4.0,
    -1.5, 0.5, -4.0,
    -1.5, 0.5, -0.5
  ];
  return vertice;
}
function verticeCubo(){
  var vertices= [];
  var lado= verticeCuboFrente();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  lado= verticeCuboAtras();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  lado= verticeCuboArriba();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  lado= verticeCuboAbajo();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  lado= verticeCuboDerecha();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  lado= verticeCuboIzquierda();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  return vertices;
}
function cabezaFrente(){
  var vertice = [
  // Front face
    -1.0, -1.5, 1.0,
    1.0, -1.5, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0
  ];
  return vertice;
}
function cabezaAtras(){
  var vertice = [
  // Back face
    -1.0, -1.0, -1.5,
    -1.0, 1.5, -1.5,
    1.0, 1.5, -1.5,
    1.0, -1.0, -1.5
  ];
  return vertice;
}
function cabezaArriba(){
  var vertice = [
  // Top face
    -1.0, 1.5, -1.5,
    -1.0, 1, 1.0,
    1.0, 1, 1.0,
    1.0, 1.5, -1.5
  ];
  return vertice;
}
function cabezaAbajo(){
  var vertice = [
  // Bottom face
    -1.0, -1.0, -1.5,
    1.0, -1.0, -1.5,
    1.0, -1.5, 1.0,
    -1.0, -1.5, 1.0
  ];
  return vertice;
}
function cabezaDerecha(){
  var vertice = [
  // Right face
    1.0, -1.0, -1.5,
    1.0, 1.5, -1.5,
    1.0, 1.0, 1.0,
    1.0, -1.5, 1.0
  ];
  return vertice;
}
function cabezaIzquierda(){
  var vertice = [
  // Left face
    -1.0, -1.0, -1.5,
    -1.0, -1.5, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.5, -1.5
  ];
  return vertice;
}





function verticebrazoFrente(){
  var vertice = [
  // Front face
  -1.45, 3, -1,
  -2.5, 3, -1,
  -2.5, -2, -1,
  -1.45, -2, -1
  ];
  return vertice;
}

function verticebrazoAtras(){
  var vertice = [
  // Back face
   -1.45, 2.5, -2,
    -2.5, 2.5, -2,
    -2.5, -2, -2,
    -1.45, -2, -2
  ];
  return vertice;
}
function verticebrazoArriba(){
  var vertice = [
  // Top face
   -2.5, 3, -1,
    -1.45, 3, -1,
    -1.45, 2.5, -2.0,
    -2.5, 2.5, -2.0
  ];
  return vertice;
}
function verticebrazoAbajo(){
  var vertice = [
  // Bottom face
    -2.5, -2, -1,
    -1.45, -2, -1,
    -1.45, -2, -2.0,
    -2.5,-2, -2.0
  ];
  return vertice;
}

function verticebrazoDerecha(){
  var vertice = [
  // Right face
  -1.45, 3.0, -1.0,
  -1.45, 2.5, -2,
  -1.45, -2, -2,
  -1.45, -2.0, -1.0,
  ];
  return vertice;
}
function verticebrazoIzquierda(){
  var vertice = [
  // Left face
  -2.5, 3, -1.0,
  -2.5, 2.5, -2,
  -2.5, -2, -2,
  -2.5, -2.0, -1.0,
  ];
  return vertice;
}
function verticeBrazo(){
  var vertices= [];
  var lado= verticebrazoFrente();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAtras();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoArriba();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAbajo();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoDerecha();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoIzquierda();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  return vertices;
}
// pata 2
// ----------------------------------------------------------------------------

function verticebrazoFrente1(){
  var vertice = [
  // Front face
    1.45, 3, -1,
    2.5, 3, -1,
    2.5, -2, -1,
    1.45, -2, -1
  ];
  return vertice;
}

function verticebrazoAtras1(){
  var vertice = [
  // Back face
   1.45, 2.5, -2,
    2.5, 2.5, -2,
    2.5, -2, -2,
    1.45, -2, -2
  ];
  return vertice;
}
function verticebrazoArriba1(){
  var vertice = [
  // Top face
   2.5, 3, -1,
    1.45, 3, -1,
    1.45, 2.5, -2.0,
    2.5, 2.5, -2.0
  ];
  return vertice;
}
function verticebrazoAbajo1(){
  var vertice = [
  // Bottom face
    2.5, -2, -1,
    1.45, -2, -1,
    1.45, -2, -2.0,
    2.5,-2, -2.0
  ];
  return vertice;
}

function verticebrazoDerecha1(){
  var vertice = [
  // Right face
  1.45, 3.0, -1.0,
  1.45, 2.5, -2,
  1.45, -2, -2,
  1.45, -2.0, -1.0,
  ];
  return vertice;
}
function verticebrazoIzquierda1(){
  var vertice = [
  // Left face
  2.5, 3, -1.0,
  2.5, 2.5, -2,
  2.5, -2, -2,
  2.5, -2.0, -1.0,
  ];
  return vertice;
}
function verticeBrazo1(){
  var vertices= [];
  var lado= verticebrazoFrente1();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAtras1();
  for (var i in lado) {
	vertices = vertices.concat1(lado[i]);
  }
  var lado= verticebrazoArriba1();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAbajo1();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoDerecha1();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoIzquierda1();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  return vertices;
}
// ----------------------------------------------------------------------------
// pata 3
function verticebrazoFrente3(){
  var vertice = [
  // Front face
  -1.45, 1, -3,
  -2.5, 1, -3,
  -2.5, -2, -3,
  -1.45, -2, -3
  ];
  return vertice;
}

function verticebrazoAtras3(){
  var vertice = [
  // Back face
   -1.45, 0.7, -4,
    -2.5, 0.7, -4,
    -2.5, -2, -4,
    -1.45, -2, -4
  ];
  return vertice;
}
function verticebrazoArriba3(){
  var vertice = [
  // Top face
   -2.5, 1, -3,
    -1.45, 1, -3,
    -1.45, 0.7, -4.0,
    -2.5, 0.7, -4.0
  ];
  return vertice;
}
function verticebrazoAbajo3(){
  var vertice = [
  // Bottom face
    -2.5, -2, -3,
    -1.45, -2, -3,
    -1.45, -2, -4.0,
    -2.5,-2, -4.0
  ];
  return vertice;
}

function verticebrazoDerecha3(){
  var vertice = [
  // Right face
  -1.45, 1.0, -3.0,
  -1.45, 0.7, -4,
  -1.45, -2, -4,
  -1.45, -2.0, -3.0,
  ];
  return vertice;
}
function verticebrazoIzquierda3(){
  var vertice = [
  // Left face
  -2.5, 1, -3.0,
  -2.5, 0.7, -4,
  -2.5, -2, -4,
  -2.5, -2.0, -3.0,
  ];
  return vertice;
}
function verticeBrazo3(){
  var vertices= [];
  var lado= verticebrazoFrente3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAtras3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoArriba3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAbajo3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoDerecha3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoIzquierda3();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  return vertices;
}
//--------------------------------------------------------------------------
// pata 4
function verticebrazoFrente2(){
  var vertice = [
  // Front face
  1.45, 1, -3,
  2.5, 1, -3,
  2.5, -2, -3,
  1.45, -2, -3
  ];
  return vertice;
}

function verticebrazoAtras2(){
  var vertice = [
  // Back face
   1.45, 0.7, -4,
    2.5, 0.7, -4,
    2.5, -2, -4,
    1.45, -2, -4
  ];
  return vertice;
}
function verticebrazoArriba2(){
  var vertice = [
  // Top face
   2.5, 1, -3,
  1.45, 1, -3,
    1.45, 0.7, -4.0,
    2.5, 0.7, -4.0
  ];
  return vertice;
}
function verticebrazoAbajo2(){
  var vertice = [
  // Bottom face
    2.5, -2, -3,
    1.45, -2, -3,
    1.45, -2, -4.0,
    2.5,-2, -4.0
  ];
  return vertice;
}

function verticebrazoDerecha2(){
  var vertice = [
  // Right face
  1.45, 1.0, -3.0,
  1.45, 0.7, -4,
  1.45, -2, -4,
  1.45, -2.0, -3.0,
  ];
  return vertice;
}
function verticebrazoIzquierda2(){
  var vertice = [
  // Left face
  2.5, 1, -3.0,
  2.5, 0.7, -4,
  2.5, -2, -4,
  2.5, -2.0, -3.0,
  ];
  return vertice;
}
function verticeBrazo2(){
  var vertices= [];
  var lado= verticebrazoFrente2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAtras2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoArriba2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoAbajo2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoDerecha2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  var lado= verticebrazoIzquierda2();
  for (var i in lado) {
	vertices = vertices.concat(lado[i]);
  }
  return vertices;
}






// -------------------------------------------------------------------------
// mundo
function verticemundoAtras1(){
  var vertice = [
  // Back face
   -100, -2.7, -80,
   100, -2.7, -80,
   100, 80, -80,
    -100, 80, -80
  ];
  return vertice;
}
function verticemundoArriba1(){
  var vertice = [
  // Top face
   100, -2, 1,
    -100, -2, 1,
    -100, -6, -300.0,
    100, -6, -300.0
  ];
  return vertice;
}
// ----------------------------------
// arbol
function verticearbol(){
  var vertice = [
  // Front face
  -80, 2, -40,
  150, 2, -40,
  150, -1, -40,
  -80, -1, -40
  ]
  return vertice;
}

function texturaCuadrado1(){
  var textura = [
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0
  ];
  return textura;
}

function indiceCuadrado(){
  var indice = [
    0, 1, 2,  0, 2, 3
  ];
  return indice;
}
