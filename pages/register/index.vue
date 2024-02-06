<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-6">
                <form @submit.prevent="register">
                  <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" autocomplete="email" aria-describedby="emailHelp" v-model="credentials.email">
                        <template v-if="v$.credentials.email.$dirty">
                            <span v-if="v$.credentials.email.required.$invalid" class="text-danger">Email is required.</span>
                            <br v-if="v$.credentials.email.required.$invalid"/>
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
                  <button type="submit" class="btn btn-primary">register</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { useVuelidate } from '@vuelidate/core'
import { required, email  } from '@vuelidate/validators'
import Swal from '@/utils/sweetAlert.js'

definePageMeta({
  layout: false
})
const client = useSupabaseClient()
const credentials = reactive({
    email:null,
    password:null,
})

/** VALIDATIONS */
const validations = {
    credentials: {
        email: { required, email },
        password: { required },
    },
};

/** VALIDATOR */
const {value : v$} = useVuelidate(validations, {credentials}, { $autoDirty: true, $lazy: true});

const register = async function(){
    const { data, error } = await client.auth.signUp({
        email: credentials.email,
        password: credentials.password
    })
    
    console.log(data, error, "register data, error");
}
</script>

<style scoped>

</style>