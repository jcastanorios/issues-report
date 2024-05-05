Feature: Escenario #20 - Crear un tag, y asignarle a un page
@user1 @web
Scenario: Como usuario inicio sesion creo un tag
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I click login
  And I click lista tag
  Then I wait for 1 seconds 
  And I click new tag
  And I wait for 1 seconds
  And I enter tag titulo "TagBS2"
  And I wait for 1 seconds
  And I enter tag color "7a0000"
  And I enter tag descripcion "Tag de prueba desde Kraken"
  And I wait for 1 seconds
  And I click save
  And I wait for 1 seconds

@user2 @web
Scenario: Como usuario inicio sesion creo un nuevo post y asocio el nuevo tag creado
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#signin"
  And I wait for 1 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I enter password "12345678901"
  And I click login
  And I click post
  And I wait for 20 seconds
  And I click new post
  Then I wait for 1 seconds 
  And I enter post titulo "Nuevo Post desde kraken con tag"  
  And I wait for 1 seconds
  And I click lateral
  And I wait for 1 seconds
  And I asignar tag post "TagBS2"
  And I wait for 5 seconds
  And I click lateral
  And I click publish
  And I wait for 1 seconds
  And I click final review
  And I wait for 1 seconds
  And I click final publish post, right now
  And I wait for 1 seconds
  And I tester new post "Nuevo Post desde kraken con tag"
  And I wait for 1 seconds
