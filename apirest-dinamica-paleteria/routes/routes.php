<?php
//   routes/routes.php

$routesArray = explode("/", $_SERVER['REQUEST_URI']);
$routesArray = array_filter($routesArray);

/* *****************************************************************
Cuando no se hacen peticiones a la api
*******************************************************************/
if(count($routesArray) == 0){
//if (empty($routesArray)){
    $json = array(
        'status' => 404,
        'result' => 'Servicio no localizado'
    );
    /* **********************************************************
    Para que el servidor regreso el estatus 404 en lugar de 200
    *************************************************************/
    echo json_encode($json, http_response_code($json["status"]));

    return;
}

/* *****************************************************************
Cuando se hacen peticiones a la API
*******************************************************************/
if (count($routesArray) == 1 && isset($_SERVER["REQUEST_METHOD"])){
    $table      = explode("?",$routesArray[1])[0];
    /**************************************************
    Peticion GET  
    ****************************************************/
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        include "services/get.routes.php";
    }

    /**************************************************
    Peticion POST  
    ****************************************************/
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        include "services/post.routes.php";
    }    

    /**************************************************
    Peticion PUT  
    ****************************************************/
    if($_SERVER["REQUEST_METHOD"] == "PUT"){
        /*
        $json = array(
            'status' => 400,
            'result' => 'LLEGO AL PUT'
        );
        // **********************************************************
        //Para que el servidor regreso el estatus 404 en lugar de 200
        // *************************************************************
        echo json_encode($json, http_response_code($json["status"]));
    
        return;
        */
        include "services/put.routes.php";
    }    
    /**************************************************
    Peticion DELETE  
    ****************************************************/
    if($_SERVER["REQUEST_METHOD"] == "DELETE"){
        include "services/delete.routes.php";
    }
}else{
    $json = array(
        'status' => 405,
        'result' => 'Método no localizado'
    );

    echo json_encode($json, http_response_code($json["status"]));
}

