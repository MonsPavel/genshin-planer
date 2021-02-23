import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        heroes: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_HEROES: (state, heroes) => {
        state.heroes = heroes
    }
}

const actions = {
    async getHeroes({dispatch, commit}) {
        let heroes = []
        await firebase.database().ref(`/heroes`).orderByChild('name').on("child_added", function(data) {
            heroes.push(data.val())
        })

        commit('SET_HEROES', heroes)
    },

    async addHero({dispatch, commit}, hero) {
        firebase.database().ref(`/heroes`).push(hero)
    },
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}
