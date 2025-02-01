<template>

  
    <section class="grid-stack bg-red-400">
      <div 
        v-for="(component, key, index) in components" 
        :key="'component'+index" 
        :gs-id="key" 
        class="grid-stack-item"
        :gs-x="component.gridPos.x" 
        :gs-y="component.gridPos.y" 
        :gs-h="component.gridPos.h" 
        :gs-w="component.gridPos.w"
        gs-auto-position="true"
      >
        <div class="grid-stack-item-content">
          <component :is="component.name" v-bind="component.props" />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted, reactive, nextTick } from 'vue';
  import 'gridstack/dist/gridstack.min.css';
  import { GridStack } from 'gridstack';
  import ChartOne from './grid/ChartOne.vue';
  import ChartTwo from './grid/ChartTwo.vue';
  import ChartThree from './grid/ChartThree.vue';


  import BarChartOne from './grid/bar/BarChartOne.vue';
  import BarChartTwo from './grid/bar/BarChartTwo.vue';
  import BarChartThree from './grid/bar/BarChartThree.vue';
  import BarChartFour from './grid/bar/BarChartFour.vue';
  import BarChartFive from './grid/bar/BarChartFive.vue';
  import BarChartSix from './grid/bar/BarChartSix.vue';
  import BarChartSeven from './grid/bar/BarChartSeven.vue';

  import BoxOne from './grid/box/BoxOne.vue';
  import BoxTwo from './grid/box/BoxTwo.vue';
  import BoxThree from './grid/box/BoxThree.vue';
  import BoxFour from './grid/box/BoxFour.vue';
  import BoxFive from './grid/box/BoxFive.vue';

  import PiChartOne from './grid/pi/PiChartOne.vue';
  import PiChartTwo from './grid/pi/PiChartTwo.vue';
  import PiChartThree from './grid/pi/PiChartThree.vue';

  import {find_dashboard} from '@/api/userApi.js'




  
  export default {
    name: "WidgetGrid",
    setup() {
      let info = ref("");
      let grid = null;
  
      let components = reactive({
        BoxOne: {
          name: "BoxOne", props: {}, gridPos: { x: 0, y: 1, w: 2, h: 2 }
        },
        BoxTwo: {
          name: "BoxTwo", props: {}, gridPos: { x: 0, y: 1, w: 2, h: 2 }
        },
        BoxThree: {
          name: "BoxThree", props: {}, gridPos: { x: 0, y: 1,w: 2, h: 2}
        },
        BoxFour: {
          name: "BoxFour", props: {}, gridPos: { x: 0, y: 1, w: 2, h: 2 }
        },
        BoxFive: {
          name: "BoxFive", props: {}, gridPos: { x: 0, y: 1, w: 2, h: 2}
        },
        BarChartOne: {
          name: "BarChartOne", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        BarChartTwo: {
          name: "BarChartTwo", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        BarChartThree: {
          name: "BarChartThree", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        
        PiChartOne: {
          name: "PiChartOne", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 8 }
        },
        PiChartTwo: {
          name: "PiChartTwo", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 8 }
        },
        PiChartThree: {
          name: "PiChartThree", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 8 }
        },
        BarChartFour: {
          name: "BarChartFour", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        BarChartFive: {
          name: "BarChartFive", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        BarChartSix: {
          name: "BarChartSix", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        },
        BarChartSeven: {
          name: "BarChartSeven", props: {}, gridPos: { x: 0, y: 1, w: 4, h: 5 }
        }
      });
  
      onMounted(() => {
        grid = GridStack.init({
          float: true,
          cellHeight: "70px",
          minRow: 1,
        });
  
        grid.on("dragstop", (event, element) => {
          console.log("move event!", event, element);
          const node = element.gridstackNode;
          info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
        });
      });
  
      // this will of course only work once because of the object-key
      function addNewWidget() {
        components.ChartThree= {
          name: "ChartThree", props: {}, gridPos: { x: 0, y: 1, w: 2, h: 5 }
        };
        // we have to wait for vue to update v-for, 
        // until then the querySelector wont find the element
        nextTick(() => {
          console.log(grid);
          let compEl = document.querySelector('[gs-id="ChartThree"]');
          console.log(compEl);
          grid.makeWidget(compEl);
        });
        console.warn("i will only work once, fix my inputs to reuse me");
      }
  
      return {
        info,
        components,
      };
    },
    components: {
        BoxOne,
        BoxTwo,
        PiChartTwo,
        BoxThree,
        BoxFour,
        BoxFive,
        PiChartOne,
        BarChartOne,
        BarChartTwo,
        BarChartThree,
        BarChartFour,
        BarChartFive,
        PiChartThree,
        BarChartSix,
        BarChartSeven

    },
  }
  </script>
  
  <style>
  .grid-stack {
    background-color: #FAFAFF;
    border-style: dashed;
  }
  
  .grid-stack-item {
    color: #2c3e50;
    text-align: center;
    border-style: solid;
    overflow: auto;
    z-index: 50;
  }
  </style>
  