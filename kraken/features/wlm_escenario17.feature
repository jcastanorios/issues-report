Feature: Escenario #17 - Crear un page, Modificar staff y validar los cambios en page
@user1 @web
Scenario: Como usuario inicio sesion creo un page, modifico el nombre de usuario y valido los cambios en page
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a page
  And I wait for 5 seconds  
  Then I change user name staff and verify page
