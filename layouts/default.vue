<template>
  <div class="main">
    <vs-navbar v-model="active" class="navbar" color="warn">
      <template #left>
        <nuxt-link to="/" class="logo">
          <img class="logo__img" src="~/assets/images/logo.png">
          <span class="logo__text">
            Bulochki
          </span>
        </nuxt-link>
      </template>
      <template #right>
        <!-- <vs-button flat>
          Войти
        </vs-button> -->
        <vs-button
          v-if="isAuth"
          color="rgb(59,222,200)"
          gradient
          size="large"
          to="/cart"
        >
          Корзина
          <span v-if="totalSum > 0">
            {{ ': ' + totalSum + '₽' }}
          </span>
        </vs-button>
        <vs-button
          v-else
          color="rgb(59,222,200)"
          gradient
          size="large"
          @click="isLoginFormActive=!isLoginFormActive"
        >
          Войти
        </vs-button>
      </template>
      <vs-dialog v-model="isLoginFormActive">
        <template #header>
          <h4 class="not-margin">
            Войти в <b>Bulochki</b>
          </h4>
        </template>

        <div class="login-form">
          <vs-input v-model="login" placeholder="Логин" />
          <vs-input v-model="password" type="password" placeholder="Пароль">
            <template #message-danger>
              {{ errMsg }}
            </template>
          </vs-input>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button
              block
              warn
              gradient
              @click="checkLogin"
            >
              Войти
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </vs-navbar>
    <div class="content">
      <Nuxt />
    </div>
    <div class="footer">
      <span>
        ООО "Нурвыпечка"
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'guide',
    login: '',
    password: '',
    isLoginFormActive: false,
    errMsg: ''
  }),
  computed: {
    totalSum () {
      return Object.keys(this.$store.state.cart.cart).reduce((acc, id) => {
        return acc + this.$store.state.bulochki.list[id].price * this.$store.state.cart.cart[id]
      }, 0)
    },

    isAuth () {
      return this.$store.state.auth.isAuth
    }
  },
  watch: {
    isLoginFormActive (value) {
      this.login = ''
      this.password = ''
      this.errMsg = ''
    }
  },
  created () {
    if (process.client) {
      this.$store.commit('cart/setCart', JSON.parse(localStorage.getItem('cart')) || {})
    }
  },
  methods: {
    checkLogin () {
      if (this.password === 'uchi-uchis') {
        this.$store.commit('auth/login')
        this.isLoginFormActive = false
      } else {
        this.errMsg = 'Неправильный пароль'
      }
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  position: relative;
  min-height: calc(100vh - 120px);
}

.navbar {
  position: relative;
  padding: 10px 60px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo__img {
  height: 50px;
}

.logo__text {
  margin-left: 7px;
  font-weight: 900;
  font-size: 30px;
  color: black;
}

.content {
  max-width: 1200px;
  margin: 0px auto;
}

.footer {
  width: 100%;
  height: 80px;
  background-color: #ffba00;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  position: absolute;
  bottom: -120px;
}

.login-form .vs-input {
  width: 100%;
  margin-bottom: 10px;
}

.login-form .vs-input__label {
  margin-bottom: 10px;
}
</style>
