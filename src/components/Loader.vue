<script setup>
import displaySignature from "../utils/displaySignature";

defineProps({
  loader: Boolean,
  message: String | null,
  error: String | null,
});

const emit = defineEmits(["gotIt"]);

function gotIt() {
  emit("gotIt");
}
</script>

<template>
  <div class="loader" v-if="loader">
    <div v-if="message === null && error === null">... please wait ...</div>
    <div v-else>
      <div v-if="error === null">
        <span class="signature"
          >Transaction signature: <br />
          <span v-html="displaySignature(message)"></span
        ></span>

        <br />
        <br />

        <button type="button" @click="gotIt">Got it !</button>
      </div>
      <div v-else>
        <span class="signature">{{ error }}</span>

        <br />
        <br />

        <button type="button" @click="gotIt">Got it !</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  background: rgba(71, 71, 71, 0.5);
  top: 0px;
  z-index: 10;
  height: 100vh;
  width: 100%;

  left: 0px;
  font-size: 30px;
}

.loader > div {
  border: 1px solid rgb(238, 238, 238);
  background: white;
  padding: 50px;
  border-radius: 10px;
  width: 600px;
  margin-top: 150px;
  margin-left: calc(50% - 300px);
}

.loader > div > .signature {
  font-size: 20px;
}

.loader > div > button {
  font-size: 20px;
}
</style>
