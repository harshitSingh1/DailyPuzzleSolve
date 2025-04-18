import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    useTheme, 
    useMediaQuery,
    Fade,
    Slide
  } from '@mui/material';
  import Link from 'next/link';
  import HeadSEO from '@/components/HeadSEO';
  import AdBanner from '@/components/AdBanner';
  import { motion } from 'framer-motion';
  
  export default function NotFoundPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <>
        <HeadSEO
          title="Page Not Found | LogicPuzzleMaster"
          description="The page you're looking for doesn't exist or has been moved."
          canonicalUrl="https://yourdomain.com/404"
        />
        
        <Container maxWidth="lg" sx={{ 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh'
        }}>
          {/* Animated 404 Text */}
          <Box sx={{ 
            position: 'relative',
            textAlign: 'center',
            mb: 4
          }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '8rem', sm: '10rem', md: '12rem' },
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'primary.main',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '10%',
                    right: '10%',
                    height: '8px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    borderRadius: '4px'
                  }
                }}
              >
                404
              </Typography>
            </motion.div>
          </Box>
  
          {/* Error Message */}
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary',
                  [theme.breakpoints.down('md')]: {
                    fontSize: '1.8rem'
                  }
                }}
              >
                Oops! Page Not Found
              </Typography>
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 4
                }}
              >
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
              </Typography>
            </Box>
          </Fade>
  
          {/* Action Buttons */}
          <Slide direction="up" in={true} timeout={1000}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: 2,
              mb: 6
            }}>
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '50px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Return Home
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '50px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 1
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Report Problem
                </Button>
              </Link>
            </Box>
          </Slide>
  
          {/* Puzzle Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
          >
            <Box
              component="svg"
              viewBox="0 0 200 200"
              sx={{
                width: '100%',
                height: 'auto',
                fill: theme.palette.primary.main,
                opacity: 0.2
              }}
            >
              <path d="M50,50 L150,50 L150,150 L50,150 Z" />
              <circle cx="100" cy="100" r="30" />
              <path d="M30,100 L170,100 M100,30 L100,170" />
            </Box>
          </motion.div>
  
          {/* Ad Banner */}
          <Slide direction="up" in={true} timeout={1200}>
            <Box sx={{ mt: 6, width: '100%' }}>
              <AdBanner />
            </Box>
          </Slide>
        </Container>
      </>
    );
  }