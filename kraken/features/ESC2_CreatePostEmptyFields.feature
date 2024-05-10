Feature: Test Post Crete, Publish

@user2 @web
Scenario: Crear, publicar y verificar una post vacío
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a post with empty fields
  And I wait for 5 seconds 
