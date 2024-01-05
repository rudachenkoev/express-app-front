<script setup lang="ts">
import { reactive, computed } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// Use methods and configurations
//
interface LoginForm {
  email: string,
  password: string
}
const body: LoginForm = reactive({
  email: '',
  password: ''
})
// Validation
const rules = computed(() => ({
  email: { required },
  password: { required }
}))
const v$ = useVuelidate(rules, body)

const onSubmit = async () => {
  if (v$.value.$invalid) return v$.value.$touch()
}
</script>

<template>
  <h1 class="text-4xl md:text-5xl leading-normal font-medium mb-11">{{ $t('signIn') }}</h1>
  <div class="flex space-x-3 md:space-x-5 mb-12">
    <AppButton icon="google" :label="$t('signInWithGoogle')" color="info" width="full"/>
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
  />
  <div class="text-right mb-11">
    <router-link to="#" class="text-xs md:text-sm text-primary">{{ $t('forgotPassword') }}</router-link>
  </div>

  <AppButton :label="$t('signIn')" width="full" @click="onSubmit"/>
  <div class="text-secondary text-xs md:text-sm text-center mt-8">
    {{ $t('noAccount') }}
    <router-link to="#" class="text-primary">{{ $t('signUp') }}</router-link>
  </div>
</template>
