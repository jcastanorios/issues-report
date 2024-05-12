import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot";
class PageObjectModel {
  validarEnlace() {
    cy.wait(9000);
    cy.get("div.gh-editor-post-status")
      .invoke("text")
      .then((text) => {
        expect(text.replace(/\n|\s/g, "")).to.eq("Draft-Saved");
        cy.get("a.gh-btn-editor").contains("Pages").click();
      });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_PAGE_DRAFT,
      "validar-enlace-page"
    );
  }

  filtrarInformacionPaginas() {
    cy.wait(10000);
    cy.get(
      "div.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger"
    )
      .find("span.ember-power-select-selected-item")
      .eq(4)
      .click();
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_PAGE_DRAFT,
      "filtrar-info-page"
    );
  }

  filtrarPorReciente() {
    cy.get("li.ember-power-select-option").contains("Recently updated").click();
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_PAGE_DRAFT,
      "filtrar-por-reciente"
    );
  }

  vaidarCreacionPagina() {
    return cy
      .get("li.gh-list-row.gh-posts-list-item")
      .find("h3.gh-content-entry-title")
      .first()
      .invoke("text")
      .then((text) => text);
  }
}

export default new PageObjectModel();
