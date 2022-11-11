/* :MEMO:
       末尾DataはVue内のDataの型
       末尾ColumnはSQLの結果を表す型
*/


type ItemListItemColumn = {
    item_id: number,
    item_name: string,
    item_image_url: string,
    main_category_name: string,
    main_category_id: number,
    sub_category_name: string,
    sub_category_id: number,
    bland_name:string,
    bland_id:number,
}

export type ItemList = Array<ItemListItemColumn>

export interface ItemListViewData {
    ItemList: ItemList
}


export type ItemInfoColumn = {
    item_id: number,
    item_name: string,
    item_image_url: string,
    main_category_name: string,
    main_category_id: number,
    sub_category_name: string,
    sub_category_id: number,
    item_memo_text: string,
    item_color: string,
    bland_id: number,
    bland_name: string
}

export type ItemInfoViewData = {
    ItemInfo: ItemInfoColumn
}

