import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: import("@/views/IndexView.vue")
    },
    {
        path: "/item/list",
        name: "item list",
        component: import("@/views/item/ListView.vue")
    },
    {
        path: "/item/info/:id",
        name: "item info",
        component: import("@/views/item/InfoView.vue")
    },
    {
        path: "/item/add",
        name: "item add",
        component: import("@/views/item/AddFormView.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
