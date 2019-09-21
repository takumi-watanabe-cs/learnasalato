<template>
  <Layout>
    <div class="mb-20">
      <div class="flex items-end">
        <div class="mr-20">
          <h2 class="text-6xl">Asalato</h2>
          <p>We write latest and useful articles about Asalato.</p>
          <ul>
            <li>What is Asalato</li>
            <li>Trick List</li>
            <li>Where to Buy</li>
            <li>Events</li>
            </ul>
        </div>
        <g-image class="w-5/12 h-full ml-auto" src="@/assets/hero.png" />
      </div>
    </div>
    <div class="mb-32">
      <h2>Latest Articles</h2>
      <div v-for="(article, index) in articles" :key="index">
        <ArticleHeadline :article="article" />
      </div>
    </div>

    <div v-if="popularArticles.length > 0" class="popular">
      <h2>Popular</h2>
      <div v-for="(article, index) in popularArticles" :key="index">
        <ArticleHeadline :article="article" isPopular="true" />
      </div>
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
import { Vue, Component } from "vue-property-decorator";
import { Article } from "@/models/article";
import ArticleHeadline from "@/components/ArticleHeadline.vue";
import { Constant } from "@/utility/constant";

@Component({
  components: {
    ArticleHeadline
  },
  metaInfo() {
    return {
      title: Constant.SiteName,
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:title", content: Constant.SiteName },
        { property: "og:description", content: Constant.SiteDescription },
        { property: "og:url", content: Constant.SiteURL },
        { property: "og:image", content: Constant.OGImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: Constant.SiteName },
        { name: "twitter:description", content: Constant.SiteDescription },
        { name: "twitter:site", content: Constant.TwitterSite },
        { name: "twitter:creator", content: Constant.TwitterCreator },
        { name: "twitter:image", content: Constant.OGImageUrl }
      ]
    };
  }
})
export default class Blog extends Vue {
  $page: any;
  articles: Array<Article> = new Array<Article>();
  popularArticles: Array<Article> = new Array<Article>();

  constructor() {
    super();
  }

  mounted() {
    this.articles = this.$page.allContentfulBlogPost.edges.map(e => e.node);
    this.popularArticles = this.articles.filter(a =>
      a.tags.includes("popular")
    );
  }
}
</script>

<style scoped>
h2 {
  border: none;
}
</style>
