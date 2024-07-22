var gl;
function iniciarGL(canvas) {
	try {
		gl = canvas.getContext("webgl");
		gl.verAnchoVentana = canvas.width;
		gl.verAltoVentana = canvas.height;
	} catch (e) { }
	if (!gl) {
		alert("Perdone, no se pudo inicializar WebGL");
	}
}
function conseguirShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) { return null; }
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
var progShader;
function iniciarShader() {
	var fragShader = conseguirShader(gl, "shader-fs");
	var vertShader = conseguirShader(gl, "shader-vs");
	progShader = gl.createProgram();
	gl.attachShader(progShader, vertShader);
	gl.attachShader(progShader, fragShader);
	gl.linkProgram(progShader);
	if (!gl.getProgramParameter(progShader, gl.LINK_STATUS)) {
		alert("Perdone, no pudo inicializarse el shaders");
	}
	gl.useProgram(progShader);
	progShader.vertPosAtributo = gl.getAttribLocation(progShader, "aVertPosicion");
	gl.enableVertexAttribArray(progShader.vertPosAtributo);
	progShader.textCoordAtributo = gl.getAttribLocation(progShader, "aTexturaCoord");
	gl.enableVertexAttribArray(progShader.textCoordAtributo);
	progShader.pMatrizUniform = gl.getUniformLocation(progShader, "uPMatriz");
	progShader.mvMatrizUniform = gl.getUniformLocation(progShader, "uMVMatriz");
	progShader.muestraUniform = gl.getUniformLocation(progShader, "uMuestra");
	progShader.colorUniform = gl.getUniformLocation(progShader, "uColor");
 }
function cargarManijaTextura(pTextura) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, pTextura);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pTextura.imagen);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.bindTexture(gl.TEXTURE_2D, null);
}
//INCIAMOS LAS VARIABLES DE LAS TEXTURAS A CARGAR
var aTextura;//textura de las estrellas
var aTexturaCuadrado; //Textura de los enemigos
var aTexturaTriangulo; //Textura del jugador
/////
function cargarManija(pDireccion){
	var textura = gl.createTexture();
	textura.imagen = new Image();
	textura.imagen.onload = function () {
		cargarManijaTextura(textura);
	};
	textura.imagen.src = pDireccion;
	return textura;
}
//Cargamos las texturas de las estrellas
function iniciarTextura(pDireccion) {
	aTextura= cargarManija(pDireccion);
}
//Cargamos las texturas de los cuadrados/ENEMIGOS
function iniciarTexturaCadrado(pDireccion) {
	aTexturaCuadrado= cargarManija(pDireccion);
}
//Cargamos las texturas deL triangulo/JUGADOR
function iniciarTexturaTriangulo(pDireccion) {
	aTexturaTriangulo= cargarManija(pDireccion);
}
//////No modificar si no es necesario
var mvMatriz = mat4.create();
var pMatriz = mat4.create();
function modificarMatrizUniforme() {
	gl.uniformMatrix4fv(progShader.pMatrizUniform, false, pMatriz);
	gl.uniformMatrix4fv(progShader.mvMatrizUniform, false, mvMatriz);
}
function sexRad(pAngulo) {
	return pAngulo * Math.PI / 180;
}
var keyPrecionado = {};
function keyDesactivo(event) {
	keyPrecionado[event.keyCode] = true;
}
function keyActivo(event) {
	keyPrecionado[event.keyCode] = false;
}
var zoom = -15;
var inclinacionX = 90;
var girarZ = 0;
function manejoKey() {
	if (keyPrecionado[32]) {
		zoom -= 0.1; // Page Up
	}
	if (keyPrecionado[34]) {
		zoom += 0.1; // Page Down
	}
	/*if (keyPrecionado[38]) {
		inclinacionX += 2; // Up cursor key
	}
	if (keyPrecionado[40]) {
		inclinacionX -= 2; // Down cursor key
	}*/
}
function puntosPoligono(pPuntos, pVertice){
    //... esta funcion trabaja tambien para 3D
    var pol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pol);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pPuntos), gl.STATIC_DRAW);
    pol.itemTam = 3;
    //... si los puntos fuesen 3D habria que considerar aristas
    pol.numItems = pVertice;
    return pol;
}
function coordenadaTextura(pCoord, pNumT){
	var polT = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, polT);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pCoord), gl.STATIC_DRAW);
    polT.itemTam = 2;
    polT.numItems = pNumT;
	return polT;
}

