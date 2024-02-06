<template>
     <div class="container mt-5">
        <NuxtLink to="/post">Posts</NuxtLink>
        <div class="row justify-content-center">
            <div class="col-6">
                <form @submit.prevent="update">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="post.title">
                        <template v-if="v$.post.title.$dirty">
                            <span v-if="v$.post.title.required.$invalid" class="text-danger">Title is required.</span>
                        </template>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Content</label>
                        <textarea type="password" class="form-control" id="exampleInputPassword1" rows="5" cols="5"  v-model="post.content"/>
                        <template v-if="v$.post.content.$dirty">
                            <span v-if="v$.post.content.required.$invalid" class="text-danger">Content is required.</span>
                        </template>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary form-control">Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import client from '@/config/client';
// import sweetAlert from '@/utils/sweetAlert.js'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength  } from '@vuelidate/validators'
definePageMeta({
  layout: false
})
/** DATA */
const client = useSupabaseClient()
const route = useRoute();
const post = reactive(
    {
        title:null,
        content:null,
    }
)
/** VALIDATIONS */
const validations = {
    post: {
        title: { required,  /**$autoDirty: true SPECIFIC TRACKING OF VALIDATION*/  },
        content: { required,/** maxLength: maxLength(200) */  },
    },
};

/** VALIDATOR */
const {value : v$} = useVuelidate(validations, {post}, { $autoDirty: true, $lazy: true });

/** METHODS  */
const resetForm = function () {
    v$.$reset()
};

const update = async function(){
    console.log(await v$.$validate(), !await v$.$validate(),'FC');
    if(!await v$.$validate()){
        return;
    };

    const { data, error } = await client.from("posts").update(post).eq('id',route.params.id).select('*')
    console.log(error,'error');
    if(error){
        sweetAlert({
            title: "Something Went Wrong!",
            text: error.details,
            icon: "error"
        });
        return
    }

    if(data){
        resetForm();
        sweetAlert({
            title: "Post Succesfully Updated!",
            text: "Congratulations!",
            icon: "success"
        });
    }
}

/** LIFECYCLE HOOKS */
onBeforeMount(async ()=>{
  const {data, error} = await client.from('posts').select('*').eq('id',route.params.id).single();
  if(error){
    sweetAlert({
            title: "Something Went Wrong!",
            text: error.details,
            icon: "error"
        });
        return
  }

  if(data){
    post.title   = data.title;
    post.content = data.content;
  }
})
onMounted(()=>{
    console.log(v$,"v$");
})
</script>

<style scoped>

</style>