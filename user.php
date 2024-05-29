<?php

// $user = "Cajero";
$user = "Admin";
// $plainPassword = "BryanPass123";
$plainPassword = "AdminPass123";
$profile = 3;

$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

echo $hashedPassword


?> 