var mvMatrizPila = [];
function mvApilarMatriz() {
	var copiar = mat4.create();
	mat4.set(mvMatriz, copiar);
	mvMatrizPila.push(copiar);
}
function mvDesapilarMatriz() {
	if (mvMatrizPila.length ==0) {
		throw "Invalido desapilar!";
	}
	mvMatriz = mvMatrizPila.pop();
}
///////FIN
////
var aPtoEstrella, aCoordTextura;
var aPtoCuadrado;
var aPtoTriangulo
function iniciarBuffer() {
	aPtoEstrella= puntosPoligono([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0], 4);
	aPtoCuadrado= puntosPoligono([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0], 4);
	aPtoTriangulo= puntosPoligono([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0], 4);

	/////
	aCoordTextura= coordenadaTextura([0, 0, 1, 0, 0, 1, 1, 1], 4);
}
function dibujarImagen(pTextura, pCoordTextura, pPtoEstrella) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, pTextura);
	gl.uniform1i(progShader.muestraUniform, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, pCoordTextura);
	gl.vertexAttribPointer(progShader.textCoordAtributo, pCoordTextura.itemTam, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, pPtoEstrella);
	gl.vertexAttribPointer(progShader.vertPosAtributo, pPtoEstrella.itemTam, gl.FLOAT, false, 0, 0);
	modificarMatrizUniforme();
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, pPtoEstrella.numItems);
}

///FUNCIONES PARA LA ESTRELLA///////
function estrella(pX, pY, pZ, pDx, pDy, pVelocidadR) {
	this.aX = pX; this.aY = pY; this.aZ = pZ;
	this.aDx= pDx; this.aDy= pDy;
	this.aVelocidadR = pVelocidadR;

	this.puntajeEstrella=0;
	// Modificar el color con valores en ejecucion
	this.colorAleatorio();
}
estrella.prototype.draw = function (pCentella) {
	mvApilarMatriz();
	//... Movemos la estrella a una posicion
	mat4.translate(mvMatriz, [this.aX, 0.0, 0.0]);
	mat4.translate(mvMatriz, [0.0, this.aY, 0.0]);
	if (pCentella) {
		// Draw a non-rotating star in the alternate "twinkling" color
		gl.uniform3f(progShader.colorUniform, this.aBrilloRojo, this.aBrilloVerde, this.aBrilloAzul);
		dibujarImagen(aTextura, aCoordTextura, aPtoEstrella);
	}
	// All estrellas girarZ around the Z axis at the same rate
	// Draw the star in its main color
	gl.uniform3f(progShader.colorUniform, this.aRojo, this.aVerde, this.aAzul);
	dibujarImagen(aTextura, aCoordTextura, aPtoEstrella);
	mvDesapilarMatriz();
};

