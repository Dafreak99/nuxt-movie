<template>
  <v-container>
    <h3 class="heading">Popular Series</h3>
    <v-row>
      <v-col
        cols="12"
        lg="2"
        v-for="movie in popularTVs.results"
        :key="movie.id"
      >
        <thumbnail :movie="movie" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-pagination
          v-model="page"
          class="my-4"
          :length="popularTVs.total_pages"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Thumbnail from "../../components/Thumbnail.vue";

export default {
  components: { Thumbnail },
  name: "PopularTVs",
  computed: {
    ...mapState(["popularTVs"]),
  },
  data() {
    return {
      page: this.$route.query.page ? +this.$route.query.page : 1,
    };
  },
  watch: {
    page() {
      // update the corresponding query page
      this.$router.replace({
        name: "tv-popular",
        query: { page: this.page },
      });

      // update movies
      this.$store.dispatch("pagination", {
        type: "tv",
        attribute: "popular",
        page: this.page,
      });

      // scroll to top
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.heading {
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>
