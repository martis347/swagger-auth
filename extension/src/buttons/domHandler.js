const componentsPrefix = "swagger-auth-";

const buttonsContainerClass = `${componentsPrefix}buttons-container`;
const buttonClass = `${componentsPrefix}button`;
const spinnerClass = `${componentsPrefix}button-spinner`;
const buttonIdPrefix = `${componentsPrefix}button-`;
const buttonId = (id) => `${buttonIdPrefix}${id}`;

const quickNavigationContainerClass = `${componentsPrefix}quick-navigation-container`;
const quickNavigationButtonClass = `${componentsPrefix}quick-navigation-button`;

const collapseIconClass = `${componentsPrefix}collapse-icon`;
const collapseIconCollapseClass = `collapsed`;
const collapseIcon = `<svg class="${collapseIconClass}" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z" class=""></path></svg>`;

class DomHandler {
  get buttonsContainer() {
    return document.querySelector(`.${buttonsContainerClass}`);
  }

  clearButtonsContainer() {
    const container = this.buttonsContainer;
    if (container) {
      container.remove();
    }

    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="${buttonsContainerClass}"></div>`
    );
  }

  addButtonToButtonsContainer({ name, clickHandler }) {
    const container = this.buttonsContainer;
    container.insertAdjacentHTML(
      "beforeend",
      `<button class="${buttonClass}" type="button" id="${buttonId(
        name
      )}">Authorize <span>${name}</span></button>`
    );

    const button = document.getElementById(buttonId(name));
    button.onclick = (event) => {
      const id = event.currentTarget.id.replace(buttonIdPrefix, "");
      clickHandler(id);
    };
  }

  changeButtonStatus(name, status) {
    const button = document.getElementById(buttonId(name));

    button.classList.remove("error");
    button.classList.remove("active");
    button.classList.remove("loading");
    const loader = document.querySelector(`.${spinnerClass}`);
    if (loader) {
      loader.remove();
    }

    if (status === "loading") {
      button.insertAdjacentHTML(
        "beforeend",
        `<div class="${spinnerClass}">Signing in...</div>`
      );
    }

    if (status === "active") {
      const buttons = document.getElementsByClassName(buttonClass);
      for (const b of buttons) {
        b.classList.remove("active");
      }
    }

    button.classList.add(status);
  }

  authenticate(headerValue) {
    document.getElementsByClassName("authorize")[0].click();

    const logoutButton = [...document.querySelectorAll("button")].find(
      (v) => v.innerText === "Logout"
    );
    if (logoutButton) {
      logoutButton.click();
    }

    const textInput = document.getElementsByTagName("input")[0];
    const prototype = Object.getPrototypeOf(textInput);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    ).set;
    prototypeValueSetter.call(textInput, headerValue);
    textInput.dispatchEvent(new Event("input", { bubbles: true }));

    const authorizeButton = document.querySelector("button.button");
    authorizeButton.click();

    const closeButton = document.querySelector("button.btn-done");
    closeButton.click();
  }

  getHeadersData() {
    const headers = [...document.querySelectorAll("[id^=operations-tag-]")];
    const headersData = headers.map((h) => ({
      name: h.id.replace("operations-tag-", ""),
      href: `#${h.id}`,
    }));

    return headersData;
  }

  wait(seconds) {
    return new Promise((r) => setTimeout(r, seconds * 1000));
  }

  addCollapseIconHandlers(isCollapsed, onCollapse) {
    const [collapseIcon] = document.getElementsByClassName(collapseIconClass);
    const [quickNavigationContainer] = document.getElementsByClassName(
      quickNavigationContainerClass
    );
    if (isCollapsed) {
      quickNavigationContainer.classList.add(collapseIconCollapseClass);
    }

    collapseIcon.onclick = () => {
      quickNavigationContainer.classList.toggle(collapseIconCollapseClass);
      const newCollapsedState = quickNavigationContainer.classList.contains(
        collapseIconCollapseClass
      );
      onCollapse(newCollapsedState);
    };
  }

  displayQuickNavigation(isCollapsed, onCollapse) {
    return new Promise(async (resolve) => {
      let headersData = [];
      let retriesCount = 0;
      while (headersData.length === 0 && retriesCount < 10) {
        await this.wait(1);
        retriesCount++;
        headersData = this.getHeadersData();
      }

      const headersComponents = headersData
        .map(
          (h) =>
            `<a class="${quickNavigationButtonClass}" href="${h.href}">${h.name}</a>`
        )
        .join("\r\n");

      document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="${quickNavigationContainerClass}">
          ${collapseIcon}
          ${headersComponents}
        </div>`
      );

      this.addCollapseIconHandlers(isCollapsed, onCollapse);
      resolve();
    });
  }
}

window.SwaggerDomHandler = DomHandler;
