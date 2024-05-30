<?php

require_once "connection.php";

class GetModel{

    /* ******************************************************************************************
    JUNTAR TODO
    *********************************************************************************************/ 
    static public function getDatos($tablesArray, $columnas, $relCamposArray, 
                                    $linkToArray, $operadorRelToArray,$valueToArray, $operadorLogicoToArray, 
                                    $orderByArray, $orderModeArray, 
                                    $startAt, $endAt){

        //echo "ESTOY EN EL MODELO \n";                                        
        /***************************************************
         * Verificar si existe la(s) tabla(s),
         * a la sentencia que sigue le falta recorrer el arreglo 
         * para verificar todas
        **************************************************/

        /*******************************************************
        Verificar si existe la(s) tabla(s)  y las columnas
        El parametro $tablesArray es un arreglo que trae todas
        las tablas involucradas con la consulta, las columnas
        estan dispersas por varios parametros.
        ********************************************************/

        //Juntar las columnas en un solo arreglo, con la intencion de verificar si existen. 
        //Parametros GET que traen columnas
        //Parametro          Tipo
        //$columnas          Cadena
        //$valueToArray      Array
        //$orderByArray      Array
        //Van a faltar los de Between 
        //Van a faltar los de in()


        $columnasArray = explode(",", $columnas);

        $columnasVerificar = array_merge($columnasArray, $linkToArray, $orderByArray);
/*
        if(empty(Connection::getVerificarTablasColumnas($tablesArray, $columnasVerificar))){
            //echo "  ERROR EN LAS COLUMNAS Y TABLAS   \n";
            return null; 
        }        
        //Si llega hasta esta linea significa que si existen las 
        //Tablas y columnas
*/

        //$regresoVerificar = Connection::getVerificarTablasColumnas($tablaArray, $llavesArrayIndexado); 
        $regresoVerificar = Connection::getVerificarTablasColumnas($tablesArray, $columnasVerificar); 
        if($regresoVerificar == 1){
            $respuesta = array(
                "status" => 404,
                "titulo" => "Error",
                "mensaje" => "Recurso no localizado"
            );
            return $respuesta;                    

        }else if($regresoVerificar == 2){
            $respuesta = array(
                "status" => 400,
                "titulo" => "Error",
                "mensaje" => "Error en la solicitud"
            );
            return $respuesta;                    
        }

        //Si llega hasta esta linea significa que si existen las 
        //Tablas y columnas

        /*************************************************************
         SENTENCIA BASICA
        ************************************************************* */
        $sql = "SELECT $columnas FROM $tablesArray[0] ";
        //echo "\nSENTENCIA BASICA \n";
        //echo "\n" . $sql . "\n";

        /*************************************************************
         SENTENCIA CON JOINS
         Si en el arreglo solo esta la tabla base no hay JOINS
        ************************************************************* */        
        $innerJOIN = " ";

        /*
            TABLES ARRAY: Array ( [0] => countries [1] => codes [2] => dialcodes )
            REL CAMPOS ARRAY: Array ( [0] => country [1] => code [2] => dialcode )

            SELECT name_country,id_code_country,id_dialcode_country 
            FROM countries 
            INNER JOIN codes     ON countries.id_code_country     = codes.id_code 
            INNER JOIN dialcodes ON countries.id_dialcode_country = dialcodes.id_dialcode
        */

        /********************************************************************************
         TODO: Falta validar que NO SE REPITAN LAS TABLAS, QUE EL NUMERO DE CAMPOS A REL
         SEAN IGUAL AL NUMERO DE TABLAS 
        ********************************************************************************/
        $innerJOIN = " ";

        /*************************************************************************
        VALIDACIONES TABLAS Y CAMPOS PARA REALIZAR LOS JOINS 
        a) El arreglo $tablesArray debe tener por lo menos 2 elementos
                1. Tabla que biene en la URL
                2. Tabla(s) que componenen los JOIN
        b) El arreglo $tablesArray y el arreglo $relCamposArray deben tener el mismo 
           num de elementos
        **************************************************************************/
        
        $innerJOIN = "";
        //Validacion Inciso A
        if(count($tablesArray)>1){
            //Validacion Inciso B
            if(count($tablesArray) == count($relCamposArray)){
                for($i = 1; $i < count($tablesArray); $i++){
                    $tablaPrincipal = $tablesArray[0];
                    $tablaJOIN      = $tablesArray[$i];
                
                    //                        countries       .id_         code              _    country
                    $campoTablaPrincipal = $tablaPrincipal . ".id_" . $relCamposArray[$i] . "_" .$relCamposArray[0];
                    //                        codes           .id_         code           
                    $campoTablaJOIN      = $tablaJOIN      . ".id_" . $relCamposArray[$i]; 
                    $innerJOIN .= " INNER JOIN $tablesArray[$i] ON $campoTablaPrincipal = $campoTablaJOIN ";
                }
            }else{
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud"
                );
                return $respuesta;                    
            }
        }
        $sql .= $innerJOIN;
        //echo "\nSENTENCIA CON INNER JOIN: \n";
        //echo "\n" . $sql . "\n";


