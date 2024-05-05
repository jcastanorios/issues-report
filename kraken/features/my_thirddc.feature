Feature: Borrar un tag

@user1 @web
Scenario: Crear, borrar y validar un tag
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I wait for 2 seconds
  And I enter password "12345678901"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I click tag
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I enter tag name 3 "Carroza223"
  And I wait for 2 seconds
  And I enter tag description "Mi nueva carreta"
  And I wait for 2 seconds
  And I click tag save 3
  And I wait for 2 seconds
  And I click tag
  And I wait for 2 seconds
  And I click to select the tag 3
  And I wait for 2 seconds
  And I click delete tag button
  And I wait for 2 seconds
  And I click confirm delete tag button
  And I wait for 2 seconds
  And I validate tag was deleted
  And I wait for 2 seconds
  And I click post
  And I wait for 2 seconds
  And I click all tags select
  And I wait for 2 seconds
  And I find the deleted tag