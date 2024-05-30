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
        
        
        $sql  = "SELECT $columnas FROM $table WHERE $condicion";
        //echo "<p>$sql</p>";
        //return;
        $conection = Connection::connect();
        $stmt = $conection->prepare($sql); 
        
        for($i=0; $i< count($equalToArray); $i++){
            $stmt->bindParam($i+1, $equalToArray[$i], PDO::PARAM_STR);
        }
        
 
        $stmt -> execute();
        //FETCH_CLASS Sirve para que me regrese el indice con el nombre de las columnas
        return $stmt->fetchAll(PDO::FETCH_CLASS);
        
    }


}