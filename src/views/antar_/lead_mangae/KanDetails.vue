<template>
  <div class="vue-root h-[650px]">
    <smart-kanban class="h-full" id="kanban"></smart-kanban>
    
  </div>
</template>

<script>
import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.kanban.js";
import { find_all_lead, update_lead_status } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useSwitchStore } from "@/stores/switch";

export default {
  name: "app",
  setup() {
    const $toast = useToast(); // Initialize toast

    onMounted(async () => {
      let data = [];
      const res = await find_all_lead();
      if (res.statusCode == 200) {
        data = res.data.map((val) => ({
          text: `<div>
            <span >
                <strong>${val?.first_name + " " + val?.last_name}</strong>
            </span>
         
            <br>
            <span>
               <span>company:</span> ${val?.company}
            </span>
            <br>
            <span>
               <span>company:</span> ${val?.company}
            </span>
                 <br>
            <span>
               <button >view details</button>
            </span>
            <br>
            <span>
                ${new Date(val?.created_at).toLocaleDateString()}
            </span>
         </div>`,
   
          status: val?.status,
          id: val?.lead_id,
        }));
      }

      const kanban = document.getElementById("kanban");

            kanban.addEventListener("click", async (event) => {
            const clickedElement = event; // The exact element clicked
            console.log("Clicked Element:", clickedElement);

            // Get data attributes if stored (e.g., data-id, data-title)
            const dataId = clickedElement.getAttribute("data-id");
            const dataTitle = clickedElement.getAttribute("data-title");

            console.log("Clicked Data ID:", dataId);
            console.log("Clicked Data Title:", dataTitle);
            });


      kanban.addEventListener("change", async (event) => {
        const res_d = await update_lead_status(
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
              allowColumnRemove: true,
              columnEditMode: "menu",
              columnFooter: true,
              columnSummary: true,
              columnColors: true,
              columnColorEntireSurface: true,
              dataSource: data,
              allowColumnEdit: true,
              allowColumnReorder: true,

              columns: [
                { 
                  label: "New",
                  dataField: "New",
                  color: "#d8f7e1"
                 },
                {
                  label: "Contacted",
                  dataField: "Contacted",
                  color: "#d8e6f7",
                },
                { label: "Nurture",
                 dataField: "Nurture",
                  color: "#d8f7f7" },
                {
                  label: "Qualified",
                  dataField: "Qualified",
                  color: "#aef6a5",
                },
                {
                  label: "UnQualified",
                  dataField: "UnQualified",
                  color: "#ffb8b8",
                },
                { 
                  label: "Junk",
                 dataField: "Junk",
                 color: "#ffdcb8" 
                },
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
.heading {
  background: #33b679;
  color: #dff7ec;
  width: 100% !important;
  border-radius: 3px !important;
}
.smart-kanban-column-header {
  padding: 0px !important;
}
.smart-kanban-task {
  border: 1px solid gray !important;
  border-radius: 10px !important;
}
.smart-kanban-column{
    background-color: white !important;
}
.smart-kanban-scroll-viewer{
    height: 650px !important;
}
</style>
