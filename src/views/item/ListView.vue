<template>
  <div class="item-list-wrapper">
    <section v-for="item in ItemListViewData.ItemList" :key="item.item_id">
      {{ item.item_name }}
      {{ item.item_image_url }}
      {{item.item_id}}
      {{item.bland_name}}
      {{item.main_category_name}}/{{item.sub_category_name}}
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/firebase/firebase";
import {BaseAxiosURL} from "@/assets/BaseAxiosURL"
import axios from "axios"
import {ItemListViewData} from "@/Type"

export default defineComponent({
  name: "ItemListView",
  data() {
    return{
      ItemListViewData:{
        ItemList:[]
      } as ItemListViewData
    }
  },
  beforeMount() {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {this.$router.push("/");return;}
      if(!auth.currentUser){this.$router.push("/");return}
      await auth.currentUser.reload()
      const token = await auth.currentUser.getIdToken(true)

      const axiosURL = BaseAxiosURL + "/items"
      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const axiosResult = await axios.get(axiosURL, requestOption)
      const responseBody = axiosResult.data
      if (responseBody.ServerError || responseBody.ClientError) {
        return
      }
      this.ItemListViewData.ItemList = responseBody.ItemList
    })

  }

  ,
  methods: {

  }
})
</script>

<style scoped>

</style>
