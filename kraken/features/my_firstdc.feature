Feature: Feature

@user1 @web
Scenario: Crear y validar nuevo tag
  Given I navigate to page "https://ghost-aaej.onrender.com/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "wilderlopezm@gmail.com"
  And I wait for 2 seconds
  And I enter password "12345678901"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  And I click tag 
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I enter tag name "Luna llena2345"
  And I wait for 2 seconds
  And I enter tag description "Aca se agrega nueva descripción para el tag"
  And I wait for 2 seconds
  And I click tag save
  And I wait for 2 seconds
  Then I click post plus
  And I wait for 2 seconds
  And I enter post title "Casa bonita2345"
  And I wait for 2 seconds
  And I enter post textarea "Aca va el texto de mi primer post con kraken"
  And I wait for 2 seconds
  And I click post settings
  And I wait for 2 seconds
  And I click tag box
  And I wait for 2 seconds
  And I enter tag value "Luna llena2345"
  And I wait for 2 seconds
  And I click tag selected
  And I wait for 2 seconds
  And I click post settings
  And I wait for 2 seconds
  And I click publish button
  And I wait for 2 seconds
  And I click continue publishing button
  And I wait for 2 seconds
  And I click publish right now button
  And I wait for 2 seconds
  And I click back to editor button
  And I wait for 2 seconds
  And I click post button to return to dashboard
  And I wait for 2 seconds
  And I click all tags select
  And I wait for 2 seconds
  And I click to select the tag
  And I wait for 2 seconds
  And I find the element inside the post