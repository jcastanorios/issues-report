Feature: Test Post Crete, Publish

@user1 @web
Scenario: Crear, publicar y verificar un post
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a post
  And I wait for 5 seconds 