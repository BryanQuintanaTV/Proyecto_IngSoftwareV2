<?php

require_once "models/get.model.php";

class GetController{

    public function getData($table){

        $datos = GetModel::getData($table);
        //$data = new GetController();
        //return $data->funcionResponse($response);
        //Las 2 anteriores funcionarian lo mismo que la siguiente
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