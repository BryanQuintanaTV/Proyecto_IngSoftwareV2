<?php

require_once "connection.php";

class GetModel{

    /* **********************************************
    JUNTAR TODO
    *************************************************/ 
    static public function getDatosT($tablesArray, $columnas, $relCamposArray, $linkToArray, $equalToArray, 
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




    /* *****************************************
    Peticion GET sin FILTRO
    ********************************************/    
    static public function getData($table, $columnas, $orderBy, $orderMode, 
         $startAt, $endAt){

        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }

        $sql  = "SELECT $columnas FROM $table $ordenar  $limitar";

        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /* *****************************************
    Peticion GET con FILTRO AND
    ********************************************/
    static public function getDataFilter($table, $columnas, $linkTo, $equalTo, 
        $orderBy, $orderMode, $startAt, $endAt){

        $linkToArray = explode(",", $linkTo);
        $equalToArray = explode("_", $equalTo);
        
        //Verificar que sean del mismo tamaño
        if(count($linkToArray) == count($equalToArray)){
            $condicion = "";
            $vueltas = count($linkToArray)-1;

            for($i=0; $i <= $vueltas; $i++){
                $condicion = $condicion . " " . $linkToArray[$i] . " = ?";
                if($i != $vueltas){
                    $condicion .= " AND ";
                }
            }
        } 
        
        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }
        

        $sql  = "SELECT $columnas FROM $table WHERE $condicion $ordenar  $limitar";

        $conection = Connection::connect();
        $stmt = $conection->prepare($sql); 
        
        for($i=0; $i< count($equalToArray); $i++){
            $stmt->bindParam($i+1, $equalToArray[$i], PDO::PARAM_STR);
        }
 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
        
    }

    /* *****************************************
    Peticion GET con FILTRO LIKE
    ********************************************/
    static public function getDataFilterLike($table, $columnas, $linkTo, $like, 
        $orderBy, $orderMode, $startAt, $endAt){
        
        $condicion = " WHERE $linkTo LIKE '%$like%' ";
        
        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }
        

        $sql  = "SELECT $columnas FROM $table $condicion $ordenar  $limitar";

        echo $sql;
        //return;
        

        $conection = Connection::connect();
        $stmt = $conection->prepare($sql); 
        
 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
        
    }



    /* *****************************************
    Peticion GET Con RELACIONES sin FILTRO
    ********************************************/    
    static public function getRelationData($relTablas, $relCampos, $columnas, $orderBy, $orderMode, 
         $startAt, $endAt){

        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }

        $tablas = explode(",", $relTablas);
        $campos = explode(",", $relCampos);

        /*
            SELECT * 
            FROM countries 
            INNER JOIN codes      ON countries.id_code_country = codes.id_code
            INNER JOIN dialcodes  ON countries.id_dialcode_contry = dialcodes.id_dialcode
        */

        $sql = "SELECT $columnas FROM $tablas[0]";
        for($i = 1; $i < count($tablas); $i++){
            $innerJOIN = " INNER JOIN $tablas[$i] ON $tablas[0].id_$campos[0] = $tablas[$i].id_$campos[$i] "; 
            $sql .= $innerJOIN;
        }

        $sql .= $ordenar . $limitar;

        //return;
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }


    /* *****************************************
    Peticion GET Con RELACIONES CON FILTRO
    ********************************************/    
    static public function getRelationDataFilter($relTablas, $relCampos, $columnas, $linkTo, $equalTo, 
                      $orderBy, $orderMode, $startAt, $endAt){

        $linkToArray = explode(",", $linkTo);
        $equalToArray = explode("_", $equalTo);
        
        
        //Verificar que sean del mismo tamaño
        $condicion = " ";
        if(count($linkToArray) == count($equalToArray)){
            $condicion = " WHERE ";
            $vueltas = count($linkToArray)-1;
            for($i=0; $i <= $vueltas; $i++){
                $condicion = $condicion . " " . $linkToArray[$i] . " = ?";
                if($i != $vueltas){
                    $condicion .= " AND ";
                }
            }
        } 

        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }

        $tablas = explode(",", $relTablas);
        $campos = explode(",", $relCampos);

        $sql = "SELECT $columnas FROM $tablas[0]";
        for($i = 1; $i < count($tablas); $i++){
            $innerJOIN = " INNER JOIN $tablas[$i] ON $tablas[0].id_$campos[0] = $tablas[$i].id_$campos[$i] "; 
            $sql .= $innerJOIN;
        }

        $sql .= $condicion . $ordenar . $limitar;

        echo $sql;
        //return;
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 

        for($i=0; $i< count($equalToArray); $i++){
            $stmt->bindParam($i+1, $equalToArray[$i], PDO::PARAM_STR);
        }

        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }



    /***********************************************************
     INTENTO GET GENERAL CON O SIN FILTROS, CON O SIN RELACIONES
     CON DISTINTOS OPERADORES
    ************************************************************/

    static public function getConsultas($relTablas, $relCampos, $columnas, $linkTo, $equalTo, 
                      $orderBy, $orderMode, $startAt, $endAt){

        $linkToArray = explode(",", $linkTo);
        $equalToArray = explode("_", $equalTo);
        
        
        //Verificar que sean del mismo tamaño
        $condicion = " ";
        if(count($linkToArray) == count($equalToArray)){
            $condicion = " WHERE ";
            $vueltas = count($linkToArray)-1;
            for($i=0; $i <= $vueltas; $i++){
                $condicion = $condicion . " " . $linkToArray[$i] . " = ?";
                if($i != $vueltas){
                    $condicion .= " AND ";
                }
            }
        } 

        $ordenar = "";
        if($orderBy != null && $orderMode != null){
            $ordenar  = " ORDER BY $orderBy $orderMode";
        }
        
        $limitar = "";
        if($startAt != null && $endAt != null){
            $limitar = " LIMIT $startAt, $endAt ";
        }

        $tablas = explode(",", $relTablas);
        $campos = explode(",", $relCampos);

        $sql = "SELECT $columnas FROM $tablas[0]";
        for($i = 1; $i < count($tablas); $i++){
            $innerJOIN = " INNER JOIN $tablas[$i] ON $tablas[0].id_$campos[0] = $tablas[$i].id_$campos[$i] "; 
            $sql .= $innerJOIN;
        }

        $sql .= $condicion . $ordenar . $limitar;

        echo $sql;
        //return;
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 

        for($i=0; $i< count($equalToArray); $i++){
            $stmt->bindParam($i+1, $equalToArray[$i], PDO::PARAM_STR);
        }

        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }
}