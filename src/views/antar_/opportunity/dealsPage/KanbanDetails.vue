<template>
  <div class="vue-root">
    <smart-kanban id="kanban"></smart-kanban>
  </div>
</template>

<script>
import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.kanban.js";
import { get_all_deal, update_opportunity_status } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useSwitchStore } from "@/stores/switch";

export default {
  name: "app",
  setup() {
    const $toast = useToast(); // Initialize toast

    onMounted(async () => {
      let data = [];
      const res = await get_all_deal();
      if (res.statusCode == 200) {
        data = res.data.map((val) => ({
          text: `${val?.opportunity_name} <br> -${val?.opportunity_value} <br>-${val?.organization?.organization_name} <br>-${new Date(val?.changed_on).toLocaleDateString()} `,
          status: val?.status,
          id: val?.opportunity_id,
        }));
      }
      const kanban = document.getElementById("kanban");

      kanban.addEventListener("change", async (event) => {
        const res_d = await update_opportunity_status(
          event?.detail?.value?.id,
          event?.detail?.value?.status
        );

        if (res_d.statusCode == 200) {
          $toast.success(res_d.message, {
            position: "top-right",
            duration: 3000,
            dismissible: true,
            style: {
              background: "white",
              color: "black",
              padding: "4px 20px",
              borderRadius: "8px",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              borderLeft: "5px solid green",
            },
          });
        }
      });

      Smart(
        "#kanban",
        class {
          get properties() {
            return {
              collapsible: false,
              dataSource: data,
              editable: false,

              userList: false,
              columns: [
                { label: "New", dataField: "New" },
                { label: "Contacted", dataField: "Contacted" },
                { label: "Nurture", dataField: "Nurture" },
                { label: "Qualified", dataField: "Qualified" },
                { label: "UnQualified", dataField: "UnQualified" },
                { label: "Junk", dataField: "Junk" },
              ],
            };
          }
        }
      );
    });
  },
};
</script>

<style>
html,
body,
#kanban {
  width: 100%;
  height: screen;
}

html,
body {
  margin: 0;
}
.smart-kanban-task-user {
  display: none !important;
}

.smart-kanban-task .smart-avatar {
  display: none !important;
}
</style>
