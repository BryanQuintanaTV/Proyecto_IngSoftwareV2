<?php
if (isset($_POST['hashedPassword']) && isset($_POST['password'])) {
    $hashedPassword = $_POST['hashedPassword'];
    $password = $_POST['password'];

    // Realizar la verificación de la contraseña hasheada
    if (password_verify($password, $hashedPassword)) {
        echo "true";
    } else {
        echo "false";
    }
} else {
    echo "No se recibieron los datos necesarios.";
}
?>
