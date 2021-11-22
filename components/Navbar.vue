<template>
  <nav class="nav">
    <v-container>
      <div class="nav-wrapper">
        <div class="nav-icon">
          <nuxt-link to="/"><img src="/clapperboard.png" alt="" /></nuxt-link>
        </div>
        <ul class="nav-menu">
          <li><nuxt-link to="/movie/default">Movies</nuxt-link></li>
          <li><nuxt-link to="/a">Genre</nuxt-link></li>
          <li><nuxt-link to="/tv/default">TV Shows</nuxt-link></li>
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
export default {
  components: { Search },
};
</script>

<style lang="scss" scoped>
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
      a {
        text-transform: uppercase;
        display: block;
        height: 100%;
        padding: 0 20px;
        color: #fff;
      }
    }
  }
}
</style>
