Feature: Escenario #18 - Crear un post, y verificar que este publicado en borrador
@user1 @web
Scenario: Como usuario inicio sesion creo un post
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I click login
  And I click lista post
  Then I wait for 1 seconds 
  And I click new post
  And I enter post titulo "Nuevo post desde kraken - borrador2"
  And I wait for 1 seconds
  And I click lateral
  And I wait for 5 seconds
  And I click post para cerrar

@user2 @web
Scenario: Como usuario inicio sesion y verifico que exista la nueva página en borrador
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 3 seconds
  And I click login
  Then I wait for 15 seconds
  And I click lista post borrador
  Then I wait for 3 seconds
  And I tester new post "Nuevo post desde kraken - borrador2"
  And I wait for 1 seconds
