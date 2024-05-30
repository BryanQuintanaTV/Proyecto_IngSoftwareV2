<?php

require_once "controllers/get.controller.php";

$table      = explode("?",$routesArray[1])[0];  //Una sola
$columnas   = $_GET['columnas'] ?? "*";
$relTablas  = $_GET['relTablas'] ?? null;
$relCampos  = $_GET['relCampos'] ?? null;
$linkTo     = $_GET["linkTo"] ?? null;
$operadorTo = $_GET["operadorTo"] ?? null;
$equalTo    = $_GET["equalTo"] ?? null;

$orderBy    = $_GET['orderBy'] ?? null;
$orderMode  = $_GET['orderMode'] ?? null;
$startAt    = $_GET['startAt'] ?? null;
$endAt      = $_GET['endAt'] ?? null;

$like       = $_GET["like"] ?? null;


/**************************************************************
Pasar todos los parametros que sean necesarios en Arreglos
*************************************************************/
if($relTablas != null){
    $table .= ",$relTablas";
}
$tablesArray = explode(",", $table);


/**********************************************************
$columnas No es necesario crear un areglo de las columnas
************************************************************/


if($relCampos != null){
    $relCamposArray = explode(",", $relCampos);
}else{
    $relCamposArray = Array();
}

if($linkTo != null){
    $linkToArray = explode(",", $linkTo);
}else{
    $linkToArray = Array();
}

if($equalTo != null){
    $equalToArray = explode("_", $equalTo);
}else{
    $equalToArray = Array();
}

if($orderBy != null){
    $orderByArray = explode(",", $orderBy);
}else{
    $orderByArray = Array();
}
if($orderMode != null){
    $orderModeArray = explode(",", $orderMode);
}else{
    $orderModeArray = Array();
}

/*******************************************************
//$startAt y $endAt Nunca debe ser un arreglo
 *********************************************************/

 // Like realmente es un operador
if($like != null){
    $likeToArray = explode(",", $like);
}



$response = new GetController();

/* **********************************************
JUNTAR TODO
*************************************************/


$response->getDatosT($tablesArray, $columnas, $relCamposArray, $linkToArray, $equalToArray, 
$orderByArray, $orderModeArray, $startAt, $endAt);

return;

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
//SIN RELACIONES CON WHERE LIKE
else if(isset($_GET["linkTo"]) && isset($_GET["like"])){

    $response->getDataFilterLike($table, $columnas, $linkTo, $like, 
    $orderBy, $orderMode, $startAt, $endAt);

}
//SIN RELACIONES SIN WHERE
else{    
    $response->getData($table, $columnas, $orderBy, $orderMode, $startAt, $endAt);
}


return;




