window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");
    var infoDiv = document.getElementById("infoDiv");
    var indiceSpan = document.getElementById("indice");
    var totalElementosSpan = document.getElementById("totalElementos");
    var plantillaNoticia;

    var url = new URL(window.location.href);

    var perfil = url.searchParams.get("perfil");


    // Cargar la plantilla de noticia una vez
    fetch("plantilla/noticia.html")
        .then(x => x.text())
        .then(y => {
            plantillaNoticia = document.createElement("div");
            plantillaNoticia.innerHTML = y;
        });

    // Función para mezclar elementos de un array aleatoriamente
    function shuffle(baraja) {
        baraja.sort(function (a, b) { return Math.random() - 0.5 });
    }



    function cargarCarrusel() {
        // Carrusel
        fetch("http://localhost/carrusel/API/apiNews.php?perfil=" + perfil)
            .then(x => x.json())
            .then(y => {

                var longitud=y.length;

                //prioridad
                for (let j = 0; j < longitud; j++) {
                    if (y[j].prioridad != 1) {
                        for (let h = 1; h < y[j].prioridad; h++) {
                            y.push(y[j]);
                        }
                    }
                }

                // Barajamos los datos que vienen de la API
                shuffle(y);

                let i = 0;
                totalElementosSpan.textContent = y.length;

                function mostrarElemento() {
                    if (i < y.length) {
                        contenedor.innerHTML = "";
                        var tipoDeco = JSON.parse(y[i].tipo);

                        if (tipoDeco.tipo == "imagen") {
                            var imagen = document.createElement("img");
                            imagen.src = tipoDeco.url;
                            contenedor.appendChild(imagen);
                        } else if (tipoDeco.tipo == "video") {
                            var video = document.createElement("video");
                            var source = document.createElement("source");
                            source.src = tipoDeco.url;
                            source.type = "video/" + tipoDeco.formato;
                            video.appendChild(source);

                            video.autoplay = true;
                            video.muted = true;
                            contenedor.appendChild(video);
                        } else if (tipoDeco.tipo == "web") {
                            // Crear la noticia usando la plantilla cargada
                            var noticia = plantillaNoticia.cloneNode(true);

                            var titulo = noticia.querySelector(".titulo");
                            var parrafo = noticia.querySelector(".parrafo");

                            titulo.textContent = y[i].titulo;
                            parrafo.textContent = tipoDeco.contenido;

                            contenedor.appendChild(noticia);
                        }

                        // Actualiza el índice en el div de información
                        indiceSpan.textContent = i + 1;

                        //refrescar
                        if ((i + 1) == y.length) {

                            // Verifica si se activó el refresco
                            var refrescarCarrusel = localStorage.getItem('refrescarCarrusel');

                            if (refrescarCarrusel === 'true') {
                                // Cancela el temporizador actual antes de cargar el carrusel nuevamente
                                clearTimeout(window.timeOut);

                                // Lógica para recargar el carrusel
                                cargarCarrusel();

                                // Desactiva el refresco para evitar recargas continuas
                                localStorage.setItem('refrescarCarrusel', 'false');
                                return;
                            }
                        }

                        // Bucle infinito
                        i = (i + 1) % y.length;

                        // Temporizador y almacenar el identificador devuelto
                        window.timeOut = setTimeout(mostrarElemento, y[i].duracion);
                    }
                }

                // Inicia el carrusel
                mostrarElemento();
            });
    }

    cargarCarrusel();


});
