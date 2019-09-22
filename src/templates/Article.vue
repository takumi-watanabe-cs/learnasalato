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
            <div v-for="(tag, index) in article.tags" :key="index" class="tag" v-on:click="filterByTag(tag)" >{{tag}}</div>
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

<script>
import { Article } from "../models/article";
import marked from "marked";
import { DateHelper } from "../utility/dateHelper";
import { Constant } from "../utility/constant";
import * as moment from 'moment'

export default {
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
  data() {
    const article = this.$root.$page.contentfulBlogPost;
    const articleSlug = article.slug;
    return {
      article: article,
      markdown: marked(article.body),
      sitePrefix: `${Constant.SiteURL}/article/`,
      facebookUrl: `u=${Constant.SiteURL}/article/${articleSlug}`,
      twitterUrl: `url=${Constant.SiteURL}/article/${articleSlug}`,
      twitterHashtag: `hashtags=${Constant.SocialMediaHashtag}`,
      twitterContent: `text=Check out the top 10 picks of ${article.title} at Top Trend Books!`,
      shortname: process.env.GRIDSOME_DISQUS_SHORTNAME
    }
  },
  methods: {
    convertToDate(strDate) {
      return DateHelper.convertToDate(strDate);
    }
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

article >>> h3 {
  margin-top: 60px;
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

