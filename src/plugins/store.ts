import {InjectionKey} from 'vue';
import {createStore, useStore as baseUseStore, Store} from 'vuex'

type State = { userName: string|null };

import vuexPersistedState  from "vuex-persistedstate"

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        userName: null
    },
    mutations: {
        updateUserName: function (store,userName) {
            store.userName = userName
        },
        signOutUser: function (store){
            store.userName = null
        }
    },
    actions: {
        setUserName: function ({commit},userName) {
            commit("updateUserName",userName)
        },
        signOut:function({commit}){
            commit("signOutUser")
        }
    },
    getters: {
        getUserName: function (store) {
            return store.userName + "さん"
        },
        isSignIn:function (store){
            return !!store.userName
        }
    },
    plugins:[
        vuexPersistedState()
    ]
})

// 独自の `useStore` 関数を定義します
export function useStore() {
    console.log(baseUseStore(key))
    return baseUseStore(key)
}
