let seleccion;
let nota1;
let nota2;
let nota3;
let promedio;
let total;
let nombre;

function calificacion(nombreProfesor) {
    do {
        seleccion = prompt("Bienvenido/a " + nombreProfesor + "." + " Por favor, seleccione el nivel del alumno\n1.Primaria \n2.Secundaria\nSi no quiere continuar presione 3");
        switch (seleccion) {
            case '1':
                nombre = prompt("Ingrese el nombre del alumno/a");
                nota1 = parseInt(prompt("Ingrese la primera nota"));
                nota2 = parseInt(prompt("Ingrese la segunda nota"));
                nota3 = parseInt(prompt("Ingrese la tercera nota"));
                total = nota1 + nota2 + nota3;
                promedio = total / 3;
                if (promedio >= 6) {
                    alert(nombre + ' aprobó con un promedio de ' + promedio);
                } else {
                    alert(nombre + ' desaprobó con un promedio de ' + promedio);
                }
                break;
            case '2':
                nombre = prompt("Ingrese el nombre del alumno/a");
                nota1 = parseInt(prompt("Ingrese la primera nota"));
                nota2 = parseInt(prompt("Ingrese la segunda nota"));
                nota3 = parseInt(prompt("Ingrese la tercera nota"));
                total = nota1 + nota2 + nota3;
                promedio = total / 3;
                if (promedio >= 7) {
                    alert(nombre + ' aprobó con un promedio de ' + promedio);
                } else {
                    alert(nombre + ' desaprobó con un promedio de ' + promedio);
                }
                break;
            case '3':
                alert("Gracias por utilizar el sistema, adios.")
                break; 3
            default:
                alert("Usted seleccionó una opción inválida.");
        }
    } while (seleccion != 3);
}

let inicio = prompt("Por favor, ingrese su nombre para iniciar.");
calificacion(inicio);