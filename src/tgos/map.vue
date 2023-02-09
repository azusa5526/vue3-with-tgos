<template>
  <div ref="$el">
    <div v-if="$map">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TGOnlineMap } from "@/utils/tgos-doc";
import { TGOS, useTGOS } from "@/utils/use-tgos";
import { ref, onMounted, provide } from "vue";
import { assertNonNullish } from "./helper";

const props = defineProps<{ center?: { lng: number; lat: number } }>();
const $el = ref<HTMLElement>();
const $map = ref<TGOnlineMap>();
provide("$el", $el);
provide("$map", $map);

onMounted(async () => {
  await useTGOS();
  assertNonNullish($el.value, "$el");
  $map.value = new TGOS.TGOnlineMap($el.value, TGOS.TGCoordSys.EPSG3857);
  if (props.center) {
    $map.value.setCenter(new TGOS.TGPoint(props.center.lng, props.center.lat));
  }
});
</script>
