<?php

require_once "models/delete.model.php";

class DeleteController{

    public function eliminarDatos($tabla, $datos){

        if(isset($_SERVER['HTTP_TOKEN'])){

            $respuestaQueryToken = Token::verificarToken();

            $estatusQueryToken = $respuestaQueryToken["status"];

            if($estatusQueryToken == 200){
                //NECESITA TOKEN, EL TOKEN ES CORRECTO, EL TOKEN NO A EXPIRADO
                $respuesta = PutModel::eliminarDatos($tabla, $datos);
                echo json_encode($respuesta, http_response_code($respuesta["status"]));

            }else{
                echo json_encode($respuestaQueryToken, http_response_code($respuestaQueryToken["status"]));
            }
        }else{
            //Esta solicitud no necesita autentificacion
            $respuesta = PutModel::eliminarDatos($tabla, $datos);
            echo json_encode($respuesta, http_response_code($respuesta["status"]));
        }        

    }

}