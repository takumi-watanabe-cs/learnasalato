require("@/css/reset.css");
require("@/css/markdown.css");
require("@/css/global.css");

import DefaultLayout from '~/layouts/Default.vue'
import VueDisqus from 'vue-disqus'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(VueDisqus)
}
