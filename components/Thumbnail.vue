<template>
  <nuxt-link
    :to="{
      name: movie.title ? 'movie-id' : 'tv-id',
      params: {
        id: `${textToSlug(movie.title ? movie.title : movie.name)}-${movie.id}`,
      },
    }"
  >
    <div class="card">
      <div class="card-image" :class="{ small: scroll }">
        <img
          :src="
            movie.poster_path
              ? `${posterUrl}/${movie.poster_path}`
              : '/no-image.png'
          "
        />
        <div class="card-icon">
          <v-icon> mdi-play </v-icon>
        </div>
      </div>
      <v-tooltip right nudge-left="20">
        <template v-slot:activator="{ on, attrs }">
          <h3 class="card-title" v-bind="attrs" v-on="on">
            {{ movie.title ? movie.title : movie.name }}
          </h3>
        </template>
        <span>{{ movie.title ? movie.title : movie.name }} </span>
      </v-tooltip>
    </div>
  </nuxt-link>
</template>

<script>
import { POSTER_URL } from "../utils/constant";
import { textToSlug } from "../utils/helpers";

export default {
  data() {
    return {
      posterUrl: POSTER_URL,
    };
  },
  methods: {
    textToSlug(title) {
      return textToSlug(title);
    },
  },
  name: "Thumbnail",
  props: {
    movie: Object,
    scroll: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  &-image {
    position: relative;
    overflow: hidden;
    height: 200px;
    @media (min-width: 1200px) {
      height: 250px;
    }
    &.small {
      height: 200px;
    }
  }

  img {
    border-radius: 6px;
    overflow: hidden;
    transition: 200ms ease-in-out;
    height: -webkit-fill-available;
    object-fit: cover;
  }
  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
    z-index: 100;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #f20e0e;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3 ease-in-out;
  }
  &-title {
    font-size: 14px;
    margin-top: 20px;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    img {
      transform: scale(1.1);
      filter: blur(2px) brightness(0.3);
    }

    .card-icon {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}
</style>
