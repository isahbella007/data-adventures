import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0057FF',
      light: '#7DD3FC',
      dark: '#001650',
    },
    secondary: {
      main: '#C084FC',
    },
    background: {
      default: '#FFF8EE',
      paper: '#FDEBD0',
    },
    text: {
      primary: '#030010',
      secondary: '#3D1A00',
    },
  },
  typography: {
    fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
    h1: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 900 },
    h2: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 800 },
    h3: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'var(--font-nunito), "Nunito", sans-serif', fontWeight: 700 },
    button: {
      fontFamily: 'var(--font-nunito), "Nunito", sans-serif',
      fontWeight: 700,
      textTransform: 'none' as const,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { height: 100%; scroll-behavior: smooth; }
        body {
          min-height: 100%;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030010; }
        ::-webkit-scrollbar-thumb { background: #7DD3FC; border-radius: 3px; }
        ::selection { background-color: rgba(125, 211, 252, 0.3); }
      `,
    },
  },
});

export default theme;

// Design token reference — used via sx prop throughout the app
export const colors = {
  realWorld: {
    cream: '#FFF8EE',
    light: '#FDEBD0',
    mid: '#F5D5A5',
    warm: '#E8C490',
  },
  dataWorld: {
    deepNavy: '#001650',
    blue: '#0057FF',
    skyBlue: '#7DD3FC',
    purple: '#C084FC',
  },
  accent: '#F97316',
  darkBase: '#030010',
};
