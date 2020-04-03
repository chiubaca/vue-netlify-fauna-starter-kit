<template>
  <div>
    <label class="switch">
      <input v-model="darkMode" type="checkbox" class="theme-switch" />
      <span class="slider round"> <span>🌚</span> <span>🌞</span> </span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    };
  },
  watch: {
    darkMode: function() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;
      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("data-theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("data-theme", "light");
      }
    }
  },
  beforeMount() {
    // check saved theme and apply
    localStorage.getItem("theme") === "dark"
      ? (this.darkMode = true)
      : (this.darkMode = false);
  }
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  span {
    padding: 5px;
  }
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #919191;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider {
  background-color: #b9b9b9;
}
input:checked + .slider {
  background-color: black;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
