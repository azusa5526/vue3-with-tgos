import type { TGMapOptions } from "./tgos-doc";

function assertNonNullish<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

let TGOS: Window["TGOS"] | null = null;

async function initTGMap(mapElement: any) {
  await requireTGOSAPI();
  TGOS = window.TGOS;
  console.log("initTGMap TGOS", TGOS);
  const map = new TGOS.TGOnlineMap(
    mapElement,
    TGOS.TGCoordSys.EPSG3857,
    getMapOptions()
  );
  return map;
}

async function requireTGOSAPI() {
  if (!TGOS) {
    return new Promise((resolve, reject) => {
      try {
        const script = document.createElement("script");
        const src =
          "http://api.tgos.tw/TGOS_API/tgos?ver=2.5&AppID=x+JLVSx85Lk=&APIKey=in8W74q0ogpcfW/STwicK8D5QwCdddJf05/7nb+OtDh8R99YN3T0LurV4xato3TpL/fOfylvJ9Wv/khZEsXEWxsBmg+GEj4AuokiNXCh14Rei21U5GtJpIkO++Mq3AguFK/ISDEWn4hMzqgrkxNe1Q==";
        script.addEventListener("load", resolve);
        script.src = src;
        document.head.appendChild(script);
      } catch (err) {
        reject(err);
      }
    });
  }
}

function getMapOptions(): TGMapOptions {
  assertNonNullish(TGOS, "TGOS is fucking null");

  const mapOptions = {
    scaleControl: true,
    navigationControl: true,
    navigationControlOptions: {
      controlPosition: TGOS.TGControlPosition.TOP_LEFT,
      navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL,
    },
    mapTypeControl: false,
  };

  return mapOptions;
}

export { initTGMap };
