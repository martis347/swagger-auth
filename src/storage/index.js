const storageKey = "swagger-storage";

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
          [storageKey]: items,
        },
        resolve
      );
    });
  }

  getItems() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(storageKey, (result) => {
        let value = result[storageKey];
        if (!value || !Array.isArray(value)) {
          value = [];
        }

        resolve(value);
      });
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
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  getItems() {
    const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return items;
  }
}

const getStorageProvider = () => {
  if (chrome && chrome.storage) {
    return new ChromeExtensionStorage();
  }

  return new LocalStorage();
};

window.swaggerStorageProvider = getStorageProvider();
