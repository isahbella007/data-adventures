'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/books/alex-data-twin' || pathname === '/') {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#030010',
        borderTop: '1px solid rgba(125,211,252,0.1)',
        py: { xs: 5, md: 8 },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Brand block */}
        <Box sx={{ maxWidth: 300 }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: '1.15rem',
              color: '#ffffff',
              mb: 1.5,
            }}
          >
            Data Adventures
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.6,
            }}
          >
            Storybook adventures that make data concepts fun and accessible for young readers.
          </Typography>
        </Box>

        {/* Links */}
        <Box sx={{ display: 'flex', gap: { xs: 4, md: 8 } }}>
          <Box>
            <Typography
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '0.72rem',
                color: '#7DD3FC',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Books
            </Typography>
            <Link href="/books/alex-data-twin">
              <Typography
                sx={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  '&:hover': { color: '#7DD3FC' },
                }}
              >
                Alex and the Data Twin
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          mt: { xs: 5, md: 6 },
          pt: 3,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.22)',
          }}
        >
          © {new Date().getFullYear()} Data Adventures. All rights reserved.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.22)',
          }}
        >
          Made with care for curious kids.
        </Typography>
      </Box>
    </Box>
  );
}
