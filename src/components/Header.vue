<template>
  <header class="flex justify-between mb-16 sm:h-20 h-10 items-center">
    <g-link to="/" class="flex items-center">
      <g-image
        class="mr-4 w-10 h-10 sm:w-16 sm:h-16"
        alt="Learn Asalato Logo"
        src="@/assets/favicon.png"
      />
      <h1 class="sm:text-lg text-sm text-gray-700">{{ $static.metadata.siteName }}</h1>
    </g-link>
    <nav class="nav">
      <g-link class="nav__link sm:text-lg text-sm sm:ml-12 ml-8" to="/articles">Articles</g-link>
      <g-link class="nav__link sm:text-lg text-sm sm:ml-12 ml-8" to="/about">About</g-link>
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Header extends Vue {}
</script>

<style scoped lang="postcss">
.nav__link {
  color: gray;
}
</style>
