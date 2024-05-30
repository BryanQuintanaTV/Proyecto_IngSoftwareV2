<?php

require_once "models/get.model.php";
require_once "logica/token.php";

class GetController{

    /* **********************************************
    JUNTAR TODO
    *************************************************/    

    public function getDatos($tablesArray, $columnas, $relCamposArray, 
                            $linkToArray, $operadorRelToArray,$valueToArray, $operadorLogicoToArray, 
                            $orderByArray, $orderModeArray, 
                            $startAt, $endAt)
    {

        // VERIFICAR SI EL RECURSO NECESITA TOKEN                            
        if(isset($_SERVER['HTTP_TOKEN'])){

            $respuestaQueryToken = Token::verificarToken();

            $estatusQueryToken = $respuestaQueryToken["status"];

            if($estatusQueryToken == 200){
                //NECESITA TOKEN, EL TOKEN ES CORRECTO, EL TOKEN NO A EXPIRADO
                $respuesta = GetModel::getDatos($tablesArray, $columnas, $relCamposArray, 
                $linkToArray, $operadorRelToArray,$valueToArray, $operadorLogicoToArray, 
                $orderByArray, $orderModeArray, 
                $startAt, $endAt);

                echo json_encode($respuesta, http_response_code($respuesta["status"]));

            }else{
                echo json_encode($respuestaQueryToken, http_response_code($respuestaQueryToken["status"]));
            }
        }else{
            //Esta solicitud no necesita autentificacion
            $respuesta = GetModel::getDatos($tablesArray, $columnas, $relCamposArray, 
            $linkToArray, $operadorRelToArray,$valueToArray, $operadorLogicoToArray, 
            $orderByArray, $orderModeArray, 
            $startAt, $endAt);

            echo json_encode($respuesta, http_response_code($respuesta["status"])); 
        }




    }

}