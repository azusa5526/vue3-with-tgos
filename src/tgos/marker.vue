<script setup lang="ts">
import type { TGOnlineMap } from "@/utils/tgos-doc";
import { TGOS } from "@/utils/use-tgos";
import { useAttrs, onMounted, onUnmounted, inject } from "vue";
import type { Ref } from "vue";

interface Attr {
  [x: string]: unknown;
  onClick: (marker: any) => void;
}

const props = defineProps<{ lat: number; lng: number }>();
const $attr = useAttrs() as Attr;
const $map = inject("$map") as Ref<TGOnlineMap>;
let tgMaker: any = null;

onMounted(() => {
  tgMaker = addPoint();
  addListener(tgMaker);
});

onUnmounted(() => {
  removePoint(tgMaker);
});

interface AddPointOptions {}

function addPoint(opt?: AddPointOptions): any {
  const point = new TGOS.TGPoint(props.lng, props.lat);
  const iconUrl = "./icon/marker.svg";
  const icon = new TGOS.TGImage(
    iconUrl,
    new TGOS.TGSize(38, 33),
    new TGOS.TGPoint(0, 0),
    new TGOS.TGPoint(16, 33)
  );

  return new TGOS.TGMarker($map.value, point, "jest", icon);
}

function addListener(marker: any) {
  if ($attr.onClick) {
    marker.clickable = true;
    TGOS.TGEvent.addListener(marker, "click", () => $attr.onClick(marker));
  }
}

function removePoint(marker: any) {
  marker.setMap(null);
}
</script>

<template></template>
