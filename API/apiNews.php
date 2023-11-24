<?php

require_once $_SERVER["DOCUMENT_ROOT"] . '/carrusel/database/db.php';
require_once $_SERVER["DOCUMENT_ROOT"] . '/carrusel/repositorios/newsRepository.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_GET["foto"])) {

        //guardar imagen o video
        $dir_imagenes = '../imagenes/';
        //imagenes
        $fichero_nombre_img = $_FILES['imagen']['name'];
        $fichero_tipo_img = $_FILES['imagen']['type'];

        // Verificar si es una imagen
        if (strpos($fichero_tipo_img, 'image') !== false) {
            $fichero_subido = $dir_imagenes . basename($fichero_nombre_img);
            $fichero_temporal = $_FILES['imagen']['tmp_name'];
        }

        // Mover archivo a la carpeta correspondiente
        if (move_uploaded_file($fichero_temporal, $fichero_subido)) {
            echo "El archivo se ha cargado correctamente.";
        } else {
            echo "Hubo un error al cargar el archivo.";
        }

    }
    if (isset($_GET["video"])) {

        //guardar imagen o video
        $dir_videos = '../videos/';

        //videos
        $fichero_nombre_vid = $_FILES['video']['name'];
        $fichero_tipo_vid = $_FILES['video']['type'];


        // Verificar si es un video
        if (strpos($fichero_tipo_vid, 'video') !== false) {
            $fichero_subido = $dir_videos . basename($fichero_nombre_vid);
            $fichero_temporal = $_FILES['video']['tmp_name'];
        }

        // Mover archivo a la carpeta correspondiente
        if (move_uploaded_file($fichero_temporal, $fichero_subido)) {
            echo "El archivo se ha cargado correctamente.";
        } else {
            echo "Hubo un error al cargar el archivo.";
        }

    }
    // Obtén los datos enviados en la solicitud POST
    $datos = json_decode(file_get_contents("php://input"), true);
    if ($datos) {
        $conn = db::abreconexion();
        $newsRepository = new NewsRepository($conn);
        $newsRepository->createNews($datos["f_inicio"], $datos["f_fin"], $datos["duracion"], $datos["prioridad"], $datos["titulo"], $datos["perfil"], $datos["tipo"]);

        // Devuelve una respuesta
        echo '{"respuesta":"OK"}';
    }

} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET["perfil"])) {
        if ($_GET["perfil"] == "alumno") {
            $conn = db::abreconexion();
            $newsRepository = new NewsRepository($conn);
            $noticias = $newsRepository->readAllAlu();

            $not = [];
            foreach ($noticias as $noticia) {
                $not = [
                    "id" => $noticia['idNoticia'],
                    "f_inicio" => $noticia['f_inicio'],
                    "f_fin" => $noticia['f_fin'],
                    "duracion" => $noticia['duracion'],
                    "prioridad" => $noticia['prioridad'],
                    "titulo" => $noticia['titulo'],
                    "perfil" => $noticia['perfil'],
                    "tipo" => $noticia['tipo']
                ];
                $nots[] = $not;
            }

            header('Content-Type: application/json');
            echo json_encode($nots);
        } else if ($_GET["perfil"] == "profesor") {
            $conn = db::abreconexion();
            $newsRepository = new NewsRepository($conn);
            $noticias = $newsRepository->readAllProf();

            $not = [];
            foreach ($noticias as $noticia) {
                $not = [
                    "id" => $noticia['idNoticia'],
                    "f_inicio" => $noticia['f_inicio'],
                    "f_fin" => $noticia['f_fin'],
                    "duracion" => $noticia['duracion'],
                    "prioridad" => $noticia['prioridad'],
                    "titulo" => $noticia['titulo'],
                    "perfil" => $noticia['perfil'],
                    "tipo" => $noticia['tipo']
                ];
                $nots[] = $not;
            }

            header('Content-Type: application/json');
            echo json_encode($nots);
        } else {
            $conn = db::abreconexion();
            $newsRepository = new NewsRepository($conn);
            $noticias = $newsRepository->readAllNews();

            $not = [];
            foreach ($noticias as $noticia) {
                $not = [
                    "id" => $noticia['idNoticia'],
                    "f_inicio" => $noticia['f_inicio'],
                    "f_fin" => $noticia['f_fin'],
                    "duracion" => $noticia['duracion'],
                    "prioridad" => $noticia['prioridad'],
                    "titulo" => $noticia['titulo'],
                    "perfil" => $noticia['perfil'],
                    "tipo" => $noticia['tipo']
                ];
                $nots[] = $not;
            }

            header('Content-Type: application/json');
            echo json_encode($nots);
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {

    // Obtén los datos enviados en la solicitud POST
    $datos = json_decode(file_get_contents("php://input"), true);
    if ($datos) {
        $conn = db::abreconexion();
        $newsRepository = new NewsRepository($conn);
        $newsRepository->updateNew($datos["id"], $datos["f_inicio"], $datos["f_fin"], $datos["duracion"], $datos["prioridad"], $datos["titulo"], $datos["perfil"], $datos["tipo"]);

        // Devuelve una respuesta
        echo '{"respuesta":"OK"}';
    }
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $id = $_GET["id"];
    $conn = db::abreconexion();
    $newsRepository = new NewsRepository($conn);
    $newsRepository->deleteNew($id);

    // Devuelve una respuesta
    echo '{"respuesta":"OK"}';
}
?>