const requestsStorageKey = "swagger-storage";
const quickNavigationStorageKey = "swagger-storage-quick-navigation";

class ChromeExtensionStorage {
  async addItem(request) {
    const items = await this.getItems();
    items.push(request);

    await this.updateItems(items);
  }

  async removeItem(name) {
    let items = await this.getItems();
    items = items.filter((i) => i.name !== name);

    await this.updateItems(items);
  }

  async updateItems(items) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(
        {
          [requestsStorageKey]: items,
        },
        resolve
      );
    });
  }

  getItems() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(requestsStorageKey, (result) => {
        let value = result[requestsStorageKey];
        if (!value || !Array.isArray(value)) {
          value = [];
        }

        resolve(value);
      });
    });
  }

  getIsQuickNavigationCollapsed() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(quickNavigationStorageKey, (result) => {
        const value = result[quickNavigationStorageKey];

        resolve(!!value);
      });
    });
  }

  updateIsQuickNavigationCollapsed(state) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(
        {
          [quickNavigationStorageKey]: state,
        },
        resolve
      );
    });
  }
}

class LocalStorage {
  addItem(request) {
    const items = this.getItems();
    items.push(request);

    this.updateItems(items);
  }

  removeItem(name) {
    let items = this.getItems();
    items = items.filter((i) => i.name !== name);

    this.updateItems(items);
  }

  updateItems(items) {
    localStorage.setItem(requestsStorageKey, JSON.stringify(items));
  }

  getItems() {
    const items = JSON.parse(localStorage.getItem(requestsStorageKey) || "[]");
    return items;
  }

  getIsQuickNavigationCollapsed() {
    localStorage.getItem(quickNavigationStorageKey) === "true";
  }

  updateIsQuickNavigationCollapsed(state) {
    localStorage.setItem(quickNavigationStorageKey, `${state}`);
  }
}

const getStorageProvider = () => {
  if (chrome && chrome.storage) {
    return new ChromeExtensionStorage();
  }

  return new LocalStorage();
};

window.swaggerStorageProvider = getStorageProvider();
