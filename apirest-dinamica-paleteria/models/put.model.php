<?php

require_once "connection.php";
require_once "models/validarSanitizar.php";

class PutModel{

    /* ******************************************************************************************
    JUNTAR TODO
    *********************************************************************************************/ 
    public static function modificarDatos($tabla, $datos){

		//En este elemento debe estar el nombre del campo de la llave primaria
		$whereCampo       = $_SERVER['HTTP_ID'];
		//En este elemento debe estar el valor del campo de la llave primaria
		$whereValor = $_SERVER['HTTP_IDVALOR'];

        //Tabla Array va a contener el nombre de la tabla y es para verificar e la B de D que si existe 
        //llavesArrayIndexado va a contener el nombre de los campos y es para verificar que si
        //existen en la B de D  
        $tablaArray = array($tabla);
        $llavesArrayIndexado = [];

        foreach($datos as $llave => $valor){
            array_push($llavesArrayIndexado, $llave);
        }
        //Agregamos la llave primaria para tambien verificarlo
        array_push($llavesArrayIndexado, $whereCampo);

        /*
        if(empty(Connection::getVerificarTablasColumnas($tablaArray, $llavesArrayIndexado))){
            return;
        }
        */

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

        //Sanitizamos el valor de la variable $whereValor la cual siempre es un int
        $whereValor = filter_var ($whereValor, FILTER_SANITIZE_NUMBER_INT) ;


       
        $set = "";
        foreach($datos as $llave=>$valor){
            $set .= $llave . " = :". $llave.",";
        }
        $set = substr($set, 0 ,-1);

        $where = " WHERE $whereCampo = :$whereCampo";
        
        $sqlUpdate = "UPDATE $tabla SET $set $where";

        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sqlUpdate); 

        foreach($datos as $llave=>$valor){
            $stmt->bindParam(":".$llave, $datos[$llave], PDO::PARAM_STR);
        }
        //El del where no esta en el arreglo
        $stmt->bindParam(":".$whereCampo, $whereValor, PDO::PARAM_STR);
        

        try{
            $stmt -> execute();
            $numRegistrosModificados = $stmt->rowCount(); 

            if($numRegistrosModificados == 1){
                
                $respuesta = array(
                    'status'  => 200,
                    'titulo'  => "Éxito",
                    'numReg'  => $numRegistrosModificados,
                    "mensaje" => "Transacción realizada con Éxito",
                );
                return $respuesta;

            }else{
                
                $respuesta = array(
                    'status' => 200,
                    'titulo' => "Advertencia",
                    'numReg'  => $numRegistrosModificados,
                    "mensaje" => "No se localizo el Registro para la Modificación",
                );
                return $respuesta;  

            }
        }catch(PDOException $ex){
                //return  $ex->getMessage();
                //return "Error al realizar la transacción";
                return null;
        }
    }
}