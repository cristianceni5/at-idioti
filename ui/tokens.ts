export const PALETTE = {
  BLU_PRINCIPALE: "#13408d",
  BLU_INCAZZATO: "#0b2e5c",
  AZZURRINO_TABBAR: "#15ac96",
  BIANCO: "#ffffff",
  TABBAR_INATTIVO: "#7d8ca3",
};

export const HEADER_TOKENS = {
  TOP_OFFSET: 8,
  BOTTOM_PADDING: 10,
  HORIZONTAL_PADDING: 12,
  CONTENT_HEIGHT: 34,
  TITLE_SIZE: 18,
  SIDE_SLOT_WIDTH: 116,
  BACK_LABEL_SIZE: 17,
} as const;

export function getHeaderHeight(topInset: number) {
  return (
    topInset +
    HEADER_TOKENS.TOP_OFFSET +
    HEADER_TOKENS.CONTENT_HEIGHT +
    HEADER_TOKENS.BOTTOM_PADDING
  );
}
