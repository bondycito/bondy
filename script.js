document.getElementById("btn_registrarse").addEventListener("click",registrarse);
document.getElementById("btn_iniciar-sesion").addEventListener("click",iniciarsesion);

var contenedor_inicio_registro = document.querySelector(".contenedor_inicio-registro");
var formulario_ingreso = document.querySelector(".formulario_ingreso");
var formulario_registro = document.querySelector(".formulario_registro");
var caja_trasera_ingreso = document.querySelector(".caja_trasera-ingreso");
var caja_trasera_registro = document.querySelector(".caja_trasera-registro");


function iniciarsesion() {
    if(window.innerWidth>650){
        formulario_registro.style.display = "none";
        contenedor_inicio_registro.style.left = "10px";
        formulario_ingreso.style.display = "block";
        caja_trasera_registro.style.opacity = "1";  
        caja_trasera_ingreso.style.opacity = "0";
    }else{
        formulario_registro.style.display = "none";
        contenedor_inicio_registro.style.left = "0px";
        formulario_ingreso.style.display = "block";
        caja_trasera_registro.style.display = "block";  
        caja_trasera_ingreso.style.display = "none";
    }
    
}

function registrarse() {
    if(window.innerWidth>650){
        formulario_registro.style.display = "block";
        contenedor_inicio_registro.style.left = "410px";
        formulario_ingreso.style.display = "none";
        caja_trasera_registro.style.opacity = "0";  
        caja_trasera_ingreso.style.opacity = "1";
    }else{
        formulario_registro.style.display = "block ";
        contenedor_inicio_registro.style.left = "0px";
        formulario_ingreso.style.display = "none";
        caja_trasera_registro.style.display = "none";  
        caja_trasera_ingreso.style.display = "block";
        caja_trasera_ingreso.style.opacity ="1";
    }

}
