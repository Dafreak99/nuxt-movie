<template>
  <v-container>
    <h3 class="heading">Movies</h3>

    <!-- FILTER -->
    <div class="d-flex align-baseline mb-16">
      <h5 class="mr-4"><v-icon dark>mdi-filter</v-icon></h5>
      <div class="w-500">
        <v-select
          v-model="selectedGenre"
          :items="movieGenres"
          dense
          filled
          label="Genre"
          class="filter"
        ></v-select>
      </div>
    </div>

    <v-row>
      <v-col cols="3" lg="2" v-for="movie in movies.results" :key="movie.id">
        <thumbnail :movie="movie" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="movies.total_pages"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Thumbnail from "@/components/Thumbnail.vue";

export default {
  components: { Thumbnail },
  name: "Movies",
  data() {
    return {
      page: 1,
      selectedGenre: null,
      needUpdate: true,
    };
  },
  computed: {
    ...mapState(["movies", "movieGenres"]),
  },
  methods: {
    async updateUrl(query) {
      await this.$router
        .replace({
          name: "movie-default",
          query,
        })
        .catch((err) => console.log(err));
    },
  },

  watch: {
    async page() {
      if (!this.needUpdate) {
        console.log("no update");
        return;
      }

      let { query } = this.$route;

      let newQuery = { ...query, page: this.page };

      this.$router
        .replace({
          name: "movie-default",
          query: newQuery,
        })
        .catch((err) => console.log(err));

      // update movies
      this.$store.dispatch("fetchMoviesWithQuery", newQuery);

      // scroll to top
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    async selectedGenre() {
      let newQuery = { page: 1, with_genres: this.selectedGenre };

      await this.$router
        .replace({
          name: "movie-default",
          query: newQuery,
        })
        .catch((err) => console.log(err));

      await this.$store.dispatch("fetchMoviesWithQuery", newQuery);

      this.needUpdate = false;

      this.page = 1;

      this.needUpdate = true;
    },
  },
};
</script>

<style>
.heading {
  margin-top: 20px;
  margin-bottom: 40px;
}

.fiter {
  width: 500px;
}
</style>
