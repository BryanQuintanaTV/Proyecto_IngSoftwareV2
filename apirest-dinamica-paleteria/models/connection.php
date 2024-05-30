<?php
class Connection{
    /*****************************************
     * INFORMACION DE LA BASE DE DATOS
    *****************************************/

     public static function infoDatabase(){
        $infoDB = array(
            "database" => "paletería",
            "user"     => "ApiRest",
            "pass"     => "ApiRest1"
        );
        return $infoDB;
     }

    /*****************************************
     * CONECCION A LA B de D
    *****************************************/
    public static function connect(){
        try{
            $urlHost_DB = "mysql:host=db-mysql-nyc3-25007-do-user-15116273-0.c.db.ondigitalocean.com;port=25060;dbname=" . Connection::infoDatabase()["database"];
            $urlUser = Connection::infoDatabase()["user"];
            $urlPass = Connection::infoDatabase()["pass"];

            $link = new PDO($urlHost_DB, $urlUser, $urlPass);

            //Ejecutammos la instancia link indicando que los valores vengan en utf-8
            $link->exec("set names utf8");
        }catch(PDOException $e){
            die("ERROR: " . $e->getMessage());
        }
        return $link;
    }

    /*****************************************
    VALIDAR EXISTENCIA DE UNA TABLA EN LA B de D
    Este metodo se debe ejecutar en el inicio de cada uno de los metodos
    del script get.model.php
    *****************************************/
    private static function existeTable($table){
        $dataBase = Connection::infoDatabase()["database"];

        $queryTables = "SELECT count(*) num 
        FROM information_schema.tables
        WHERE table_schema = '$dataBase'
          AND table_name = '$table'";

        //Si el retorno va vacio significa que esa tabla no existe en la BdeD
        $connection = Connection::connect();
        $stmt = $connection->prepare($queryTables);
        $stmt -> execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        $numReg = $resultado['num'];
        return $numReg;
     }

    /*****************************************
    VALIDAR EXISTENCIA DE UNA TABLA EN LA B de D y SUS COLUMNAS
    Este metodo se debe ejecutar en el inicio de cada uno de los metodos
    del script get.model.php
    *****************************************/
    public static function getVerificarTablasColumnas($tablesArray, $columnasArray){
        $connection = Connection::connect();
        $dataBase = Connection::infoDatabase()["database"];

        /**************************************************
         Vrificar si existen las tablas
        ***************************************************/
        foreach($tablesArray as $llave=>$nombreTabla){
            if(Connection::existeTable($nombreTabla) == 0){
                //echo "\n PROBLEMA CON EL NOMBRE DE LAS TABLAS \n";
                return 1;
            }
        }
         //Si llega hasta esta linea significa que si encontro todas las tablas

        /**************************************************
        Crear una cadena con los elementos del arreglo de tablas
        *******************************************************/
        
        //$cadenaTablas = implode(",", $tablesArray);

        $numeroDeTablas = count($tablesArray);
        $cadenaTablas = "";
        foreach($tablesArray as $llave=>$valor){
            //Despues de la ultima tabla no debe haber coma ","
            if($llave < $numeroDeTablas-1){
                $cadenaTablas .= "'$valor', ";
            }else{
                $cadenaTablas .= "'$valor' ";
            }
        }
        //echo " CADENA DE TABLAS:  " . $cadenaTablas . "  FIN de cadena de tablas \n";
        $in = "IN (" . $cadenaTablas . ")  ";
        //$in = "IN ('countries', 'codes', 'dialcodes') ";

        /******************************************************
        Recorrer el arreglo $columnasArray 
        para ver si existen las columnas
        ******************************************************/
        //Si es un unico campo y es el * no se valida
        //echo "COLUMANS \n";
        //print_r($columnasArray);
        //echo "FIN DE COLUMNAS \n";
        if(count($columnasArray) == 1 && $columnasArray[0]== "*"){
            //echo "ES UN * NO SE VALIDA \n";
            return 0;
        }

        foreach($columnasArray as $llave=>$nombreCol){
            $qry = "SELECT count(*) num
            FROM information_schema.columns
            WHERE table_schema = '$dataBase'
            AND column_name = '$nombreCol'
            and table_name $in";

            //echo "\nCONSULTAS: " . $qry . "     FIN CONSULTA \n";
            $stmt = $connection->prepare($qry);
            $stmt -> execute();
            $encontrado = $stmt->fetch(PDO::FETCH_ASSOC);
            //$numReg = $encontrado['num'];
            if($encontrado['num'] == 0 && $nombreCol != "*"){
                //ERROR Esto significa que no encontro alguna de las columnas
                return 2;
            }
        }
        //Si llego hasta aqui significa que encontro todas las columnas
        //return $encontrado;
        return 0;
    }

    public static function getTipodeDatoColumnas($tabla, $columnas){
        $connection = Connection::connect();
        $dataBase = Connection::infoDatabase()["database"];

        $where = " WHERE table_schema = '$dataBase'
                    AND table_name = '$tabla' 
                    AND column_name in( ";
        
        $datosIN = " ";
        $colsArray = array();
        foreach($columnas as $key => $value){
            $datosIN .= "'$key',";
        }
        $datosIN = substr($datosIN, 0 , -1);

        $where .= $datosIN . " )";

        $sql = "SELECT COLUMN_NAME, DATA_TYPE
                FROM information_schema.columns
                $where ";
    
        $stmt = $connection->prepare($sql);
        $stmt -> execute();
        $encontrado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(empty($encontrado)){
            return null;
        }else{
            return $encontrado;
        }
        
    }  


    /******************************************************************
     Para Sanitizar los valores de los parametros es importante saber de que 
     tipo de dato es cada campo de las tablas de la base de datos que se van a autilizar
     Esta funcion es ejecutada desde el script validarSanitizar en una funcion validarSanitizar
    *******************************************************************/
    public static function getTipoDatoColumna($tabla, $columna){
        $connection = Connection::connect();
        $dataBase = Connection::infoDatabase()["database"];

        $sql = "SELECT DATA_TYPE
                FROM information_schema.columns
                WHERE table_schema = '$dataBase'
                  AND table_name = '$tabla' 
                  AND column_name = '$columna' ";
    
        $stmt = $connection->prepare($sql);
        $stmt -> execute();
        $encontrado = $stmt->fetch(PDO::FETCH_ASSOC);
        if(empty($encontrado)){
            return null;
        }else{
            return $encontrado;
        }
        
    }  

}