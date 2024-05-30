<?php

require_once "connection.php";
require_once "models/validarSanitizar.php";

class PutModel{

    /* ******************************************************************************************
    JUNTAR TODO
    *********************************************************************************************/ 
    static public function eliminarDatos($tabla, $datos){
          //Tabla Array va a contener el nombre de la tabla y es para verificar e la B de D que si existe 
        //llavesArrayIndexado va a contener el nombre de los campos y es para verificar que si
        //existen en la B de D  
        $tablaArray = array($tabla);
        $llavesArrayIndexado = [];

        foreach($datos as $llave => $valor){
            array_push($llavesArrayIndexado, $llave);
        }

        // ********************************************************************************
        // Retornos de getVerificarTablasColumnas:
        // 0. Todo bien 
        // 1. Problemas con la tabla RECURSO NO ENCONTRADO
        // 2. Problemas con alguno de los campos
        $regresoVerificar = Connection::getVerificarTablasColumnas($tablaArray, $llavesArrayIndexado); 
        if($regresoVerificar == 1){
            $respuesta = array(
                'status' => 404,
                'titulo' => "Error",
                'mensaje' => "Recurso no localizado"
            );
            return $respuesta;                    
    
        }else if($regresoVerificar == 2){
            $respuesta = array(
                'status' => 400,
                'titulo' => "Error",
                'mensaje' => "Error en la solicitud"
            );
            return $respuesta;                    
        }

        

        /*****************************************************************************
        Mandarlos a Validar y Sanitizar los datos que llegaron desde el cliente        
        ***************************************************************************/
        $sanitiza = new ValidarSanitizar();
        $datos = $sanitiza->validarSanitizar($tabla, $datos);

        $sqlDelete = "DELETE FROM $tabla ";

        foreach($datos as $llave => $valor){
            $where = " WHERE $llave = :$llave";
        }
        
        $sqlDelete .= $where;

        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sqlDelete); 

        foreach($datos as $llave=>$valor){
            $stmt->bindParam(":".$llave, $datos[$llave], PDO::PARAM_STR);
        }

        try{
            $stmt -> execute();
            $numRegistrosEliminados = $stmt->rowCount(); 
             if($numRegistrosEliminados == 1){
                
                $respuesta = array(
                    'status' => 200,
                    'titulo' => "Éxito",
                    "mensaje" => "Transacción realizada con Éxito",
                );
                return $respuesta;
            }else{
                $respuesta = array(
                    'status' => 200,
                    'titulo' => "Advertencia",
                    "mensaje" => "No se localizo el Registro para la Eliminación",
                );
                return $respuesta;                
            }
        }catch(PDOException $ex){
            $respuesta = array(
                'status' => 500,
                'titulo' => "Error",
                'mensaje' => "Error en el Servidor"
            );
            return $respuesta;
        }
    }
}