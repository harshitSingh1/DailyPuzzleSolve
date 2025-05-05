import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

const puzzleGames = [
  {
    id: 'pinpoint',
    title: 'LinkedIn Pinpoint',
    description: 'Word puzzle where you find the common connection between four given words. Get daily solutions with detailed explanations.',
    image: '/images/pinpoint-game.png',
    path: '/solutions/pinpoint',
    difficulty: 'Medium',
    updatedAt: '2024-01-20'
  },
  {
    id: 'queens',
    title: 'LinkedIn Queens',
    description: 'Logic puzzle where you place queens on a chessboard without them attacking each other. Step-by-step daily solutions available.',
    image: '/images/queens-game.png',
    path: '/solutions/queens',
    difficulty: 'Hard',
    updatedAt: '2024-01-20'
  },
  {
    id: 'tango',
    title: 'LinkedIn Tango',
    description: 'Pattern-matching puzzle where you connect colored dots with non-crossing lines. Get expert solutions daily.',
    image: '/images/tango-game.png',
    path: '/solutions/tango',
    difficulty: 'Medium',
    updatedAt: '2024-01-20'
  },
  {
    id: 'crossclimb',
    title: 'LinkedIn Crossclimb',
    description: 'Hybrid puzzle combining crossword clues with a ladder-style word progression. Daily solutions with explanations.',
    image: '/images/crossclimb-game.png',
    path: '/solutions/crossclimb',
    difficulty: 'Hard',
    updatedAt: '2024-01-20'
  },
  {
    id: 'zip',
    title: 'LinkedIn Zip',
    description: 'Number sequence puzzle where you find the missing number in an interlocking pattern. Daily solutions available.',
    image: '/images/zip-game.png',
    path: '/solutions/zip',
    difficulty: 'Easy',
    updatedAt: '2024-01-20'
  }
];

const faqData = [
  {
    question: "How often are puzzle solutions updated?",
    answer: "Solutions are updated daily with in 30 minutes for all LinkedIn puzzle games including Pinpoint, Queens, Tango, Crossclimb, and Zip. You can also request solution for other puzzle games"
  },
  {
    question: "Are the solutions free to access?",
    answer: "Yes, all puzzle solutions are completely free to access. We believe in making puzzle-solving resources available to everyone."
  },
  {
    question: "How detailed are the solutions?",
    answer: "Each solution includes step-by-step explanations, screenshots, and video walkthroughs when available. We ensure every step is clearly explained."
  },
  {
    question: "Can I request help for a specific puzzle?",
    answer: "Yes! You can contact us through our support page, and we'll help you with any specific puzzle you're struggling with."
  },
  {
    question: "Can you tell me more about PuzzleLogicHub?",
    answer: "LogicPuzzleHub is your premier destination for comprehensive LinkedIn puzzle solutions. We provide daily updated solutions for Pinpoint, Queens, Tango, Crossclimb, and Zip puzzles, helping you master these challenging games with detailed explanations and expert strategies. Whether you're stuck on today's puzzle or looking to improve your solving techniques, our step-by-step guides and video walkthroughs make puzzle-solving accessible and enjoyable."
  }
];

export default function Home() {
  const pageTitle = "Today's LinkedIn Puzzle Solutions & Walkthroughs | LogicPuzzleHub";
  const pageDescription = "Get instant access to today's LinkedIn puzzle solutions: Pinpoint, Queens, Tango, Crossclimb, and Zip. Step-by-step explanations, video guides, and expert tips updated daily. Master LinkedIn puzzles with our comprehensive walkthroughs.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app";
  const featuredImage = "https://daily-puzzle-solve.vercel.app/hero.jpeg";
  const currentDate = new Date().toISOString();

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonicalUrl,
          site_name: 'LogicPuzzleHub',
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: featuredImage,
              width: 1200,
              height: 630,
              alt: 'LogicPuzzleHub - LinkedIn Puzzle Solutions',
            }
          ]
        }}
        twitter={{
          handle: '@LogicPuzzleHub',
          site: '@LogicPuzzleHub',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        {/* Preload Critical Assets */}
        <link rel="preload" href="/hero.jpeg" as="image" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "LogicPuzzleHub",
            "url": canonicalUrl,
            "description": pageDescription,
            "datePublished": "2024-01-01",
            "dateModified": currentDate,
            "publisher": {
              "@type": "Organization",
              "name": "LogicPuzzleHub",
              "logo": {
                "@type": "ImageObject",
                "url": `${canonicalUrl}/logo.png`
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": puzzleGames.length,
              "itemListElement": puzzleGames.map((game, index) => ({
                "@type": "Game",
                "position": index + 1,
                "name": game.title,
                "description": game.description,
                "image": `${canonicalUrl}${game.image}`,
                "url": `${canonicalUrl}${game.path}`,
                "difficulty": game.difficulty,
                "dateModified": game.updatedAt
              }))
            }
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <Box
        component="section"
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
              component="h1"
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
              variant="h2"
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
                    }
                  }}
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
                    }
                  }}
                >
                  More Games
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" component="main">
        {/* Puzzle Solutions Grid */}
        <Box
          id="puzzles"
          component="section"
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6
          }}
        >
          {puzzleGames.map((game, index) => (
            <Fade in={true} key={game.id} timeout={index * 150}>
              <Card
                sx={{
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
                  alt={`${game.title} - Daily Solutions and Walkthroughs`}
                  loading={index < 3 ? "eager" : "lazy"}
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
                        transition: 'all 0.2s ease',
                        mt: 2
                      }}
                      aria-label={`View ${game.title} solutions`}
                      itemProp="url"
                    >
                      View Todays Solution
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>

        {/* FAQ Section */}
        <Box component="section" sx={{ my: 6 }}>
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', fontSize: '2rem', color: 'text.primary' }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqData.map((faq, index) => (
            <Accordion 
              key={index} 
              sx={{ 
                mb: 2,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: '8px',
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 600, fontSize: '1.1rem', color: "text.primary" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails 
                sx={{ 
                  backgroundColor: 'background.default',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px'
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>


        {/* Ad Section */}
        <Box component="section" sx={{ my: 6 }}>
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