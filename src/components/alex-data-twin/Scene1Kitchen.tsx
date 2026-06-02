'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Scene1Kitchen() {
  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
      <Image
        src="/images/kitchen-real.png"
        alt="Alex in the kitchen"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Legibility gradient at the bottom */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(61,26,0,0.65) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 60, md: 48 },
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 2,
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 800,
            fontSize: { xs: '1.05rem', md: '1.35rem' },
            color: '#FFF8EE',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          One ordinary morning, Alex noticed something strange on the kitchen table...
        </Typography>
      </Box>
    </Box>
  );
}
