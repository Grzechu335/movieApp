<script setup lang="ts">
    const route = useRoute()
</script>

<template>
    <div>
        <h1>Hello</h1>
        <p>{{ route.params.movie }}</p>
    </div>
</template>