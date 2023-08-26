<script setup lang="ts">
import { Movie } from '~/types/MovieType';

    const {movies} = defineProps<{
        movies: Movie[] | null
    }>()
</script>

<template>
    <div class="grid px-4 gap-x-8 gap-y-16 lg:grid-cols-4 my-16 max-w-screen-xl mx-auto">
                <div v-for="(movie) in movies" :key="movie.id" class="relative group flex flex-col">
                    <div class="relative overflow-hidden w-full h-full">
                        <img v-if="movie.poster_path !== null" class="w-full h-full" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="movie image">
                        <p v-else class="w-full h-full grid place-content-center text-white">No image</p>
                        <p class="absolute left-0 shadow-md top-0 grid  place-content-center w-[40px] h-[40px] bg-[#c92502] text-white rounded-br-xl">{{ movie.vote_average.toFixed(1) }}</p>
                        <p class="leading-[1.5] text-justify transition-transform translate-y-[100%] group-hover:translate-y-0 bg-[#c92602e6] p-3 text-white absolute bottom-0 bg-[rgba(201, 38, 2, 0.9)]">{{ movie.overview }}</p>
                    </div>
                    <div class="space-y-2 mt-auto">
                        <p class="text-white text-[20px]">{{ movie.title.slice(0, 25) }} <span v-if="movie.title.length > 25">...</span></p>
                        <p class="text-[#c9c9c9]">
                            Released: {{ movie.release_date }}
                        </p>
                        <NuxtLink class="button button-light" :to="`/movies/${movie.id}`">Get more info</NuxtLink>
                    </div>
                </div>
            </div>
</template>