estrella.prototype.controlDireccion = function (pLapsoTiempo, pI, pNum) {
    if (this.aX < 6 && this.aX > -6 && this.aY < 6 && this.aY > -6) {
        for (var i = 0; i < pNum; i++) {
            if (i != pI && estrellas[i] && triangle[i]) {
                if (Math.pow(Math.pow(this.aX - estrellas[i].aX, 2) + Math.pow(this.aY - estrellas[i].aY, 2), 0.5) <= 0.5) {
                    this.aDx = (Math.random() * 100) % 3 - 1;
                    this.aDy = (Math.random() * 100) % 3 - 1;
                    estrellas[i].aDx = this.aDx * (-1);
                    estrellas[i].aDy = this.aDy * (-1);
                }
            }
            // Comprobar colisión con una CUADRADO
            if (cuadrados[i] && Math.sqrt(Math.pow(this.aX - cuadrados[i].aX, 2) + Math.pow(this.aY - cuadrados[i].aY, 2)) <= 0.5) {
                this.aDx = (Math.random() * 100) % 3 - 1;
                this.aDy = (Math.random() * 100) % 3 - 1;
                cuadrados[i].aDx = this.aDx * (-1);
                cuadrados[i].aDy = this.aDy * (-1);
            }

			
            // Comprobamos la colisión con el objeto Triángulo/JUGADOR
            if (triangle[i] && Math.sqrt(Math.pow(this.aX - triangle[i].aX, 2) + Math.pow(this.aY - triangle[i].aY, 2)) <= 0.5) {
                this.aX = -8;
                this.aY = -40;
                // Aumentar el puntaje después de posicionarlo en (0, 0)
                if (this.aX === -8 && this.aY === -40) {
                    this.puntajeEstrella++; // Inicializa puntaje si no está definido
                }
				// Verificar y manejar colisión con los límites del polígono expandido
				if (this.aX > 14) {
					this.aX = 14; // Reubicar dentro del límite derecho
					this.aDx = -Math.abs(this.aDx); // Cambiar dirección hacia adentro
					this.colorAleatorio();
				} else if (this.aX < -14) {
					this.aX = -14; // Reubicar dentro del límite izquierdo
					this.aDx = Math.abs(this.aDx); // Cambiar dirección hacia adentro
					this.colorAleatorio();
				}
				
				// Si la estrella llega a la línea y = -6, detener su movimiento en el eje Y
				if (this.aY <= -7) {
					this.aY = -7; // Fijar en el límite inferior
					this.aDy = 0; // Detener el movimiento en el eje Y
				}
				
            }
        }
    }

     // Verificar y manejar colisión con los límites del polígono
	 if (this.aX > 6) {
        //this.aX = 6; // Reubicar dentro del límite
        this.aDx = -Math.abs(this.aDx); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    } else if (this.aX < -6) {
        //this.aX = -6; // Reubicar dentro del límite
        this.aDx = Math.abs(this.aDx); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    }
    
    if (this.aY > 6) {
        //this.aY = 6; // Reubicar dentro del límite
        this.aDy = -Math.abs(this.aDy); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    } else if (this.aY < -6) {
        //this.aY = -6; // Reubicar dentro del límite
        this.aDy = Math.abs(this.aDy); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    }

    this.aX += this.aVelocidadR * this.aDx * pLapsoTiempo;
    this.aY += this.aVelocidadR * this.aDy * pLapsoTiempo;

    return this.puntajeEstrella;
};

// Crear instancia del Triangulo
// Función para actualizar el puntaje en pantalla
let cantidadEstrellas;

function actualizarPuntaje() {
    let puntajeTotal = 0;
    for (let i = 0; i < estrellas.length; i++) {
        puntajeTotal += estrellas[i].controlDireccion(0, i, estrellas.length);
    }

    const obtenerPuntaje = document.getElementById('obtenerPuntaje');
    obtenerPuntaje.innerText = 'Puntaje: ' + puntajeTotal;

    // Mostrar un alert
    if (puntajeTotal === cantidadEstrellas) {
        document.write("<div style='font-family: Arial, sans-serif; font-size: 24px; color: #FFD700; text-align: center; padding: 20px;'>¡FELICIDADES!<br>Has GANADO el juego</div>");
        setTimeout(function() {
            location.reload(); // Recarga la página después de 0.5 segundos
			alert('¡Puntaje actualizado!\n¡Sigue jugando!');


        },2000); // 2000 milisegundos = 2 segundos
    }
}



estrella.prototype.colorAleatorio = function () {
	// Dar a la estrella un color aleatorio
	// Circunstacia...
	this.aRojo = Math.random();
	this.aVerde = Math.random();
	this.aAzul = Math.random();
	//... Requerimos tambien un color para el brillo de la estrella cuando esta en ejecucion
	this.aBrilloRojo = Math.random();
	this.aBrilloVerde = Math.random();
	this.aBrilloAzul = Math.random();
};
///ESTRELLA-FIN////

