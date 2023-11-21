window.addEventListener("load", function () {
    var contenedor = document.getElementById("contenedor");

    fetch("datos.json")
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
                    }
                    if (y[i].tipo == "video") {
                        var video = document.createElement("video");
                        video.src = y[i].ruta;
                        video.autoplay = true;
                        video.muted = true;
                        contenedor.appendChild(video);

                        openFullscreen(video);
                    }

                    i++;

                    setTimeout(mostrarElemento, y[i - 1].duracion);
                }
            }

            // function openFullscreen(element) {
            //     if (element.requestFullscreen) {
            //         element.requestFullscreen();
            //     } else if (element.webkitRequestFullscreen) { /* Safari */
            //         element.webkitRequestFullscreen();
            //     } else if (element.msRequestFullscreen) { /* IE11 */
            //         element.msRequestFullscreen();
            //     }
            // }

            mostrarElemento();
        });
});
