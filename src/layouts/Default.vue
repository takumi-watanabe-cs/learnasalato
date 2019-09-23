<template>
  <div class="layout mb-10 mx-auto px-80">
    <Header />
    <div id="main">
      <slot />
    </div>
    <Footer id="footer"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
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

#main {
  min-height: calc(100vh - 250px);
}

#footer {
  background: white;
}
</style>
