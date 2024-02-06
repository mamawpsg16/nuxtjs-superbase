<template>
    <div>
        <!-- <h1>{{ website.name }}</h1>
        <p>{{ website.description }}</p> -->
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <!-- {{ runtimeConfig.public }} -->
        <!-- <ul>
            <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
        </ul> -->
        <!-- {{ dbConnection }} -->
    </div>
</template>


<script setup lang="ts">
// import supabase from '@/config/supaBaseConnection.js'
// import {useWebsiteStore} from './stores/website';
/** DATA  */
// const posts = ref([]);
/** CONFIGURATIONS */
// const runtimeConfig = useRuntimeConfig()

// const website = useWebsiteStore()
// await callOnce(website.fetch)

// async function getPosts() {
//   const { data } = await supabase.from('posts').select()
//   console.log(data,'SELECT data');
//   posts.value = data
// }

// onMounted(() => {
//     getPosts()
// })

// const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>

<style scoped>

</style>