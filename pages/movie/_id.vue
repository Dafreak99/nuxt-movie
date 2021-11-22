<template>
  <div
    class="info"
    :style="`background-image: linear-gradient(to bottom, rgb(12 12 12 / 89%), rgb(0 0 0 / 73%)), url(${backdropUrl}/${detail.backdrop_path});height: 100%; background-size: cover`"
  >
    <v-container class="py-16" v-if="!detail.loading">
      <!-- MOVIE INFO -->
      <v-row>
        <v-col>
          <img
            :src="`${posterUrl}/${detail.poster_path}`"
            alt=""
            class="info-image"
          />
        </v-col>
        <v-col>
          <h3 class="info-heading">{{ detail.original_title }}</h3>
          <p class="info-overview">{{ detail.overview }}</p>
          <p class="info-status">Status: {{ detail.status }}</p>
          <p class="info-date">Released Date: {{ detail.release_date }}</p>
          <p class="info-duration">Duration: {{ detail.runtime }} minutes</p>
          <nuxt-link
            to="/id"
            v-for="genre in detail.genres"
            :key="genre.id"
            class="info-genre"
            >{{ genre.name }}</nuxt-link
          >
        </v-col>
      </v-row>
      <!-- CASTS -->
      <section class="section mt-16 mb-8">
        <h3 class="section-heading">Casts</h3>
        <v-row v-if="detail.cast.length > 0">
          <v-col
            lg="2"
            md="3"
            v-for="cast in detail.cast.slice(0, 12)"
            :key="cast.id"
            class="cast"
          >
            <nuxt-link to="/">
              <img
                :src="
                  cast.profile_path
                    ? `${posterUrl}/${cast.profile_path}`
                    : '/v.png'
                "
                alt="cast"
                class="cast-image"
              />
              <h5 class="cast-character">{{ cast.character }}</h5>
              <p class="cast-name">{{ cast.name }}</p>
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row v-else>Loading....</v-row>
      </section>
      <!-- GALLERY -->
      <section class="section-padding">
        <h3 class="section-heading">Gallery</h3>
        <v-row>
          <v-col
            lg="4"
            v-for="cast in detail.cast.slice(0, 1)"
            :key="cast.id"
            class="cast"
          >
            <client-only>
              <template>
                <LazyYoutube
                  src="https://www.youtube.com/watch?v=TcMBFSGVi1c"
                />
              </template>
            </client-only>
          </v-col>
        </v-row>
        <v-row>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="image in detail.images" :key="image.file_path">
              <img :src="`${posterUrl}/${image.file_path}`" alt="" />
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </v-row>
      </section>
    </v-container>

    <v-container>
      <h1>Loading....</h1>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  BACKDROP_URL,
  LARGE_POSTER_URL,
  POSTER_URL,
} from "../../utils/constant";

export default {
  name: "Info",
  computed: {
    ...mapState(["detail"]),
  },
  components: {},
  data() {
    return {
      posterUrl: POSTER_URL,
      backdropUrl: BACKDROP_URL,
      posterUrl: LARGE_POSTER_URL,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 3,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  async fetch() {
    // type is either 'movie' or 'tv'
    let { id } = this.$route.params;

    let arr = id.split("-");

    let movieId = arr[arr.length - 1];

    // returns a Promise to make Nuxt wait in SSR
    await this.$store.dispatch("fetchDetail", { id: movieId, type: "movie" });
  },
};
</script>

<style lang="scss" scoped>
.section-heading {
  margin-bottom: 40px;
  font-size: 25px;
}
.info {
  height: 100vh;
  &-heading {
    font-size: 30px;
    margin-bottom: 20px;
  }
  &-image {
    height: 500px;
  }
  &-overview {
  }

  &-genre {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 20px;
    border: 2px solid #fff;
    margin-right: 15px;
    color: #fff;
  }

  .cast {
    text-align: center;
    &-image {
      height: 40px;
      width: 40px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    &-name {
      color: #fff;
      margin-bottom: 10px;
    }
    &-character {
      color: #9e8325;
    }
  }
}
</style>
