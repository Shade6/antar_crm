
<script setup>
import { ref ,watch ,defineEmits,defineProps ,onMounted } from "vue"
const props = defineProps({
  code: {
    type: String,
    required: true
  },
  mobile:{
    type: String,
    required: true
  }
});


const countries = ref({
	ad: { name: "Andorra", code: "+376", flag: "https://flagcdn.com/w40/ad.png" },
	ae: { name: "United Arab Emirates", code: "+971", flag: "https://flagcdn.com/w40/ae.png" },
	af: { name: "Afghanistan", code: "+93", flag: "https://flagcdn.com/w40/af.png" },
	ag: { name: "Antigua & Barbuda", code: "+1-268", flag: "https://flagcdn.com/w40/ag.png" },
	ai: { name: "Anguilla", code: "+1-264", flag: "https://flagcdn.com/w40/ai.png" },
	al: { name: "Albania", code: "+355", flag: "https://flagcdn.com/w40/al.png" },
	am: { name: "Armenia", code: "+374", flag: "https://flagcdn.com/w40/am.png" },
	ao: { name: "Angola", code: "+244", flag: "https://flagcdn.com/w40/ao.png" },
	ar: { name: "Argentina", code: "+54", flag: "https://flagcdn.com/w40/ar.png" },
	as: { name: "American Samoa", code: "+1-684", flag: "https://flagcdn.com/w40/as.png" },
	at: { name: "Austria", code: "+43", flag: "https://flagcdn.com/w40/at.png" },
	au: { name: "Australia", code: "+61", flag: "https://flagcdn.com/w40/au.png" },
	aw: { name: "Aruba", code: "+297", flag: "https://flagcdn.com/w40/aw.png" },
	az: { name: "Azerbaijan", code: "+994", flag: "https://flagcdn.com/w40/az.png" },
	ba: { name: "Bosnia & Herzegovina", code: "+387", flag: "https://flagcdn.com/w40/ba.png" },
	bd: { name: "Bangladesh", code: "+880", flag: "https://flagcdn.com/w40/bd.png" },
	be: { name: "Belgium", code: "+32", flag: "https://flagcdn.com/w40/be.png" },
	bf: { name: "Burkina Faso", code: "+226", flag: "https://flagcdn.com/w40/bf.png" },
	bg: { name: "Bulgaria", code: "+359", flag: "https://flagcdn.com/w40/bg.png" },
	bh: { name: "Bahrain", code: "+973", flag: "https://flagcdn.com/w40/bh.png" },
	bi: { name: "Burundi", code: "+257", flag: "https://flagcdn.com/w40/bi.png" },
	bj: { name: "Benin", code: "+229", flag: "https://flagcdn.com/w40/bj.png" },
	bm: { name: "Bermuda", code: "+1-441", flag: "https://flagcdn.com/w40/bm.png" },
	bn: { name: "Brunei", code: "+673", flag: "https://flagcdn.com/w40/bn.png" },
	bo: { name: "Bolivia", code: "+591", flag: "https://flagcdn.com/w40/bo.png" },
	br: { name: "Brazil", code: "+55", flag: "https://flagcdn.com/w40/br.png" },
	bs: { name: "Bahamas", code: "+1-242", flag: "https://flagcdn.com/w40/bs.png" },
	bt: { name: "Bhutan", code: "+975", flag: "https://flagcdn.com/w40/bt.png" },
	bw: { name: "Botswana", code: "+267", flag: "https://flagcdn.com/w40/bw.png" },
	by: { name: "Belarus", code: "+375", flag: "https://flagcdn.com/w40/by.png" },
	bz: { name: "Belize", code: "+501", flag: "https://flagcdn.com/w40/bz.png" },
	ca: { name: "Canada", code: "+1", flag: "https://flagcdn.com/w40/ca.png" },
	cn: { name: "China", code: "+86", flag: "https://flagcdn.com/w40/cn.png" },
	de: { name: "Germany", code: "+49", flag: "https://flagcdn.com/w40/de.png" },
	eg: { name: "Egypt", code: "+20", flag: "https://flagcdn.com/w40/eg.png" },
	es: { name: "Spain", code: "+34", flag: "https://flagcdn.com/w40/es.png" },
	fr: { name: "France", code: "+33", flag: "https://flagcdn.com/w40/fr.png" },
	gb: { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/w40/gb.png" },
	in: { name: "India", code: "+91", flag: "https://flagcdn.com/w40/in.png" },
	it: { name: "Italy", code: "+39", flag: "https://flagcdn.com/w40/it.png" },
	jp: { name: "Japan", code: "+81", flag: "https://flagcdn.com/w40/jp.png" },
	mx: { name: "Mexico", code: "+52", flag: "https://flagcdn.com/w40/mx.png" },
	ru: { name: "Russia", code: "+7", flag: "https://flagcdn.com/w40/ru.png" },
	us: { name: "United States", code: "+1", flag: "https://flagcdn.com/w40/us.png" },
	za: { name: "South Africa", code: "+27", flag: "https://flagcdn.com/w40/za.png" }
})
const emit = defineEmits(['mobile_action'])
const selectedCountry = ref(countries.value.in)
const showCountries = ref(false)
const phoneNumber = ref(props.mobile || '')

watch(()=>selectedCountry.value,(new_value)=>{
  emit('mobile_action',{country:new_value,number:phoneNumber.value})
})
watch(()=>phoneNumber.value,(new_value)=>{
  emit('mobile_action',{country:selectedCountry.value,number:new_value})
})
function findCountryByCode(code) {
  return Object.values(countries.value).find(country => country.code === code) || null;
}
watch(() => props.code, (newCode) => {
  selectedCountry.value = findCountryByCode(newCode)
});


watch(() => props.mobile, (newMobile) => {
  phoneNumber.value = newMobile;
});

</script>

<template>

  <div class="phone-input">
    <div class="country-selector">
      <button @click="showCountries = !showCountries" class="selector-button">
        <img :src="selectedCountry.flag" class="flag" />
        <span>{{ selectedCountry.code }}</span>
      </button>
      <div v-if="showCountries" class="country-list">
        <div 
          v-for="(country, code) in countries"
          :key="code"
          @click="selectedCountry = country; showCountries = false"
          class="country-item"
        >
          <img :src="country.flag" class="flag" />
          <div class="country-info">
            <span class="country-name">{{ country.name }}</span>
            <span class="country-code">{{ country.code }}</span>
          </div>
        </div>
      </div>
    </div>
    <input
      type="tel"
      v-model="phoneNumber"
      placeholder="Enter phone number"
      class="phone-number"
    />
  </div>
</template>

<style scoped>
.phone-input {
  display: flex;
  align-items: center;
  gap: 0px;

  border-radius: 10px;
  border-radius: 4px;
  width: 100%;
  background-color: #f4f4f4;
}

.selector-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0px 10px;
  cursor: pointer;
}

.selector-button:hover {
  background-color: #f0f0f0;
}

.country-list {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  cursor: pointer;
}

.country-item:hover {
  background-color: #f5f5f5;
}

.flag {
  width: 24px;
  height: 16px;
  object-fit: cover;
}

.country-info {
  display: flex;
  flex-direction: column;
}

.country-name {
  font-size: 0.9em;
}

.country-code {
  font-size: 0.8em;
  color: #666;
}

.phone-number {
  flex: 1;
  border: none;
  outline: none;
  padding: 2px 8px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #f4f4f4;
}
</style>