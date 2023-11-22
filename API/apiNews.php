<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    $conn = db::abreconexion();
    $newsRepository = new NewsRepository($conn);
    $noticias=$newsRepository->readAllNews();

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
?>