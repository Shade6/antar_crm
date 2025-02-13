<template>
    <div class="vue-root">
      <smart-editor id="editor">
      </smart-editor>
    </div>
  </template>
  
  <script>
  import { onMounted } from "vue";
  import "smart-webcomponents/source/styles/smart.default.css";
  import "smart-webcomponents/source/modules/smart.editor.js";
  
  export default {
    name: "app",
    setup() {
      onMounted(() => {
        window.Smart(
          "#editor",
          class {
            get properties() {
              return {
                
                toolbarItems: [
                  "Bold",
                  "Italic",
                  "Underline",
                  "StrikeThrough",
                  "FontName",
                  "FontSize",
                  "FontColor",
                  "BackgroundColor",
                  "LowerCase",
                  "UpperCase",
                  "|",
                  "Formats",
                  "Alignment",
                  "OrderedList",
                  "UnorderedList",
                  "Outdent",
                  "Indent",
                  "|",
                  "hyperlink",
                  "table",
                  "Image",
                  "|",
                  "ClearFormat",
                  "Print",
                  "SourceCode",
                  "splitmode",
                  "FullScreen",
                  "|",
                  "Undo",
                  "Redo",
                  "subscript",
                  "superscript",
                  "delete",
                ],
              };
            }
          }
        );
  
        const editor = document.getElementById("editor");
        editor.expandToolbar();
      });
    },
  };
  </script>
  
  <style>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  
  .smart-editor {
    width: 100%;
    height: 100%;
  }
  
  .options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 260px;
  }
  
  @media (max-width: 750px) {
    .options {
      position: relative;
      top: 30px;
      width: 240px;
      margin: 0 auto;
    }
  }
  
  #app,
  .vue-root {
    width: 100%;
    height: 100%;
  }
  </style>