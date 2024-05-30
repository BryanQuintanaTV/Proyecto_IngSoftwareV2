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


$response = new GetController();
if(isset($_GET["linkTo"]) && isset($_GET["equalTo"])){
    $response->getDataFilter($table, $columnas, $linkTo, $equalTo, 
    $orderBy, $orderMode, $startAt, $endAt);
}else{
    $response->getData($table, $columnas, $orderBy, $orderMode, $startAt, $endAt);
}


return;




