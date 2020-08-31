<template>
  <div class="tooltip">
    <slot></slot>
    <span :class="position" class="tooltip-text">{{text}}</span>
  </div>
</template>

<script>
module.exports = {
  props: {
    position: String,
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  width: 240px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 15px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-text.right {
  margin-left: -230px;
}

.tooltip-text.left {
  margin-left: 0px;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip-text.left::after {
  left: 5%;
}

.tooltip-text.right::after {
  left: 95%;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>