<?php

require_once "controllers/get.controller.php";

$table = explode("?",$routesArray[1])[0];
$columnas   = $_GET['columnas'] ?? "*";
$orderBy    = $_GET['orderBy'] ?? null;
$orderMode  = $_GET['orderMode'] ?? null;

$response = new GetController();
if(isset($_GET["linkTo"]) && isset($_GET["equalTo"])){
    $response->getDataFilter($table, $columnas, $_GET["linkTo"], $_GET["equalTo"], $orderBy, $orderMode);
}else{
    $response->getData($table, $columnas, $orderBy, $orderMode);
}


return;




