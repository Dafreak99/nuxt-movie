<template>
  <div>
    <hero :movies="popularMovies.results.slice(0, 6)" />
    <v-container>
      <horizontal-list
        heading="Popular Movies"
        :lists="popularMovies.results"
        to="movie/popular"
        class="mb-8 mt-16"
        :delay="1000"
      />
      <horizontal-list
        heading="Top Rated Movies"
        :lists="topRatedMovies.results"
        to="movie/top-rated"
        class="mb-8"
        :delay="2000"
      />
      <horizontal-list
        heading="Popular TV Series"
        :lists="popularTVs.results"
        to="tv/popular"
        :delay="3000"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Hero from "../components/Hero.vue";
import HorizontalList from "../components/HorizontalList.vue";

export default {
  components: { HorizontalList, Hero },
  computed: {
    ...mapState(["popularMovies", "topRatedMovies", "popularTVs"]),
  },
};
</script>

<style scoped>
.swiper {
  height: auto;
}
</style>
