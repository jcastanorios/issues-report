Feature: Validar y verificar el inicio de sesión en la aplicación Ghost

    
@user1 @web
Scenario: No se diligencian los campos de email y password
  Given I am logged into the Ghost application sign in
  And I wait for 5 seconds
  When email and password fields are not filled in
  Then error message is displayed

@user2 @web
Scenario: No se diligencian el password
  Given I am logged into the Ghost application sign in
  And I wait for 5 seconds
  When password fields are not filled in
  Then error message is displayed

@user3 @web
Scenario: No se diligencian el email
  Given I am logged into the Ghost application sign in
  And I wait for 5 seconds
  When email fields are not filled in
  Then error message is displayed  

