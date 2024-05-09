Feature: Escenario #16 - Crear un post, Modificar staff y validar los cambios en Post
@user1 @web
Scenario: Como usuario inicio sesion creo un post, valido los cambios en post
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a post
  And I wait for 5 seconds  
  Then I change user name staff and verify post