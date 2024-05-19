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

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Implementación de Escenarios en Kraken y Cypress para pruebas de regresión visual

El Release 2 de este proyecto incluye la implementación de 40 escenarios automatizados tomando screenshots utilizando las herramientas Kraken y Cypress.  

En Cypress, las capturas de pantalla se han organizado en la carpeta cypress/screenshot, donde cada captura está asociada al escenario correspondiente. 

Para Kraken, se sigue un enfoque similar. Las capturas de pantalla se almacenan en una carpeta llamada screenshots. 

Además, se ha integrado la versión 4 de Ghost para ejecutar 10 escenarios específicos. Estos escenarios se encuentran detallados en los archivos ALL-ESC-GHOST_V4.cy.js, ALL2-ESC-GHOST_V4.cy.js y ALL3-ESC-GHOST_V4.cy.js. Al ejecutar estos archivos en Cypress, se podrá visualizar la ejecución de los 15 escenarios sobre esta versión específica de la aplicación. 

Para acceder al reporte generado por Backstop, se debe navegar a través de la siguiente ruta: PRUEBAS-AUTOMATIZADAS-SW/VRT/Backstop_Final_Ghost/Backstop_data/html_report/index.html. Se recomienda abrir este archivo en Google Chrome. Dentro del reporte, se pueden explorar detalladamente las pantallas correspondientes a cada uno de los escenarios del 1 al 5 para una revisión exhaustiva. 

Para acceder al reporte de Resemble, se debe navegar a la siguiente ruta: PRUEBAS-AUTOMATIZADAS-SW/pruebas-automatizadas-sw/VRT/Resemble/compare-images 

En este directorio se encuentran tres directorios que son: 

- imgs-ghost-version-4: imágenes a comparar generadas en la versión 4 de ghost 

- imgs-ghost-version-5: imágenes a comparar generadas en la versión 5 de ghost 

- resultado: imágenes resultado de la comparación 

Es importante mencionar que la cantidad de imágenes en ambos directorios tanto para la versión 4 como para la versión 5 deben ser iguales en nombre y cantidad. 

Una vez almacenadas las imágenes en las carpetas de cada versión, si se requiere ejecutar la comparación de imágenes y generación del informe, se debe digitar el comando > node g9.regresion.visual  

----------------------------------------------------------------------------------------------------------------------------------------
### Entrega Semana 7

## Instrucciones para ejecución de pruebas:

1. Clonar el repositorio.
2. Dirígete a la raíz del repositorio "pruebas-automatizadas-sw".
3. Abre una consola en esa ubicación.
4. En el archivo "package.json" ya están habilitadas todas las dependencias, simplemente ejecuta `npm install`.
5. Ingresa a la carpeta "cypress".
6. Una vez dentro de la carpeta "cypress", ejecuta el comando "cypress open" en la consola.
7. Cuando se abra la aplicación de Cypress, haz clic en "+Add Project".
8. Selecciona la carpeta "pruebas-automatizadas-sw" para cargar la configuración E2E.
9. Dentro de la carpeta "E2E" encontrarás dos subcarpetas: "Semanas Anteriores" y "Semana 7".
10. En "Semanas Anteriores" están las pruebas implementadas en semanas pasadas, incluyendo versiones anteriores de Ghost. En "Semana 7" encontrarás la entrega de esta semana.
11. Dentro de "Semana 7" están las pruebas para cada estrategia de generación de datos: Apriori, aleatoria y pseudo-aleatoria.
12. Para ejecutar las pruebas, simplemente ingresa a cada una de esas carpetas desde la herramienta de Cypress y ejecuta cada prueba individualmente.

Nota no se versionan: la carpeta node_modules, las dependencias existen en el package.json y solo basta con ejecutar el comando npm install.
