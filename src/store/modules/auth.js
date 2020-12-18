import firebase from 'firebase'

const actions = {
    async login({dispatch, commit}, {email, password}) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch('getUid').then(resp => {
                console.log(resp)
            })
        } catch(e) {
            throw e
        }
    },
    async register({dispatch, commit}, {email, password}) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch(e) {
            throw e
        }
    },
    getUid() {
      const user = firebase.auth().currentUser
        return user ? user.uid : null
    },
    async logout() {
        await firebase.auth().signOut()
    }
}

export default {
    namespaced: true,
    actions
}
