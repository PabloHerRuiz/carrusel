<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <script src="js/carrusel.js"></script>
    <title>Administrador</title>
</head>

<body>
    <div id="news-container">
        <h1>CREAR NOTICIAS</h1>

        <form action="admin.php" method="POST" enctype="multipart/form-data">
            <label for="f_inicio">Fecha Inicio:</label>
            <input type="datetime-local" id="f_inicio" name="f_inicio">

            <label for="f_fin">Fecha Fin:</label>
            <input type="datetime-local" id="f_fin" name="f_fin">

            <label for="duracion">Duracion:</label>
            <input type="text" id="duracion" name="duracion">

            <label for="prioridad">Prioridad:</label>
            <input type="number" id="prioridad" name="prioridad" min="1" max="3">

            <label for="titulo">Titulo:</label>
            <input type="text" id="titulo" name="titulo">

            <label for="perfil">Perfil:</label>
            <select name="perfil" id="perfil">
                <option value="" disabled selected>Selecciona un perfil</option>
                <option value="1">Alumno</option>
                <option value="2">Profesor</option>
                <option value="3">Todos</option>
            </select>

            <label for="tipo">Tipo:</label>
            <select name="tipo" id="tipo">
                <option value="" disabled selected>Selecciona un formato</option>
                <option value="1">Imagen</option>
                <option value="2">Video</option>
                <option value="3">Web</option>
            </select>

            <label for="imagen">Imagen:</label>
            <input type="file" id="imagen" name="imagen">

            <label for="video">Video:</label>
            <input type="file" id="video" name="video">

            <label for="contenido">Contenido:</label>
            <textarea id="contenido" name="contenido"></textarea>

            <div class="buttons">
                <input type="submit" value="Insertar" id="crearNoticia">
                <button href="index.php">Regresar</button>
            </div>
        </form>
    </div>
</body>

</html>