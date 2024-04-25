# Proyecto_IngSoftware
Proyecto Ingeniería de Software


> [!IMPORTANT]
> Para que funcione la api y la página 
> 
> Se debe de configurar
## XAMPP

   - 📂xampp<br>
     &emsp;⨽ 📂apache<br>
     &emsp;&emsp;⨽ 📂conf<br>
     &emsp;&emsp;&emsp;⨽ 📂extra<br>
     &emsp;&emsp;&emsp;&emsp;⨽ 📄httpd-vhosts

En el archivo de 📄httpd-vhosts poner lo siguiente
> [!NOTE]
> Lo que esta entre comillas en **_DocumentRoot_** es la ruta donde están guardadas las carpetas correspondientes<br>
> { 📁apirest-dinamica-paleteria, 📁Proyecto-Paleteria-Clientes y 📁Administracion-de-Empresa }
```
<VirtualHost *:80>
    ServerName apicopacabana.com
    DocumentRoot "C:/xampp/htdocs/apirest-dinamica-paleteria"
</VirtualHost>

<VirtualHost *:80>
    ServerName copacabana.com
    DocumentRoot "C:/xampp/htdocs/proyecto_paleteria/paleteria_clientes/pages/index.html"
</VirtualHost>

<VirtualHost *:80>
    ServerName admincopacabana.com
    DocumentRoot "C:/xampp/htdocs/proyecto_paleteria/paleteria_administracion/pages/index.html"
</VirtualHost>

```

## Windows
   - 📂windows<br>
     &emsp;⨽ 📂System32<br>
     &emsp;&emsp;⨽ 📂drivers<br>
     &emsp;&emsp;&emsp;⨽ 📂etc<br>
     &emsp;&emsp;&emsp;&emsp;⨽ 📄hosts

En el archivo de 📄hosts poner lo siguiente
```
127.0.0.1	   copacabana.com
127.0.0.1	   admincopacabana.com
127.0.0.1	   apicopacabana.com
```
> [!CAUTION]
> La base de datos a utilizar esta almacenada en la nube y no es la versión final, por lo que la base de datos será modificada en su totalidad
