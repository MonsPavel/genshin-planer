import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        drops: []
    }
}

const state = getDefaultState()

const actions = {
    getDrops({dispatch, commit}, drop) {
        dispatch('auth/getUid').then(resp => {
            firebase.database().ref(`/users/${resp}/drops`).push(drop)
        })
    }
}

export default {
    namespaced: true,
    actions,
    state
}
