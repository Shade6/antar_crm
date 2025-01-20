import { createRouter, createWebHistory } from "vue-router";
import defaultLayout from "@/layout/defaultLayout.vue";
import customLayout from "@/layout/customLayout.vue";

import Details from "../views/antar_/deals/dealsPage/Details.vue";
import Create from "../views/antar_/deals/dealsPage/Create.vue";
import Kanban from "../views/antar_/deals/dealsPage/Kanban.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Public",
      component: customLayout,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/website/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/website/HomeView.vue"),
        },
        {
          path: "/list",
          name: "list",
          component: () => import("../views/website/HomeView.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
      ],
    },
    {
      path: "/antar_",
      name: "antar_",
      component: defaultLayout,
      redirect: "/antar_",
      children: [
        {
          path: "/antar_/",
          name: "dashboard_home",
          component: () => import("../views/antar_/home.vue"),
        },
        {
          path: "/antar_/leads",
          name: "dashboard",
          component: () => import("../views/antar_/leads/leads.vue"),
        },
        {
          path: "/antar_/deals",
          
          children: [
            {
              path: "",
              name: "deals-list", // Unique name for this route
              component: () => import("../views/antar_/deals/deals.vue"),
            },
            {
              path: "create",
              name: "create-deal", // Consistent naming convention
              component: Create,
            },
            {
              path: ":id",
              name: "deal-detail", // Consistent naming convention
              component: Details,
            },
            {
              path: "kanban",
              name: "kanban-view", // More descriptive name
              component: Kanban,
            },
          ],
        },
        {
          path: "/antar_/contacts",
          name: "contacts",
          component: () => import("../views/antar_/contacts/contacts.vue"),
        },
        {
          path: "/antar_/organizations",
          name: "organizations",
          component: () =>
            import("../views/antar_/organizations/organizations.vue"),
        },
        {
          path: "/antar_/notes",
          name: "notes",
          component: () => import("../views/antar_/notes/notes.vue"),
        },
        {
          path: "/antar_/task",
          name: "task",
          component: () => import("../views/antar_/task/task.vue"),
        },
        {
          path: "/antar_/call-logs",
          name: "call-logs",
          component: () => import("../views/antar_/call-logs/callLogs.vue"),
        },
        {
          path: "/antar_/email-template",
          name: "email-template",
          component: () =>
            import("../views/antar_/email-template/emailTemplate.vue"),
        },
        {
          path: "/antar_/user",
          name: "user",
          component: () => import("../views/antar_/user-management/User.vue"),
        },
        {
          path: "/antar_/user-settings/",
          name: "user-settings",
          component: () =>
            import("../views/antar_/user-management/UserSettings.vue"),
          children: [
            {
              path: ":id",
              name: "user-settings-detail", // Give it a unique name
              component: () =>
                import("../views/antar_/user-management/SingleUser.vue"),
            },
          ],
        },
        {
          path: "/antar_/settings",
          name: "settings",
          component: () => import("../views/antar_/settings.vue"),
        },
      ],
    },
  ],
});

export default router;
