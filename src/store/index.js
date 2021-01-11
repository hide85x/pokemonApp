import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    pokemons: []
  },
  mutations: {
    setName(state, payload) {
      return state.username = payload
    },
    getPokemons(state) {
      return state.pokemons
    },
    clearData(state) {
      return state.pokemons = []
    },

    async collectPokemons(state) {
      const offset = state.username.length * 10
      try {
        const pokemonsFromApi = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
        pokemonsFromApi.data.results.map(async (e) => {
          let singlePokemon = await axios.get(e.url)

          this.state.pokemons.push({
            name: singlePokemon.data.name,
            artwork: singlePokemon.data.sprites.other['official-artwork'].front_default,
            stats: singlePokemon.data.stats.map(
              e => ({
                name: e.base_stat,
                value: e.stat.name

              })),
          })
        })
      }
      catch (err) { console.log(err) }
    }
  },
  actions: {
    setName({ commit }, payload) {
      commit('setName', payload)
    },
    collectPokemons({ commit }) {
      commit('collectPokemons')
    },
    clearData({ commit }) {
      commit('clearData')
    }

  },
  modules: {
  }
})
