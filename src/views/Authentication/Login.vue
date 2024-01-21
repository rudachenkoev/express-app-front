<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'
import { setAuthToken } from '@composables/auth'
import { useRoute } from 'vue-router'
import { useUserStore } from '@stores/user'
import { storeToRefs } from 'pinia'
// Use methods and configurations
const route = useRoute()
const userStore = storeToRefs(useUserStore())
//
interface LoginForm {
  email: string,
  password: string
}
const body: LoginForm = reactive({
  email: userStore.email,
  password: ''
})
// Validation
const rules = computed(() => ({
  email: { required, email },
  password: { required }
}))
const v$ = useVuelidate(rules, body)

const isLoading = ref(false)
const onSubmit = async () => {
  if (v$.value.$invalid) return v$.value.$touch()

  isLoading.value = true
  try {
    const response = await axios.post('v1/auth/login', body)
    setAuthToken({ jwt: response.data.bearer })
    location.href = route.query.path ? String(route.query.path) : '/'
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex space-x-3 md:space-x-5 mb-8">
    <AppButton icon="google" :label="$t('signInWithGoogle')" color="info" class="w-full"/>
    <AppButton icon="facebook" color="surface"/>
    <AppButton icon="apple" color="surface"/>
  </div>

  <AppInput
    v-model="body.email"
    :label="$t('enterYourEmail')"
    :placeholder="$t('email')"
    :error-messages="v$.email.$errors"
    type="email"
    width="full"
    class="mb-9"
    @blur="v$.email.$touch()"
    @keyup.enter="onSubmit"
  />
  <AppInput
    v-model="body.password"
    :label="$t('enterYourPassword')"
    :placeholder="$t('password')"
    :error-messages="v$.password.$errors"
    type="password"
    width="full"
    class="mb-3"
    @blur="v$.password.$touch()"
    @keyup.enter="onSubmit"
  />
  <div class="text-right mb-11">
    <router-link :to="{ name: 'password-recovery' }" class="text-xs md:text-sm text-primary">
      {{ $t('forgotPassword') }}
    </router-link>
  </div>

  <AppButton :label="$t('signIn')" :loading="isLoading" class="w-full" @click="onSubmit"/>
  <div class="text-xs md:text-sm text-secondary text-center mt-8">
    {{ $t('noAccount') }}
    <router-link :to="{ name: 'registration' }" class="text-primary">
      {{ $t('signUp') }}
    </router-link>
  </div>
</template>
