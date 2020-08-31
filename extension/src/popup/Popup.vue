<template>
  <div>
    <div class="header">
      <h2>Swagger Authentication</h2>
    </div>
    <div class="list">
      <list-item
        v-for="request in requestsList"
        :key="request.name"
        :request="request"
        @remove="removeRequest"
      ></list-item>
    </div>
    <div class="form">
      <swagger-input
        required
        label="Name"
        tooltip-text="That's how this request template will be named. Names must be unique."
        v-model="requestName"
      ></swagger-input>
      <swagger-input
        required
        label="Request endpoint"
        v-model="requestEndpoint"
        tooltip-text="Authorization request endpoint"
      ></swagger-input>
      <swagger-input
        required
        is-textarea
        label="Request body"
        v-model="requestBody"
        tooltip-text="Authorization request body content"
      ></swagger-input>
      <swagger-input
        required
        label="Authorization header schema"
        v-model="authorizationSchema"
        tooltip-text="Authorization request header schema (Hyarchis, Bearer, ...)"
      ></swagger-input>
      <swagger-input
        required
        label="Authorization session accessor"
        placeholder="some.object[0].sessionId"
        tooltip-text="Path to access authorization response value that should be used for further requests in Swagger"
        v-model="authorizationSessionAccessor"
      ></swagger-input>
      <swagger-input
        label="Effective Urls"
        is-textarea
        :placeholder="`*localhost*,
https://dev2-hdmapi.azurewebsites.net/*`"
        tooltip-text="Optional comma-separated field indicating at what Urls in Swagger this template should be included. If left empty - it will be included everywhere."
        v-model="effectiveUrls"
      ></swagger-input>
    </div>
    <button :class="{ enabled: enableButton }" @click="addRequest">Add</button>
  </div>
</template>

<script>
const defaultBody = `{
  "username": "admin",
  "password": "doc123"
}`;
const effectiveUrls = `{
  "username": "admin",
  "password": "doc123"
}`;
const defaultEndpoint = "/v1/authorization/login";
const defaultAuthorizationSchema = "Hyarchis";
const defaultAuthorizationSessionAccessor = "sessionId";

module.exports = {
  props: ["storageProvider"],
  components: {
    "list-item": window.httpVueLoader("ListItem.vue"),
    "swagger-input": window.httpVueLoader("SwaggerInput.vue"),
  },
  data: function () {
    return {
      requestsList: [],
      requestName: "",
      requestBody: defaultBody,
      requestEndpoint: defaultEndpoint,
      authorizationSchema: defaultAuthorizationSchema,
      authorizationSessionAccessor: defaultAuthorizationSessionAccessor,
      effectiveUrls: "",
    };
  },
  async mounted() {
    this.requestsList = await this.storageProvider.getItems();
  },
  computed: {
    enableButton() {
      return (
        !this.requestsList.some(
          (r) => r.name.toLowerCase() === this.requestName.toLowerCase()
        ) &&
        this.requestName &&
        this.requestBody &&
        this.requestEndpoint &&
        this.authorizationSchema &&
        this.authorizationSessionAccessor
      );
    },
  },
  methods: {
    async addRequest() {
      if (!this.enableButton) {
        return;
      }

      await this.storageProvider.addItem({
        name: this.requestName,
        body: this.requestBody,
        endpoint: this.requestEndpoint,
        schema: this.authorizationSchema,
        sessionAccessor: this.authorizationSessionAccessor,
        effectiveUrls: this.effectiveUrls,
      });
      this.requestsList = await this.storageProvider.getItems();
      this.requestName = "";
    },
    async removeRequest(name) {
      await this.storageProvider.removeItem(name);
      this.requestsList = await this.storageProvider.getItems();
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #89bf04;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  color: #fff;
  padding: 0 16px;
  width: 100%;
}

h2 {
  font-weight: 400;
  margin: 0;
  padding: 0.83em 0;
}

.list {
  margin: 16px 8px;
  padding-left: 4px;
}

.form {
  margin-top: 50px;
  padding: 0 16px;
}

.divider {
  border-bottom: 1px solid lightgray;
}

button {
  background: #dfdfdf;
  border: 0;
  color: #fff;
  cursor: not-allowed;
  display: block;
  font-size: 18px;
  margin: 20px auto;
  padding: 10px;
  transition: all 0.4s;
  width: 100px;
}

button.enabled {
  background: #89bf04;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.26);
  cursor: pointer;
}
</style>