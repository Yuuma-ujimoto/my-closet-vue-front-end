<template>
  <div class="item-list-wrapper">

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/firebase/firebase";
import {BaseAxiosURL} from "@/assets/BaseAxiosURL"
import axios from "axios"
export default defineComponent({
  name: "ListView",
  data() {
    return {
      ItemList: []
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push("/");
        return;
      }
      this.getFirebaseToken().then(async (token)=>{
        if (!token){return;}

        console.log(token)

        const axiosURL = BaseAxiosURL + "/item/list"
        const requestOption = {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

        const axiosResult = await axios.get(axiosURL,requestOption)
        console.log(axiosResult)

        const responseBody = axiosResult.data
        if (responseBody.ServerError||responseBody.ClientError){
          return
        }
        this.ItemList = responseBody.ItemList

      })

    })
  },
  methods: {
    getFirebaseToken: async function ():Promise<string|null> {
      if (!auth.currentUser) {
        return null
      }
      await auth.currentUser.reload()
      return auth.currentUser.getIdToken(true)
    }
  }
})
</script>

<style scoped>

</style>
