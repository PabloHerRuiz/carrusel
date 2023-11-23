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

    crear.addEventListener("click", function () {

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

        // Mostrar alerta con mensajes de error
        if (errores.length > 0) {
            alert('Todos los campos son obligatorios. Por favor, completa todos los campos:\n\n' + errores.join('\n'));
            return;
        }


        // TODO para mañana hay que guardar el tipo en un json guardando segun lo que haya en tipo

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
                alert("DEBE INTRODUCIR UN FICHERO")
            }

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
                alert("DEBE INTRODUCIR UN FICHERO")
            }

            tipoContent = {
                "tipo": "video",
                "url": cVideo.value.replace("C:\\fakepath\\", "videos/")
            }

        } else if (tipo.value == "3") {
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



});
