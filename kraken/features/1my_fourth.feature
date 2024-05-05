Feature: Feature

@user1 @web
Scenario: Unpublish a post
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I wait for 2 seconds
  And I enter password "12345678901"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I click post plus
  And I wait for 2 seconds
  And I enter post title "Equipo99"
  And I wait for 2 seconds
  And I enter post textarea "Aca va el texto de mi primer post con kraken"
  And I wait for 2 seconds
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
  And I click unpublish post
  And I wait for 2 seconds
  And I click unpublish and revert button
  And I wait for 2 seconds
  And I validate draft message
  And I wait for 2 seconds
  And I click post button to return to dashboard
  And I wait for 2 seconds
  And I click draft
  And I wait for 2 seconds
  And I find the element inside the draft