///INICIO-FUNCIONES PARA EL CUADRADO///////
function cuadrado(pX, pY, pZ, pDx, pDy, pVelocidadR) {
	this.aX = pX; this.aY = pY; this.aZ = pZ;
	this.aDx= pDx; this.aDy= pDy;
	this.aVelocidadR = pVelocidadR;

	this.puntajeCuadrado=10;
	// Modificar el color con valores en ejecucion
	this.colorAleatorio();
}
cuadrado.prototype.draw = function (pCentella) {
	mvApilarMatriz();
	//... Movemos la estrella a una posicion
	mat4.translate(mvMatriz, [this.aX, 0.0, 0.0]);
	mat4.translate(mvMatriz, [0.0, this.aY, 0.0]);
	if (pCentella) {
		// Draw a non-rotating star in the alternate "twinkling" color
		gl.uniform3f(progShader.colorUniform, this.aBrilloRojo, this.aBrilloVerde, this.aBrilloAzul);
		dibujarImagen(aTexturaCuadrado, aCoordTextura, aPtoCuadrado);
	}
	// All estrellas girarZ around the Z axis at the same rate
	// Draw the star in its main color
	gl.uniform3f(progShader.colorUniform, this.aRojo, this.aVerde, this.aAzul);
	dibujarImagen(aTexturaCuadrado, aCoordTextura, aPtoCuadrado);
	mvDesapilarMatriz();
};
cuadrado.prototype.controlDireccionCuadrado = function (pLapsoTiempo, pI, pNum) {
    if (this.aX < 6 && this.aX > -6 && this.aY < 6 && this.aY > -6) {
        for (var i= 0; i<pNum; i++){
			if(i!=pI && cuadrados[i] && estrellas[i]){
				if((Math.pow(Math.pow(this.aX-cuadrados[i].aX,2)+Math.pow(this.aY-cuadrados[i].aY,2),0.5)<=0.5)) {
					this.aDx= (Math.random()*100)%3-1;
					this.aDy= (Math.random()*100)%3-1;
					cuadrados[i].aDx= this.aDx*(-1);
					cuadrados[i].aDy= this.aDy*(-1);
				}
			}

			// Comprobar colisión con una estrella
            /*if (estrellas[i] && Math.sqrt(Math.pow(this.aX - estrellas[i].aX, 2) + Math.pow(this.aY - estrellas[i].aY, 2)) <= 0.5) {
                this.aDx = (Math.random() * 100) % 3 - 1;
                this.aDy = (Math.random() * 100) % 3 - 1;
                estrellas[i].aDx = this.aDx * (-1);
                estrellas[i].aDy = this.aDy * (-1);
            }*/
		   if (triangle[i] && Math.sqrt(Math.pow(this.aX - triangle[i].aX, 2) + Math.pow(this.aY - triangle[i].aY, 2)) <= 0.5) {
				this.aDx = (Math.random() * 100) % 3 - 1;
				this.aDy = (Math.random() * 100) % 3 - 1;
				triangle[i].aDx= this.aDx*(-1);
				triangle[i].aDy= this.aDy*(-1);
				// Si el triángulo necesita cambiar de dirección también, puedes asignar nuevas direcciones aquí
				// triangulo.aDx = this.aDx * (-1);
				// triangulo.aDy = this.aDy * (-1);

				this.puntajeCuadrado--;
        	}

		}
    }
	

   // Verificar y manejar colisión con los límites del polígono
	 if (this.aX > 6) {
        //this.aX = 6; // Reubicar dentro del límite
        this.aDx = -Math.abs(this.aDx); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    } else if (this.aX < -6) {
        //this.aX = -6; // Reubicar dentro del límite
        this.aDx = Math.abs(this.aDx); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    }
    
    if (this.aY > 6) {
        //this.aY = 6; // Reubicar dentro del límite
        this.aDy = -Math.abs(this.aDy); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    } else if (this.aY < -6) {
        //this.aY = -6; // Reubicar dentro del límite
        this.aDy = Math.abs(this.aDy); // Cambiar dirección hacia adentro
        this.colorAleatorio();
    }
	this.aX += this.aVelocidadR*this.aDx * pLapsoTiempo;
	this.aY += this.aVelocidadR*this.aDy * pLapsoTiempo;

	return this.puntajeCuadrado;
};
// Función para actualizar el puntaje en pantalla
function actualizarPuntajeCuadrado() {
    let puntajeTotal = 10;
    for (let i = 0; i < cuadrados.length; i++) {
        puntajeTotal -= (10 - cuadrados[i].controlDireccionCuadrado(0, i, cuadrados.length));
    }

    const obtenerPuntaje = document.getElementById('obtenerPuntajeCuadrado');
    obtenerPuntaje.innerText = 'Vida: ' + puntajeTotal;

}
cuadrado.prototype.colorAleatorio = function () {
	// Dar a la estrella un color aleatorio
	// Circunstacia...
	this.aRojo = Math.random();
	this.aVerde = Math.random();
	this.aAzul = Math.random();
	//... Requerimos tambien un color para el brillo de la estrella cuando esta en ejecucion
	this.aBrilloRojo = Math.random();
	this.aBrilloVerde = Math.random();
	this.aBrilloAzul = Math.random();
};
///CUADRADO-FIN////

