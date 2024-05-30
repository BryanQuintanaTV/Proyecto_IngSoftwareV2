<?php
    require_once "models/connection.php";
    class ValidarSanitizar{

        public  function validarSanitizar($tabla, $datos){
            //Verificar de que tipo es en la tabla
            //$tipos = Connection::getTipoDatoColumnas($tabla, $datos);
            
            foreach($datos as $llave => $valor){
                $tipoArray = Connection::getTipoDatoColumna($tabla, $llave);
                $tipo = $tipoArray['DATA_TYPE'];

                switch($tipo){
                    case "varchar":
                    case "text":
                    case "char":
                    case "longtext":
                    case "mediumtext":
                        //Deprecated
                        //$valor = filter_var ($valor, FILTER_SANITIZE_STRING) ;
                        $datos[$llave] = htmlentities($datos[$llave],ENT_COMPAT);
                        break;
                    case "int":
                    case "bigint":
                    case "tinyint":
                    case "smallint":    
                    case "year":
                    case "mediumint":    
                        $datos[$llave] = filter_var ($datos[$llave], FILTER_SANITIZE_NUMBER_INT) ;
                        break;
                    
                    case "decimal":
                    case "float":    
                    case "double":
                        $datos[$llave] = filter_var ($datos[$llave], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) ;
                        break;                                 

                    //case "date":
                    //    $valor = filter_var ($valor, FILTER_SANITIZE_NUMBER_FLOAT) ;
                    //    break;                                 
                }


            }
            return $datos;
        } 
    }


