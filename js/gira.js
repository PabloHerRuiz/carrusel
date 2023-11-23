window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");
    var plantillaNoticia;

    // Cargar la plantilla de noticia una vez
    fetch("plantilla/noticia.html")
        .then(x => x.text())
        .then(y => {
            plantillaNoticia = document.createElement("div");
            plantillaNoticia.innerHTML = y;
        });

    // Carrusel
    fetch("http://localhost/carrusel/API/apiNews.php")
        .then(x => x.json())
        .then(y => {
            let i = 0;

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

                    i = (i + 1) % y.length;

                    setTimeout(mostrarElemento, y[i].duracion);
                }
            }

            mostrarElemento();
        });
});
   
