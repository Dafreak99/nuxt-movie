<template>
  <div>
    <swiper class="hero" :options="swiperOption">
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <div
          :style="`background-image: linear-gradient(to bottom, rgb(12 12 12 / 89%), rgb(0 0 0 / 73%)), url(${backdropUrl}/${movie.backdrop_path});height: 100%; background-size: cover`"
        >
          <v-container style="height: 100%">
            <v-row style="height: 100%">
              <v-col class="d-flex justify-center flex-column">
                <h3 class="hero-title">{{ movie.title }}</h3>
                <p class="hero-overview">Overview: {{ movie.overview }}</p>
                <nuxt-link
                  :to="{
                    name: 'movie-id',
                    params: {
                      id: `${textToSlug(movie.title)}-${movie.id}`,
                    },
                  }"
                >
                  <v-btn depressed color="primary" style="width: max-content">
                    <v-icon left> mdi-play </v-icon>
                    View Now
                  </v-btn>
                </nuxt-link>
              </v-col>
              <v-col class="d-flex justify-center align-center">
                <img
                  class="hero-image"
                  :src="`${posterUrl}/${movie.poster_path}`"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { BACKDROP_URL, POSTER_URL } from "../utils/constant";
import { textToSlug } from "../utils/helpers";
export default {
  props: ["movies"],
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      backdropUrl: BACKDROP_URL,
      posterUrl: POSTER_URL,
    };
  },
  methods: {
    textToSlug(title) {
      return textToSlug(title);
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  height: 60vh;
  &-title {
    font-size: 40px;
    margin-bottom: 20px;
  }
  &-overview {
    max-width: 700px;
    margin-bottom: 40px;
  }
  &-image {
    border-radius: 8px;
    box-shadow: 0 4px 4px rgb(101 100 100 / 10%);
  }
}
</style>
