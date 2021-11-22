<template>
  <v-row>
    <nuxt-link :to="to">
      <h3>{{ heading }}</h3>
    </nuxt-link>
    <swiper class="list" :options="swiperOption">
      <swiper-slide v-for="movie in lists" :key="movie.id">
        <v-col>
          <thumbnail :movie="movie" scroll />
        </v-col>
      </swiper-slide>
    </swiper>
  </v-row>
</template>

<script>
import Thumbnail from "./Thumbnail.vue";
export default {
  components: { Thumbnail },
  props: ["heading", "lists", "to", "delay"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 10,
        spaceBetween: 15,
        loop: true,
        autoplay: {
          delay: this.delay,
          disableOnInteraction: true,
        },
      },
    };
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
  color: #fff;
}
</style>
