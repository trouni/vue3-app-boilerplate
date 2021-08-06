<template>
  <div class="flex flex-col justify-center items-center">
    <div class="w-full md:w-6/12">
      <p v-if="register">
        Already got an account?
        <BaseButton @click="register = false">Log in</BaseButton>
      </p>
      <p v-else>
        Need an account?
        <BaseButton @click="register = true">Register</BaseButton>
      </p>
      <div>
        <p v-if="authError" v-html="authError"></p>
        <BaseInputText
          v-model.trim="email"
          label="Email"
          name="email"
          type="text"
          autofocus
          @keypress.enter="submit"
        />
        <BaseInputText
          id="password"
          v-model="password"
          label="Password"
          name="password"
          type="password"
          @keypress.enter="submit"
        />
        <div>
          <BaseButton :disabled="processingForm" @click="submit">
            {{ register ? 'Sign up' : 'Login' }}
          </BaseButton>
        </div>
      </div>
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
          this.authError = error.full_messages.join('<br/>')
        })
    },
  },
}
</script>
