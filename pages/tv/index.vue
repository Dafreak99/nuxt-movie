<template>
  <v-container>
    <h3 class="heading">{{ decide("Movies", "TVs") }}</h3>

    <!-- FILTER -->
    <div class="d-flex align-baseline mb-16">
      <h5 class="mr-4"><v-icon dark>mdi-filter</v-icon></h5>
      <div class="w-500">
        <v-select
          v-model="with_genres"
          :items="movieGenres"
          dense
          filled
          label="Genre"
          class="filter"
        ></v-select>
      </div>
    </div>

    <v-row>
      <v-col
        cols="3"
        lg="2"
        v-for="each in decide(movies.results, tvs.results)"
        :key="each.id"
      >
        <thumbnail :movie="each" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="decide(movies.total_pages, tvs.total_pages)"
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
  name: "Tv",
  data() {
    return {
      page: 1,
      with_genres: null,
      needUpdate: true,
      isRefresh: false,
    };
  },
  props: {
    type: {
      type: String,
    },
  },
  computed: {
    ...mapState(["movies", "tvs", "movieGenres"]),
  },
  watch: {
    async page() {
      if (!this.needUpdate) return;

      let { query } = this.$route;

      let newQuery = { ...query, page: this.page };

      this.update_url(newQuery);
    },
    async with_genres() {
      let newQuery = {};

      if (this.isRefresh) {
        newQuery = { page: this.page, with_genres: this.with_genres };
      } else {
        newQuery = { page: 1, with_genres: this.with_genres };
        this.page = 1;
      }

      this.update_url(newQuery);

      this.needUpdate = false;

      this.needUpdate = true;
      this.isRefresh = false;
    },
  },
  methods: {
    update_url(query) {
      this.$router
        .replace({ name: this.$route.name, query })
        .catch((err) => console.log(err));

      // update movies
      this.$store.dispatch(
        this.decide("fetchMoviesWithQuery", "fetchTvsWithQuery"),
        query
      );
    },
    decide(a, b) {
      return this.type === "movie" ? a : b;
    },
  },
  mounted() {
    let { query } = this.$route;

    this.isRefresh = true;

    if (query.page) this.page = +query.page;
    if (query.with_genres) this.with_genres = query.with_genres;
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
