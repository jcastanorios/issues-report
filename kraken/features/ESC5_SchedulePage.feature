Feature: Test Pages Crete, Publish

@user5 @web
Scenario: Crear y programar una página para publicación posterior
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create and schedule a page for later publication
  And I wait for 5 seconds