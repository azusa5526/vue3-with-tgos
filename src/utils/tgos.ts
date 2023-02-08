let TGOS: any = null;
const TGMap: any = null;

async function initTGMap() {
  await requireTGOSAPI();
  TGOS = (<any>window).TGOS;
  console.log("TGOS", TGOS);
  const map = new TGOS.TGOnlineMap(
    TGMap,
    TGOS.TGCoordSys.EPSG3857,
    getMapOptions()
  );
  return map;
}

async function requireTGOSAPI() {
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

function getMapOptions() {
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
