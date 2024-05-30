<?php

require_once "connection.php";
require_once "models/validarSanitizar.php";

class PostModel{

    // *******************************************************************************************
    // CONSTRUIR, PREPARAR EJECUTAR Y REGRESAR EL RESULTADO DEL INSERT
    // *******************************************************************************************
    static public function insertDatos($tabla, $datos){
        $sanitiza = new ValidarSanitizar();

        $tablaArray = array($tabla);
        $llavesArrayIndexado = [];
        //$datosArrayIndexado = array();


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
                'mensaje' => "Recurso no localizado ERROR : 1 Favor de Comunicar A: ...."
            );
            return $respuesta;                    
    
        }else if($regresoVerificar == 2){
            $respuesta = array(
                'status' => 400,
                'titulo' => "Error",
                'mensaje' => "Error en la solicitud ERROR 2 Favor de Comunicar A: ....."
            );
            return $respuesta;                    
        }

        /*****************************************************************************
        Mandarlos a Validar y Sanitizar los datos que llegaron desde el cliente        
        ***************************************************************************/
        $datos = $sanitiza->validarSanitizar($tabla, $datos);


        //En llave va a estra el nombre de la columna
        $columnas = "";
        $parametros = "";
        foreach($datos as $llave=>$valor){
            $columnas .= $llave . ",";

            /*************************************************
            La siguiente línea se utiliza solo si en lugar de:
             - Utilizar la línea 56 se utiliza la 57
             - Utilizar las líneas  62- 66 se utilizan las líneas 68 - 72
            **************************************************/
            $parametros .= ":$llave,";
        }
        $columnas = substr($columnas, 0 ,-1);
        $parametros = substr($parametros, 0 ,-1);

       
        //$sqlInsert = "INSERT INTO $tabla($columnas) VALUES (?, ?, ?, ?, ?, ?)";
        $sqlInsert = "INSERT INTO $tabla($columnas) VALUES ($parametros)";
        
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sqlInsert); 

        /*
        $i=1;
        foreach($datos as $llave=>$valor){
            $stmt->bindParam($i, $datos[$llave], PDO::PARAM_STR);
            $i++;
        }
        */
        
        
        foreach($datos as $llave=>$valor){
            $stmt->bindParam(":".$llave, $datos[$llave], PDO::PARAM_STR);
        }

        try{
            if($stmt -> execute()){

                $respuesta = array(
                    'status' => 200,
                    "id"     =>  $conection->lastInsertId(),
                    'titulo' => "Éxito",
                    "mensaje" => "Transaccion realizada con Éxito",
                );
                return $respuesta;

            }
        }catch(PDOException $ex){
            //https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
            $codigo = $ex->getCode();
                        
            $mensaje = "Error en la Sentencia SQL";
            if($codigo == 23000){
                $mensaje = "Ya Existe usuario con ese Correo";
            }

            $respuesta = array(
                'status' => 400,
                'titulo' => "Error",
                'mensaje' => $mensaje
            );
            return $respuesta;
        }
    }

    // *******************************************************************************************
    // FIXME: CODIGO AGREGADO PARA EJECUTAR UNA PROCEDIMIENTO ALMACENADO
    // *******************************************************************************************
            
     // Método para llamar a un procedimiento almacenado
     static public function callProcedure($procedureName, $params){
        $sanitiza = new ValidarSanitizar();
        
        // Sanitizar el nombre del procedimiento almacenado y los parámetros
        // $procedureName = $sanitiza->sanitizeString($procedureName);
        // $params = $sanitiza->validarSanitizar($procedureName, $params);
        
        // Construir la llamada al procedimiento almacenado
        $paramPlaceholders = implode(',', array_fill(0, count($params), '?'));
        $sqlCall = "CALL $procedureName($paramPlaceholders)";
        
        $conection = Connection::connect();
        $stmt = $conection->prepare($sqlCall);

        // Vincular los parámetros
        $i = 1;
        foreach($params as $key => $value){
            $stmt->bindValue($i, $value, PDO::PARAM_STR);
            $i++;
        }

        try{
            if($stmt->execute()){
                // Obtener los resultados si los hay
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $respuesta = array(
                    'status' => 200,
                    'titulo' => "Éxito",
                    'mensaje' => "Procedimiento ejecutado con éxito",
                    'datos' => $result
                );
                return $respuesta;
            }
        }catch(PDOException $ex){
            $codigo = $ex->getCode();
            $mensaje = "Error en la ejecución del procedimiento almacenado";

            $respuesta = array(
                'status' => 400,
                'titulo' => "Error",
                'mensaje' => $mensaje
            );
            return $respuesta;
        }
    }
}