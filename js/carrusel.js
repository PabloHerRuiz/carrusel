window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");

    //crear noticias
    var crear = document.getElementById("crearNoticia");
    var f_inicio = document.getElementById("f_inicio");
    var f_fin = document.getElementById("f_fin");
    var duracion = document.getElementById("duracion");
    var prioridad = document.getElementById("prioridad");
    var titulo = document.getElementById("titulo");
    var perfil = document.getElementById("perfil");
    var tipo = document.getElementById("tipo");
    var labelImg = document.querySelector('label[for="imagen"]');
    var cImagen = document.getElementById("imagen");
    var labelVid = document.querySelector('label[for="video"]');
    var cVideo = document.getElementById("video");
    var labelCont = document.querySelector('label[for="contenido"]');
    var contenido = document.getElementById("contenido");

    //mostrar
    cImagen.style.display = "none";
    labelImg.style.display = "none";
    cVideo.style.display = "none";
    labelVid.style.display = "none";
    contenido.style.display = "none";
    labelCont.style.display = "none";

    tipo.addEventListener("change", function () {
        if (tipo.value == "1") {
            cImagen.style.display = "";
            labelImg.style.display = "";
            cVideo.style.display = "none";
            labelVid.style.display = "none";
            contenido.style.display = "none";
            labelCont.style.display = "none";
        } else if (tipo.value == "2") {
            cImagen.style.display = "none";
            labelImg.style.display = "none";
            cVideo.style.display = "";
            labelVid.style.display = "";
            contenido.style.display = "none";
            labelCont.style.display = "none";
        } else if (tipo.value == "3") {
            cImagen.style.display = "none";
            labelImg.style.display = "none";
            cVideo.style.display = "none";
            labelVid.style.display = "none";
            contenido.style.display = "";
            labelCont.style.display = "";
        }
    })


    // Obtén el formulario
    var formulario = document.getElementById("formulario");

    // Agrega un event listener para el evento submit
    formulario.addEventListener("submit", function (event) {

        // Almacenar mensajes de error
        var errores = [];

        // Validar que los campos no estén vacíos
        if (f_inicio.value === "") {
            errores.push('Por favor, selecciona una fecha de comienzo.');
        }
        if (f_fin.value === "") {
            errores.push('Por favor, selecciona una fecha de fin.');
        }
        if (duracion.value === "") {
            errores.push('Por favor, ingresa la duracion.');
        }
        if (prioridad.value === "") {
            errores.push('Por favor, ingresa la prioridad.');
        }
        if (titulo.value === "") {
            errores.push('Por favor, ingresa el titulo.');
        }
        if (perfil.value === "") {
            errores.push('Por favor, ingresa el perfil.');
        }
        if (tipo.value === "") {
            errores.push('Por favor, selecciona el tipo.');
        }
        if (cImagen.style.display !== "none" && cImagen.value === "") {
            errores.push('Por favor, selecciona una imagen.');
        }
        if (cVideo.style.display !== "none" && cVideo.value === "") {
            errores.push('Por favor, selecciona un video.');
        }
        if (contenido.style.display !== "none" && contenido.value === "") {
            errores.push('Por favor, rellene el contenido.');
        }

        // Verificar si hay errores
        if (errores.length > 0) {
            // Prevenir el envío del formulario
            event.preventDefault();

            // Mostrar alerta con mensajes de error
            alert('Todos los campos son obligatorios. Por favor, completa todos los campos:\n\n' + errores.join('\n'));
        } else {
            // No hay errores, enviar el formulario
            formulario.submit();
        }
    });

    crear.addEventListener("click", function () {

        if (tipo.value == "1") {

            if (cImagen.files.length > 0) {
                var form = new FormData();
                form.append("imagen", cImagen.files[0]);
                fetch("http://localhost/carrusel/API/apiNews.php?foto=1", {
                    method: "POST",
                    body: form
                })
                    .then(x => x.text())
                    .then(y => {
                        alert(y);
                        cImagen.value = null;
                    }
                    );

            } else {
                // alert("DEBE INTRODUCIR UN FICHERO")
                return;
            }
            //guardamos datos
            tipoContent = {
                "tipo": "imagen",
                "url": cImagen.value.replace("C:\\fakepath\\", "imagenes/")
            }
        } else if (tipo.value == "2") {

            if (cVideo.files.length > 0) {
                var form = new FormData();
                form.append("video", cVideo.files[0]);
                fetch("http://localhost/carrusel/API/apiNews.php?video=1", {
                    method: "POST",
                    body: form
                })
                    .then(x => x.text())
                    .then(y => {
                        alert(y);
                        cVideo.value = null;
                    }
                    );

            } else {
                // alert("DEBE INTRODUCIR UN FICHERO")
                return;
            }

            //sacamos formato
            var ruta = cVideo.value;
            var partes = ruta.split('\\');
            var nombreArchivoConExtension = partes[partes.length - 1];
            var formato = nombreArchivoConExtension.split('.').pop();

            //guardamos datos
            tipoContent = {
                "tipo": "video",
                "url": cVideo.value.replace("C:\\fakepath\\", "videos/"),
                "formato": formato
            }

        } else if (tipo.value == "3") {
            //guardamos datos
            tipoContent = {
                "tipo": "web",
                "contenido": contenido.value
            }
        }

        tipoJson = JSON.stringify(tipoContent);


        var noticia = {
            "f_inicio": f_inicio.value,
            "f_fin": f_fin.value,
            "duracion": duracion.value,
            "prioridad": prioridad.value,
            "titulo": titulo.value,
            "perfil": perfil.value,
            "tipo": tipoJson
        };
        var noticiaJson = JSON.stringify(noticia);
        // Realiza la solicitud POST
        fetch("http://localhost/carrusel/API/apiNews.php", {
            method: "POST",
            body: noticiaJson,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(x => x.text())
            .then(y => {
                console.log(y);
                console.log("noticia creada");

            })
    })


    //listado noticias
    var tbody = document.getElementById("bodyTabla");

    fetch("http://localhost/carrusel/API/apiNews.php")
        .then(x => x.json())
        .then(y => {
            if (y && y.length > 0) {
                let tableContent = "";
                y.forEach(datos => {
                    tableContent += `<tr>`;
                    tableContent += `<td data-nombre="id" class="id">${datos.id}</td>`;
                    tableContent += `<td data-nombre="f_inicio">${datos.f_inicio}</td>`;
                    tableContent += `<td data-nombre="f_fin">${datos.f_fin}</td>`;
                    tableContent += `<td data-nombre="duracion">${datos.duracion}</td>`;
                    tableContent += `<td data-nombre="prioridad">${datos.prioridad}</td>`;
                    tableContent += `<td data-nombre="titulo">${datos.titulo}</td>`;
                    tableContent += `<td data-nombre="perfil">${datos.perfil}</td>`;
                    tableContent += `<td data-nombre="tipo">${datos.tipo}</td>`;
                    tableContent += `<td class="acciones"><a><img class="iconE icon" src="css/iconos/editar.png"><img class="iconB icon" src="css/iconos/borrar.png"><img class="iconG icon" src="css/iconos/guardar.png"></a></td>`;
                    tableContent += `</tr>`;
                });
                tbody.innerHTML = tableContent;

                // Agregar el evento de clic a los iconos después de que se cargue la tabla
                agregarEventos();
            }
        });

    function agregarEventos() {
        var editar = document.querySelectorAll(".iconE");
        var guardar = document.querySelectorAll(".iconG");
        var borrar = document.querySelectorAll(".iconB");
        editar.forEach(function (elemento) {
            elemento.addEventListener("click", function () {
                var fila = this.closest("tr");

                // Obtén todas las celdas de la fila, excluyendo la celda de Acciones
                var celdas = fila.querySelectorAll("td:not(.acciones,.id)");

                // Itera sobre las celdas y almacena el contenido original en una propiedad de datos
                celdas.forEach(function (celda) {
                    var contenidoActual = celda.textContent.trim();
                    celda.dataset.contenidoOriginal = contenidoActual;
                });

                // Itera sobre las celdas y ajusta su contenido durante la edición
                celdas.forEach(function (celda) {
                    var contenidoOriginal = celda.dataset.contenidoOriginal;

                    // Ajusta el contenido de la celda para mantener el ancho
                    celda.innerHTML = `<input type="text" value="${contenidoOriginal.replace(/"/g, '&quot;')}" style="width: ${celda.clientWidth}px; box-sizing: border-box;">`;
                });

                // Muestra el icono de guardar y oculta el icono de editar
                fila.querySelector(".iconE").style.display = "none";
                fila.querySelector(".iconG").style.display = "inline";
                fila.querySelector(".iconB").style.display = "none";
            });
        });

        guardar.forEach(function (elemento) {
            elemento.addEventListener("click", function () {
                var fila = elemento.closest("tr");
                var celdas = fila.querySelectorAll("td:not(.acciones)");

                // Objeto para almacenar los datos actualizados de la fila
                var actualiza = {};

                // Lista para almacenar referencias a los inputs
                var inputs = [];

                // Utilizamos un bucle normal
                for (var i = 0; i < celdas.length; i++) {
                    var celda = celdas[i];
                    var nombreCampo = celda.getAttribute("data-nombre"); // Nombre del campo asociado a la celda
                    var inputElement = celda.querySelector("input");
                    if (inputElement) {
                        var nuevoContenido = inputElement.value;

                        // Asigna el nuevo contenido a la celda
                        celda.textContent = nuevoContenido;

                        // Agrega el input a la lista
                        inputs.push(inputElement);
                    }

                    // Agregar el campo y su valor al objeto actualiza
                    actualiza[nombreCampo] = nuevoContenido;
                }

                // Elimina todos los inputs de la lista
                inputs.forEach(function (input) {
                    if (input && input.parentNode) {
                        input.parentNode.removeChild(input);
                    }
                });

                var id = fila.querySelector(".id").textContent.trim();
                actualiza["id"] = id;

                // Convertir el objeto actualiza a formato JSON
                var actualizaJson = JSON.stringify(actualiza);

                // Realiza la solicitud PUT
                fetch("http://localhost/carrusel/API/apiNews.php", {
                    method: "PUT",
                    body: actualizaJson,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(x => x.text())
                    .then(y => {
                        console.log(y);
                        console.log("noticia actualizada");
                    });

                fila.querySelector(".iconE").style.display = "inline";
                fila.querySelector(".iconG").style.display = "none";
                fila.querySelector(".iconB").style.display = "inline";
            });
        });


        borrar.forEach(function (elemento) {
            elemento.addEventListener("click", function () {
                var fila = elemento.closest("tr");

                var id = fila.querySelector(".id").textContent.trim();

                // Realiza la solicitud PUT
                fetch("http://localhost/carrusel/API/apiNews.php?id=" + id, {
                    method: "DELETE"
                })
                    .then(x => x.text())
                    .then(y => {
                        console.log(y);
                        console.log("noticia eliminada");
                        fila.remove();
                    });
            });
        });

    }
});
