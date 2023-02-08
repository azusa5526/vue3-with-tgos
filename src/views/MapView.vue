<template>
  <main>
    <div id="TGMap" style="width: 100%; height: 100vh"></div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import mygeodata from "../assets/station.json";
import mygeodata2 from "../assets/station2.json";
import { initTGMap } from "@/utils/tgos";
import { TGOS, useTGOS } from "@/utils/use-tgos";

let pMap = null;
let infoWindow = null;
let tgosData = null;
let tgosData2 = null;

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

function initInfoWindow(options) {
  let infoWindowOptions = options || {
    maxWidth: 300,
    zIndex: 99,
  };
  const infoWindow = new TGOS.TGInfoWindow();
  infoWindow.setOptions(infoWindowOptions);

  return infoWindow;
}

function openInfoWindow(point, content, offsetState) {
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

  tgosData2 = new TGOS.TGData({ map: pMap });
  tgosData2.addGeoJson(mygeodata2);

  // console.log("loadGeoJson tgosData2", tgosData2);
  // tgosData2.removeAllGraphics();
  // console.log("loadGeoJson tgosData2", tgosData2);
}

function processData() {
  if (!tgosData) return;

  tgosData.graphics.forEach((graphic) => {
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

function pointProcesser(graphic) {
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

function polygonProcesser(graphic) {
  graphic.gs_[0].setStrokeWeight(10);

  TGOS.TGEvent.addListener(graphic.gs_[0], "click", (args) => {
    openInfoWindow(args.point, graphic.properties.Name);
  });
}
</script>
