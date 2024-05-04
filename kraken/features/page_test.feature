Feature: Test Pages

@user1 @web
Scenario: Crear, publicar y verificar una página
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a page
  And I wait for 5 seconds

@user2 @web
Scenario: Creación nuevo miembro del blog
  Given I am logged into the Ghost application for create a member
  And I wait for 2 seconds
  When I create a member
  And I wait for 5 seconds
  Then I validate member creation

