<template>
  <div class="preview">
    <router-link :to="`/article/${article.id}`">
      <div class="previewImage">
        <Fluid :alt="article.title" :src="article.heroImage.file.url"/>
      </div>
      <div class="previewTitle">{{article.title}}</div>
      <p>{{article.description}}</p>
      <p/>
    </router-link>
    <div class="previewDate">
      <small class="previewDate">{{convertToDate(article.publishDate)}}</small>
    </div>
  </div>
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

<style scoped>
.preview {
  padding-bottom: 1rem;
}
.previewTitle {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.previewImage {
  max-height: 200px;
  overflow: hidden;
  display: block;
  width: 100%;
}
.previewDate {
  text-align: right;
}

.tag {
  color: #a0a0a0;
  text-decoration: none;
  display: inline-block;
  padding: 0.33333rem 0.5rem;
  line-height: 1;
  border-radius: 2px;
  border: 1px solid #a0a0a0;
  margin-right: 0.5em;
}
</style>
