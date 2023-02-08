import type { TGMapOptions, TGOS as TGOSDOC } from "./tgos-doc";
import { TGOS } from "./use-tgos";
function assertNonNullish<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

async function initTGMap(mapElement: any) {
  console.log("initTGMap TGOS", TGOS);
  const map = new TGOS.TGOnlineMap(
    mapElement,
    TGOS.TGCoordSys.EPSG3857,
    getMapOptions()
  );
  return map;
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
