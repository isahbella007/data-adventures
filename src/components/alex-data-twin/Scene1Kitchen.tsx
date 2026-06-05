'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Scene1KitchenProps {
  sx?: any;
}

export default function Scene1Kitchen({ sx }: Scene1KitchenProps) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        ...sx,
      }}
    >

      <Image
        src="/images/kitchen-real.png"
        alt="Alex in the kitchen"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Story overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pt: { xs: '24px', md: '32px' },
          px: { xs: '20px', md: '40px' },
          pb: { xs: 'max(56px, calc(env(safe-area-inset-bottom) + 40px))', md: '32px' },
          background: { xs: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)', md: 'linear-gradient(to top, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 40%)' },
          transition: 'background 1.5s ease',
        }}
      >
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mb: '8px' }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.1,
              mb: '12px',
            }}
          >
            <Box component="span" sx={{ color: '#1c0a00', display: 'block' }}>
              Alex & the
            </Box>
            <Box component="span" sx={{ color: '#7c3aed', display: 'block' }}>
              Data Twin
            </Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(15px, 2.5vw, 19px)',
              color: '#4a2e1b',
              fontWeight: 600,
              lineHeight: 1.6,
            }}
          >
            One day Alex looks into Mum's tablet and sees a reflection staring back, except it isn't just a reflection. It's him. But different. And it wants to talk.
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}
