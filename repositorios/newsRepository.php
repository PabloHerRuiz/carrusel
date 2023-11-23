<?php

class NewsRepository
{
    private $conexion;

    function __construct($conexion)
    {
        $this->conexion = $conexion;
    }


    //CREAR
    public function createNews($f_inicio, $f_fin, $duracion, $prioridad, $titulo, $perfil, $tipo)
    {
        $query = "INSERT INTO NOTICIAS (f_inicio,f_fin,duracion,prioridad,titulo,perfil,tipo) VALUES (:f_inicio,:f_fin,:duracion,:prioridad,:titulo,:perfil,:tipo)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindParam(":f_inicio", $f_inicio, PDO::PARAM_STR);
        $stmt->bindParam(":f_fin", $f_fin, PDO::PARAM_STR);
        $stmt->bindParam(":duracion", $duracion, PDO::PARAM_INT);
        $stmt->bindParam(":prioridad", $prioridad, PDO::PARAM_INT);
        $stmt->bindParam(":titulo", $titulo, PDO::PARAM_STR);
        $stmt->bindParam(":perfil", $perfil, PDO::PARAM_STR);
        $stmt->bindParam(":tipo", $tipo, PDO::PARAM_STR);
        $stmt->execute();
    }

    //BORRAR
    public function deleteNew($idNoticia)
    {
        $query = "DELETE FROM NOTICIAS WHERE IDNOTICIA =:idNoticia";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindParam(":idNoticia", $idNoticia, PDO::PARAM_INT);
        $stmt->execute();
    }
    //UPDATE
    public function updateNew($idNoticia,$f_inicio, $f_fin, $duracion, $prioridad, $titulo, $perfil, $tipo)
    {
        $query = "UPDATE NOTICIAS SET F_INICIO=:f_inicio,F_FIN=:f_fin,DURACION=:duracion,PRIORIDAD=:prioridad,TITULO=:titulo,PERFIL=:perfil,TIPO=:tipo WHERE idNoticia=:idNoticia";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindParam(":f_inicio", $f_inicio, PDO::PARAM_STR);
        $stmt->bindParam(":f_fin", $f_fin, PDO::PARAM_STR);
        $stmt->bindParam(":duracion", $duracion, PDO::PARAM_INT);
        $stmt->bindParam(":prioridad", $prioridad, PDO::PARAM_INT);
        $stmt->bindParam(":titulo", $titulo, PDO::PARAM_STR);
        $stmt->bindParam(":perfil", $perfil, PDO::PARAM_INT);
        $stmt->bindParam(":tipo", $tipo, PDO::PARAM_STR);
        $stmt->bindParam(":idNoticia", $idNoticia, PDO::PARAM_INT);
        $stmt->execute();
    }
    //LEER
    public function readNew($idNoticia)
    {
        $query = "SELECT * FROM NOTICIAS WHERE IDNOTICIA =:idNoticia";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindParam(":idNoticia", $idNoticia, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    //LEER TODAS LAS NOTICIAS
    public function readAllNews()
    {
        $query = "SELECT * FROM NOTICIAS";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

}


?>