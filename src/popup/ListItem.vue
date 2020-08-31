<template>
  <div class="wrapper">
    <span @click="$emit('remove', request.name)" class="remove-button"></span>
    <tooltip :text="this.request.body" position="left">
      <span>{{request.name}}</span>
    </tooltip>
  </div>
</template>

<script>
module.exports = {
  components: {
    tooltip: window.httpVueLoader("Tooltip.vue"),
  },
  props: {
    request: {
      name: String,
      endpoint: String,
      body: String,
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 8px;
}

.remove-button {
  cursor: pointer;
  width: 17px;
  height: 17px;
  padding: 8px;
  margin: 7px;
  opacity: 0.5;
}

.remove-button:hover {
  opacity: 1;
}

.remove-button:before,
.remove-button:after {
  position: absolute;
  left: 22px;
  content: " ";
  height: 18px;
  width: 2px;
  background-color: red;
}

.remove-button:before {
  transform: rotate(45deg);
}
.remove-button:after {
  transform: rotate(-45deg);
}
</style>