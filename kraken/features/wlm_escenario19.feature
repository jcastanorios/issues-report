Feature: Escenario #19 - Crear un page, y verificar que este publicado en borrador
@user1 @web
Scenario: Como usuario inicio sesion creo un page
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I click login
  And I click lista page
  Then I wait for 1 seconds 
  And I click new page
  And I enter page titulo "Nueva Pagina desde kraken - borrador3"
  And I wait for 1 seconds
  And I click lateral
  And I wait for 5 seconds
  And I click page para cerrar

@user2 @web
Scenario: Como usuario inicio sesion y verificó que exista la nueva página en borrador
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 3 seconds
  And I click login
  Then I wait for 15 seconds
  And I click lista page
  And I tester new page "Nueva Pagina desde kraken - borrador3"
  And I wait for 1 seconds
