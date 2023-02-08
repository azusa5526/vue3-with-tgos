import type { TGOS } from "./tgos-doc";

let loaded = false;

export function useTGOSSync(): TGOS {
  return window.TGOS;
}

export async function useTGOS(): Promise<TGOS> {
  await requireTGOSAPI();
  return window.TGOS;
}

async function requireTGOSAPI() {
  if (loaded) {
    return window.TGOS;
  }
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement("script");
      const src =
        "http://api.tgos.tw/TGOS_API/tgos?ver=2.5&AppID=x+JLVSx85Lk=&APIKey=in8W74q0ogpcfW/STwicK8D5QwCdddJf05/7nb+OtDh8R99YN3T0LurV4xato3TpL/fOfylvJ9Wv/khZEsXEWxsBmg+GEj4AuokiNXCh14Rei21U5GtJpIkO++Mq3AguFK/ISDEWn4hMzqgrkxNe1Q==";
      script.addEventListener("load", resolve);
      script.src = src;
      document.head.appendChild(script);
      loaded = true;
    } catch (err) {
      reject(err);
    }
  });
}
