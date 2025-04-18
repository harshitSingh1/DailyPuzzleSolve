import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import Link from 'next/link';
import HeadSEO from '@/components/HeadSEO';
import AdBanner from '@/components/AdBanner';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const theme = useTheme();

  return (
    <>
      <HeadSEO
        title="Page Not Found | LogicPuzzleMaster"
        description="The page you're looking for doesn't exist. Find puzzle solutions and resources on our homepage."
        canonicalUrl="https://yourdomain.com/404"
      />
      
      <Container maxWidth="lg" sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        position: 'relative'
      }}>
        {/* Animated 404 Number with Puzzle Pieces */}
        <Box sx={{ position: 'relative', mb: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '8rem', sm: '12rem' },
                fontWeight: 800,
                lineHeight: 1,
                color: 'primary.main',
                position: 'relative',
                zIndex: 1,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '6rem'
                }
              }}
            >
              404
            </Typography>
          </motion.div>
          
          {/* Puzzle Piece Decorations */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: -15,
              right: -30,
              width: 60,
              height: 60,
              background: theme.palette.secondary.main,
              borderRadius: '15px',
              clipPath: `
                polygon(
                  0% 25%, 
                  25% 25%, 
                  25% 0%, 
                  75% 0%, 
                  75% 25%, 
                  100% 25%, 
                  100% 75%, 
                  75% 75%, 
                  75% 100%, 
                  25% 100%, 
                  25% 75%, 
                  0% 75%
                )
              `,
              zIndex: 0
            }}
          />
          
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: -15,
              left: -30,
              width: 60,
              height: 60,
              background: theme.palette.primary.light,
              borderRadius: '15px',
              clipPath: `
                polygon(
                  0% 25%, 
                  25% 25%, 
                  25% 0%, 
                  75% 0%, 
                  75% 25%, 
                  100% 25%, 
                  100% 75%, 
                  75% 75%, 
                  75% 100%, 
                  25% 100%, 
                  25% 75%, 
                  0% 75%
                )
              `,
              zIndex: 0
            }}
          />
        </Box>

        {/* Error Message */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
                [theme.breakpoints.down('md')]: {
                  fontSize: '1.8rem'
                }
              }}
            >
              Missing Puzzle Piece
            </Typography>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                mb: 4
              }}
            >
              We couldn&apos;t find the page you&apos;re looking for, but we&apos;ve got plenty 
              of other puzzle solutions waiting for you!
            </Typography>
          </Box>
        </Fade>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          mb: 6
        }}>
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: 3,
                  transition: 'all 0.3s ease'
                }}
              >
                Return Home
              </Button>
            </motion.div>
          </Link>
          <Link href="/puzzles" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderWidth: '2px',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Puzzles
              </Button>
            </motion.div>
          </Link>
        </Box>

        {/* Animated Puzzle Piece Floating */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          overflow: 'hidden',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: 0,
                x: Math.random() * 100,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, Math.random() * 90 - 45, 0]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: 40,
                height: 40,
                background: theme.palette.primary.light,
                opacity: 0.3,
                borderRadius: '10px',
                clipPath: `
                  polygon(
                    0% 25%, 
                    25% 25%, 
                    25% 0%, 
                    75% 0%, 
                    75% 25%, 
                    100% 25%, 
                    100% 75%, 
                    75% 75%, 
                    75% 100%, 
                    25% 100%, 
                    25% 75%, 
                    0% 75%
                  )
                `
              }}
            />
          ))}
        </Box>

        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={1000}>
          <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto' }}>
            <AdBanner />
          </Box>
        </Slide>
      </Container>
    </>
  );
}