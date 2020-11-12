<template>
  <div class="page">
    <h1 class="title">
      {{ bulochka.title }}
    </h1>
    <div class="content">
      <div class="column-image">
        <div>
          <img class="image" :src="bulochka.img">
          <div class="buy-wrap">
            <vs-button
              warn
              gradient
              size="xl"
            >
              {{ bulochka.price + ' ₽' }}
            </vs-button>
            <vs-button
              color="rgb(59,222,200)"
              gradient
              size="xl"
              style="width: 65%"
            >
              {{ quantity + ' шт. осталось' }}
            </vs-button>
          </div>
          <div class="buy-wrap">
            <template v-if="isAuth">
              <vs-input
                v-model="cartQuantity"
                type="number"
                class="buy-q"
                min="1"
                :max="quantity"
              />
              <vs-button
                style="width: 100%"
                flat
                :disabled="!canBuy"
                @click="addToCart"
              >
                Добавить в корзину
              </vs-button>
            </template>
            <template v-else>
              <vs-button
                style="width: 100%"
                flat
                size="xl"
              >
                Войдите чтобы купить
              </vs-button>
            </template>
          </div>
        </div>
      </div>
      <div class="column-info">
        <p class="info-text">
          {{ bulochka.fullDesc }}
        </p>
        <div class="desc-wrap">
          <p class="desc">
            Белки: 145
          </p>
          <p class="desc">
            Жиры: 444
          </p>
          <p class="desc">
            Углеводы: 999
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      cartQuantity: 1
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },

    bulochka () {
      return this.$store.state.bulochki.list[this.id]
    },

    quantity () {
      return this.$store.state.quantity.quantity[this.id]
    },

    canBuy () {
      return Number(this.cartQuantity) > 0 && Number(this.cartQuantity) <= Number(this.quantity)
    },

    isAuth () {
      return this.$store.state.auth.isAuth
    }
  },
  mounted () {
    // console.log('111', this.$route.params.id)
  },
  methods: {
    addToCart () {
      this.$store.commit('cart/add', { id: this.id, quantity: this.cartQuantity })
    }
  },
  head () {
    return { title: this.bulochka.title + ' - Bulochki' }
  }
}
</script>

<style>
.title {
    font-size: 60px;
    margin-bottom: 20px;
}

.page {
    margin-top: 40px;
}

.content {
    display: flex;
}

.image {
    width: 300px;
    border-radius: 15px;
}

.column-info {
    margin-left: 40px;
}

.info-text {
    font-size: 24px;
}

.desc-wrap {
    margin-top: 10px;
}

.desc {
    color: rgb(88, 88, 88);
    font-weight: 600;
    font-size: 16px;
}

.buy-wrap {
    display: flex;
    margin-top: 10px;
}

.buy-wrap .vs-input {
  width: 60px;
}
</style>
