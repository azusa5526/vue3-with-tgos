<template>
  <main>
    <div id="TGMap" style="width: 100%; height: 100vh"></div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mygeodata from "../assets/station.json";
import { initTGMap } from "@/utils/tgos";
import { TGOS, useTGOS } from "@/utils/use-tgos";
import type { TGOnlineMap, TGPoint } from "@/utils/tgos-doc";

let pMap: TGOnlineMap | null = null;
let infoWindow: any = null;
let tgosData: any = null;

onMounted(async () => {
  await useTGOS();
  await initMap();
  loadGeoJson();
  processData();
});

async function initMap() {
  const mapElement = document.getElementById("TGMap");
  pMap = initTGMap(mapElement);
  infoWindow = initInfoWindow();
}

function initInfoWindow(options?: any) {
  let infoWindowOptions = options || {
    maxWidth: 300,
    zIndex: 99,
  };
  const infoWindow = new TGOS.TGInfoWindow();
  infoWindow.setOptions(infoWindowOptions);

  return infoWindow;
}

function openInfoWindow(
  point: TGPoint,
  content: string,
  offsetState?: boolean
) {
  console.log("openInfoWindow", infoWindow);

  if (offsetState)
    infoWindow.setOptions({ pixelOffset: new TGOS.TGSize(0, -32) });

  infoWindow.setPosition(point);
  infoWindow.setContent(content);
  infoWindow.open(pMap);
}

function loadGeoJson() {
  if (!pMap) return;
  tgosData = new TGOS.TGData({ map: pMap });
  tgosData.addGeoJson(mygeodata);
}

function processData() {
  if (!tgosData) return;

  tgosData.graphics.forEach((graphic: any) => {
    const graphicType = graphic.geometry.type;
    const processer = new Map([
      ["TGPoint", pointProcesser],
      ["TGPolygon", polygonProcesser],
    ]);

    const suitableProcesser = processer.get(graphicType);
    suitableProcesser
      ? suitableProcesser(graphic)
      : console.error(`Can not process graphic type: ${graphicType}`);
  });
}

function pointProcesser(graphic: any) {
  const imgUrl = "./icon/marker.svg";
  const markerImg = new TGOS.TGImage(
    imgUrl,
    new TGOS.TGSize(38, 33),
    new TGOS.TGPoint(0, 0),
    new TGOS.TGPoint(16, 33)
  );

  graphic.gs_[0].setIcon(markerImg);

  TGOS.TGEvent.addListener(graphic.gs_[0], "click", () => {
    openInfoWindow(graphic.geometry, graphic.properties.Name, true);
  });
}

function polygonProcesser(graphic: any) {
  graphic.gs_[0].setStrokeWeight(10);

  TGOS.TGEvent.addListener(graphic.gs_[0], "click", (args: any) => {
    openInfoWindow(args.point, graphic.properties.Name);
  });
}
</script>
