<template>
  <div class="layout mb-10 mx-auto px-80">
    <header class="flex justify-between mb-16 sm:h-20 h-10 items-center">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link sm:text-lg text-sm sm:ml-12 ml-8" to="/">Home</g-link>
        <g-link class="nav__link sm:text-lg text-sm sm:ml-12 ml-8" to="/about/">About</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style scoped lang="postcss">
.layout {
  margin: 0 auto;
  max-width: 50rem;
}

.nav__link {
  color: gray
}
</style>
