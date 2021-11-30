import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import Tv from '~/pages/tv'
import PopularMovies from '~/pages/movie/popular'
import TopRatedMovies from '~/pages/movie/top-rated'
import PopularTvs from '~/pages/tv/popular'
import Detail from '~/pages/detail'
import Search from '~/pages/search'



Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                name: "home", path: '/', component: Home
            },
            {
                name: "movie", path: '/movie', component: Tv, props: { type: "movie" }
            },
            {
                name: "popular-movies", path: '/movie/popular', component: PopularMovies
            },
            {
                name: "top-rated-movies", path: '/movie/top-rated', component: TopRatedMovies
            },
            {
                name: "movie-detail", path: '/movie/:id', component: Detail, props: { type: "movie" }
            },
            {
                name: "tv-detail", path: '/tv/:id', component: Detail, props: { type: "tv" }
            },
            {
                name: "popular-tvs", path: '/tv/popular', component: PopularTvs
            },
            {
                name: "tv", path: '/tv', component: Tv, props: { type: "tv" }
            },

            {
                name: "search", path: '/search/:keyword', component: Search
            },
        ],
        scrollBehavior() {
            return { x: 0, y: 0, behavior: 'smooth' };
        }
    })
}
