<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="
        w-11/12
        md:w-6/12
        flex flex-col
        gap-y-3
        shadow-md
        p-5
        rounded
        border
      "
    >
      <div class="sm:flex justify-between items-center gap-5">
        <h2 class="text-xl font-bold">
          {{ register ? 'Register' : 'Sign in' }}
        </h2>
        <p v-if="register">
          Already got an account?
          <span @click="register = false" class="underline cursor-pointer">
            Log in
          </span>
        </p>
        <p v-else>
          Need an account?
          <span @click="register = true" class="underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
      <BaseInputText
        v-model.trim="email"
        placeholder="Email"
        name="email"
        type="text"
        autofocus
        @keypress.enter="submit"
      />
      <BaseInputText
        id="password"
        v-model="password"
        placeholder="Password"
        name="password"
        type="password"
        @keypress.enter="submit"
      />
      <BaseButton
        :disabled="processingForm"
        @click="submit"
        class="sm:self-end"
      >
        {{ register ? 'Sign up' : 'Login' }}
      </BaseButton>
      <p v-if="authError" v-html="authError"></p>
    </div>
  </div>
</template>

<script>
import { authMethods } from '@/store/helpers'

export default {
  data() {
    return {
      email: '',
      password: '',
      authError: null,
      processingForm: false,
      register: false,
    }
  },

  mounted() {
    this.$emit('init')
  },

  methods: {
    ...authMethods,
    submit() {
      this.register ? this.tryToSignUp() : this.tryToLogIn()
    },
    tryToLogIn() {
      this.processingForm = true
      this.authError = null
      const credentials = {
        email: this.email,
        password: this.password,
      }
      return this.logIn(credentials)
        .then(() => {
          this.processingForm = false
          // Redirect to the originally requested page, or to the root page
          this.$router.push(this.$route.query.redirectFrom || { path: '/' })
        })
        .catch(error => {
          this.processingForm = false
          this.authError = error
        })
    },
    tryToSignUp() {
      this.processingForm = true
      this.authError = null
      const credentials = {
        email: this.email,
        password: this.password,
      }
      return this.signUp(credentials)
        .then(() => {
          this.tryToLogIn()
        })
        .catch(error => {
          this.processingForm = false
          this.authError = error.full_messages?.join('<br/>')
        })
    },
  },
}
</script>
