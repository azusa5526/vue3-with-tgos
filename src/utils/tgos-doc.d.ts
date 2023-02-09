/* eslint-disable @typescript-eslint/no-unused-vars */

export {};

type TGCoordSys = "EPSG3825" | "EPSG3826" | "EPSG3857";

type TGMapTypeId =
  | "F2IMAGE"
  | "HILLSHADE"
  | "HILLSHADEMIX"
  | "IMAGENLSC"
  | "NLSCMAP"
  | "ROADMAP"
  | "SEGISMAP"
  | "TGOSMAP"
  | "TGOSMAP_NP";

type TGControlPosition =
  | "BOTTOM_CENTER"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "LEFT_BOTTOM"
  | "LEFT_CENTER"
  | "LEFT_TOP"
  | "RIGHT_BOTTOM"
  | "RIGHT_CENTER"
  | "RIGHT_TOP"
  | "TOP_CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT";

type TGMapTypeControlStyle = "DEFAULT" | "DROPDOWN_MENU" | "HORIZONTAL_BAR";
type TGNavigationControlStyle = "DEFAULT" | "LARGE" | "MEDIUM" | "SMALL";
type TGScaleControlStyle = "DEFAULT" | "TEXT";
type TGIndexViewControlOptions = "NORMAL" | "MINIMIZED";

interface TGMapTypeControlOptions {
  mapTypeIds?: TGMapTypeId[];
  controlPosition?: TGControlPosition;
  mapTypeControlStyle?: TGMapTypeControlStyle;
}

interface TGNavigationControlOptions {
  controlPosition?: TGControlPosition;
  navigationControlStyle?: TGNavigationControlStyle;
}

interface TGScaleControlOptions {
  controlPosition?: TGControlPosition;
  scaleControlStyle?: TGScaleControlStyle;
}

export interface TGMapOptions {
  backgroundColor?: string;
  center?: TGPoint;
  disableDefaultUI?: boolean;
  scrollwheel?: boolean;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: TGMapTypeControlOptions;
  navigationControl?: boolean;
  navigationControlOptions?: TGNavigationControlOptions;
  scaleControl?: boolean;
  scaleControlOptions?: TGScaleControlOptions;
  indexViewControl?: boolean;
  indexViewControlOptions?: TGIndexViewControlOptions;
  draggable?: boolean;
  keyboardShortcuts?: boolean;
  dbClickZoomIn?: boolean;
  dragInertia?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  maxZoom?: number;
  minZoom?: number;
  mapBounds?: TGEnvelope;
}

export declare class TGEnvelope {
  constructor(left: number, top: number, right: number, bottom: number) {}

  isEmpty(): HTMLElement {}
  setEmpty(): void {}
  getSize(): any {}
  getWidth(): number {}
  getHeight(): number {}
  getLeft(): number {}
  setLeft(x: number): void {}
  getTop(): number {}
  setTop(x: number): void {}
  getRight(): number {}
  setRight(x: number): void {}
  getBottom(): number {}
  setBottom(x: number): void {}
}

export declare class TGPoint {
  constructor(x: number, y: number) {}
  x: number;
  y: number;
}

export declare class TGOnlineMap {
  constructor(node: HTMLElement, coordSys: TGCoordSys, opts?: TGMapOptions) {}

  getDiv(): HTMLElement {}
  getCoordSys(): TGCoordSys {}
  setOptions(mapOptions: TGMapOptions): void {}
  fitBounds(envelope: TGEnvelope): void {}
  getBounds(): TGEnvelope {}
  getCenter(): TGPoint {}
  setCenter(center: TGPoint): void {}
  getZoom(): number {}
  setZoom(zoom: number): void {}
  getMapTypeId(): TGMapTypeId {}
  setMapTypeId(mapTypeID: TGMapTypeId): void {}
  getBackgroundColor(): string {}
  setBackgroundColor(backgroundColor: string): void {}
  panBy(x: number, y: number): void {}
  panToBounds(envelope: TGEnvelope): void {}
}

interface TGDataOptions {
  map: TGOnlineMap;
  style: TGStyleOptions;
}

interface TGGeoJsonOptions {
  idPropertyName: string;
}

interface TGStyleOptions {
  clickable?: boolean;
  cursor?: string;
  draggable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  icon?: any;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  title?: string;
  visible?: boolean;
  zIndex?: number;
  flat?: boolean;
  shadow?: any;
  annotation?: object;
}

export declare class TGData {
  constructor(opts?: TGDataOptions) {}
  add(graphic: TGGraphic | TGGraphicOptions): void {}
  addGeoJson(geoJson: object): TGGraphic[] {}
}

interface TGGraphicOptions {
  geometry?: TGGeometry;
  id?: string | number;
  properties?: object;
  style?: TGStyleOptions | (() => TGStyleOptions);
}

export declare class TGGeometry {
  constructor() {}
  getType(): "TGPoint" | "TGLineString" | "TGLinearRing" | "TGPolygon" {}
}

export declare class TGGraphic {
  constructor(opts?: TGGraphicOptions) {}
  forEachProperty(): unknown {}
  getGeometry(): TGGeometry {}
  getId(): string | number {}
  getProperty(name: string): unknown {}
  removeProperty(name: string): void {}
  setGeometry(newGeometry: TGGeometry): void {}
  setProperty(name: string, newValue: unknown): void {}
  toGeoJson(): object {}
}

export interface TGOS {
  [key: string]: any;
  TGOnlineMap: typeof TGOnlineMap;
  TGData: typeof TGData;
  TGGraphic: typeof TGGraphic;
  TGGeometry: typeof TGGeometry;
  TGPoint: typeof TGPoint;
  TGEnvelope: typeof TGEnvelope;
  TGCoordSys: { [K in TGCoordSys]: K };
}

declare global {
  interface Window {
    TGOS: TGOS;
  }
}
