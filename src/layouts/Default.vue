<template>
  <div class="layout mb-10 mx-auto px-80">
    <Header />
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class Deafult extends Vue {
  constructor() {
    super();
  }
}
</script>

<style scoped lang="postcss">
.layout {
  margin: 0 auto;
  max-width: 50rem;
}

.nav__link {
  color: gray;
}
</style>
