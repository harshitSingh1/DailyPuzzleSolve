import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Grow,
  Slide
} from '@mui/material';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import HeadSEO from '@/components/HeadSEO';

const puzzleGames = [
  {
    id: 'pinpoint',
    title: 'LinkedIn Pinpoint',
    description: 'Daily word association puzzle that challenges your vocabulary',
    image: '/images/pinpoint-game.png',
    path: '/solutions/pinpoint'
  },
  {
    id: 'queens',
    title: 'LinkedIn Queens',
    description: 'Classic chess puzzle with modern twists',
    image: '/images/queens-game.png',
    path: '/solutions/queens'
  },
  {
    id: 'tango',
    title: 'LinkedIn Tango',
    description: 'Spatial reasoning puzzle with beautiful design',
    image: '/images/tango-game.png',
    path: '/solutions/tango'
  },
  {
    id: 'crossword',
    title: 'LinkedIn Crossword',
    description: 'Traditional crossword with daily challenges',
    image: '/images/crossword-game.png',
    path: '/solutions/crossword'
  },
  {
    id: 'zip',
    title: 'LinkedIn Zip',
    description: 'Number placement puzzle with unique mechanics',
    image: '/images/zip-game.png',
    path: '/solutions/zip'
  }
];

export default function Home() {
  return (
    <>
      <HeadSEO
        title="Daily Puzzle Solutions | LogicPuzzleMaster"
        description="Step-by-step solutions for LinkedIn Pinpoint, Queens, Tango and more puzzles"
        canonicalUrl="https://yourdomain.com"
      />
      
      <Box
        sx={{
          position: 'relative',
          py: 10,
          mb: 6,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(to right, 
                rgba(25, 59, 210, 0.52) 0%, 
                rgba(9, 3, 131, 0.77) 50%, 
                rgba(25, 59, 210, 0.52) 100%),
              url('/hero.jpeg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 3,
                color: 'common.white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Daily solutions with step-by-step explanations and video walkthroughs.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Link href="#puzzles" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: '#1976d2',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '50px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Solutions
                </Button>
              </Link>
              <Link href="/games" passHref>
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
                  More Games
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Puzzle Games Grid */}
        <Box id="puzzles" sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          mb: 4
        }}>
          {puzzleGames.map((game, index) => (
            <Grow in={true} timeout={index * 150} key={game.id}>
              <Card
                sx={{
                  width: { xs: '100%', sm: 345, md: 300 },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={game.image}
                  alt={game.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: 'text.primary'
                    }}
                  >
                    {game.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: 'text.secondary',
                      minHeight: '4em'
                    }}
                  >
                    {game.description}
                  </Typography>
                  <Link href={game.path} passHref>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: '50px',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          transform: 'scale(1.02)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      View Solutions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mt: 6 }}>
            <AdBanner />
          </Box>
        </Slide>
      </Container>
    </>
  );
}