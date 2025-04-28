import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Fade
} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

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
    title: 'LinkedIn Crossclimb',
    description: 'Traditional crossclimb with daily challenges',
    image: '/images/crossclimb-game.png',
    path: '/solutions/crossclimb'
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
  const pageTitle = "Daily Puzzle Solutions & Walkthroughs | LogicPuzzleHub";
  const pageDescription = "Get step-by-step solutions for LinkedIn Pinpoint, Queens, Tango, Crossclimb, and Zip puzzles. Master logic games with our expert walkthroughs and strategies.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app";
  const featuredImage = "https://daily-puzzle-solve.vercel.app/hero.jpeg";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={featuredImage} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${canonicalUrl}?search={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Head>

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
        itemScope
        itemType="http://schema.org/WPHeader"
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
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 3,
                color: 'common.white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
              itemProp="headline"
            >
              Master Logic Puzzles Like Never Before
            </Typography>
            <Typography
              variant="h2"
              component="h2"
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
              <Link href="#puzzles" passHref legacyBehavior>
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
                  aria-label="View puzzle solutions"
                >
                  View Solutions
                </Button>
              </Link>
              <Link href="/games" passHref legacyBehavior>
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
                  aria-label="Explore more games"
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
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 4
        }}>
          {puzzleGames.map((game, index) => (
            <Fade in={true} key={game.id} timeout={index * 150}>
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
                itemScope
                itemType="http://schema.org/Game"
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={game.image}
                  alt={game.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  itemProp="image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: 'text.primary',
                      fontSize: '1.25rem'
                    }}
                    itemProp="name"
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
                    itemProp="description"
                  >
                    {game.description}
                  </Typography>
                  <Link href={game.path} passHref legacyBehavior>
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
                      aria-label={`View ${game.title} solutions`}
                      itemProp="url"
                    >
                      View Solutions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>

        {/* About Section */}
        <Box sx={{ mt: 6, mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center', color: 'text.primary' }}>
            About LogicPuzzleHub
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            LogicPuzzleHub is your ultimate resource for solving and mastering popular logic puzzles. 
            Our detailed walkthroughs and strategies help you understand the underlying patterns and 
            techniques to solve puzzles efficiently. Whether you&apos;re a beginner or an experienced solver, 
            our solutions will enhance your problem-solving skills.
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd 
            slot="3923231851" 
            format="auto" 
            style={{ display: 'block' }}
          />
        </Box>
      </Container>
    </>
  );
}