import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import Link from 'next/link';

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(47, 25, 210, 0.70) 0%,
              rgba(12, 6, 98, 0.9) 50%,
              rgba(47, 25, 210, 0.70) 100%
            ),
            url('/hero.jpeg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          filter: 'brightness(0.9)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '1000px',
          mx: 'auto',
          p: 4,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: '16px',
          backdropFilter: 'blur(4px)'
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              color: 'common.white',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Master Logic Puzzles Like Never Before
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}
          >
            Daily solutions for LinkedIn Pinpoint, Tango, Crossclimb and more with step-by-step explanations and video walkthroughs.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link href="#latest-puzzles" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: '50px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Puzzles
              </Button>
            </Link>
            <Link href="/roadmap" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: '50px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Roadmap
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}