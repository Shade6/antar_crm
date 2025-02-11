<!-- <template>
    <div  ref="dashboardContainer" class="superset-embed-container w-full h-full" ></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { embedDashboard } from "@superset-ui/embedded-sdk";
  
  const props = defineProps({
    dashboardId: {
      type: String,
      required: true
    },
    supersetDomain: {
      type: String,
      required: true
    },
    fetchGuestToken: {
      type: Function,
      required: true
    },
    config: {
      type: Object,
      default: () => ({
        hideTitle: true,
        filters: { expanded: true },
        urlParams: {},
        iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox']
      })
    }
  });
  

  const emit = defineEmits(['error']);
  const dashboardContainer = ref(null);
  
  let dashboard = null;

  
  onMounted(async () => {
  
    try {
      dashboard = await embedDashboard({
        id: props.dashboardId,
        supersetDomain: props.supersetDomain,
        mountPoint: dashboardContainer.value,
        fetchGuestToken: props.fetchGuestToken,
        dashboardUiConfig: props.config,
        iframeSandboxExtras: props.config.iframeSandboxExtras
      });
    } catch (error) {
      emit('error', error);
      console.error('Error embedding dashboard:', error);
    }
  });
  
  onBeforeUnmount(() => {
    if (dashboard) {
      dashboard.unmount();
    }
  });
  </script>
  

  <style scoped>
  .superset-embed-container {
    width: 100vw;
    height: 100vh;
    
  
    overflow: hidden;
  }
  
  iframe {
    width: 100% !important;
    height: 100% !important;
    
  }
  </style> -->