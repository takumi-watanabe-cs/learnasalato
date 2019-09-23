<template>
  <Layout>
    <ArticleContent :article="$page.contentfulBlogPost" />
  </Layout>
</template>

<page-query>
query Index($id: ID!) {
  contentfulBlogPost (id: $id){
    id
    title
    slug
    heroImage {
      description
      file {
        fileName
        url
      }
    }
    description
    body
    publishDate
    tags
  }
}
</page-query>

<script>
import { Article } from "@/models/article";
import ArticleContent from "@/components/ArticleContent.vue";
import marked from "marked";
import { DateHelper } from "@/utility/dateHelper";
import { Constant } from "@/utility/constant";
import * as moment from 'moment'

export default {
  components: {
    ArticleContent
  },
  data() {
    return {
      article: this.$root.$page.contentfulBlogPost
    }
  },
  metaInfo() {
    return {
      title: `${this.article.title}`,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.article.description
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: this.article.title },
        { property: "og:description", content: this.article.description },
        { property: "og:url", content: `${Constant.SiteURL}/${this.article.id}` },
        { property: "article:published_time", content: moment(this.article.publishDate).format('YYYY-MM-DD') },
        { property: "og:image", content: this.article.heroImage.file.url },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.article.title },
        { name: "twitter:description", content: this.article.description },
        { name: "twitter:site", content: Constant.TwitterSite },
        { name: "twitter:creator", content: Constant.TwitterCreator },
        { name: "twitter:image", content: this.article.heroImage.file.url },
      ]
    };
  },
}
</script>

<style scoped>
</style>

