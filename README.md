#Integrantes del equipo

Danna Coral                       - d.corall@uniandes.edu.co
Fabian Mauricio Quintero Castillo - f.quinteroc@uniandes.edu.co
Wilder López                      - w.lopezm@uniandes.edu.co
Juan Gonzalo Castaño Rios         - j.castanor@uniandes.edu.co

Aplicación bajo pruebas Ghost 5.14.1
Versiones para la instalación
-------------------------------------
Node   v20.11.1 | v20.12.1
Cypress Version: 13.8.1
Kraken  Version: 1.0.24
Web driver io : 8.36.1
Appium:         2.5.4
Faaker:         8.4.1

-------------------------------------

#pruebas automatizadas de sw en Kraken
1. Clonar el Repositorio: git clone <URL del Repositorio>
   
2. Navegar al Directorio Kraken:  cd kraken
   
3. Instalar Dependencias: npm install

Esto instalará todas las dependencias necesarias para ejecutar las pruebas. (npm install kraken-node, npm install android-platform-tools, npm install appium).
4. Ejecutar las Pruebas: npx kraken-node run
Este comando ejecutará todas las pruebas utilizando Kraken.

Nota: Organización de las Pruebas
Las pruebas están ubicadas en la carpeta features de Kraken. Se sugiere crear una nueva carpeta y mover las pruebas .feature allí para después ejecutarlas individualmente pegando cada prueba en la dirección kraken/features, ya que puede haber problemas al ejecutar todas las pruebas simultáneamente.

#pruebas automatizadas de sw en Cypress

Por favor seguir los siguientes pasos para reproducir las pruebas una vez clone el repositorio.
1. Clonar el repositorio
2. Ubiquese en la raiz del repositorio pruebas-automatizadas-sw
3. Abra una consola
4. En el package.json ya estan habilitadas todas las dependencias basta con ejecutar npm install
5. Ingresar a la carpeta cypress
6. una vez en la carpeta cypress digite el comando "cypress open"
7. Una vez se ejecute la app de cypress pulse en +Add Project
8. Seleccione la carpeta "pruebas-automatizadas-sw" para obtener la configuración E2E

Nota no se versionan: la carpeta node_modules, las dependencias existen en el package.json y solo basta con ejecutar el comando npm install.
