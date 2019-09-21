<template>
  <Layout>
    <article class="my-20">
      <div class="flex mb-20" v-if="article.title != ''">
        <div class="previewImage w-1/5 sm:ml-8 sm:mr-16 ml-4 mr-8">
          <img :alt="article.title" :src="article.heroImage.file.url" />
        </div>
        <div class="w-3/5">
          <div class="mt-3 sm:text-3xl text-2xl font-bold">{{article.title}}</div>
          <div class="flex justify-between">
            <div class="my-3 text-xs text-gray-600">
              <span class>{{convertToDate(article.publishDate)}}</span>
              /
              <a href="">Comment</a>
            </div>
            <div class="social">
              <a
                target="_blank"
                class="sm:mr-6 mr-4 float-left w-4 sm:w-8"
                :href="`https://www.facebook.com/sharer/sharer.php?${facebookUrl}`"
              >
                <img src="@/assets/facebook.svg" class="social-icon" />
              </a>
              <a
                target="_blank"
                class="twitter-share-button float-left w-4 sm:w-8"
                :href="'https://twitter.com/intent/tweet?' + twitterContent + '&' + twitterHashtag + '&' + twitterUrl"
              >
                <img src="@/assets/twitter.svg" class="social-icon" />
              </a>
            </div>
          </div>

          <div class="flex flex-wrap mb-4">
            <div
              v-for="(tag, index) in article.tags"
              :key="index"
              class="tag"
              v-on:click="filterByTag(tag)"
            >{{tag}}</div>
          </div>
        </div>
      </div>

      <div v-if="markdown.length != 0" v-html="markdown" class="article-content" />
    </article>

    <vue-disqus :shortname="shortname" :identifier="article.id"></vue-disqus>
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

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Article } from "../models/article";
import { Route } from "vue-router";
import Fluid from "../components/Fluid.vue";
import marked from "marked";
import { DateHelper } from "../utility/dateHelper";
import { Constant } from "../utility/constant";

@Component({
  components: {
    Fluid
  },
  metaInfo() {
    return {
      title: `${this.$data.article.title}`,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$data.article.body
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$data.article.title },
        { property: "og:description", content: this.$data.article.body },
        // { property: "og:url", content: this.postUrl },
        // { property: "article:published_time", content: moment(this.$data.publishDate).format('YYYY-MM-DD') },
        // { property: "og:image", content: this.$data.article.heroImage.file.url },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$data.article.title },
        { name: "twitter:description", content: this.$data.article.body },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:creator", content: "@cossssmin" }
        // { name: "twitter:image", content: this.$data.article.heroImage.file.url },
      ]
    };
  }
})
export default class BlogArticle extends Vue {
  article: Article = new Article();
  articleSlug: string = "";
  markdown: string = "";
  sitePrefix = `${Constant.SiteURL}/blog/`;
  facebookUrl: string = "";
  twitterContent = "";
  twitterUrl = "";
  twitterHashtag = "";
  $page: any;
  shortname: string;

  constructor() {
    super();

    this.shortname = process.env.GRIDSOME_DISQUS_SHORTNAME;
  }

  mounted() {
    this.article = this.$page.contentfulBlogPost;
    this.markdown = marked(this.article.body);
    this.articleSlug = this.article.slug;
    this.facebookUrl = `u=${this.sitePrefix}${this.articleSlug}`;
    this.twitterUrl = `url=${this.sitePrefix}${this.articleSlug}`;
    this.twitterHashtag = `hashtags=${Constant.SocialMediaHashtag}`;
    this.twitterContent = `text=Check out the top 10 picks of ${this.article.title} at Top Trend Books!`;
  }

  convertToDate(strDate: string) {
    return DateHelper.convertToDate(strDate);
  }
}
</script>

<style scoped>
article >>> h2 {
  margin-top: 60px;
  border-bottom: 2px solid #F0F0F0;
}

article >>> ul {
  list-style: disc inside;
  margin-bottom: 1rem;
  margin-left: 2rem;
}
article >>> ul li {
  margin-bottom: 1rem;
  text-align: left;
}
.article-content >>> a {
  color: #5183f5;
  font-weight: bold;
  border-bottom: 2px solid #e6f2ff;
}
</style>

