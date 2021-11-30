import { API_KEY, MOVIE_URL } from "../utils/constant";

export const state = () => ({
    movies: {},
    tvs: {},
    popularMovies: {},
    topRatedMovies: {},
    popularTVs: {},
    searchMovies: {},
    detail: {
        loading: false,
    },
    movieGenres: []
});

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        try {
            await dispatch('fetchMovies');
            await dispatch('fetchTvs');
            await dispatch("fetchPopularMovies");
            await dispatch("fetchTopRatedMovies");
            await dispatch("fetchPopularTVs");
            await dispatch('fetchMovieGenres');
        } catch (error) {
            console.log(error);
        }
    },
    async fetchMovies({ commit }, page = 1) {
        let movies = await this.$axios.$get(
            `${MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_MOVIES", movies);
    },
    async fetchTvs({ commit }, page = 1) {
        let tvs = await this.$axios.$get(
            `${MOVIE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_TVS", tvs);
    },
    async fetchMoviesWithQuery({ commit }, query) {
        let queryString = "";

        for (let key in query) {
            queryString += `&${key}=${query[key]}`;
        }

        let movies = await this.$axios.$get(
            `${MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US${queryString}`
        );

        commit("FETCH_MOVIES", movies);
    },
    async fetchTvsWithQuery({ commit }, query) {
        let queryString = "";

        for (let key in query) {
            queryString += `&${key}=${query[key]}`;
        }

        let tvs = await this.$axios.$get(
            `${MOVIE_URL}/discover/tv?api_key=${API_KEY}&language=en-US${queryString}`
        );

        commit("FETCH_TVS", tvs);
    },
    async fetchPopularMovies({ commit }, page = 1) {
        let popular = await this.$axios.$get(
            `${MOVIE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_POPULAR_MOVIES", popular);
    },
    async fetchTopRatedMovies({ commit }, page = 1) {
        let topRated = await this.$axios.$get(
            `${MOVIE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_TOP_RATED_MOVIES", topRated);
    },
    async fetchPopularTVs({ commit }, page = 1) {
        let data = await this.$axios.$get(
            `${MOVIE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_TV", data);
    },
    async fetchDetail({ commit }, { id, type }) {
        commit('LOADING_DETAIL');

        try {
            const data = await this.$axios.$get(
                `${MOVIE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`
            );

            const { cast, crew } = await this.$axios.$get(
                `${MOVIE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
            );

            const { results: videos } = await this.$axios.$get(
                `${MOVIE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
            );

            const { backdrops: images } = await this.$axios.$get(
                `${MOVIE_URL}/${type}/${id}/images?api_key=${API_KEY}`
            );

            commit("FETCH_DETAIL", { ...data, cast, crew, videos, images });
        } catch (error) {
            console.log(error);
        }
    },
    async fetchMovieGenres({ commit }) {
        let { genres } = await this.$axios.$get(
            `${MOVIE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US&page`
        );
        commit("FETCH_MOVIE_GENRES", genres);
    },
    async search({ commit }, keyword) {
        try {
            const data = await this.$axios.$get(
                `${MOVIE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}`
            );
            commit("SEARCH", data);
        } catch (error) {
            console.log(error);
        }
    },
    async pagination({ dispatch }, { type, attribute, page }) {
        try {
            if (type === "movie") {
                if (attribute === "popular") {
                    await dispatch("fetchPopularMovies", page);
                } else {
                    await dispatch("fetchTopRatedMovies", page);
                }
            }

            if (type === "tv") {
                if (attribute === "popular") {
                    await dispatch("fetchPopularTVs", page);
                } else {
                    await dispatch("fetchPopularTVs", page);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
};

export const mutations = {
    FETCH_MOVIES(state, payload) {
        state.movies = payload;
    },
    FETCH_POPULAR_MOVIES(state, payload) {
        state.popularMovies = payload;
    },
    FETCH_TOP_RATED_MOVIES(state, payload) {
        state.topRatedMovies = payload;
    },
    FETCH_TVS(state, payload) {
        state.tvs = payload;
    },
    FETCH_TV(state, payload) {
        state.popularTVs = payload;
    },
    FETCH_DETAIL(state, payload) {
        state.detail = { ...payload, loading: false };
    },
    LOADING_DETAIL(state, payload) {
        state.detail.loading = true;
    },
    SEARCH(state, payload) {
        state.searchMovies = payload;
    },
    FETCH_MOVIE_GENRES(state, payload) {
        // tranforms the genres's format for <v-select>
        let items = payload.map(({ name, id }) => {
            return ({ text: name, value: id })
        });

        state.movieGenres = items;
    }
};
