<template>
  <Layout>
    <h2 class="mb-10 text-3xl">Articles</h2>
    <div class="flex flex-wrap mb-4">
      <div v-for="(tag, index) in tags" :key="index" class="tag" v-on:click="filterByTag(tag)">{{tag}}</div>
    </div>
    <div class="flex align-middle mb-8">
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

<script>
import ArticleLinePreview from "@/components/ArticleLinePreview.vue";
import { Constant } from "@/utility/constant";

export default {
  components: {
    ArticleLinePreview
  },
  data() {
    return {
      originalArticles: [],
      articles: [],
      tags: [],
      keyword: ""
    }
  },
  mounted() {
    this.originalArticles = this.$page.allContentfulBlogPost.edges.map(e => e.node);
    this.articles = this.originalArticles;
    this.originalArticles.forEach(a => {
      this.tags = this.tags.concat(a.tags);
    })
    this.tags = this.tags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
  },
  methods: {
    filterByTag(tag) {
      this.articles = this.originalArticles.filter(a => a.tags.includes(tag));
    },
    internalSearch() {
      this.articles = this.originalArticles.filter(a => a.body.includes(this.keyword));
    }
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
  }
}
</script>

<style scoped>

h2 {
  border: none;
}

ul, ol {
  margin: 0;
  padding: 0;
}
ul li {
  list-style-type: none; 
}

</style>