///INCIO---FUNCIONES PARA LA TRIANGULO///////
function triangulo(pX, pY, pZ, pDx, pDy, pVelocidadR) {
	this.aX = pX; this.aY = pY; this.aZ = pZ;
	this.aDx= pDx; this.aDy= pDy;
	this.aVelocidadR = pVelocidadR;
	////
	//this.puntaje = 0;
	this.rotacion = sexRad(0); // Ángulo de rotación en radianes
	// Modificar el color con valores en ejecucion
	this.colorAleatorio();
	// Modificar el color con valores en ejecucion
	this.colorAleatorio();
}
triangulo.prototype.draw = function (pCentella) {
	mvApilarMatriz();
	//... Movemos la estrella a una posicion
	mat4.translate(mvMatriz, [this.aX, 0.0, 0.0]);
	mat4.translate(mvMatriz, [0.0, this.aY, 0.0]);
	mat4.rotate(mvMatriz, this.rotacion, [0, 0, 1]);
	if (pCentella) {
		// Draw a non-rotating star in the alternate "twinkling" color
		gl.uniform3f(progShader.colorUniform, this.aBrilloRojo, this.aBrilloVerde, this.aBrilloAzul);
		dibujarImagen(aTexturaTriangulo, aCoordTextura, aPtoTriangulo);
	}
	// All estrellas girarZ around the Z axis at the same rate
	// Draw the star in its main color
	gl.uniform3f(progShader.colorUniform, this.aRojo, this.aVerde, this.aAzul);
	dibujarImagen(aTexturaTriangulo, aCoordTextura, aPtoTriangulo);
	mvDesapilarMatriz();
};
triangulo.prototype.controlDireccionTriangulo = function (pLapsoTiempo, pI, pNum) {
    var velocidad = 0.065;

    // Movimiento hacia arriba y abajo según la dirección de rotación
    if (keyPrecionado[39]) { 
        this.aX += velocidad * Math.cos(this.rotacion);
        this.aY += velocidad * Math.sin(this.rotacion);
    }
    if (keyPrecionado[37]) {
        this.aX -= velocidad * Math.cos(this.rotacion);
        this.aY -= velocidad * Math.sin(this.rotacion);
    }

    // Movimiento lateral
    if (keyPrecionado[40]) {
        this.aX += velocidad * Math.sin(this.rotacion);
        this.aY -= velocidad * Math.cos(this.rotacion);
    }
    if (keyPrecionado[38]) { 
        this.aX -= velocidad * Math.sin(this.rotacion);
        this.aY += velocidad * Math.cos(this.rotacion);
    }

    // Rotación del triángulo
    if (keyPrecionado[69]) { // tecla e
        this.rotacion += 0.045;
    }
    if (keyPrecionado[81]) { // tecla q
        this.rotacion -= 0.045;
    }

    // Limitar las posiciones dentro de los límites específicos
    this.limitarPosicion();

    // Control de rebote y cambio de color al salir de los límites
    if (this.aX > 6 || this.aX < -6 || this.aY > 6 || this.aY < -6) {
        this.aDx = -this.aDx; // Invertir la dirección
        this.aDy = -this.aDy;
        this.colorAleatorio(); // Cambiar color aleatorio
    }
};

triangulo.prototype.limitarPosicion = function () {
    // Limitar las posiciones dentro de los límites
    if (this.aX > 6) this.aX = 6;
    if (this.aX < -6) this.aX = -6;
    if (this.aY > 6) this.aY = 6;
    if (this.aY < -6) this.aY = -6;
};






triangulo.prototype.colorAleatorio = function () {
	// Dar a la estrella un color aleatorio
	// Circunstacia...
	this.aRojo = Math.random();
	this.aVerde = Math.random();
	this.aAzul = Math.random();
	//... Requerimos tambien un color para el brillo de la estrella cuando esta en ejecucion
	this.aBrilloRojo = Math.random();
	this.aBrilloVerde = Math.random();
	this.aBrilloAzul = Math.random();
};
///TRIANGULO-FIN////

