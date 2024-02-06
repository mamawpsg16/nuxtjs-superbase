<template>
  <div>
        <div class="text-end me-5 mt-3">
          <NuxtLink  type="button" class="btn btn-md btn-secondary" @click="logout">Logout</NuxtLink>
        </div>
       <div class="container mt-5">
        <slot name="buttons"/>
          <div class="row justify-content-center">
                <slot />
          </div>
        </div>
  </div>
   
</template>

<script setup lang="ts">
const client = useSupabaseClient()

const logout = async function(){
  console.log('LOGOUT');
  // return;
  const { error } = await client.auth.signOut()
  if(error){
    console.log(error,'ERROR');
    return;
  }
  sweetAlert({
            title: "Bye bye!",
            text: "Logged Out!",
            icon: "success"
        });
  navigateTo('/login');
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>