class Alumno {
    constructor(nombre, notas = []) {
        this.nombre = nombre;
        this.notas = notas;
    }

    calcularTotal() {
        return this.notas.reduce((total, nota) => total + nota, 0);
    }

    calcularPromedio() {
        if (this.notas.length === 0) return 0;
        return this.calcularTotal() / this.notas.length;
    }

    estaAprobado() {
        return this.calcularPromedio() >= 7 ? "Aprobado" : "Desaprobado";
    }
}

let alumnos = [];

const Fetch = async () => {
    try {
        const response = await fetch("alumnos.json");
        const data = await response.json();

        alumnos = data.map(a => new Alumno(a.nombre, a.notas));
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        cargarDOM();
    } catch (error) {
        console.error("Error al cargar alumnos:", error);
    }
};


const cargarLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("alumnos"));
    if (data && data.length > 0) {
        alumnos = data.map(a => new Alumno(a.nombre, a.notas));
        cargarDOM();
    } else {
        Fetch();
    }
};

const cargarDOM = () => {
    const contenedorAlumnos = document.getElementById("contenedorAlumnos");
    contenedorAlumnos.innerHTML = "";

    alumnos.forEach((alumno, index) => {

        let textoNotas;
        if (alumno.notas.length > 0) {
            textoNotas = alumno.notas.join(" / ");
        } else {
            textoNotas = "Sin notas";
        }

        let estado = alumno.estaAprobado();
        let claseBadge;

        if (estado === "Aprobado") {
            claseBadge = "bg-success";
        } else {
            claseBadge = "bg-danger";
        }

        const div = document.createElement("div");
        div.classList.add("col-md-4", "mb-4");

        div.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${alumno.nombre}</h5>

                    <p class="card-text">
                        <strong>Notas:</strong> ${textoNotas}
                    </p>

                    <p class="card-text">
                        <strong>Promedio:</strong>
                        ${alumno.calcularPromedio().toFixed(2)}
                    </p>

                    <span class="badge ${claseBadge}">
                        ${estado}
                    </span>
                </div>

                <div class="card-footer text-center">

                    <button class="btn btn-warning btn-sm btnModificar" data-index="${index}">
                        Modificar
                    </button>

                    <button class="btn btn-danger btn-sm btnBorrarAlumno" data-index="${index}">
                        Borrar
                    </button>
                </div>
            </div>
        `;

        contenedorAlumnos.appendChild(div);
    });
};

document.querySelector("#btnCargar").addEventListener("click", async () => {

    const { value: nombre } = await Swal.fire({
        title: "Nombre del alumno",
        input: "text",
        inputPlaceholder: "Ingrese el nombre",
        showCancelButton: true
    });

    if (!nombre) return;

    const { value: notasTexto } = await Swal.fire({
        title: "Notas",
        input: "text",
        inputPlaceholder: "Ej: 7, 8, 6",
        showCancelButton: true
    });

    if (!notasTexto) return;

    const notas = notasTexto
        .split(",")
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));

    alumnos.push(new Alumno(nombre.trim(), notas));
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    cargarDOM();

    Swal.fire("Alumno creado correctamente", "", "success");
});

document.querySelector("#btnBorrar").addEventListener("click", () => {
    
    Swal.fire({
            title: "¿Estás seguro que quieres borrar todos los datos?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if(result.isConfirmed){
                localStorage.removeItem("alumnos");
                alumnos = [];
                cargarDOM();
            };
        })
});


document.addEventListener("click", async (e) => {
    const index = Number(e.target.dataset.index);
    const alumno = alumnos[index];

    if (e.target.classList.contains("btnModificar")) {

        const { value: nuevoNombre } = await Swal.fire({
            title: "Modificar nombre",
            input: "text",
            inputValue: alumno.nombre,
            showCancelButton: true
        });

    if (!nuevoNombre) return;

        const { value: nuevasNotasTexto } = await Swal.fire({
            title: "Modificar notas",
            input: "text",
            inputValue: alumno.notas.join(", "),
            showCancelButton: true
        });

    if (!nuevasNotasTexto) return;

        alumno.nombre = nuevoNombre.trim();
        alumno.notas = nuevasNotasTexto
            .split(",")
            .map(n => parseInt(n.trim()))
            .filter(n => !isNaN(n));

        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        cargarDOM();

        Swal.fire("Datos modificados", "", "success");
    }

    if (e.target.classList.contains("btnBorrarAlumno")) {
        Swal.fire({
            title: `¿Estás seguro de borrar a ${alumno.nombre}?`,
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                alumnos.splice(index, 1);
                localStorage.setItem("alumnos", JSON.stringify(alumnos));
                cargarDOM();
            }
        });
    }
});

cargarLocalStorage();
