<?php

require_once "connection.php";

class GetModel{

    static public function getData($table){

        /*******************************************************
         * SELECT * 
            FROM information_schema.tables
            WHERE table_schema = 'yourdb' 
                AND table_name = 'testtable'
            LIMIT 1;

        O bien, utilizar:
        SHOW TABLES LIKE 'table'  //Si existe la tabla table regresa un 1    
        ***************************************************** */

        $sql  = "SELECT * FROM $table";
        $conection = Connection::connect();//->prepare();
        $stmt = $conection->prepare($sql); 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }
}