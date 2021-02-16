import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        info: null
    }
}

const state = getDefaultState()

const actions = {
    getUserInfo({dispatch, commit}) {
       dispatch('auth/getUid').then(resp => {
           firebase.database().ref(`/users/${uid}/info`).once('value')
               .then(resp => {
                   const info = resp.val()
                   commit('SET_INFO', info)
               })
       })
    }
}

export default {
    namespaced: true,
    actions,
    state
}