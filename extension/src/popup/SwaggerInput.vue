<template>
  <div class="group">
    <div class="input-group">
      <textarea
        v-if="isTextarea"
        class="input"
        rows="2"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      ></textarea>
      <input
        v-else
        rows="2"
        class="input"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>
        {{ label }}
        <span v-if="required" class="star">*</span>
      </label>
    </div>
    <info-icon v-if="tooltipText" class="icon" :text="tooltipText"></info-icon>
  </div>
</template>

<script>
module.exports = {
  components: {
    "info-icon": window.httpVueLoader("InfoIcon.vue"),
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: String,
    tooltipText: String,
    isTextarea: Boolean,
    required: Boolean,
  },
};
</script>

<style scoped>
.group {
  margin-bottom: 35px;
  position: relative;
  display: flex;
}

.input-group {
  width: 100%;
}

.icon {
  margin-left: 16px;
  align-self: flex-end;
  margin-bottom: -6px;
}

.input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.54);
  display: block;
  font-size: 16px;
  padding-bottom: 5px;
  width: 100%;
}

.star {
  color: red;
}

label {
  color: rgba(0, 0, 0, 0.54);
  pointer-events: none;
  position: absolute;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.input:focus {
  outline: none;
}

.input ~ label {
  font-size: 12px;
  top: -20px;
}

.input:focus ~ label {
  color: #89bf04;
}

.input:focus ~ .bar:before,
.input:focus ~ .bar:after {
  width: 50%;
}

.input:focus ~ .highlight {
  animation: textareaHighlighter 0.3s ease;
  -webkit-animation: textareaHighlighter 0.3s ease;
  -moz-animation: textareaHighlighter 0.3s ease;
}

.bar {
  display: block;
  position: relative;
  width: 100%;
}

.bar:before,
.bar:after {
  background: #89bf04;
  bottom: 1px;
  content: "";
  height: 2px;
  position: absolute;
  transition: 0.2s ease all;
  width: 0;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

@-webkit-keyframes textareaHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes textareaHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes textareaHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>
