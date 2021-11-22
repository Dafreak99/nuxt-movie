import { API_KEY, MOVIE_URL } from "../utils/constant";

export const state = () => ({
    popularMovies: {},
    topRatedMovies: {},
    popularTVs: {},
    searchMovies: {},
    detail: {
        loading: false,
    },
});

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        try {
            await dispatch("fetchPopularMovies");
            await dispatch("fetchTopRatedMovies");
            await dispatch("fetchPopularTVs");
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPopularMovies({ commit }, page = 1) {
        let popular = await this.$axios.$get(
            `${MOVIE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        commit("FETCH_MOVIES", popular);
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
        state.popularMovies = payload;
    },
    FETCH_TOP_RATED_MOVIES(state, payload) {
        state.topRatedMovies = payload;
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
};
