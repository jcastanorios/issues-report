Feature: Feature

@user1 @web
Scenario: Editar tag y validar
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
  And I click the element inside the tag 2
  And I wait for 2 seconds
  And I enter tag name 2 "Yellow"
  And I wait for 2 seconds
  And I click tag save
  And I wait for 2 seconds
  And I click tag
  And I wait for 2 seconds
  And I click to select the tag 2