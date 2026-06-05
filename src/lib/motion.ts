export const easeOut = [0.22, 1, 0.36, 1] as const;

export const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  }
};

export const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.05, ease: easeOut }
  }
};
