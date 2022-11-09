<template>
  <div>
    <button @click="googleSignIn">SignIn</button>
  </div>
</template>

<script>
import {auth} from "@/firebase/firebase";
import {GoogleAuthProvider,signInWithRedirect} from "firebase/auth"
export default {
  name: "IndexView",
  methods:{
    googleSignIn:async function(){
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth,provider)


    }
  }
}
</script>

<style scoped>

</style>
