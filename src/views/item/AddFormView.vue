<template>
  <div class="image-add-form-wrapper">
    <div class="image-preview-area" :style="previewStyle">
      <div class="image-upload-area">
        <label for="image-upload-button" class="image-upload-button-label">+</label>
        <input id="image-upload-button" class="image-upload-hidden-button" type="file" ref="file" @change="fileUpload">
      </div>
    </div>
    <div class="item-info-input-area">
      <dl class="item-main-info-input-area">
        <dt>
          <p>アイテム名</p>
        </dt>
        <dd>
          <input class="item-name-input" type="text">

        </dd>
        <dt>
          <p>カテゴリー</p>
        </dt>
        <dd>
          <select class="item-main-category-input" ref="itemMainCategory" @change="changeMainCategory">
            <option
                v-for="mainCategory in AddItemFormViewData.item_category_list.item_main_category_list"
                :key="mainCategory.main_category_id"
                :value="mainCategory.main_category_id" :selected="mainCategory.main_category_name==='未分類'">
              {{ mainCategory.main_category_name }}
            </option>

          </select>
          <select class="item-sub-category-input">
            <option

                v-for="(subCategory,index) in AddItemFormViewData.item_category_list.item_sub_category_list[AddItemFormViewData.main_category_id]"
                :key="subCategory.sub_category_id"
                :value="subCategory.sub_category_id"
                :selected="index===0"
            >
              {{ subCategory.sub_category_name }}
            </option>
          </select>

        </dd>
      </dl>
      <div class="item-memo-input-area">
          <textarea v-model="AddItemFormViewData.item_memo">
          </textarea>
      </div>
      <div class="submit-area">

      </div>
    </div>
  </div>

</template>

<script>
import {BaseAxiosURL} from "@/assets/BaseAxiosURL";
import {auth} from "@/plugins/firebase";
import axios from "axios";

export default {
  name: "AddFormView",
  data() {
    return {
      AddItemFormViewData: {
        item_image_url: "",
        item_image_file: "",
        item_name: "",
        item_memo: "",
        main_category_id: 0,
        sub_category_id: 0,
        item_category_list: {
          item_main_category_list: [],
          item_sub_category_list: []
        }
      }
    }
  },
  mounted() {
    this.mountedMethod()
  },
  computed: {
    previewStyle() {
      return {
        backgroundImage: "url(" + this.AddItemFormViewData.item_image_url + ")"
      }
    }
  },
  methods: {
    mountedMethod: async function () {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          return
        }
        if (!auth.currentUser) {
          return
        }

        await auth.currentUser.reload()
        const token = await auth.currentUser.getIdToken(true)
        const getCategoryDataURL = BaseAxiosURL + "/categories/"
        const requestOption = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const SelectCategoryDataResponse = await axios.get(getCategoryDataURL, requestOption)
        const SelectCategoryDataResult = SelectCategoryDataResponse.data
        this.AddItemFormViewData.item_category_list.item_main_category_list = SelectCategoryDataResult.MainCategoryList
        this.AddItemFormViewData.item_category_list.item_sub_category_list = SelectCategoryDataResult.SubCategoryList
      })

    },
    changeMainCategory(e) {
      console.log(e.target.value)
      this.AddItemFormViewData.main_category_id = e.target.value
      console.log(this.AddItemFormViewData.item_category_list.item_sub_category_list[e.target.value][0])
      this.AddItemFormViewData.sub_category_id = this.AddItemFormViewData.item_category_list.item_sub_category_list[e.target.value][0]

    },
    fileUpload: function () {
      const ItemImageFile = this.$refs.file.files[0]
      console.log(ItemImageFile)
      //console.log(URL.createObjectURL(ItemImageFile))
      this.AddItemFormViewData.item_image_url = URL.createObjectURL(ItemImageFile)
      this.AddItemFormViewData.item_image_file = ItemImageFile

    }
  }
}
</script>

<style scoped>
main {
  width: 80%;

}

.image-add-form-wrapper {
  display: flex;
  width: 80%;
}

.image-preview-area {
  width: 560px;
  height: 560px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: solid 1px;
}

.image-upload-button-label {
  display: flex;
  width: 48px;
  height: 48px;
  font-size: 36px;
  justify-content: center;
  align-items: center;
}

.image-upload-hidden-button {
  display: none;
}
</style>
