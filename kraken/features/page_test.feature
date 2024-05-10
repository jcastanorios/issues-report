Feature: Test Pages Crete, Publish

@user2 @web
Scenario: Creación nuevo miembro del blog
  Given I am logged into the Ghost application for create a member
  And I wait for 2 seconds
  When I create a member
  And I wait for 5 seconds
  Then I validate member creation

@user3 @web
Scenario: Eliminación nuevo miembro del blog
  Given I am logged into the Ghost application for delete a member
  And I wait for 5 seconds
  When I delete a member
  And I wait for 5 seconds
  Then I validate member elimination


@user6 @web
Scenario: Creación página en draft para un blog
  Given I am logged into the Ghost application for create page on draft
  And I wait for 5 seconds
  When I create a page on draft
  And I wait for 9 seconds
  Then I validate page create on draft

