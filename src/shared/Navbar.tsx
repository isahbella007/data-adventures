'use client';

import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/books/alex-data-twin') {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? 'rgba(3,0,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(125,211,252,0.15)' : 'none',
        transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, border-bottom 0.35s ease',
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2.5, md: 5 },
          py: { xs: 1, md: 1.5 },
          justifyContent: 'space-between',
          maxWidth: 1440,
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Brand */}
        <Link href="/">
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            Data World Adventures
          </Typography>
        </Link>

        {/* Nav links */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3.5 } }}>
          {[
            // { label: 'Home', href: '/' },
            { label: 'Books', href: '/books/alex-data-twin' },
          ].map(({ label, href }) => (
            <Link key={label} href={href}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#7DD3FC' },
                }}
              >
                {label}
              </Typography>
            </Link>
          ))} */}

          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'flex' }}>
            <Button
              variant="contained"
              disableElevation
              sx={{
                display: { xs: 'none', md: 'flex' },
                backgroundColor: '#F97316',
                color: '#ffffff',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '0.85rem',
                px: 2.5,
                py: 0.9,
                borderRadius: '50px',
                boxShadow: '0 0 16px rgba(249,115,22,0.35)',
                '&:hover': {
                  backgroundColor: '#EA6F0F',
                  boxShadow: '0 0 24px rgba(249,115,22,0.55)',
                },
              }}
            >
              Get the Book
            </Button>
          </motion.div> */}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}
