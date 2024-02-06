<template>
    <div>
        <NuxtLayout>
            <template #buttons>
                <NuxtLink to="/post">Posts</NuxtLink>
            </template>
            <form @submit.prevent="store">
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
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// import client from '@/config/client.js';
import sweetAlert from '@/utils/sweetAlert.js'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength  } from '@vuelidate/validators'

// definePageMeta({
//   layout: false
// })
/** DATA */
const client = useSupabaseClient()
const router = useRouter()
const count = ref(0)
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
        content: { required, /** maxLength: maxLength(200) */  },
    },
};

/** VALIDATOR */
const {value : v$} = useVuelidate(validations, {post}, { $autoDirty: true, $lazy: true});

/** METHODS  */
const resetForm = function () {
    post.title = null;
    post.content = null;
    v$.$reset()
};

const store = async function(){
    console.log(await v$.$validate());
    if(!await v$.$validate()){
        return;
    };
    const { data, error } = await client.from("posts").insert(post).select()
    console.log(data,error);
    if(error){
        console.log(error,'SOMETHING HAPPENED WRONG');
    }

    if(data){
        resetForm();
        sweetAlert({
            title: "Post Succesfully Created!",
            text: "Congratulations!",
            icon: "success"
        });
    }
}

/** LIFECYCLE */
onMounted(()=>{
    // console.log('SHEESH ASFASFFAS');
    // console.log(count.value, "count.value");
    // console.log(post.title,"post");
    // console.log(v$,"v$");
})

</script>

<style scoped>

</style>