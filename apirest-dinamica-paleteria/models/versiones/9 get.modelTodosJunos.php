<?php

require_once "connection.php";

class GetModel{

    /* **********************************************
    JUNTAR TODO
    *************************************************/ 
    static public function getDatos($tablesArray, $columnas, $relCamposArray, $linkToArray, $equalToArray, 
    $orderByArray, $orderModeArray, $startAt, $endAt){

        /*************************************************************
         SENTENCIA BASICA
        ************************************************************* */
        $sql = "SELECT $columnas FROM $tablesArray[0] ";
        
        //echo "<p>  SENTENCIA BASICA <br>$sql </p>";

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

        $innerJOIN = " ";
        for($i = 1; $i < count($tablesArray); $i++){
            $tablaPrincipal = $tablesArray[0];
            $tablaJOIN      = $tablesArray[$i];
            
            //                        countries       .id_         code              _    country
            $campoTablaPrincipal = $tablaPrincipal . ".id_" . $relCamposArray[$i] . "_" .$relCamposArray[0];
            //                        codes           .id_         code           
            $campoTablaJOIN      = $tablaJOIN      . ".id_" . $relCamposArray[$i]; 

            $innerJOIN .= " INNER JOIN $tablesArray[$i] 
                            ON $campoTablaPrincipal = $campoTablaJOIN "; 
        }

        $sql .= $innerJOIN;

        //echo "<p>  SENTENCIA CON INNER JOIN: <br>$sql </p>";

        /*****************************************************************
        SENTENCIA DEL WHERE
        Por lo pronto esta todo solo con los operadores  = y AND
        ******************************************************************/
        $condicion = "";
        if(count($linkToArray) == count($equalToArray) && count($equalToArray) > 0){
            $condicion = " WHERE ";
            $vueltas = count($linkToArray)-1;
            for($i=0; $i <= $vueltas; $i++){
                $condicion = $condicion . " " . $linkToArray[$i] . " = ?";
                if($i != $vueltas){
                    $condicion .= " AND ";
                }
            }
        } 
        $sql .= $condicion;
        //echo "<p>  SENTENCIA CON WHERE: <br>$sql </p>";

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
        //echo "<p>  SENTENCIA CON ORDER BY: <br>$sql </p>";
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
        //echo "<p>  SENTENCIA CON LIMITE<br>$sql </p>";



        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 

        /***********************************************************************
         Si hay Where es neceario relacionar los ? con : erdaderos valores
        ************************************************************************/
        if($condicion != ""){
            for($i=0; $i< count($equalToArray); $i++){
                $stmt->bindParam($i+1, $equalToArray[$i], PDO::PARAM_STR);
            }
        }

        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }
}