import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        drops: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_DROPS: (state, drops) => {
        state.drops = drops
    }
}

const actions = {
    async getDrops({dispatch, commit}, drop) {
        const currentUser = firebase.auth().currentUser.uid
        const drops = (await firebase.database().ref(`/users/${currentUser}/drops`).once('value')).val()
        let array = [];

        Object.keys(drops).forEach((key, index) => {
            let obj = drops[key]
            obj.key = key
            array.push(obj);
        });
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
