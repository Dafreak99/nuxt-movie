<template>
  <form @submit.prevent="search">
    <input
      type="text"
      placeholder="Enter your keywords"
      v-model="keyword"
      @input="debounceSearch"
    />
    <div class="results" v-if="showSearch" v-click-outside="onClickOutside">
      <div v-for="movie in searchMovies.results.slice(0, 5)" :key="movie.id">
        <nuxt-link :to="getLink(movie)" class="result">
          <div class="result-poster">
            <img :src="`${posterUrl}/${movie.poster_path}`" alt="" />
          </div>
          <div class="result-info">
            <p>{{ getName(movie) }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </form>
</template>

<script>
import vClickOutside from "v-click-outside";

import { textToSlug } from "../utils/helpers";
import { mapState } from "vuex";
import { POSTER_URL } from "../utils/constant";

export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      posterUrl: POSTER_URL,
      showSearch: false,
      debounce: null,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapState(["searchMovies"]),
  },
  watch: {
    $route(to, from) {
      this.keyword = "";
      this.showSearch = false;
    },
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.typing = null;
        this.keyword = event.target.value;

        this.search(false);
      }, 200);
    },
    async search(navigate = true) {
      if (!this.keyword.trim()) return;

      await this.$store.dispatch("search", this.keyword.trim());

      this.showSearch = true;

      if (navigate) {
        this.$router.push({
          name: "search",
          params: {
            keyword: textToSlug(this.keyword.trim()),
            key: this.keyword.trim(),
          },
        });
      }
    },

    getName(movie) {
      return movie.name ? movie.name : movie.title;
    },
    getLink(movie) {
      return `/${movie.media_type}/${textToSlug(
        movie.title ? movie.title : movie.name
      )}-${movie.id}}`;
    },
    onClickOutside(event) {
      this.showSearch = false;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  height: 35px;
  border-radius: 6px;
  background: #fff;
  color: #000;
  outline: none;
  padding: 0 15px;
  font-family: inherit;
}

.results {
  background: #030b11;
  position: absolute;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0 4px 8px #e6e1e114;
  width: 400px;
  .result {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transition: 350ms all ease;

    &:hover {
      background: #00000054;
    }

    &-poster {
      margin-right: 15px;
      img {
        height: 100px;
        width: 70px;
      }
    }

    &-info {
      color: #fff;
    }
  }
}
</style>
