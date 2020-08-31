const componentsPrefix = "swagger-auth-";

const buttonsContainerClass = `${componentsPrefix}buttons-container`;
const buttonClass = `${componentsPrefix}button`;
const spinnerClass = `${componentsPrefix}button-spinner`;
const buttonIdPrefix = `${componentsPrefix}button-`;
const buttonId = (id) => `${buttonIdPrefix}${id}`;

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
}

window.SwaggerDomHandler = DomHandler;
