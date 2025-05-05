import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Poppins, Open_Sans } from 'next/font/google';
import '@/styles/globals.css';

// Load fonts using Next.js optimization
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

// Create MUI theme with font variables
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00b0ff',
    },
  },
  typography: {
    fontFamily: 'var(--font-open-sans), sans-serif',
    h1: {
      fontFamily: 'var(--font-poppins), sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'var(--font-poppins), sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'var(--font-poppins), sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: 'var(--font-poppins), sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          subtitle2: 'h3',
          body1: 'p',
          body2: 'span',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} ${openSans.variable}`}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </div>
  );
}