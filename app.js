class Alumno {
    constructor(nombre, nota1, nota2, nota3,){
        this.nombre = nombre;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.total = this.calcularTotal();
    }

    calcularTotal(){
        return this.nota1 + this.nota2 + this.nota3;
    }

    calcularPromedio(cantidadNotas){
        return this.total / cantidadNotas;
    }

    estaAprobado(cantidadNotas) {
        let promedio = this.calcularPromedio(cantidadNotas);
        if (promedio >= 7) {
            return "Aprobado";
        } else {
            return "Desaprobado";
        }
    }
}


let alumnos = []

let continuar = true

while(continuar){
    let seleccion = prompt('Elija que desea realizar \n1 - Crear alumno \n2 - Mostrar alumnos ingresados\n3 - Calcular promedio del alumno\n4 - Salir')

    switch(seleccion) {
        case '1':
            let nombre = prompt ("Ingrese el nombre del alumno");
            let nota1 = parseInt(prompt ("Ingrese la primera nota del alumno"));
            let nota2 = parseInt(prompt ("Ingrese la segunda nota del alumno"));
            let nota3 = parseInt(prompt ("Ingrese la tercera nota del alumno"));
            alumnos.push(new Alumno (nombre, nota1, nota2, nota3,));
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            console.table(JSON.parse(localStorage.getItem("alumnos")));
            alert("Alumno creado correctamente");
            break;
        case '2':
            if (alumnos.length === 0) {
                alert("No hay alumnos cargados");
            } else {
                let mensaje = alumnos.map((alumno, index) =>"ID: " + (index + 1) + "\n" + "Nombre: " + alumno.nombre + "\n" + "---------------------").join("\n");
                alert(mensaje);
            }
            break;
        case '3':
            case '3':
                let buscarAlumno = parseInt(prompt('Ingrese el ID'));
                let cantidadNotas = parseInt(prompt('Ingrese la cantidad de notas del alumno'));
                let alumno = alumnos.find((alumno, index) => index === buscarAlumno - 1);
                if (alumno) {
                alert("Alumno: " + alumno.nombre +"\nPromedio: " + alumno.calcularPromedio(cantidadNotas).toFixed(2) +"\nEstado: " + alumno.estaAprobado(cantidadNotas));
                } else {
                alert("Alumno no encontrado");
                }
                break;
        case '4':
            alert("Gracias por utilizar el sistema, adios.");
            continuar = false

            break;
        
        default:
            alert("Usted seleccionó una opción inválida.");

            break;

    }
}
