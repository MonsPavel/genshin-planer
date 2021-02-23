import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        weapons: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_WEAPONS: (state, weapons) => {
        state.weapons = weapons
    }
}

const actions = {
    async getWeapons({dispatch, commit}) {
        let weapons = []
        await firebase.database().ref(`/weapons`).orderByChild('name').on("child_added", function(data) {
            weapons.push(data.val())
        })

        commit('SET_WEAPONS', weapons)
    },

    async addWeapon({dispatch, commit}, weapon) {
        firebase.database().ref(`/weapons`).push(weapon)
    },
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}
