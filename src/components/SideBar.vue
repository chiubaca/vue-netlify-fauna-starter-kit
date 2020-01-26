<template>
  <div class="medium-text">
    <transition name="slide">
      <nav v-if="show" id="side-bar">
        <ul class="nav-items">
          <li>
            <router-link :to="{ name: 'home' }">🏠 Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'journals' }"
              >📔 Your Journals</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'profile' }">🆔 Your Profile</router-link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </transition>

    <input id="show-nav" type="checkbox" />
    <label for="show-nav">
      <div id="hamburger-button" @click="show = !show">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path class="line line_1" d="M0 40h62c13 0 6 28-4 18L35 35"></path>
          <path class="line line_2" d="M0 50h70"></path>
          <path class="line line_3" d="M0 60h62c13 0 6-28-4-18L35 65"></path>
        </svg>
      </div>
    </label>
  </div>
</template>

<script>
import ThemeToggle from "./ThemeToggle.vue";

export default {
  name: "BurgerMenu",
  components: {
    ThemeToggle
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  display: none;
}

#hamburger-button {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 0px 0px 10px 0px;
  z-index: 5;
}

#hamburger-button:hover {
  background-color: silver;
  border-radius: 0px 0px 10px 0px;
}

// https://codepen.io/YusukeNakaya/pen/mQQPQO
.line {
  fill: none;
  stroke: black;
  stroke-width: 3px;
  transition: 500ms ease-out;

  &_1 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;

    input[type="checkbox"]:checked + label & {
      stroke-dashoffset: 26;
    }
  }

  &_2 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;
    // display: none;

    input[type="checkbox"]:checked + label & {
      stroke-dashoffset: 25;
    }
  }

  &_3 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;
    // display: none;

    input[type="checkbox"]:checked + label & {
      stroke-dashoffset: 26;
    }
  }
}

.icons svg {
  width: 30px;
  height: 30px;
  stroke: black;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: white;
}

nav {
  background-color: var(--app-background-color);
  box-shadow: 0px 2px 5px 1px #7d7d7d;
  width: 20rem;
  height: 100vh;
  position: fixed;
  z-index: 4;
}

.nav-items li {
  list-style: none;
  padding-top: 2rem;
}

#bottom-divider {
  border-bottom: 2px solid #f51c40;
  position: absolute;
  top: 50%;
  bottom: 0;
}

// Sliding animation
.slide-leave-active,
.slide-enter-active {
  transition: 0.1s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
