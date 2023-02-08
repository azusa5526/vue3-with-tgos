<template>
  <div ref="$el"></div>
</template>
<script setup lang="ts">
import { TGOS, useTGOS } from "@/utils/use-tgos";
import { ref, onMounted } from "vue";
import { assertNonNullish } from "./helper";

const $el = ref<HTMLElement>();

onMounted(async () => {
  await useTGOS();
  assertNonNullish($el.value, "$el");
  const map = new TGOS.TGOnlineMap($el.value,TGOS.TGCoordSys.EPSG3825)
});
</script>
