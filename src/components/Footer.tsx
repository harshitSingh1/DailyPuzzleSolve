import { 
  Box, 
  Container, 
  Typography, 
  Link as MuiLink, 
  TextField, 
  Button,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { 
  YouTube, 
  LinkedIn, 
  Twitter, 
  Reddit 
} from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a2a3a',
        color: 'common.white',
        py: 6,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 2 }}
          sx={{ mb: 4 }}
          divider={
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: { xs: 'none', md: 'block' } 
              }} 
            />
          }
        >
          <Box sx={{ 
            width: { md: '25%' },
            minWidth: { md: '200px' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image 
                src="/logo1.png" 
                alt="PuzzleLogicHub Logo" 
                width={40} 
                height={40}
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  ml: 1.5,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  background: 'linear-gradient(90deg, #4fc3f7 0%, #1976d2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                PuzzleLogicHub
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.8, fontSize: '0.95rem' }}>
              Your daily source for logic puzzle solutions and brain teasers.
            </Typography>
          </Box>

          <Box sx={{ 
            width: { md: '20%' },
            minWidth: { md: '160px' }
          }}>
            <Typography variant="h6" component="h3" sx={{ 
              mb: 2, 
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { path: '/tools', name: 'Useful Tools' },
                { path: '/shop', name: 'Buy Fun Games' },
                { path: '/games', name: 'More Puzzles' },
                { path: '/blog', name: 'Read Articles' },
              ].map((item) => (
                <Link href={item.path} passHref legacyBehavior key={item.path}>
                  <MuiLink 
                    color="inherit" 
                    sx={{ 
                      display: 'block',
                      fontSize: '1rem',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        color: 'primary.light',
                        pl: 1
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.name}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ 
            width: { md: '20%' },
            minWidth: { md: '160px' }
          }}>
            <Typography variant="h6" component="h3" sx={{ 
              mb: 2, 
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              Information
            </Typography>
            <Stack spacing={1}>
              {[
                { path: '/about', name: 'About Us' },
                { path: '/privacy', name: 'Privacy Policy' },
                { path: '/terms', name: 'Terms' },
                { path: '/contact', name: 'Contact' },
              ].map((item) => (
                <Link href={item.path} passHref legacyBehavior key={item.path}>
                  <MuiLink 
                    color="inherit" 
                    sx={{ 
                      display: 'block',
                      fontSize: '1rem',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        color: 'primary.light',
                        pl: 1
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.name}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ 
            width: { md: '35%' },
            minWidth: { md: '240px' }
          }}>
            <Typography variant="h6" component="h3" sx={{ 
              mb: 2, 
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              Newsletter
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 2, 
              opacity: 0.8,
              fontSize: '0.95rem'
            }}>
              Get daily puzzle solutions straight to your inbox
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <TextField
                variant="outlined"
                placeholder="Email address"
                size="small"
                fullWidth
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'common.white',
                    borderRadius: '4px'
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{
                  px: 3,
                  whiteSpace: 'nowrap',
                  borderRadius: '4px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Subscribe
              </Button>
            </Stack>
            
            <Box>
              <Typography variant="body1" sx={{ 
                mb: 1.5,
                fontSize: '0.95rem',
                opacity: 0.8
              }}>
                Follow us:
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  { icon: <YouTube />, color: '#FF0000' },
                  { icon: <LinkedIn />, color: '#0077B5' },
                  { icon: <Twitter />, color: '#1DA1F2' },
                  { icon: <Reddit />, color: '#FF5700' },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'common.white',
                      '&:hover': {
                        backgroundColor: social.color,
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Divider */}
        <Divider sx={{ 
          my: 4, 
          backgroundColor: 'rgba(255,255,255,0.1)',
          display: { md: 'none' }
        }} />

        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body1" sx={{ 
            opacity: 0.7,
            fontSize: '0.9rem'
          }}>
            © 2025 PuzzleLogicHub. All rights reserved.
          </Typography>
          <Typography variant="body1" sx={{ 
            opacity: 0.7,
            fontSize: '0.9rem'
          }}>
            Designed for puzzle enthusiasts worldwide
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}