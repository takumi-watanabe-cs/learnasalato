<template>
  <Layout>
    <h1 class="mb-10">Blog</h1>
    <div class="flex flex-wrap mb-4">
      <div v-for="(tag, index) in tags" :key="index" class="tag" v-on:click="filterByTag(tag)">{{tag}}</div>
    </div>
    <div class="flex align-middle mb-16">
      <input
        class="w-full py-2 border-2 px-4"
        type="search"
        v-model="keyword"
        v-on:keyup.enter="internalSearch()"
        placeholder="Keyword"
      />
      <p class="text-center w-16 font-bold text-xl text-blue-400 mt-2 mb-0 ">
        {{articles.length}}
      </p>
    </div>
    <div class="section">
      <ul class="article-list">
        <li v-for="(article, index) in articles" :key="index" class="article-item">
          <ArticleLinePreview :article="article"/>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query Index {
  allContentfulBlogPost(sortBy: "publishDate", order:DESC) {
    totalCount
    edges {
      node {
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
  }
}
</page-query>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Article } from "@/models/article";
import ArticlePreview from "@/components/ArticlePreview.vue";
import ArticleLinePreview from "@/components/ArticleLinePreview.vue";
import { Constant } from "@/utility/constant";

@Component({
  components: {
    ArticlePreview,
    ArticleLinePreview
  },
  metaInfo () {
    return {
      title: Constant.SiteName,
      meta: [
        { property: "og:type", content: 'website' },
        { property: "og:title", content: Constant.SiteName },
        { property: "og:description", content: Constant.SiteDescription },
        { property: "og:url", content: Constant.SiteURL },
        { property: "og:image", content: Constant.OGImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: Constant.SiteName },
        { name: "twitter:description", content: Constant.SiteDescription },
        { name: "twitter:site", content: Constant.TwitterSite },
        { name: "twitter:creator", content: Constant.TwitterCreator },
        { name: "twitter:image", content: Constant.OGImageUrl },
      ],
    }
  },
})
export default class Blog extends Vue {
  $page: any;
  originalArticles: Array<Article> = new Array<Article>();
  articles: Array<Article> = new Array<Article>();
  tags: Array<string> = [];
  keyword: string = "";

  constructor() {
    super();
  }

  mounted() {
    this.originalArticles = this.$page.allContentfulBlogPost.edges.map(e => e.node);
    this.articles = this.originalArticles;
    this.originalArticles.forEach(a => {
      this.tags = this.tags.concat(a.tags);
    })
    this.tags = this.tags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.keyword = "";
  }

  filterByTag(tag: string) {
    this.articles = this.originalArticles.filter(a => a.tags.includes(tag));
  }

  internalSearch() {
    this.articles = this.originalArticles.filter(a => a.body.includes(this.keyword));
  }
}
</script>

<style scoped>
/* .article-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4vmin;
} */

.article-item {
  border-bottom: solid #edf2f7 2px;
}

.article-item:hover {
  background: #edf2f7;
}

</style>
