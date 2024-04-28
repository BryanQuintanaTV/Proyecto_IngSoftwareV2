# Proyecto_IngSoftware
Proyecto Ingeniería de Software


> [!IMPORTANT]
> Para que funcione la api y la página 
> 
> Se debe de configurar

> [!IMPORTANT]
> $\color{red}{\textsf{Se ha modificado lo que se tiene que poner en el archivo }}$ $\color{orange}{\textsf{httpd-vhosts}}$ $\color{red}{\textsf{para hacer funcionar las rutas relativas, asi como se han agregado cambios al código para que pueda funcionar}}$
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
    DocumentRoot "C:/xampp/htdocs/xampp/Carpetas-proyecto-paleteria"
</VirtualHost>

<VirtualHost *:80>
    ServerName admincopacabana.com
    DocumentRoot "C:/xampp/htdocs/xampp/Carpetas-proyecto-paleteria"
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
> [!NOTE]
> La base de datos a utilizar ya esta en su versión utilizable
