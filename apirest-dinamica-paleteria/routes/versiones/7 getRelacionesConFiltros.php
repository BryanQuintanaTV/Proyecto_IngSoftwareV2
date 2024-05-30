<?php

require_once "controllers/get.controller.php";

$table = explode("?",$routesArray[1])[0];
$columnas   = $_GET['columnas'] ?? "*";
$linkTo     = $_GET["linkTo"] ?? null;
$equalTo    = $_GET["equalTo"] ?? null;
$orderBy    = $_GET['orderBy'] ?? null;
$orderMode  = $_GET['orderMode'] ?? null;
$startAt    = $_GET['startAt'] ?? null;
$endAt      = $_GET['endAt'] ?? null;
$relTablas  = $_GET['relTablas'] ?? null;
$relCampos  = $_GET['relCampos'] ?? null;


$response = new GetController();

//CON RELACIONES Y CON WHERE
if(isset($_GET["relTablas"]) && isset($_GET["relCampos"]) && $table == "relations"
            && isset($_GET["linkTo"]) && isset($_GET["equalTo"])){

    $response->getRelationDataFilter($relTablas, $relCampos, $columnas, $linkTo, $equalTo, 
    $orderBy, $orderMode, $startAt, $endAt);    

}

//CON RELACIONES SIN WHERE
else if(isset($_GET["relTablas"]) && isset($_GET["relCampos"]) && $table == "relations"){

    $response->getRelationData($relTablas, $relCampos, $columnas,  
    $orderBy, $orderMode, $startAt, $endAt);    

}

//SIN RELACIONES CON WHERE
else if(isset($_GET["linkTo"]) && isset($_GET["equalTo"])){

    $response->getDataFilter($table, $columnas, $linkTo, $equalTo, 
    $orderBy, $orderMode, $startAt, $endAt);

}
//SIN RELACIONES SIN WHERE
else{    
    $response->getData($table, $columnas, $orderBy, $orderMode, $startAt, $endAt);
}


return;




