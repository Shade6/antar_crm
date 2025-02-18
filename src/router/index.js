import { createRouter, createWebHistory } from "vue-router";
import defaultLayout from "@/layout/defaultLayout.vue";
import customLayout from "@/layout/customLayout.vue";

import Details from "../views/antar_/opportunity/dealsPage/Details.vue";
import Single from "@/views/antar_/opportunity/Single.vue";
import Create from "../views/antar_/opportunity/Create.vue";
import Kanban from "../views/antar_/opportunity/dealsPage/Kanban.vue";
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
          path: "/antar_/dashboard",
          name: "dashboard_home",
          component: () => import("../views/antar_/home.vue"),
        },
        // {
        //   path: "/antar_/leads",
        //   name: "dashboard",
        //   component: () => import("../views/antar_/leads/leads.vue"),
        // },
        {
          path: "/antar_/leads",
          children: [
            {
              path: "",
              name: "lead-list", // Unique name for this route
              component: () => import("../views/antar_/lead_mangae/List.vue"),
            },
            {
              path: "create",
              name: "create-lead", // Consistent naming convention
              component: () => import("../views/antar_/lead_mangae/Create.vue"),
            },
            {
              path: "kanban",
              name: "kanban-view-list", // More descriptive name
              component: () => import("../views/antar_/lead_mangae/Kanban.vue"),
            },
            {
              path: ":id",
              name: "lead-detail", // Consistent naming convention
              component: () => import("../views/antar_/lead_mangae/Single.vue"),
            },
            {
              path: "convert-lead",
              name: "lead-convert", // Consistent naming convention
              component: () => import("../views/antar_/lead_mangae/Edit.vue"),
            },
          
          ],
        },
        {
          path: "/antar_/opportunities",
          children: [
            {
              path: "",
              name: "opportunities-list", // Unique name for this route
              component: () => import("../views/antar_/opportunity/deals.vue"),
            },
            {
              path: "create",
              name: "create-opportunities", // Consistent naming convention
              component: Create,
            },
            
            {
              path: ":id",
              name: "opportunities-detail", // Consistent naming convention
              component: Single,
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
          children: [
            {
              path: "",
              name: "contact-list", // Corrected name for this route
              component: () => import("../views/antar_/contacts/List.vue"), // Corrected component path
            },
            {
              path: "create",
              name: "create-contact", // Corrected naming convention
              component: () => import("../views/antar_/contacts/Create.vue"), // Corrected component path
            },
            {
              path: ":id",
              name: "contact-detail", // Corrected naming convention
              component: () => import("../views/antar_/contacts/Single.vue"), // Corrected component path
            },
            {
              path: "edit",
              name: "contact-edit", // Corrected naming convention
              component: () => import("../views/antar_/contacts/Update.vue"), // Corrected component path
            },
            {
              path: "kanban",
              name: "kanban-contact-view", // More descriptive name
              component: Kanban,
            },
            {
              path: "convert_contact",
              name: "convert_contact", // More descriptive name
              component: () => import("../views/antar_/contacts/Convert.vue"), 
            },
            
          ],
        },
        {
          path: "/antar_/organizations",
          children: [
            {
              path: "",
              name: "organization-list", // Unique name for this route
              component: () => import("../views/antar_/organizations/List.vue"),
            },
            {
              path: "create",
              name: "create-organization", // Consistent naming convention
              component: () => import("../views/antar_/organizations/Create.vue"),
            },
            {
              path: ":id",
              name: "organization-detail", // Consistent naming convention
              component: () => import("../views/antar_/organizations/Single.vue"),
            },
            {
              path: "edit/:id",
              name: "organization-edit", // Consistent naming convention
              component: () => import("../views/antar_/organizations/Update.vue"),
            },
            {
              path: "kanban",
              name: "kanban-organization-view", // More descriptive name
              component: Kanban,
            },
          ],
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
        {
          path: "/antar_/product-services",
          children: [
            {
              path: "",
              name: "product-list", // Unique name for this route
              component: () => import("../views/antar_/products/List.vue"),
            },
            {
              path: "create",
              name: "create-product", // Consistent naming convention
              component: () => import("../views/antar_/products/Create.vue"),
            },
            {
              path: ":id",
              name: "product-detail", // Consistent naming convention
              component: () => import("../views/antar_/products/Single.vue"),
            },
            {
              path: "edit",
              name: "product-edit", // Consistent naming convention
              component: () => import("../views/antar_/products/Edit.vue"),
            },
            {
              path: "kanban",
              name: "kanban-product-view", // More descriptive name
              component: Kanban,
            },
          ],
        },
        {
          path: "/antar_/estimate",
          children: [
            {
              path: "",
              name: "estimate-list", // Unique name for this route
              component: () => import("../views/antar_/estimate/List.vue"),
            },
            {
              path: "create",
              name: "estimate-create", // Consistent naming convention
              component: () => import("../views/antar_/estimate/Create.vue"),
            },
            {
              path: ":id",
              name: "estimate-details", // Consistent naming convention
              component: () => import("../views/antar_/estimate/Single.vue"),
            },
            {
              path: "edit",
              name: "estimate-edit", // Consistent naming convention
              component: () => import("../views/antar_/estimate/Update.vue"),
            },
            {
              path: "kanban",
              name: "kanban-estimate-view", // More descriptive name
              component: Kanban,
            },
          ],
        },
        {
          path: "/antar_/report",
          name: "report",
          component: () => import("../views/antar_/report/Report.vue"),
        },
        // {
        //   path: "/antar_/campaign",
        //   name: "campaign",
        //   component: () => import("../views/antar_/campaign/Campaign.vue"),
        // },
        {
          path: "/antar_/campaign",
          children: [
            {
              path: "",
              name: "campaign-list", // Unique name for this route
              component: () => import("../views/antar_/campaign/Campaign.vue"),
            },
            {
              path: "create-email-campaign",
              name: "create-email-campaign", // Consistent naming convention
              component: () => import("../views/antar_/campaign/CreateEmailCamb.vue"),
            },
            {
              path: "create-whatsapp-campaign",
              name: "create-whatsapp-campaign", // Consistent naming convention
              component: () => import("../views/antar_/campaign/CreateWhatsappCamp.vue"),
            },
            {
              path: "create-campaign-list",
              name: "create-campaign-list", // Consistent naming convention
              component: () => import("../views/antar_/campaign/page/CreateList.vue"),
            },
    
          ],
        },
      ],
    },
  ],
});

export default router;
