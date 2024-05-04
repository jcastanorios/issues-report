class MemberObjectModel {
  obtenerElementoListaMiembros() {
    return cy.get(".gh-list").find("a:first-child");
  }

  clicOpcionMenuMiembros() {
    cy.get("ul.gh-nav-list.gh-nav-manage")
      .find("li a")
      .contains("Members")
      .click();
  }

  validarAccesoPaginaMiembros() {
    return cy
      .request("https://ghost-aaej.onrender.com/ghost/#/members")
      .then((response) => response);
  }

  validarTituloSeccionMiembros() {
    return cy
      .get("h2.gh-canvas-title")
      .invoke("text")
      .then((text) => text);
  }

  /**
   * Método que permite obtener el bag que indica el total de miembros de un blog
   * @returns el elemento del DOM correspondiente al bag o pill que indica el total de miembros de un blog
   */
  obtenerTotalMiembrosBlog() {
    return cy
      .get("div.gh-nav-top")
      .find("a.active.ember-view")
      .find("span.gh-nav-member-count");
  }

  adicionarNuevoMiebro() {
    cy.get("div.view-actions-top-row")
      .find("a.ember-view.gh-btn.gh-btn-primary")
      .contains("span", "New member")
      .click();
  }

  adicionarNombreMiembro(nombre) {
    cy.get('input[id="member-name"]').blur().type(nombre);
  }

  adicionarEmailMiembro(email) {
    cy.get("div.form-group.max-width.error.ember-view")
      .find("input.ember-text-field.gh-input.ember-view")
      .type(email);
  }

  almacenarMiembroBlog() {
    cy.get("div.gh-canvas-header")
      .find("header.gh-canvas-header-content")
      .find("section.view-actions")
      .find("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view")
      .find("span")
      .contains("Save")
      .click();
  }

  obtenerBotonRetry() {
    return cy
      .get("div.gh-canvas-header")
      .find("header.gh-canvas-header-content")
      .find("section.view-actions")
      .find("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view")
      .find("span")
      .contains("Retry");
  }

  obtenerBaggedMiembros() {
    return cy
      .get("div.gh-nav-top")
      .find("a.active.ember-view")
      .find("span.gh-nav-member-count");
  }

  obtenerPrimerElementoDeListaMiembros(){
    return cy.get(".gh-list").find("a:first");
  }

  obtenerElementoDomPinon(){
    return cy.get(
      "button.gh-btn.gh-btn-icon.icon-only.gh-btn-action-icon.closed.ember-view"
    )
  }
  obtenerElementoDomDelete(){
    return cy.get("button.mr2").eq(1);
  }

  obtenerElementoDomModal(label){
    return cy.get(
      ".fullscreen-modal .modal-footer button.gh-btn.gh-btn-red.ember-view"
    ).contains(label);
  }
}

export default new MemberObjectModel();
