<template>
  <div
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
          <h3 class="info-heading">
            {{ detail.title ? detail.title : detail.name }}
          </h3>
          <p class="info-overview">{{ detail.overview }}</p>
          <p class="info-status">Status: {{ detail.status }}</p>
          <p class="info-date">
            Air Date: {{ detail.first_air_date }} - {{ detail.last_air_date }}
          </p>
          <p class="info-duration">
            Number of Seasons: {{ detail.number_of_seasons }}
            {{ detail.number_of_seasons > 1 ? "seasons" : "season" }}
          </p>
          <p class="info-duration">
            Number of Episodes: {{ detail.number_of_episodes }} ({{
              detail.episode_run_time[0]
            }}
            minutes/ep)
          </p>
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
      <section class="section-padding">
        <h3 class="section-heading">Casts</h3>
        <v-row>
          <v-col
            lg="2"
            v-for="cast in detail.cast.slice(0, 8)"
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
      </section>
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
  data() {
    return {
      posterUrl: POSTER_URL,
      backdropUrl: BACKDROP_URL,
      posterUrl: LARGE_POSTER_URL,
    };
  },
  async fetch() {
    // type is either 'movie' or 'tv'
    let { id } = this.$route.params;

    let arr = id.split("-");

    let movieId = arr[arr.length - 1];

    // returns a Promise to make Nuxt wait in SSR
    await this.$store.dispatch("fetchDetail", { id: movieId, type: "tv" });
  },
};
</script>

<style lang="scss" scoped>
.section-padding {
  padding: 100px 0;
}
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
