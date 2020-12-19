import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        drops: [],
        attempts: null
    }
}

const state = getDefaultState()

const mutations = {
    SET_DROPS: (state, drops) => {
        state.drops = drops
    },
    SET_TRY: (state, attempts) => {
        state.attempts = attempts
    }
}

const actions = {
    async getDrops({dispatch, commit}, drop) {
        const currentUser = firebase.auth().currentUser.uid
        const drops = (await firebase.database().ref(`/users/${currentUser}/drops`).once('value')).val()
        let array = []
        let fiveStars = []

        Object.keys(drops).forEach((key, index) => {
            let obj = drops[key]
            if(obj.stars === 5) {
                fiveStars.push(index)
            }
            obj.key = key
            array.push(obj);
        });
        if(fiveStars.length !== 0) {
            commit('SET_TRY', array.length - +fiveStars[fiveStars.length - 1] - 1)
        }
        commit('SET_DROPS', array)
    },

    async addDrop({dispatch, commit}, drop) {
        const currentUser = firebase.auth().currentUser.uid
        firebase.database().ref(`/users/${currentUser}/drops`).push(drop)
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}
