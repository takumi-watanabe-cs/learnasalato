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
  metaInfo() {
    return {
      title: `${this.$page.contentfulBlogPost.title}`,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$page.contentfulBlogPost.description
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.contentfulBlogPost.title },
        { property: "og:description", content: this.$page.contentfulBlogPost.description },
        { property: "og:url", content: `${Constant.SiteURL}/${this.$page.contentfulBlogPost.id}` },
        { property: "article:published_time", content: moment(this.$page.contentfulBlogPost.publishDate).format('YYYY-MM-DD') },
        { property: "og:image", content: this.$page.contentfulBlogPost.heroImage.file.url },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.contentfulBlogPost.title },
        { name: "twitter:description", content: this.$page.contentfulBlogPost.description },
        { name: "twitter:site", content: Constant.TwitterSite },
        { name: "twitter:creator", content: Constant.TwitterCreator },
        { name: "twitter:image", content: this.$page.contentfulBlogPost.heroImage.file.url },
      ]
    };
  },
}
</script>

<style scoped>
</style>

