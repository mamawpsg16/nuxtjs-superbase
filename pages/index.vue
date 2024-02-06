<template>
    <div>
        <!-- <Head>
          <Title>Hello World</Title>
          <Meta name="description" content="hello b*tch" />
          <Style type="text/css" children="body { background-color: green; }" />
        </Head> -->
        <!-- <BaseButton>
            Click 
        </BaseButton> -->
        <!-- {{  data, error }} -->
        <!-- {{  runtimeConfig }} -->
        <!-- <br>
        {{  appConfig }}
        <li><NuxtLink to="/menu/2">Menu With Param</NuxtLink></li> -->
        HOME
    </div>
</template>

<script setup lang="ts">

// import supaBaseConnection from "@/config/supaBaseConnection";
import BaseButton from "../components/Form/BaseButton.vue"

    // await $fetch('/api/posts', { 
    // method: 'POST',
    // body: { title, content }
    // })
    const runtimeConfig = useRuntimeConfig()
    const appConfig = useAppConfig()
    // const { data, error } = await useFetch("/api/ninja");
        // console.log(data, "data");
    // useHead({
    //     title: 'My App',
    //     meta: [
    //         { name: 'description', content: 'My amazing site.' }
    //     ],
    //     bodyAttrs: {
    //         class: 'test'
    //     },
    //     script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
    // });

    // useSeoMeta({
    //     title: 'My Amazing Site',
    //     ogTitle: 'My Amazing Site',
    //     description: 'This is my amazing site, let me tell you all about it.',
    //     ogDescription: 'This is my amazing site, let me tell you all about it.',
    //     ogImage: 'https://example.com/image.png',
    //     twitterCard: 'summary_large_image',
    // })
    onBeforeMount(async ()=>{
        // const { data, error } = await supaBaseConnection.auth.signUp({
        //     email: 'kevinmensah114@gmail.com',
        //     password: 'testing123',
        // })
        // console.log(data,error, 'data error er');
    })

</script>

<style>

</style>