<?php

$user = "Bryan";
$plainPassword = "BryanPass123";
$profile = 3;

$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

echo $hashedPassword


?> 