<template>
  <div class="col-8">
    <div class="text-end mb-2">
      <NuxtLink to="/post/create" class="me-2 btn btn-primary btn-md">Create</NuxtLink>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="posts.length">
            <tr v-for="(post,index) in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
              <td>
                <div class="d-flex">
                  <NuxtLink :to="`/post/edit/${post.id}`" class="me-2 btn btn-primary btn-sm"><i class="fa-solid fa-pencil"></i></NuxtLink>
                  <button class="btn btn-danger btn-sm" @click="destroyConfirmation(post.id, index)" type="button"><i class="fa-solid fa-trash"></i></button> 
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-center">
              <td colspan="4">No Data Found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// import supaBaseConnection from '@/config/supaBaseConnection.js';
const client = useSupabaseClient()
import Swal from '@/utils/sweetAlert.js';
// import edit from './edit/[id].vue';
// definePageMeta({
//   layout: false
// })
/** DATA */
const posts = reactive([]);

/** METHODS */
const getPosts = async function () {
  console.log('WTF');
  const { data, error } = await client.from("posts").select('*').order('id', { ascending: false });
  if (error) {
    console.error("Error fetching data:", error.message);
  }
  if (data) {
    posts.push(...data);
  }
}

const destroy = async function (id:number, index:number) {
  const { error } = await client
      .from('posts')
      .delete()
      .eq('id', id)

  if(error){
    sweetAlert({
          title: "Something went wrong!",
          text: "Post cannot delete!",
          icon: "error",
    });
  }
  posts.splice(index,1);

  sweetAlert({
        title: "Post Succesfully Deleted!",
        text: "Congratulations!",
        icon: "success",
        timer: 1500
  });
}
const destroyConfirmation = async function(id:number, index:number){
  Swal({
    title: "Are you sure?",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      destroy(id, index)
    }
  });
}
/** LIFECYCLE HOOKS */
onMounted(() => getPosts())


</script>

<style scoped></style>