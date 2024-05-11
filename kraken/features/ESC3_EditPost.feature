Feature: Test Post Crete, Publish

@user3 @web
Scenario: Editar un post
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I edit a post
  And I wait for 5 seconds 

