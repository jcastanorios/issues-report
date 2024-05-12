Feature: My feature

@user1 @web
Scenario: Crear draft de pages y publicarlo
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I wait for 2 seconds
  And I enter password "12345678901"
  And I wait for 2 seconds
  And I click next
  And I wait for 2 seconds
  Then I click pages
  And I wait for 2 seconds
  And I click new pages button
  And I wait for 2 seconds
  And I enter pages title "Marco polo"
  And I wait for 2 seconds
  And I enter pages textarea "cualquier cosa"
  And I click pages
  And I wait for 7 seconds
  And I click the element inside the page
  And I click publish button
  And I wait for 2 seconds
  And I click continue publishing button
  And I wait for 2 seconds
  And I click publish right now button
  And I wait for 2 seconds
  And I validate publish message confirmation
  And I wait for 2 seconds
  And I click back to editor button
  And I wait for 2 seconds
  And I click pages
  And I wait for 2 seconds
  And I click all pages select
  And I wait for 2 seconds
  And I click to select the option inside all pages
  And I wait for 2 seconds
  And I find the element inside the pages published








