window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");
    var infoDiv = document.getElementById("infoDiv");
    var indiceSpan = document.getElementById("indice");
    var totalElementosSpan = document.getElementById("totalElementos");
    var plantillaNoticia;

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

    // Verifica si se activó el refresco
    var refrescarCarrusel = localStorage.getItem('refrescarCarrusel');

    // if (refrescarCarrusel === 'true') {
    //     // Lógica para recargar el carrusel
    //     cargarCarrusel();

    //     // Desactiva el refresco para evitar recargas continuas
    //     localStorage.setItem('refrescarCarrusel', 'false');
    // }

    function cargarCarrusel() {
        // Carrusel
        fetch("http://localhost/carrusel/API/apiNews.php")
            .then(x => x.json())
            .then(y => {
                //barajamos los datos que vienen de la api
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

                        if ((i+1) == y.length) {
                            if (refrescarCarrusel === 'true') {
                                // Lógica para recargar el carrusel
                                cargarCarrusel();

                                // Desactiva el refresco para evitar recargas continuas
                                localStorage.setItem('refrescarCarrusel', 'false');
                            }
                        }

                        //bucle infinito
                        i = (i + 1) % y.length;

                        //temporizador
                        setTimeout(mostrarElemento, y[i].duracion);
                    }
                }

                mostrarElemento();
            });
    }

    cargarCarrusel();


});
