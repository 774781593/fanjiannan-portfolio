export type ImageLayer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  eager?: boolean;
  z?: number;
  rotate?: number;
  opacity?: number;
  cover?: boolean;
  radius?: number;
  border?: string;
  borderWidth?: number;
  shadow?: string;
  motionDisabled?: boolean;
  imageX?: number;
  imageY?: number;
  imageW?: number;
  imageH?: number;
  crop?: {
    top: string;
    height: string;
  };
};

export type BSystemNeedCard = {
  avatar: string;
  text: string;
  width: number;
};

export type TextLayer = {
  text: string;
  parts?: Array<{ text: string; color?: string; weight?: number }>;
  x: number;
  y: number;
  size: number;
  weight?: number;
  z?: number;
  color?: string;
  gradient?: string;
  opacity?: number;
  width?: number;
  height?: number;
  lineHeight?: number;
  letterSpacing?: number;
  family?: string;
  style?: string;
  align?: "left" | "center" | "right";
  wrap?: boolean;
};

export type RectLayer = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: "rect" | "triangle" | "source-arrow" | "diagonal-arrow" | "selection-box" | "connector-right" | "connector-left" | "connector-cap-right" | "connector-cap-left";
  color?: string;
  background?: string;
  radius?: number;
  radiusCss?: string;
  z?: number;
  opacity?: number;
  border?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderTop?: string;
  borderTopWidth?: number;
};

export type Frame = {
  height: number;
  background?: string;
  fullImageSrc?: string;
  images?: ImageLayer[];
  texts?: TextLayer[];
  rects?: RectLayer[];
  hero?: {
    title: string;
    titleX: number;
    titleY: number;
    titleW?: number;
    titleH?: number;
    titleAlign?: "left" | "center" | "right";
    descA: string;
    descAX: number;
    descAY: number;
    descB: string;
    descBX: number;
    descBY: number;
    descAWeight?: number;
    descBWeight?: number;
    subtitle?: TextLayer;
  };
};

export type MotionContext = {
  disabled?: boolean;
};

export type ViewportWindow = {
  enabled: boolean;
  start: number;
  end: number;
};
