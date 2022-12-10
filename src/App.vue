<template>
  <div id="wrapper" v-if="store.getters.isSignIn">
    <header>

      <UserMenu/>

      <div class="sign-in">
        <div class="main-menu">
          <div class="menu-box">
            <router-link to="/item/list">Item list</router-link>
          </div>
          <div class="menu-box">
            <router-link to="/outfit/list">Outfit list</router-link>
          </div>
        </div>

      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
  <div class="no-sign-in-page" v-else>
    <p>NOT Sign in</p>
    <button @click="signIn">Sign in here</button>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "@/plugins/store";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/plugins/firebase";
import {BaseAxiosURL} from "@/assets/BaseAxiosURL";
import axios, {AxiosRequestConfig} from "axios";
import UserMenu from "@/components/UserMenu.vue";

const store = useStore()
const signIn = async function () {
  const provider = new GoogleAuthProvider()
  console.log("TEST")
  await signInWithPopup(auth, provider)
  if (!auth.currentUser) {
    return;
  }
  const token = await auth.currentUser.getIdToken(true)
  const requestOption: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const axiosResponse = await axios.post(BaseAxiosURL + "/users/", {}, requestOption)
  const responseData = axiosResponse.data
  await store.dispatch("setUserName", responseData.UserName)
}



</script>

<style>
* {
  margin: 0;
}

#wrapper {
  display: flex;
}

header {
  width: 20%;
  height: 100%;
  display: block;
  position: fixed;
}

main {
  width: 80%;
  margin-left: 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}


.logo-menu {
  height: 25%;
}

.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75%;
}
</style>
