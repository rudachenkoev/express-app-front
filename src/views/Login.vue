<script setup lang="ts">
import { reactive } from 'vue'
// Use methods and configurations
//
const body = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <h1 class="text-5xl leading-normal font-medium mb-11">{{ $t('signIn') }}</h1>
  <div class="flex space-x-5 mb-12">
    <AppButton icon="google" :label="$t('signInWithGoogle')" color="info" width="full"/>
    <AppButton icon="facebook" color="surface"/>
    <AppButton icon="apple" color="surface"/>
  </div>

  <AppInput
    v-model="body.email"
    :label="$t('enterYourEmail')"
    :placeholder="$t('email')"
    width="full"
    class="mb-9"
  />
  <AppInput
    v-model="body.password"
    :label="$t('enterYourPassword')"
    :placeholder="$t('password')"
    type="password"
    width="full"
    class="mb-3"
  />
  <div class="text-right mb-11">
    <router-link to="#" class="text-sm text-primary">{{ $t('forgotPassword') }}</router-link>
  </div>

  <AppButton :label="$t('signIn')" width="full"/>
  <div class="text-secondary text-sm text-center mt-8">
    {{ $t('noAccount') }}
    <router-link to="#" class="text-primary">{{ $t('signUp') }}</router-link>
  </div>
</template>
