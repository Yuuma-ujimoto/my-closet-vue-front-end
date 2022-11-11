<template>
  <div class="item-info-wrapper">
    <div class="left-side">
      <img class="item_image" :src="ItemInfoData.ItemInfo.item_image_url" alt="item image">
      <div>
        <p>{{ItemInfoData.ItemInfo.item_name}}</p>
        <p>{{ItemInfoData.ItemInfo.item_id}}</p>
        <p>{{ItemInfoData.ItemInfo.item_color}}</p>
        <p>{{ItemInfoData.ItemInfo.sub_category_name}}</p>
        <p>{{ItemInfoData.ItemInfo.main_category_name}}</p>
        <p>{{ItemInfoData.ItemInfo.bland_name}}</p>
      </div>
    </div>
    <div class="right-side">
      <textarea v-model="ItemInfoData.ItemInfo.item_memo_text"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/firebase/firebase";
import {BaseAxiosURL} from "@/assets/BaseAxiosURL";
import axios from "axios";
import {ItemInfoViewData} from "@/Type";

export default defineComponent({
  name: "ItemInfoView",
  data() {
    return {
      ItemInfoData: {
        ItemInfo: {}
      } as ItemInfoViewData
    }
  },
  beforeMount() {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // :TODO: 後でリダイレクトから通知に変更
        this.$router.push("/");
        return
      }
      if (!auth.currentUser) {
        this.$router.push("/")
        ;
        return
      }

      await auth.currentUser.reload()
      const token = await auth.currentUser.getIdToken(true)
      try {
        if (!this.$route.params.id) {
          return
        }
        const axiosURL = BaseAxiosURL + "/items/" + this.$route.params.id
        console.log(axiosURL)
        const requestOption = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const axiosResult = await axios.get(axiosURL, requestOption)

        const responseData = axiosResult.data
        if (responseData.ServerError || responseData.ClientError || !responseData.ItemInfo) {
          return
        }
        this.ItemInfoData.ItemInfo = responseData.ItemInfo

      } catch (e) {
        console.log(e)
      }
    })
  }
})
</script>

<style scoped>

</style>
