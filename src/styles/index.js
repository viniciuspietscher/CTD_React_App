//Color Constants
export const WHITE = '#ffffff';
export const BLACK = '#000000';
export const GREY = {
  100: '#f5f5f5',
  200: '#eaeaea',
  300: '#d2d2d2',
  400: '#b8b8b8',
  500: '#969696',
  700: '#4f4f4f',
  800: '#3c3c3c',
};

export const TRANSPARENT = {
  50: 'rgba(0, 0, 0, 0.05)',
  100: 'rgba(0, 0, 0, 0.1)',
  200: 'rgba(0, 0, 0, 0.2)',
  300: 'rgba(0, 0, 0, 0.3)',
  400: 'rgba(0, 0, 0, 0.4)',
  500: 'rgba(0, 0, 0, 0.5)',
  600: 'rgba(0, 0, 0, 0.6)',
  700: 'rgba(0, 0, 0, 0.7)',
  800: 'rgba(0, 0, 0, 0.8)',
};

export const BACKGROUND_COLOR = GREY[100];

//Layout Component Constants
export const CARD_BACKGROUND_COLOR = WHITE;
export const LIGHT_ON_DARK_TEXT_COLOR = GREY[400];
export const DARK_ON_LIGHT_TEXT_COLOR = GREY[800];
export const BORDER_COLOR = GREY[300];

//Attributes
export const BORDER = `1px solid ${BORDER_COLOR}`;
export const BOX_SHADOW = `0px 3px 5px 0px ${GREY[200]}`;
export const ROUNDED = 5;
export const TRANSITION = 'all .25s';

//Mixins
export const HOVER_BUTTON = {
  display: 'block',
  padding: 10,
  transition: TRANSITION,
  borderRadius: ROUNDED,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: TRANSPARENT[50],
  },
};
