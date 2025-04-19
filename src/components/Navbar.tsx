import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (pathname: string) => router.pathname === pathname;

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/meme', name: 'Memes' },
    { path: '/tools', name: 'Tools' },
    { path: '/shop', name: 'Shop' },
    { path: '/games', name: 'Games' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PuzzleLogicHub
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Link href={item.path} passHref>
              <ListItemButton sx={{ 
                textAlign: 'center',
                color: isActive(item.path) ? '#1976d2' : 'inherit',
                fontWeight: isActive(item.path) ? 600 : 400
              }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: isMobile ? 1 : 0
          }}>
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
                fontWeight: 800, // Increased weight
                fontSize: '1.5rem', // Increased size
                letterSpacing: '0.5px',
                background: 'linear-gradient(90deg, #1976d2 0%, #00b0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Poppins", sans-serif' // Changed font
              }}
            >
              PuzzleLogicHub
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1
            }}>
              {navItems.slice(0, -1).map((item) => (
                <Link href={item.path} passHref key={item.path}>
                  <Button
                    sx={{
                      mx: 1,
                      color: isActive(item.path) ? '#1976d2' : 'black',
                      fontWeight: isActive(item.path) ? 700 : 500, // Increased weight
                      fontSize: '1rem', // Increased size
                      position: 'relative',
                      fontFamily: '"Poppins", sans-serif', // Changed font
                      textTransform: 'none', // Normal case
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
          )}

          {/* Contact Button (Desktop) */}
          {!isMobile && (
            <Link href="/contact" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  fontSize: '1rem', // Increased size
                  fontFamily: '"Poppins", sans-serif', // Changed font
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
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '240px',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}