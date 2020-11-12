import Vue from 'vue'

export const state = () => ({
  cart: {}
})

export const mutations = {
  setCart (state, cart) {
    state.cart = cart
  },

  add (state, { id, quantity }) {
    Vue.set(state.cart, id, (state.cart[id] || 0) + Number(quantity))

    localStorage.setItem('cart', JSON.stringify(state.cart))
  },

  remove (state, id) {
    Vue.delete(state.cart, id)

    localStorage.setItem('cart', JSON.stringify(state.cart))
  }
}