        /*****************************************************************
        Verificar que los unicos posibles valores de $operadorRelToArray sean:
        =, <>, <, >, >=, <=, like, in, between 
        ******************************************************************/
        for($i=0; $i < count($operadorRelToArray); $i++){
            $operadorRelToArray[$i] = strtolower($operadorRelToArray[$i]);
            //echo "\nEL OPERADOR ES: $operadorRelToArray[$i] \n";
            switch($operadorRelToArray[$i]){
                case "=":
                case ">":
                case "<":
                case "<>":
                case ">=":
                case "<=":
                case "in":
                case "like":
                case "between":
                    break;
                default:
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud en el Operador Relacional"
                );
                return $respuesta;                    
            }
        }

        /*****************************************************************
        Verificar que los unicos posibles valores de $operadorLogicoToArray sean:
        ON AND
        ******************************************************************/
        for($i=0; $i < count($operadorLogicoToArray); $i++){
            $operadorLogicoToArray[$i] = strtoupper($operadorLogicoToArray[$i]);
            //echo "\nEL OPERADOR ES: $operadorLogicoToArray[$i] \n";
            switch($operadorLogicoToArray[$i]){
                case "OR":
                case "AND":
                case "between":
                    break;
                default:
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud en un Operador Lógico"
                );
                return $respuesta;                    
            }
        }

        /*****************************************************************
        Verificar que los unicos posibles valores de $orderModeArray sean:
        ASC  DESC
        ******************************************************************/
        for($i=0; $i < count($orderModeArray); $i++){
            $orderModeArray[$i] = strtoupper($orderModeArray[$i]);
            //echo "\nEL OPERADOR ES: $orderModeArray[$i] \n";
            switch($orderModeArray[$i]){
                case "ASC":
                case "DESC":
                case "between":
                    break;
                default:
                    $respuesta = array(
                        "status" => 400,
                        "titulo" => "Error",
                        "mensaje" => "Error en la solicitud En la Ordenación"
                    );
                    return $respuesta;                    
            }
        }

        /*****************************************************************
        Verificar que los unicos valores de $startAt y endAt sean numeros positivos
 
        ******************************************************************/
        if(!is_null($startAt) && !is_null($endAt)){
            if(!is_numeric($startAt) || !is_numeric($endAt)){
                echo "\n ERROR EN LOS VALORES DE LIMIT \n";
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud Valores de Limit, no son números"
                );
                return $respuesta;                    
            }elseif($startAt < 0 || $endAt < 0){
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud Valores de Limit, son Negativos"
                );
                return $respuesta;                                }
        }

        /**********************************************************************
        Verificar que:
            El la cantidad de columnas para el wehere sea igual al numero
            El la cantidad de operadores relacionales 
            El la cantidad de valores de comparacion
        Sean iguales
            Que el numero de opradores lógios sea 1 menor que los anteriores.  
        Todo esto si no estan vacios    
        ************************************************************************/
        $numLink           = count($linkToArray);
        $numOperadorRel    = count($operadorRelToArray);
        $numValue          = count($valueToArray);
        $numOperadorLogico = count($operadorLogicoToArray);

        //echo "    VALORES DE LAS CONDICIONES;     ";
        //print_r($valueToArray);
        //echo "NUMERO DE CAMPOS: $numLink \n";
        //echo "NUMERO DE OP RELACIONAL ES: $numOperadorRel \n";
        //echo "NUMERO DE OP VALOR ES: $numValue \n";
        //echo "NUMERO DE OP LOGICOS ES: $numOperadorLogico \n";

        $condicion = "";
        if($numLink == 0 && $numValue == 0 && $numOperadorRel == 0 && $numOperadorLogico == 0){
            $condicion = "";
        }else{
            if($numLink > 0 && $numLink == $numValue && 
                $numLink == $numOperadorRel && $numLink == $numOperadorLogico + 1){

                $condicion = " WHERE ";
                $vueltas = count($linkToArray)-1;
                for($i=0; $i <= $vueltas; $i++){
                    if($operadorRelToArray[$i] == 'in'){
                        $condicion = $condicion . " " . $linkToArray[$i] . " " .  
                        $operadorRelToArray[$i] . "( ? )";
                    }elseif($operadorRelToArray[$i] == 'between'){
                        $condicion = $condicion . " " . $linkToArray[$i] . " between ? AND ? ";
                    }else{
                        $condicion = $condicion . " " . $linkToArray[$i] . " " .  
                        $operadorRelToArray[$i] . " ? ";                    
                    }
                    if($i != $vueltas){
                        $condicion .= "  " .  $operadorLogicoToArray[$i] . " ";
                    }
                }
            }else{
                echo "   ERROR EN EL WHERE     ";
                $respuesta = array(
                    "status" => 400,
                    "titulo" => "Error",
                    "mensaje" => "Error en la solicitud. En los operadores y/o operandos del Where"
                );
                return $respuesta;                    
            }
        }


        $sql .= $condicion;
        //echo "\nSENTENCIA CON WHERE: \n";
        //echo "\n" . $sql . "\n";


        /*****************************************************************
        SENTENCIA DEL ORDER BY
        Por lo pronto es obligatorio que se estipule si es  ASC o DESC
        ******************************************************************/
        $orderBy = " ";
        $numColOrdenar = count($orderByArray);
        if(count($orderByArray) == count($orderModeArray) && $numColOrdenar > 0){
            $orderBy = " ORDER BY ";
            for($i=0; $i < $numColOrdenar; $i++){
                $orderBy = $orderBy . " " . $orderByArray[$i] . " " . $orderModeArray[$i];
                if($i + 1 < $numColOrdenar){
                    $orderBy .= ", ";
                }
            }
            $orderBy .= " ";
        } 
        $sql .= $orderBy;
        //echo "\nSENTENCIA CON ORDER BY: \n";
        //echo "\n" . $sql . "\n";

        /*****************************************************************
        SENTENCIA LIMIT
        Las variables para esta senetencoa no son un arreglo
        no se necesita un recorrido 
        ******************************************************************/
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }

        $sql .= $limitar;
        //echo "\nSENTENCIA CON LIMIT: \n";
        //echo "\n" . $sql . "\n";
        //return;

        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 

        /***********************************************************************
         Si hay Where es neceario relacionar los ? con sus verdaderos valores
        ************************************************************************/
        
        if($condicion != ""){
            for($i=0, $j=1; $i< count($valueToArray); $i++, $j++){
                if($operadorRelToArray[$i] == 'between'){
                    $operandos = explode(",",$operadorRelToArray[$i]);
                    $stmt->bindParam($j, $operandos[0], PDO::PARAM_STR);
                    $stmt->bindParam(++$j, $operandos[1], PDO::PARAM_STR);
                }else{
                    $stmt->bindParam($j, $valueToArray[$i], PDO::PARAM_STR);
                }
            }
        }
        
        try{
            $stmt -> execute();
            //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
            $datos = $stmt->fetchAll(PDO::FETCH_CLASS);
            $numRegistros = $stmt->rowCount();
            if($numRegistros > 0){
                $mensaje = "Consulta realizada con éxito";
            }else{
                $mensaje = "No se localizaron Registros";
            }
            $respuesta = array(
                "status" => 200,
                "titulo" => "Éxito",
                "numReg" => $numRegistros,
                "mensaje" => $mensaje,
                "datos"   => $datos
            );
            return $respuesta;
        }catch(PDOException $ex){

            /*
            $json = array(
                "status" => 402,
                'result' =>  $ex->getMessage()
            );
            
            $cadenaJSON = json_encode($json, http_response_code($json["status"]));
            return $cadenaJSON;
            */

            $respuesta = array(
                "status" => 400,
                "titulo" => "Error",
                "mensaje" => "Error en la solicitud Sentencia SQL"
            );
            return $respuesta;                                
        }
    }
}