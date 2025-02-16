<template>
	<div class="vue-root w-full ">
		
		<smart-phone-input class="w-full"></smart-phone-input>
	</div>
</template>

<script>
import { onMounted } from 'vue'
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.phoneinput.js";


export default {
	name: "app",
	setup() {
		onMounted(() => {

		})
	}
};
</script>

<style>

</style>
    
