Feature: Test Pages

@user4 @web
Scenario: Creación página en draft para un blog
  Given I am logged into the Ghost application for create page on draft
  And I wait for 6 seconds
  When I create a page on draft
  And I wait for 6 seconds
