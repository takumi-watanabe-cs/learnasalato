<template>
  <Layout>
    <article class="my-20">
      <div class="flex flex-wrap items-center mb-20 sm:mx-8 " v-if="article.title != ''">
        <div class="previewImage sm:w-1/3 w-full sm:pr-8">
          <g-image :alt="article.title" :src="article.heroImage.file.url" />
        </div>
        <div class="sm:w-2/3 w-full">
          <div class="mt-3 sm:text-3xl text-2xl font-bold">{{article.title}}</div>
          <div class="my-3 flex items-center">
            <div class="text-xs text-gray-600">
              <span class>{{convertToDate(article.publishDate)}}</span> / <a href="">Comment</a>
            </div>
            <div class="ml-auto">
              <a target="_blank"
                class="sm:mr-6 mr-4 float-left w-6"
                :href="`https://www.facebook.com/sharer/sharer.php?${facebookUrl}`" >
                <g-image src="@/assets/facebook.svg" class="social-icon" />
              </a>
              <a target="_blank"
                class="twitter-share-button float-left w-6"
                :href="'https://twitter.com/intent/tweet?' + twitterContent + '&' + twitterHashtag + '&' + twitterUrl" >
                <g-image src="@/assets/twitter.svg" class="social-icon" />
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
import marked from "marked";
import { DateHelper } from "../utility/dateHelper";
import { Constant } from "../utility/constant";
import * as moment from 'moment'

@Component({
  components: {},
  metaInfo() {
    return {
      title: `${this.$data.article.title}`,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$data.article.description
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$data.article.title },
        { property: "og:description", content: this.$data.article.description },
        { property: "og:url", content: `${Constant.SiteURL}/${this.$data.article.id}` },
        { property: "article:published_time", content: moment(this.$data.publishDate).format('YYYY-MM-DD') },
        // { property: "og:image", content: this.$data.article.heroImage.file.url },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$data.article.title },
        { name: "twitter:description", content: this.$data.article.description },
        { name: "twitter:site", content: Constant.TwitterSite },
        { name: "twitter:creator", content: Constant.TwitterCreator },
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
    console.log(this.$page.$category);

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
article {
  /* height: 100vh; */
}
article >>> img {
  padding: 20px 0;
}
article >>> h2 {
  margin-top: 60px;
  border-bottom: 2px solid #F0F0F0;
}

.article-content >>> a {
  color: #5183f5;
  font-weight: bold;
  border-bottom: 2px solid #e6f2ff;
}

article >>> ul li {
  list-style: none;
}

article >>> ul li::before {
  color: gray;
  content: "\2022";
  font-weight: bold;
  display: inline-block; 
  width: 1em;
  margin-left: -1em;
}
article >>> ul li {
  margin-bottom: 1rem;
  text-align: left;
}
article >>> iframe {
  background: #000;
  border: none;
  width: 100%;
  height: 415px;
}
</style>

