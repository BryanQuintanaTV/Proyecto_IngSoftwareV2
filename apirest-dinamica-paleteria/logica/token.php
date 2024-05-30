<?php
// *****************************************************************************
// Libreria para generar el token y Usar la clase JWT
require_once "vendor/autoload.php";
//De carpeta Firebase me posiciono en la caprpeta JWT y utilizo la clase JWT
use Firebase\JWT\JWT;

class Token{

    // *****************************************************
    // GENERAR TOKEN DE AUTENTIFICACIÓN
    // ****************************************************
    public static function jwt($id, $email, $subFijo){
        $time = time();
        $payload = array(
            "iat" => $time, //Hora en la que se genera el Token
            "exp" => $time + (60 * 60), //Tiempo en el que expirara el token en este ejemplo dura 1 hora
            "data" => [
                "id" => $id,
                "email" => $email
            ]
        );

        //"exp" => $time + (60 * 60 * 24), //Tiempo en el que expirara el token en este ejemplo dura 1 dia
        //"exp" => $time + 60, //Tiempo en el que expirara el token en este ejemplo dura 1 minuto
        //"exp" => $time + (60 * 10), //Tiempo en el que expirara el token en este ejemplo dura 10 minutos

        //ejecuto el método static de JWT  para que me genere el token
        $jwt = JWT::encode($payload, "fghjkl23456jkkjhl",'HS512');
        //La variable $jwt ya contiene el token y es la que vamos a subir a la B de D

        $data = array(
            "token_".$subFijo     => $jwt,
            "token_exp_".$subFijo => $payload["exp"]
        );

        return $data;

    }
    
    
    // *****************************************************
    // DECODIFICAR TOKEN DE AUTENTIFICACIÓN
    // ****************************************************
    public static function decodificarToken($token){
        /*
        $time = time();
        $payload = array(
            "iat" => $time, //Hora en la que se genera el Token
            "exp" => $time + (60 * 60), //Tiempo en el que expirara el token en este ejemplo dura 1 hora
            "data" => [
                "id" => $id,
                "email" => $email
            ]
        );

        JWT::decode($token, "fghjkl23456jkkjhl");
        //ejecuto el método static de JWT  para que me genere el token
        $jwt = JWT::encode($payload, "fghjkl23456jkkjhl",'HS512');
        //La variable $jwt ya contiene el token y es la que vamos a subir a la B de D

        $data = array(
            "token_".$subFijo     => $jwt,
            "token_exp_".$subFijo => $payload["exp"]
        );

        return $data;
        */
    } 


    public static function verificarToken(){

        if(!isset($_SERVER['HTTP_SUBFIJO']) || !isset($_SERVER['HTTP_TABLAS_LOGIN'])){
                //511 EL TOKEN YA EXPIRO Requiere autentificación
                $respuesta = array(
                    'status' => 400,
                    'titulo' => "Error",
                    'mensaje' => "FALTAN DATOS DEL TOKEN"
                );
  
                return $respuesta;
        }

        $token       = $_SERVER['HTTP_TOKEN'];
        $subFijo     = $_SERVER['HTTP_SUBFIJO'];
        $tablasLogin = $_SERVER['HTTP_TABLAS_LOGIN'];

        //Consultar el token y exp en la base de datos
        $tablaToken[0]    = $tablasLogin;
        $columnasToken = "*";
        $relCamposArrayToken = array();
        $linkToArrayToken[0] = "token_".$subFijo; 
        $operadorRelToArrayToken[0] = "=";
        $valueToArrayToken[0] = $token;
        $operadorLogicoToArrayToken = array(); 
        $orderByArrayToken = array();
        $orderModeArrayToken = array();


        $respuestaQueryToken = GetModel::getDatos($tablaToken, $columnasToken, $relCamposArrayToken, $linkToArrayToken, $operadorRelToArrayToken, $valueToArrayToken, $operadorLogicoToArrayToken, $orderByArrayToken, $orderModeArrayToken, 0, 1);

        $estatusQueryToken = $respuestaQueryToken["status"];
        

        if($estatusQueryToken == 200){
            $numRegQueryToken  = $respuestaQueryToken["numReg"];
            if($numRegQueryToken > 0){

                //$datos = $respuestaQueryToken["datos"];
                //$datosPos0 = $datos[0];
                //$token_expBD = $datosPos0->token_exp_instructor;
                //Las 3 anteriores es lo mismo que la siguiente
                $token_exp_BD = $respuestaQueryToken["datos"][0]->token_exp_instructor;

                $time = time();
                /*
                echo "----------------------------------------------------------------\n";
                echo "TIME ACTUAL \n";
                echo "$time \n";
                echo "----------------------------------------------------------------\n";
                echo "TIME BASE DE DATOS \n";
                echo "$token_exp_BD \n";
                echo "----------------------------------------------------------------\n";
                */


                if($time > $token_exp_BD){
                    //511 EL TOKEN YA EXPIRO Requiere autentificación
                    $respuesta = array(
                        'status' => 511,
                        'titulo' => "Error",
                        'mensaje' => "YA EXPIRO EL TOKEN  Requiere Autenticación"
                    );
                    //echo json_encode($respuesta, http_response_code($respuesta["status"]));     
                    return $respuesta;
                }else{

                    $respuesta = array(
                        'status' => 200,
                        'titulo' => "Éxito",
                        'mensaje' => "EL TOKEN ES CORRECTO, EL TOKEN NO A EXPIRADO"
                    );
                    //echo json_encode($respuesta, http_response_code($respuesta["status"]));     
                    return $respuesta;                    
                }
                
            } else{
                //511 NO COINCIDEN LOS TOKEN NECESITA AUTENTIFICACION Requiere autentificación
                $respuesta = array(
                    'status' => 511,
                    'titulo' => "Error",
                    'mensaje' => "NO COINCIDEN LOS TOKENS Requiere Autenticación"
                );
                //echo json_encode($respuesta, http_response_code($respuesta["status"]));     
                return $respuesta;
            }           
        }else{
            //echo json_encode($respuestaQueryToken, http_response_code($respuestaQueryToken["status"])); 
            return $respuestaQueryToken;
        }
    }


}