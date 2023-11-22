window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");

    fetch("json/datos.json")
        .then(x => x.json())
        .then(y => {
            let i = 0;

            function mostrarElemento() {
                if (i < y.length) {
                    contenedor.innerHTML = "";

                    if (y[i].tipo == "imagen") {
                        var imagen = document.createElement("img");
                        imagen.src = y[i].ruta;
                        contenedor.appendChild(imagen);
                    } else if (y[i].tipo == "video") {
                        var video = document.createElement("video");
                        video.src = y[i].ruta;
                        video.autoplay = true;
                        video.muted = true;
                        contenedor.appendChild(video);
                    } else if (y[i].tipo == "web") {

                    }

                    i = (i + 1) % y.length;

                    setTimeout(mostrarElemento, y[i].duracion);
                }
            }

            mostrarElemento();
        });
});
