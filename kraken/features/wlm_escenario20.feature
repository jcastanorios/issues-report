Feature: Escenario #20 - Crear un tag, y asignarle a un page
@user1 @web
Scenario: Como usuario inicio sesion creo un tag
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, assign tag and publish a page
  And I wait for 5 seconds  
