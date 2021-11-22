<template>
  <div
    class="info"
    v-if="$fetchState.pending"
    :style="`background: #000 !important`"
  >
    <v-container class="py-16">
      <spinner />
    </v-container>
  </div>

  <div
    v-else
    class="info"
    :style="`background-image: linear-gradient(to bottom, rgb(12 12 12 / 89%), rgb(0 0 0 / 73%)), url(${backdropUrl}/${detail.backdrop_path});height: 100%; background-size: cover`"
  >
    <v-container class="py-16">
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
        <client-only>
          <cool-light-box :items="images" :index="index" @close="index = null">
          </cool-light-box>
        </client-only>

        <div class="images-wrapper">
          <img
            class="image"
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
            @click="index = imageIndex"
            :src="image"
            alt=""
          />
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Spinner from "../../components/Spinner.vue";

import {
  BACKDROP_URL,
  LARGE_POSTER_URL,
  POSTER_URL,
} from "../../utils/constant";

export default {
  name: "Info",

  components: { Spinner },
  data() {
    return {
      posterUrl: POSTER_URL,
      backdropUrl: BACKDROP_URL,
      posterUrl: LARGE_POSTER_URL,
      index: null,
    };
  },
  computed: {
    ...mapState(["detail"]),
    images() {
      return this.detail.images
        .slice(0, 8)
        .map((image) => `${this.posterUrl}/${image.file_path}`);
    },
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

.images-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  .image {
    grid-column: span 3;
    height: 300px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 8px;
  }
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
