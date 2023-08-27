<script setup lang="ts">
import { MovieDetailsResponse, MovieDetails } from '~/types/MovieType'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { data: movie } = await useFetch(`https://api.themoviedb.org/3/movie/${route.params.movie}`, {
    query: {
        api_key: runtimeConfig.public.MOVIES_KEY,
        language: 'en-US',
    },
    transform: (data: MovieDetailsResponse): MovieDetails => ({
        ...data,
        release_date: new Date(data.release_date).toLocaleString('en-GB', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }),
        revenue: data.revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        }),
    }),
})
</script>

<template>
    <div class="single-movie container">
        <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
        <div class="movie-info">
            <div class="movie-img">
                <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="" />
            </div>
            <div class="movie-content">
                <h1>Title: {{ movie?.title }}</h1>
                <p class="movie-fact tagline"><span>Tagline:</span> "{{ movie?.tagline }}"</p>
                <p class="movie-fact">
                    <span>Released:</span>
                    {{ movie?.release_date }}
                </p>
                <p class="movie-fact"><span>Duration:</span> {{ movie?.runtime }} minutes</p>
                <p class="movie-fact">
                    <span>Revenue:</span>
                    {{ movie?.revenue }}
                </p>
                <p class="movie-fact"><span>Overview:</span> {{ movie?.overview }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
}
.single-movie {
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 16px;

    .button {
        align-self: flex-start;
        margin-bottom: 32px;
    }

    .movie-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        color: #fff;
        @media (min-width: 800px) {
            flex-direction: row;
            align-items: flex-start;
        }
        .movie-img {
            img {
                max-height: 500px;
                width: 100%;

                @media (min-width: 800px) {
                    max-height: 700px;
                    width: initial;
                }
            }
        }

        .movie-content {
            h1 {
                font-size: 56px;
                font-weight: 400;
            }

            .movie-fact {
                margin-top: 12px;
                font-size: 20px;
                line-height: 1.5;

                span {
                    font-weight: 600;
                    text-decoration: underline;
                }
            }

            .tagline {
                font-style: italic;
                span {
                    font-style: normal;
                }
            }
        }
    }
}
</style>
