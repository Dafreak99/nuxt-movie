<template>
  <nav class="nav">
    <v-container>
      <div class="nav-wrapper">
        <div class="nav-icon">
          <nuxt-link to="/"><img src="/clapperboard.png" alt="" /></nuxt-link>
        </div>
        <ul class="nav-menu">
          <li><nuxt-link :to="{ name: 'movie' }">Movies</nuxt-link></li>
          <li>
            <ul class="relative">
              <a href="#">Genre</a>
              <ul class="nav-parent row">
                <li
                  v-for="genre in movieGenres"
                  :key="genre.value"
                  class="col-4 py-0 link"
                >
                  <nuxt-link :to="`/movie?with_genres=${genre.value}`">{{
                    genre.text
                  }}</nuxt-link>
                </li>
              </ul>
            </ul>
          </li>
          <li><nuxt-link :to="{ name: 'tv' }">TV Shows</nuxt-link></li>
          <li><nuxt-link to="/a">Top IMDB</nuxt-link></li>
        </ul>
        <div class="nav-search">
          <search />
        </div>
      </div>
    </v-container>
  </nav>
</template>

<script>
import Search from "./Search.vue";
import { mapState } from "vuex";

export default {
  components: { Search },
  computed: {
    ...mapState(["movieGenres"]),
  },
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.nav {
  &-wrapper {
    display: flex;
    height: 46px;
    line-height: 46px;
  }
  &-icon {
    flex: 1;
    img {
      height: 40px;
    }
  }
  &-menu {
    flex: 2;
    display: flex;
    li {
      list-style: none;
    }
    a {
      text-transform: uppercase;
      display: block;
      height: 100%;
      padding: 0 20px;
      color: #fff;
    }
  }

  li:hover {
    .nav-parent {
      opacity: 1;
      visibility: visible;
    }
  }
  &-parent {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 130%;
    display: flex;
    background: #0c0c0c;
    left: 40px;
    padding-left: 0;
    z-index: 3;
    padding: 20px 30px;
    width: 600px;
    a {
      text-transform: capitalize;
      font-size: 14px;
    }
    .link {
      border-radius: 6px;
      transition: 200ms ease-in-out;
      &:hover {
        background: rgb(212, 10, 10);
      }
    }
  }
}
</style>
