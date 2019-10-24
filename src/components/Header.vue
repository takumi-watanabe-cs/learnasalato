<template>
  <header class="flex justify-between mb-16 sm:h-20 h-10 items-center">
    <g-link to="/" class="flex items-center">
      <img
        class="mr-6 w-10 h-10 sm:w-16 sm:h-16"
        alt="Learn Asalato Logo"
        src="../assets/favicon.png"
      />
      <h1 class="sm:text-xl text-sm text-gray-700">{{ $static.metadata.siteName }}</h1>
    </g-link>
    <nav class="nav">
      <g-link class="nav__link sm:text-lg text-sm sm:ml-12 ml-8" to="/tricks">Tricks</g-link>
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

<style scoped lang="postcss">
.nav__link {
  color: gray;
}
</style>
