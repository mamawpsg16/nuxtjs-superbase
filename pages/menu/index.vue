<template>
    <div>
        <img src="/default_images/dog.jpg" alt="Dog" />      
        <img :src="cat_image[0].url" alt="Dog" />      
        <p>Page visits: {{ cat_image }}</p>
       {{ route.params }}
       message {{ array.message  }}
       error {{ array.error  }}
    </div>
</template>

<script setup lang="ts">

const { data: cat_image } = await useFetch('https://api.thecatapi.com/v1/images/search');

// $fetch = It is recommended to use $fetch for client-side interactions (event based) 
// const todo = await $fetch('/api/todos', {
//     method: 'POST',
//     body: {
//       // My todo data
//     }
//   })
const array = ref([]);

const myGetFunction = function () {
  return { data: 'sheesh', error: 404 };
};



const fetchData = async function () {
  const { data, error } = myGetFunction(); // Assuming myGetFunction is synchronous
  array.value = { message: data, error: error };
};


// const { data: mountain } = await useFetch('/api/mountains/everest', {
//   pick: ['title', 'description']
// })

fetchData();

// Call the fetchData function



// const { data: discounts, pending } = await useAsyncData('cart-discount', async () => {
//   const [coupons, offers] = await Promise.all([
//     $fetch('/cart/coupons'),
//     $fetch('/cart/offers')
//   ])

//   return { coupons, offers }
// })


/** HOW TO DEFINE A MIDDLEWARE PER PAGE */
// Example import in a Nuxt.js file (like a middleware file)
definePageMeta({
  middleware: ['is-authenticated','fuck'],
})
const route = useRoute()
</script>

<style lang="scss" scoped>
li{
    color:$secondary
}
</style>