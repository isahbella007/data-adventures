import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#030010',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        gap: 3,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: { xs: '2.4rem', md: '4rem' },
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Data Adventures
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: { xs: '1rem', md: '1.2rem' },
          color: 'rgba(255,255,255,0.55)',
          maxWidth: 480,
          lineHeight: 1.6,
        }}
      >
        Storybook adventures that make data concepts fun and accessible for young readers.
      </Typography>

      <Link href="/books/alex-data-twin">
        <Button
          disableElevation
          sx={{
            mt: 1,
            backgroundColor: '#F97316',
            color: '#ffffff',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: '1rem',
            px: 4,
            py: 1.5,
            borderRadius: '50px',
            boxShadow: '0 0 24px rgba(249,115,22,0.4)',
            '&:hover': {
              backgroundColor: '#EA6F0F',
              boxShadow: '0 0 36px rgba(249,115,22,0.6)',
            },
          }}
        >
          Explore Alex and the Data Twin →
        </Button>
      </Link>
    </Box>
  );
}
