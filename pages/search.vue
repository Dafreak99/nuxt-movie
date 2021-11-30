<template>
  <v-container>
    <h3 class="heading">
      Search results for <span class="red">{{ $route.params.keyword }}</span> :
      {{ searchMovies.results.length }} results
    </h3>
    <v-row>
      <v-col
        cols="12"
        lg="2"
        v-for="movie in searchMovies.results"
        :key="movie.id"
      >
        <thumbnail :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { slugToText } from "@/utils/helpers";
import { mapState } from "vuex";
import Thumbnail from "@/components/Thumbnail.vue";

export default {
  components: { Thumbnail },
  name: "Search",
  computed: {
    ...mapState(["searchMovies"]),
  },
  async fetch() {
    if (!this.searchResults) {
      await this.$store.dispatch(
        "search",
        slugToText(this.$route.params.keyword.trim())
      );
    }
  },
};
</script>

<style></style>
