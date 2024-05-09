Feature: Escenario #18 - Crear un post, y verificar que este publicado en borrador
@user1 @web
Scenario: Como usuario inicio sesion creo un post, valido los cambios en post
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, draft, and verify a post
  And I wait for 5 seconds  
