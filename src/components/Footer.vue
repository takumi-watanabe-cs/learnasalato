<template>
  <footer class="mx-auto mt-6">
    <g-link to="/">
      <div class="flex items-center">
        <img class="w-10 mr-4" alt="Dev Up" src="@/assets/favicon.png" />
        <span class="font-bold text-sm text-gray-700">{{ $static.metadata.siteName }}</span>
        <p class></p>
      </div>
    </g-link>
    <p class="copyright text-sm">Copyright © 2019 - {{ $static.metadata.siteName }}</p>
  </footer>
</template>

<static-query>
query {
  metadata {
    siteName
    description
  }
}
</static-query>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Footer extends Vue {}
</script>

<style scoped lang="postcss">
.copyright {
  display: inline-block;
  position: relative;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>
