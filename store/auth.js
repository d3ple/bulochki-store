export const state = () => ({
  isAuth: false
})

export const mutations = {
  login (state) {
    state.isAuth = true
  },

  logout (state) {
    state.isAuth = false
  }
}
