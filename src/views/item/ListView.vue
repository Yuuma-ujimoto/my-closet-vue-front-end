<template>
    <div class="item-list-wrapper">
      <section class="item-column" v-for="item in ItemListViewData.ItemList" :key="item.item_id">
        <div class="item-image" :style="{backgroundImage:'url('+item.item_image_url+')'}">

        </div>
        <div class="item-info">
          <p class="item-name">{{ item.item_name }}</p>
          <p> {{ item.main_category_name }}/{{ item.sub_category_name }}</p>
          <p> {{ item.bland_name }}</p>
        </div>
      </section>
    </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {auth} from "@/plugins/firebase";
import {BaseAxiosURL} from "@/assets/BaseAxiosURL"
import axios from "axios"
import {ItemListViewData} from "@/Type"

export default defineComponent({
  name: "ItemListView",
  data() {
    return {
      ItemListViewData: {
        ItemList: []
      } as ItemListViewData
    }
  },
  beforeMount() {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.$router.push("/");
        return;
      }
      if (!auth.currentUser) {
        this.$router.push("/");
        return
      }
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
  methods: {}
})
</script>

<style scoped>


.item-list-wrapper {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;


}

.item-column {
  width: 270px;
  height: 420px;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.item-image {
  width: 270px;
  height: 300px;
  background-size: cover;
  background-position: center;
}

.item-info {
  width: 270px;
  box-sizing: border-box;
  height: 100px;
  border: solid 1px #000000;
  border-top: none;
}

.item-name {
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

</style>
