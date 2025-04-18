import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  
  // Check if current route matches nav link
  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Image 
              src="/logo1.png" 
              alt="LogicPuzzleMaster Logo" 
              width={40} 
              height={40}
              style={{ marginRight: '10px' }}
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
                background: 'linear-gradient(90deg, #1976d2 0%, #00b0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              PuzzleLogicHub
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {[
              { path: '/', name: 'Home' },
              { path: '/meme', name: 'Memes' },
              { path: '/tools', name: 'Tools' },
              { path: '/shop', name: 'Shop' },
              { path: '/games', name: 'Games' },
              { path: '/blog', name: 'Blog' },
            ].map((item) => (
              <Link href={item.path} passHref key={item.path}>
                <Button
                  sx={{
                    mx: 1,
                    color: isActive(item.path) ? '#1976d2' : 'black',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: isActive(item.path) ? '100%' : '0',
                      height: '2px',
                      backgroundColor: '#1976d2',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover': {
                      color: '#1976d2',
                      '&:after': {
                        width: '100%',
                        backgroundColor: '#1976d2',
                      },
                    },
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Contact Button */}
          <Link href="/contact" passHref>
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: '#1976d2',
                color: 'white',
                borderRadius: '8px',
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}