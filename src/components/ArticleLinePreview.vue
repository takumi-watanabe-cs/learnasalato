<template>
  <router-link :to="`/article/${article.id}`" class="py-5 flex">
    <div class="previewImage w-1/5 ml-5 mr-10">
      <img :alt="article.title" :src="article.heroImage.file.url" />
    </div>
    <div class="w-3/5">
      <div class="mt-3 text-lg font-bold">{{article.title}}</div>
      <p class="text-xs pt-2 text-gray-500">{{convertToDate(article.publishDate)}}</p>
    </div>
    <!-- <div class="tag w-1/5 mt-3">{{article.tags[0]}}</div> -->
  </router-link>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Article } from "../models/article";
import Fluid from "../components/Fluid.vue";
import { DateHelper } from '../utility/dateHelper';

@Component({
  components: {
    Fluid
  },
})
export default class Blog extends Vue {
  @Prop() article;

  constructor() {
    super();
  }

  convertToDate(strDate: string) {
    return DateHelper.convertToDate(strDate);
  }
}
</script>

<style scoped lang="postcss">
.previewImage {
  max-height: 100px;
  width: 100px;
  overflow: hidden;
  display: block;
}
.previewDate {
  text-align: right;
}

.tag {
  height: 40px;
  align-items: center;
  font-size: .80rem;
  font-weight: 500;
  padding: .5rem .75rem;
  background: #ebf1fe;
  border-radius: 4px;
  margin-right: .5rem;
  margin-bottom: .5rem;
  color: #5183f5;
  cursor: pointer;
  text-align: center;
}
</style>
