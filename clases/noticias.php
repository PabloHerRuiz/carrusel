<?php
class Noticias{
    private $idNoticia;
    private $f_inicio;
    private $f_fin;
    private $duracion;
    private $prioridad;
    private $titulo;
    private $perfil;
    private $tipo;

    //constructor
    public function __construct($f_inicio,$f_fin,$duracion,$prioridad,$titulo,$perfil,$tipo)
    {
        $this->f_inicio=$f_inicio;
        $this->f_fin=$f_fin;
        $this->duracion=$duracion;
        $this->prioridad=$prioridad;
        $this->titulo=$titulo;
        $this->perfil=$perfil;
        $this->tipo=$tipo;
    }

    //getter y setter
 
    public function getIdNoticia()
    {
        return $this->idNoticia;
    }

    public function getF_inicio()
    {
        return $this->f_inicio;
    }

    public function setF_inicio($f_inicio)
    {
        return $this->f_inicio = $f_inicio;
    }

    public function getF_fin()
    {
        return $this->f_fin;
    }

    public function setF_fin($f_fin)
    {
        return $this->f_fin = $f_fin;
    }

    public function getDuracion()
    {
        return $this->duracion;
    }

    public function setDuracion($duracion)
    {
        return $this->duracion = $duracion;
    }

    public function getPrioridad()
    {
        return $this->prioridad;
    }

    public function setPrioridad($prioridad)
    {
        return $this->prioridad = $prioridad;
    }

    public function getTitulo()
    {
        return $this->titulo;
    }

    public function setTitulo($titulo)
    {
        return $this->titulo = $titulo;
    }

    public function getPerfil()
    {
        return $this->perfil;
    }

    public function setPerfil($perfil)
    {
        return $this->perfil = $perfil;
    }
 
    public function getTipo()
    {
        return $this->tipo;
    }

    public function setTipo($tipo)
    {
        return $this->tipo = $tipo;
    }
}

?>