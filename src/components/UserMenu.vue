<template>
  <div class="account-menu" @click="isUserMenuOpen=true">
    <p>{{ store.getters.getUserName }}</p>
  </div>
  <div class="menu-wrapper" v-show="isUserMenuOpen" @click.self="isUserMenuOpen=false">
    <div class="user-menu">
      <div class="utility-menu">
        <p>ユーザー設定</p>
      </div>

      <div class="sign-out-menu">
        <p @click="signOut">サインアウト</p>
      </div>
     </div>
  </div>
</template>

<script lang="ts" setup>
import {store} from "@/plugins/store";
import {auth} from "@/plugins/firebase";
import {ref} from "vue";

const isUserMenuOpen = ref<boolean>(false)

const signOut = async function () {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      return
    }
    if (!auth.currentUser) {
      return
    }
    await auth.signOut()
    await store.dispatch("signOut")
  })
}

</script>

<style scoped>
  .account-menu{

  }

  .menu-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
  }
  .user-menu{
    width: 20%;
    height: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 24px;
    background: #fff;
    position: absolute;
    border:solid;
    z-index: 2;
  }

  .sign-out-menu{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    background: antiquewhite;
  }
</style>