var estrellas = [];
var cuadrados = [];
var triangle=[];
//cantidadEs =5;
//cantidadCu = 5;
function iniciarMundoObjeto() {
	document.getElementById('submitButton').addEventListener('click', function(event) {
		// Obtener los valores de los campos del formulario
		const treasures = document.getElementById('treasures').value;
		const enemies = document.getElementById('enemies').value;
		const blanco = document.getElementById('enemies').value;
	
		// Convertir los valores a números enteros
		cantidadEstrellas = parseInt(treasures);
		const cantidadCuadrados = parseInt(enemies);
	
		// Reiniciar los arrays antes de agregar nuevos objetos
		estrellas = [];
		cuadrados = [];
	
		// Generar y añadir estrellas al array
		for (let i = 0; i < cantidadEstrellas; i++) {
			estrellas.push(new estrella(
				Math.random() * 12 - 6, // Genera un valor entre -6 y 6
				Math.random() * 12 - 6, // Genera un valor entre -6 y 6
				0, // Puedes cambiar esto si necesitas otro valor
				(Math.random() * 2 - 1), // Genera un valor entre -1 y 1
				(Math.random() * 2 - 1), // Genera un valor entre -1 y 1
				0.001 // Puedes cambiar esto si necesitas otro valor
			));
		}
	
		// Generar y añadir cuadrados al array
		for (let i = 0; i < cantidadCuadrados; i++) {
			cuadrados.push(new cuadrado(
				Math.random() * 12 - 6, // Genera un valor entre -6 y 6
				Math.random() * 12 - 6, // Genera un valor entre -6 y 6
				0, // Puedes cambiar esto si necesitas otro valor
				(Math.random() * 2 - 1), // Genera un valor entre -1 y 1
				(Math.random() * 2 - 1), // Genera un valor entre -1 y 1
				0.003 // Puedes cambiar esto si necesitas otro valor
			));
		}
	
		// Desactivar el botón después de enviar
		//this.disabled = true;
		document.getElementById('blanco').focus();
	});
	triangle.push(new triangulo(0, -5, 0, 0, -8, 0.001));
}
function dibujarEscena() {
	gl.viewport(0, 0, gl.verAnchoVentana, gl.verAltoVentana);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(45, gl.verAnchoVentana / gl.verAltoVentana, 0.1, 100.0, pMatriz);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	gl.enable(gl.BLEND);
	mat4.identity(mvMatriz);
	mat4.translate(mvMatriz, [0.0, 0.0, zoom]);
	var centella = document.getElementById("centella").checked;
	for (var i in estrellas) {
		estrellas[i].draw(centella);
	}
	for (var i in cuadrados) {
		cuadrados[i].draw(centella);
	}

	for (var i in triangle) {
		triangle[i].draw(centella);
	}
}
var finTiempo = 0;
function animacion(pNum) {
	var tiempoActual = new Date().getTime();
	if (finTiempo != 0) {
		var lapso = tiempoActual - finTiempo;
		for (var i in triangle){
			triangle[i].controlDireccionTriangulo(lapso, i, pNum);
		}
		for (var i in estrellas){
			estrellas[i].controlDireccion(lapso, i, pNum);
		}
		for (var i in cuadrados){
			cuadrados[i].controlDireccionCuadrado(lapso, i, pNum);
		}	}
	finTiempo = tiempoActual;
}
function momento() {
	//manejoKey();
	dibujarEscena();
	animacion(6);
	requestAnimFrame(momento);
}
// Bucle de animación
function animar() {
	actualizarPuntaje();
	actualizarPuntajeCuadrado();

	requestAnimationFrame(animar);
}
function animarCuadrado() {
	actualizarPuntajeCuadrado();

	requestAnimationFrame(animarCuadrado);
}

// Inicia la animación

function iniciarWebGL() {
	var canvas = document.getElementById("leccion06-brillo");
	iniciarGL(canvas);
	iniciarShader();
	iniciarBuffer();
	iniciarTextura("img/pelota0.jpeg");
	iniciarTexturaCadrado("img/cuadrado.jpeg");
	iniciarTexturaTriangulo("img/trianguloC.jpeg");

	iniciarMundoObjeto();
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	//gl.enable(gl.DEPTH_TEST);
	document.onkeydown = keyDesactivo;
	document.onkeyup = keyActivo;
	momento();
	animar();
	animarCuadrado()
}