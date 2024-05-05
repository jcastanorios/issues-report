Feature: Escenario #17 - Crear un page, Modificar staff y validar los cambios en page
@user1 @web
Scenario: Como usuario inicio sesion creo un page, valido los cambios en page
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 1 seconds
  And I click login
  And I wait for 1 seconds
  And I click lista page
  Then I wait for 1 seconds 
  And I click new page
  And I enter page titulo "Nueva Pagina desde kraken - wlm3"
  And I wait for 1 seconds
  And I click lateral
  And I wait for 1 seconds
  And I click publish
  And I wait for 1 seconds
  And I click final review
  And I wait for 1 seconds
  And I click final publish post, right now
  And I wait for 1 seconds
  And I tester new page "Nueva Pagina desde kraken - wlm3"
  And I wait for 1 seconds

@user2 @web
Scenario: Como usuario inicio sesion modifico staff y valido los cambios en page
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
  Then I wait for 7 seconds
  And I enter user name "W L M"
  And I wait for 2 seconds
  And I click en save
  And I tester change name "W L M"


@user3 @web
Scenario: Como usuario inicio sesion y verifico los cambios en nombre de usuario en page
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I wait for 5 seconds
  And I click login
  And I wait for 25 seconds
  And I click lista page
  And I wait for 1 seconds
  And I verificar cambio de nombre de usuario en listado de page "W L M"
