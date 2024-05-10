Feature: Test Tags, creates, edit and delete

@user1 @web   //ya pasoooo
Scenario: Crear, y validar un tag
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create and save a tag
  And I wait for 2 seconds
  And I create, assign tag and publish a post
  And I wait for 2 seconds
  Then I validate post with tag assigned
  And I wait for 2 seconds

@user2 @web
Scenario: Borrar tag
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create and save a tag
  And I wait for 2 seconds
  Then I delete a tag
  And I wait for 2 seconds
  And I validate tag in Tag list

@user3 @web
Scenario: Unpublish a post
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I edit a post two
  And I wait for 2 seconds
  When I unpublish a post and validate as draft
  And I wait for 5 seconds
