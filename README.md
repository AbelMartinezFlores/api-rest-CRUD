# Backend CRUD API REST

_Ejemplo de WS REST con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Para replicar el proyecto necesitarás una maquina con:_

- 4GB de RAM
- 25GB de almacenamiento
- 2GHz de procesador

_En mi caso he utilizado una maquina con la última versión estable de 64 bits de la distribución Ubuntu de Linux (en ese momento la 20.04.03 LTS ). [Descargar ubuntu](https://ubuntu.com/download/desktop)_

_Empezamos a instalar  herramientas que nos serán útiles o que necesitamos para el proyecto._

_Instalamos última versión estable de Node JS para Ubuntu. Tenemos que realizar los siguientes pasos:_

- Instalar el gestor de paquetes de Node (npm)
```
sudo apt update
sudo apt install npm
```

- Instalamos con npm una utilidad para instarlar y mantener las versiones de Node (denominado con n)
```
sudo npm clean -f 
sudo npm i -g n
```

- Instalamos la última versión estable de Node JS a través de la utilidad n 
```
sudo n stable
```

_Instalamos MongoDB_
```
sudo apt install -y mongodb
```

_Ahora instalamos el gestor de repositorios (git) ya que es necesario para poder clonar el repositorio (en el caso de tenerlo instalado te puedes saltar este paso). Pondremos un ejemplo con un usuario inventado_
```
sudo apt install git 
git config --global user.name pepe
git config --global user.email pepe@gmail.com
git config --list
```

## Ejecución e Instalación 🔧

_Primero clonaremos el proyecto y despues instalaremos todas sus dependencias_

- Clonamos proyecto
```
git clone https://abelmartinezfloresUA@bitbucket.org/abelmartinezfloresua/api-rest.git
```

- Nos movemos al api-rest
```
cd api-rest
```

- Instalamos dependencias
```
npm i
```

- Ejecutamos el proyecto
```
npm start
```

- Se va a explicar como conectar con la base de datos local o mongo atlas. Nos vamos [index.js](index.js) y en esta linea:
```
var db = mongojs("mongodb+srv://abel:abel@sd.u5nbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majoritySD"); // Enlazamos con la DB "SD"
```
- Colocar entre paréntesis el enlace que se consigue en la opción de "conectar tu aplicación" en mongo atlas (para conectar tu propia base de datos online) o escribir el nombre de la base de datos local creada en tu máquina.

- En el caso de querer usar la base de datos local, realizar estos pasos para iniciar base de datos local en una nueva terminal, si usas mongo atlas dirígete directamente al apartado "Ejecutando las pruebas":

```
sudo systemctl start mongodb
```

- En otra terminal iniciamos el cliente mongo para gestionar la base de datos local

```
mongo --host localhost:27017
```

## Ejecutando las pruebas ⚙️

_En este apartado se van a explicar las pruebas que tiene el sistema_

### Analice las pruebas end-to-end 🔩

_Entre todos los archivos nos encontramos con el fichero [crud.postman_collection.json](crud.postman_collection.json)_

_Las pruebas son las siguientes:_

| Verbo HTTP | Ruta | Descripción |
| ------------- | ------------- | ------------- |
| GET | /api  | Obtenemos todas las colecciones existentes en la DB |
| GET  | /api/\{coleccion\} | Obtenemos todos los elementos de la tabla {coleccion} |
| GET  | /api/\{coleccion\}/\{id\} | Obtenemos el elemento indicado en {id} de la tabla {coleccion}|
| POST  | /api/\{coleccion\} | Creamos un nuevo elemento en la tabla {coleccion} |
| PUT  | /api/\{coleccion\}/\{id\} | Modificamos el elemento {id} de la tabla {coleccion} |
| DELETE  | /api/\{coleccion\}/\{id\} | Eliminamos el elemento {id} de la tabla {coleccion}|

_EN el caso de las peticiones: POST, PUT y DELETE necesitan en los headers de postman poner el header: token cuyo valor es "password1234" ya que sin esto nos dará un error de no autorizado las peticiones. El token ya esta puesto por defecto. Las peticiones GET no lo necesitan_

_Lo importamos en Postman y tenemos una serie de peticiones establecidas. En el caso de no tener postman instalado, la instalación en ubuntu sería la siguiente (puede cambiar según el sistema operativo)_

```
sudo snap install postman
```

_Las peticiones que se encuentran son del tipo: GET, POST, PUT y DELETE_

## Construido con 🛠️

_Herramientas utilizadas para crear el proyecto_

* [NodeJS](https://nodejs.org/es/) - Para el desarrollo del back-end
* [MongoDB](https://www.mongodb.com/) - Gestor de DB
* [MongoJS](https://www.npmjs.com/package/mongojs) - Cliente DB
* [Morgan](https://www.npmjs.com/package/morgan) - Motor de registro
* [Express](https://expressjs.com/es/) - Framework

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

* **Abel Martínez** - Desarrollador - [abelmartinezfloresua](https://bitbucket.org/abelmartinezfloresua/)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles

## Expresiones de Gratitud 🎁

* Realizar este proyecto ha sido muy útil para aprender sobre muchas nuevas tecnologías y herramientas 🤓
* También ha servido para aprender a ser más autodidacta 🌟