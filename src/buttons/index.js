class ButtonsHandler {
  constructor(storageProvider) {
    this.storageProvider = storageProvider;
    this.domHandler = new window.SwaggerDomHandler();
  }

  async initialize() {
    const requests = await this.storageProvider.getItems();
    const matchingRequests = requests.filter(this.requestMatchesEffectiveUrl);
    this.requests = matchingRequests;
    this.domHandler.clearButtonsContainer();
    for (const request of this.requests) {
      this.domHandler.addButtonToButtonsContainer({
        name: request.name,
        clickHandler: (id) => this.handleAuthenticationButtonClick(id),
      });
    }
  }

  requestMatchesEffectiveUrl(request) {
    const urls = request.effectiveUrls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => !!url);
    if (urls.length === 0) {
      return true;
    }

    return urls.some((url) =>
      window.location.href.match(url.replace("*", ".*"))
    );
  }

  async handleAuthenticationButtonClick(name) {
    const request = this.requests.find((r) => r.name === name);
    if (!request) {
      return;
    }

    this.domHandler.changeButtonStatus(name, "loading");
    const authenticationData = await this.getAuthenticationData(request);
    if (authenticationData) {
      this.domHandler.authenticate(`${request.schema} ${authenticationData}`);
      this.domHandler.changeButtonStatus(name, "active");
    } else {
      this.domHandler.changeButtonStatus(name, "error");
    }
  }

  async getAuthenticationData({ body, endpoint, sessionAccessor }) {
    try {
      const response = await fetch(`${window.location.origin}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        console.log("Failed to sign in!");
        return undefined;
      }

      const data = await response.json();
      const extractedData = eval(`data.${sessionAccessor}`);

      return extractedData;
    } catch (error) {
      console.log("An error has occured while signing in!", error);
    }
  }
}

window.SwaggerButtonsHandler = ButtonsHandler;
