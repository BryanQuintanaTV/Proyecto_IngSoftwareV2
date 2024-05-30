<?php

require_once "models/get.model.php";

class GetController{

    /* *****************************************
    Peticion GET sin FILTRO
    ********************************************/
    public function getData($table, $columnas, $orderBy, 
        $orderMode, $startAt, $endAt){

        $datos = GetModel::getData($table, $columnas, $orderBy, $orderMode,
             $startAt, $endAt);
        //$data = new GetController();
        //return $data->funcionResponse($response);
        //Las 2 anteriores funcionarian lo mismo que la siguiente
        return $this->funcionResponse($datos);
        
    }

    /* *****************************************
    Peticion GET con FILTRO AND
    ********************************************/
    public function getDataFilter($table, $columnas, $linkTo, $equalTo, 
        $orderBy, $orderMode, $startAt, $endAt){

        $datos = GetModel::getDataFilter($table, $columnas, $linkTo, $equalTo, 
            $orderBy, $orderMode, $startAt, $endAt);
        //$data = new GetController();
        //return $data->funcionResponse($response);
        //Las 2 anteriores funcionarian lo mismo que la siguiente
        return $this->funcionResponse($datos);
        
    }    

    /* *****************************************
    Peticion GET con Relaciones entre Tablas y sin FILTRO
    ********************************************/
    public function getRelationData($relTablas, $relCampos, $columnas, 
        $orderBy, $orderMode, $startAt, $endAt){

        $datos = GetModel::getRelationData($relTablas, $relCampos, $columnas, 
            $orderBy, $orderMode, $startAt, $endAt);

        return $this->funcionResponse($datos);
        
    }    

    /* *****************************************
    Peticion GET con Relaciones entre Tablas y CON FILTRO
    ********************************************/
    public function getRelationDataFilter($relTablas, $relCampos, $columnas, $linkTo, $equalTo, 
        $orderBy, $orderMode, $startAt, $endAt){

        $datos = GetModel::getRelationDataFilter($relTablas, $relCampos, $columnas, $linkTo, $equalTo, 
            $orderBy, $orderMode, $startAt, $endAt);

        return $this->funcionResponse($datos);
        
    }    

    /* *****************************************
    Respuestas del controlador
    ********************************************/
    public function funcionResponse($datos){

        if(!empty($datos)){

            $json = array(
                'status' => 200,
                'total'  => count($datos),
                'result' => $datos
            );
        }else{
            $json = array(
                'status' => 404,
                'result' => 'No hay Información'
            );            
        }
        echo json_encode($json, http_response_code($json["status"]));        

    } 
}