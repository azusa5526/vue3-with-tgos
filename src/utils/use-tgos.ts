import type { TGOS as TGOSDoc } from "./tgos-doc";

export let TGOS = null as any as TGOSDoc;

export async function useTGOS(): Promise<TGOSDoc> {
  await requireTGOSAPI();
  return (TGOS = window.TGOS);
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
      TGOS = window.TGOS;
    } catch (err) {
      reject(err);
    }
  });
}
