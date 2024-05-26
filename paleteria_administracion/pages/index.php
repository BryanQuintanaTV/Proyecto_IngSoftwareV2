
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Varela+Round">
  <link rel="stylesheet" href="../styles/login.css">

</head>
<!-- partial:index.partial.html -->
<body class="align">

  <div class="login">

  <div class="iceCreamImg">
    <img src="../../assets/images/logo.png" alt="">
    <img src="../assets/images/icecream.webp" alt="">
  </div>

    <header class="login__header">
      <h2><svg class="icon">
          <use xlink:href="#icon-lock" />
        </svg>Sign In</h2>
    </header>

    <form id="login" class="login__form" role="form" method="GET" action="#" autocomplete="off">

      <fieldset>

        <div>
          <label for="email">User</label>
          <input type="text" id="email" name="user" placeholder="NombreUsuario">
        </div>
        <br>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="password" value="" required>
        </div>
        <br>
        <div>
          <button class="button" type="submit" value="login">Login</button>
        </div>

        <!-- <div class="text-center">
            <label><?= $data["msn"] ?></label>
        </div> -->
      </fieldset>

      

    </form>

  </div>

  <svg xmlns="http://www.w3.org/2000/svg" class="icons">

    <symbol id="icon-lock" viewBox="0 0 448 512">
      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
    </symbol>

  </svg>

  <script src="../../lib/node_modules/sweetalert2/dist/sweetalert2.all.min.js" defer></script>
  <script src="../../api/utils/solicitud_fetch.js" defer></script>
  <script src="../js/login.js" defer></script>



</body>

<!-- https://fontawesome.com/icons/lock?style=solid -->
<!-- partial -->
  
</html>



<!-- -----------TODO: Quitar Lo de abajo --------------------------------------------------------- -->

<!-- <!DOCTYPE html>
<html>
<head>
	<title>Login Blue Hour</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="../styles/loginE_style.css">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
<script src="../../api/utils/solicitud_fetch.js"></script>

</head>

<body>
	<header>
        <img id="logo" src="imagenes/logo.png" alt="">
        <h1 style="color: #474740;" id="tituloMenu">BLUE HOUR</h1>
    </header> 
	<div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Registrarse</label>
					<input type="text" name="txt" placeholder="Nombre Usuario" required>
					<input type="email" name="email" placeholder="Email" required>
					<input type="password" name="pswd" placeholder="Contraseña" required>
					<button>Registrarse</button>
				</form>
			</div>

			<div class="login">
				<form id="entrada">
					<label for="chk" aria-hidden="true">Iniciar sesion</label>
					<input type="text" id="usuario" name="usuario" placeholder="usuario" required>
					<input type="password" id="contra" name="contra" placeholder="Contraseña" required>
					<button id="iniciarsesion" type="submit">Iniciar sesion</button>
				</form>
			</div>
	</div>
	<script src="../js/login.js"></script>
</body>
</html> -->