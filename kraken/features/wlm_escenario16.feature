Feature: Escenario #16 - Crear un post, Modificar staff y validar los cambios en Post
@user1 @web
Scenario: Como usuario inicio sesion creo un post, valido los cambios en post
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I wait for 1 seconds
  And I enter password "12345678901"
  And I wait for 1 seconds
  And I click login
  And I wait for 1 seconds
  And I click post
  And I wait for 1 seconds
  And I click new post
  Then I wait for 1 seconds 
  And I enter post titulo "Nuevo Post desde kraken - wlm4 14:15"
  And I wait for 1 seconds
  And I click lateral
  And I wait for 1 seconds
  And I click publish
  And I wait for 1 seconds
  And I click final review
  And I wait for 1 seconds
  And I click final publish post, right now
  And I wait for 1 seconds
  And I tester new post "Nuevo Post desde kraken - wlm4 14:15"
  And I wait for 1 seconds

@user2 @web
Scenario: Como usuario inicio sesion modifico staff y valido los cambios en post
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 1 seconds
  And I click login
  And I wait for 2 seconds
  And I clic en configuracion
  And I clic en configuracion staff
  And I clic en configuracion staff wilder
  Then I wait for 10 seconds
  And I enter user name "Wiler López"
  And I wait for 2 seconds
  And I click en save
  And I tester change name "Wiler López"

@user3 @web
Scenario: Como usuario inicio sesion y verifico los cambios en nombre de usuario en el post
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 1 seconds
  And I click login
  And I wait for 2 seconds
  And I click post
  Then I wait for 30 seconds
  And I verificar cambio de nombre de usuario en listado de post "Wiler López"
