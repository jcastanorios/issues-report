Feature: Escenario #19 - Crear un page, y verificar que este publicado en borrador
@user1 @web
Scenario: Como usuario inicio sesion creo un page, valido los cambios en page
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, draft, and verify a page
  And I wait for 5 seconds  
