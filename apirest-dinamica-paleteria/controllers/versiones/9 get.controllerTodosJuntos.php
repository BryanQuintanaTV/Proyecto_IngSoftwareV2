<?php

require_once "models/get.model.php";

class GetController{

    /* **********************************************
    JUNTAR TODO
    *************************************************/    

    public function getDatos($tablesArray, $columnas, $relCamposArray, $linkToArray, $equalToArray, 
    $orderByArray, $orderModeArray, $startAt, $endAt){

        $datos = GetModel::getDatosT($tablesArray, $columnas, $relCamposArray, $linkToArray, $equalToArray, 
        $orderByArray, $orderModeArray, $startAt, $endAt);

        return $this->funcionResponse($datos);

    }
}