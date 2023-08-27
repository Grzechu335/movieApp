<script setup lang="ts">
import { Movie, Movies as MoviesResponse } from '../types/MovieType'

const runtimeConfig = useRuntimeConfig()

let searchInput = ref('')

function clearInput() {
    searchInput.value = ''
}
const {
    data: movies,
    refresh: refetchAllMovies,
    pending: pendingAllMovies,
} = await useFetch(`https://api.themoviedb.org/3/movie/now_playing`, {
    query: { api_key: runtimeConfig.public.MOVIES_KEY, language: 'en-US', page: 1 },
    transform: (data: MoviesResponse): Movie[] =>
        data.results
            .map((movie) => ({
                ...movie,
                release_date: new Date(movie.release_date).toLocaleString('en-GB', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
            }))
            .sort((a, b) => b.vote_average - a.vote_average),
})

const {
    data: searchedMovies,
    refresh: refetchSearchedMovies,
    pending: pendingSearchedMovies,
} = await useFetch(`https://api.themoviedb.org/3/search/movie`, {
    query: {
        api_key: runtimeConfig.public.MOVIES_KEY,
        language: 'en-US',
        page: 1,
        query: computed(() => searchInput.value),
    },
    transform: (data: MoviesResponse): Movie[] =>
        data.results
            .map((movie) => ({
                ...movie,
                release_date: new Date(movie.release_date).toLocaleString('en-GB', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
            }))
            .sort((a, b) => b.vote_average - a.vote_average)
            .filter((movie) => movie.vote_average !== 0),
})

watch(searchInput, async (newValue) => {
    if (newValue === '') refetchAllMovies()
    else {
        await refetchSearchedMovies()
    }
})
</script>

<template>
    <div>
        <Hero />
        <div class="flex py-8 px-4 max-w-screen-2xl mx-auto">
            <input
                class="max-w-[350px] w-full py-3 px-2 text-[14px] border-none focus:outline-none"
                type="text"
                name=""
                id=""
                v-model="searchInput"
            />
            <button @click="clearInput()" v-show="searchInput !== ''" class="button">Clear Search</button>
        </div>
        <Movies id="movie-grid" :movies="searchInput === '' ? movies : searchedMovies" />
    </div>
</template>
