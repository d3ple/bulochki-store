<template>
  <div class="page">
    <h1 class="title cart-title">
      Корзина с булочками
    </h1>
    <template v-if="Object.keys(cart).length > 0">
      <div v-for="(quant, id) in cart" :key="id" class="cart-item">
        <vs-card type="3">
          <template #title>
            <h3 @click="$router.push(`/bulochka/${id}`)">
              {{ bulochki[id].title }}
            </h3>
          </template>
          <template #img>
            <img :src="bulochki[id].img">
          </template>
          <template #text>
            <p>
              {{ bulochki[id].shortDesc }}
            </p>
          </template>
          <template #interactions>
            <vs-button danger icon @click="deleteFromCart(id)">
              Удалить
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <span class="span">
                {{ bulochki[id].price + ' ₽' }}
              </span>
            </vs-button>
            <vs-button warn gradient>
              {{ quant + ' шт.' }}
            </vs-button>
          </template>
        </vs-card>
      </div>
      <div class="promo-row">
        <div>
          <vs-input
            v-model="promocode"
            class="cart-promo"
            label="Промокод"
          />
        </div>
        <div class="promo-btn-wrap">
          <vs-button
            color="rgb(59,222,200)"
            gradient
            @click="applyPromo"
          >
            Применить
          </vs-button>
        </div>
      </div>
      <h2 class="total">
        <span>
          Итого:
        </span>
        <span v-if="!isPromoValid">
          {{ totalSum + '₽' }}
        </span>
        <s v-if="isPromoValid" style="color: red; margin-right: 6px; margin-left: 6px">
          {{ totalSum + '₽' }}
        </s>
        <span v-if="isPromoValid" style="color: #3bdec8">
          {{ totalSum - (50 /100 * totalSum) + '₽' }}
        </span>
      </h2>
    </template>
    <template v-else>
      <p class="empty-text">
        👨‍🍳 Булочки стынут, добавляй их скорее в корзину
      </p>
    </template>
  </div>
</template>

<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      promocode: '',
      isPromoValid: false
    }
  },
  computed: {
    bulochki () {
      return this.$store.state.bulochki.list
    },

    quantity () {
      return this.$store.state.bulochki.quantity
    },

    cart () {
      return this.$store.state.cart.cart
    },

    totalSum () {
      return Object.keys(this.cart).reduce((acc, id) => {
        return acc + this.bulochki[id].price * this.cart[id]
      }, 0)
    }
  },
  methods: {
    deleteFromCart (id) {
      this.$store.commit('cart/remove', id)
    },

    openNotification (position = null, color) {
      this.$vs.notification({
        color,
        position,
        title: 'Такого промокода у нас нет',
        text: 'Попробуй ввести "uchi-uchis"'
      })
    },

    applyPromo () {
      if (this.promocode === 'uchi-uchis') {
        this.isPromoValid = true
      } else {
        this.openNotification('top-center', 'danger')
      }
    }
  },
  head () {
    return { title: 'Корзина - Bulochki' }
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

.cart-title {
  margin-bottom: 30px;
}

.cart-item {
  margin-bottom: 30px;
}

.cart-item .vs-card {
  min-width: 100% !important;
  width: 100% !important;
  max-width: 100% !important;
}

.cart-item .vs-card__img {
  width: 20%;
  height: 100px;
}

.total {
  margin-top: 30px;
}

.empty-text {
  font-size: 20px;
}

.cart-promo {
  margin-top: 45px;
}

.cart-promo .vs-input {
  min-width: 200px;
}

.cart-promo .vs-input__label--label {
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 16px;
}

.promo-row {
  display: flex;
}

.promo-btn-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.promo-btn-wrap .vs-button {
  margin-bottom: 0px;
}
</style>
