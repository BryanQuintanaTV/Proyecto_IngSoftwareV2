<?php

require_once "connection.php";

class GetModel{

    /* *****************************************
    Peticion GET sin FILTRO
    ********************************************/    
    static public function getData($table, $columnas){

        $sql  = "SELECT $columnas FROM $table";
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /* *****************************************
    Peticion GET con FILTRO
    ********************************************/
    static public function getDataFilter($table, $columnas, $linkTo, $equalTo){

        /*******************************************************
         * SELECT * 
            FROM information_schema.tables
            WHERE table_schema = 'yourdb' 
                AND table_name = 'testtable'
            LIMIT 1;

        O bien, utilizar:
        SHOW TABLES LIKE 'table'  //Si existe la tabla table regresa un 1    
        ***************************************************** */

        //$sql  = "SELECT $columnas FROM $table WHERE $linkTo = :$linkTO";
        //$stmt->bindParam(":".$linkTo" , $equalTo, PDO::PARAM_STR);
    
        //LA siguiente linea en lugar de la num 47
        $sql  = "SELECT $columnas FROM $table WHERE $linkTo = ?";
        $conection = Connection::connect();
        $stmt = $conection->prepare($sql); 
        //La siguiente linea en lugar de la 48 (Si se decide or la 48 debe ir en este lugar)
        $stmt->bindParam(1, $equalTo, PDO::PARAM_STR);


        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }


}