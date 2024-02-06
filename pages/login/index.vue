<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-6">
                <p class="fw-bold">{{ !isSignUp ? 'Login' : 'Sign Up' }}</p>
                <form @submit.prevent="() => (!isSignUp ? login() : register())">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" required id="exampleInputEmail1" autocomplete="email" aria-describedby="emailHelp" v-model="credentials.email">
                        <template v-if="v$.credentials.email.$dirty">
                            <span v-if="v$.credentials.email.required.$invalid" class="text-danger">Email is
                                required.</span>
                            <br v-if="v$.credentials.email.required.$invalid" />
                            <span v-if="v$.credentials.email.email.$invalid" class="text-danger">Email is not valid.</span>
                        </template>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" required autocomplete="current-password" v-model="credentials.password">
                        <template v-if="v$.credentials.password.$dirty">
                            <span v-if="v$.credentials.password.required.$invalid" class="text-danger">Password is required.</span>
                        </template>
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">{{ !isSignUp ? 'Login' : 'Register' }}</button>
                        <NuxtLink type="button" @click="isSignUp = !isSignUp">{{ !isSignUp ? 'Sign Up' : 'Login' }}
                        </NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
const client = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
    layout: false
})
const isSignUp = ref(false);
const credentials = reactive({
    email: null,
    password: null,
})

/** VALIDATIONS */
const validations = {
    credentials: {
        email: { required, email },
        password: { required },
    },
};

/** VALIDATOR */
const { value: v$ } = useVuelidate(validations, { credentials }, { $autoDirty: true, $lazy: true });

const login = async function () {
    // console.log(credentials,'credentials', client.auth.signInWithPassword, 'client');
    // return;
    const { user, error } = await client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })

    if(error){
        sweetAlert({
            title: "Something Went Wrong!",
            text: error,
            icon: "error"
        });
        return;
    }
    sweetAlert({
            title: "Logged In Success!",
            text: 'SHEESH',
            icon: "success",
            timer:1500
        });
   
}

const register = async function () {
    // console.log(credentials,'credentials', client.auth.signUp, 'client');
    // return;
    const { data, error } = await client.auth.signUp({
        email: credentials.email,
        password: credentials.password
    })
    if(user){
       
    }
    console.log(data, error, "register data, error");
}
watchEffect(async () => {
    if(user.value){
        navigateTo('/');
    }
})
</script>

<style scoped></style>