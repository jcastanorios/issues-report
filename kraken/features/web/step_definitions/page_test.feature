Feature: Test Pages
@user4 @web
Scenario: Crear, publicar y verificar una página
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create, publish, and verify a page
  And I wait for 5 seconds 

@user5 @web
Scenario: Crear y programar una página para publicación posterior
  Given I am logged into the Ghost application
  And I wait for 2 seconds
  When I create and schedule a page for later publication
  And I wait for 5 seconds
  
@user6 @web
Scenario: Creación página en draft para un blog
  Given I am logged into the Ghost application for create page on draft
  And I wait for 6 seconds
  When I create a page on draft
  And I wait for 6 seconds
