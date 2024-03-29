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
    },

    async deleteDrop({dispatch, commit}, key) {
        const currentUser = firebase.auth().currentUser.uid
        await firebase.database().ref(`/users/${currentUser}/drops/${key}`).remove()
        let drops = state.drops.filter(drop => drop.key !== key)
        commit('SET_DROPS', drops)
    },

    async updateDrop({commit, dispatch}, {
        type,
        name,
        stars,
        date,
        id
    }) {
        const currentUser = firebase.auth().currentUser.uid
        await firebase.database().ref(`/users/${currentUser}/drops`).child(id).update({
            type,
            name,
            stars,
            date
        })
    },

    getFilteredDrops({dispatch, commit}) {
        const currentUser = firebase.auth().currentUser.uid
        let filteredDrops = []
        firebase.database().ref(`/users/${currentUser}/drops`).orderByChild("stars").equalTo(5).on("child_added", function(data) {
            filteredDrops.push(data.val())
        })
        commit('SET_DROPS', filteredDrops)
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}
