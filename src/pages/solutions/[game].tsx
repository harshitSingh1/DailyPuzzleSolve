import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Button,
  useTheme,
  Fade,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';
import Puzzle from '@/models/Puzzle';
import dbConnect from '@/utils/dbConnect';

// Lazy load heavy components
const YouTube = dynamic(() => import('react-youtube'), { 
  ssr: false,
  loading: () => <div style={{ height: '400px', background: '#f5f5f5' }} />
});

const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), { 
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

interface SolutionPageProps {
  solutions: {
    _id: string;
    heading: string;
    ytVideo: string;
    screenshots: string[];
    createdAt: Date;
  }[];
  game: string;
  error?: string;
}

export default function SolutionPage({ solutions, game, error }: SolutionPageProps) {
  const router = useRouter();
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'video' | 'images'>('images');
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(solutions[0]?._id || false);

  // Format game name for display
  const formattedGameName = game
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('Linkedin', 'LinkedIn');

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  // SEO Metadata
  const pageTitle = `${formattedGameName} Puzzle Solutions - Step by Step Guides | LogicPuzzleHub`;
  const pageDescription = `Comprehensive ${formattedGameName} puzzle solutions with detailed step-by-step guides. Learn strategies and improve your puzzle-solving skills with our visual explanations.`;
  const canonicalUrl = `https://daily-puzzle-solve.vercel.app/solutions/${game.toLowerCase()}`;
  const featuredImage = solutions.length > 0 ? solutions[0].screenshots[0] : 'https://daily-puzzle-solve.vercel.app/default-puzzle-solution.jpg';

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

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
            "@type": "ItemList",
            "name": `${formattedGameName} Puzzle Solutions`,
            "description": pageDescription,
            "url": canonicalUrl,
            "numberOfItems": solutions.length,
            "itemListElement": solutions.map((solution, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "HowTo",
                "name": solution.heading,
                "description": `Step-by-step solution for ${solution.heading}`,
                "step": solution.screenshots.map((img, i) => ({
                  "@type": "HowToStep",
                  "text": `Step ${i + 1} of the solution`,
                  "image": img
                })),
                "video": solution.ytVideo ? {
                  "@type": "VideoObject",
                  "name": solution.heading,
                  "description": `Video solution for ${solution.heading}`,
                  "thumbnailUrl": `https://img.youtube.com/vi/${getVideoId(solution.ytVideo)}/hqdefault.jpg`,
                  "embedUrl": `https://www.youtube.com/embed/${getVideoId(solution.ytVideo)}`
                } : undefined
              }
            }))
          })}
        </script>
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Fade in={true} timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: 'common.black',
                fontSize: '2.5rem',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem'
                }
              }}
            >
              {formattedGameName} Puzzle Solutions
            </Typography>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: '1.25rem',
                fontWeight: 500
              }}
            >
              Step-by-step guides to master {formattedGameName.toLowerCase()} puzzles with detailed explanations
            </Typography>
          </Box>
        </Fade>

        {/* Ad Banner */}
        <Box sx={{ mb: 6 }}>
          <AdSenseAd 
            slot="9391098809" 
            format="fluid" 
            layout="in-article"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </Box>

        {/* Solutions Accordion */}
        {solutions.length > 0 ? (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 4
          }}>
            {solutions.map((solution) => (
              <Accordion 
                key={solution._id}
                expanded={expandedAccordion === solution._id}
                onChange={handleAccordionChange(solution._id)}
                sx={{
                  borderRadius: '8px !important',
                  overflow: 'hidden',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6
                  },
                  transition: 'all 0.3s ease'
                }}
                itemScope
                itemType="http://schema.org/HowTo"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon aria-label={`Expand ${solution.heading} solution`} />}
                  sx={{
                    backgroundColor: 'primary.light',
                    '&.Mui-expanded': {
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                      '& .MuiTypography-root': {
                        color: 'common.white'
                      }
                    }
                  }}
                  aria-controls={`${solution._id}-content`}
                  id={`${solution._id}-header`}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }} itemProp="name">
                    {solution.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* View Mode Toggle */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 3,
                    '& .MuiButton-root': {
                      borderRadius: '50px',
                      px: 3,
                      fontWeight: 600,
                      textTransform: 'none'
                    }
                  }}>
                    <Button
                      variant={viewMode === 'video' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('video')}
                      aria-label="View video solution"
                    >
                      Video Solution
                    </Button>
                    <Button
                      variant={viewMode === 'images' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('images')}
                      aria-label="View image solution"
                    >
                      Image Solution
                    </Button>
                  </Box>

                  {/* Video Solution */}
                  {viewMode === 'video' && solution.ytVideo && (
                    <Box sx={{ 
                      mb: 4,
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }} itemProp="video" itemScope itemType="http://schema.org/VideoObject">
                      <meta itemProp="name" content={solution.heading} />
                      <meta itemProp="description" content={`Video solution for ${solution.heading}`} />
                      <meta itemProp="thumbnailUrl" content={`https://img.youtube.com/vi/${getVideoId(solution.ytVideo)}/hqdefault.jpg`} />
                      <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${getVideoId(solution.ytVideo)}`} />
                      {YouTube && (
                        <YouTube
                          videoId={getVideoId(solution.ytVideo) || ''}
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 0,
                              modestbranding: 1,
                              rel: 0
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      )}
                    </Box>
                  )}

                  {/* Image Solution */}
                  {viewMode === 'images' && solution.screenshots.length > 0 && (
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      mb: 4
                    }}>
                      {solution.screenshots.map((screenshot, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: 2,
                            '&:hover': {
                              transform: 'scale(1.01)',
                              boxShadow: 4
                            },
                            transition: 'all 0.3s ease'
                          }}
                          itemProp="step" itemScope itemType="http://schema.org/HowToStep"
                        >
                          <meta itemProp="text" content={`Step ${idx + 1} of the solution`} />
                          <Image
                            src={screenshot}
                            alt={`Step ${idx + 1} - ${solution.heading}`}
                            width={800}
                            height={600}
                            priority={idx < 2}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '400px',
                              objectFit: 'contain'
                            }}
                            itemProp="image"
                            loading={idx > 1 ? 'lazy' : 'eager'}
                            decoding={idx > 1 ? 'async' : 'sync'}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mt: 3
                  }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => router.push('/contact')}
                      sx={{
                        borderRadius: '50px',
                        px: 3,
                        fontWeight: 600
                      }}
                      aria-label="Report a problem with this solution"
                    >
                      Report Problem
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      href={`https://www.linkedin.com/games/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '50px',
                        px: 3,
                        fontWeight: 600
                      }}
                      aria-label="Play the game on LinkedIn"
                    >
                      Play Game
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                      sx={{
                        borderRadius: '50px',
                        px: 3,
                        fontWeight: 600,
                        ml: 'auto'
                      }}
                      aria-label="Share this solution"
                    >
                      Share Solution
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Additional Content for SEO */}
            <Box sx={{ mt: 4, p: 3, backgroundColor: 'background.paper', borderRadius: '8px' }}>
              <Typography variant="h2" component="h2" sx={{ mb: 2, fontSize: '1.5rem' }}>
                Mastering {formattedGameName} Puzzles
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Our comprehensive {formattedGameName.toLowerCase()} puzzle solutions are designed to help you understand the underlying patterns and strategies. Each solution is carefully crafted to provide clear, step-by-step guidance whether you&apos;re a beginner or an experienced puzzle solver.
              </Typography>
              <Typography variant="h3" component="h3" sx={{ mb: 2, fontSize: '1.25rem' }}>
                Why Use Our {formattedGameName} Solutions?
              </Typography>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Visual step-by-step explanations</li>
                <li style={{ marginBottom: '8px' }}>Multiple solution approaches</li>
                <li style={{ marginBottom: '8px' }}>Video and image formats for different learning styles</li>
                <li>Detailed strategy explanations</li>
              </ul>
            </Box>
          </Box>
        ) : (
          <Fade in={true}>
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                py: 4,
                color: 'text.secondary'
              }}
            >
              No solutions available for {formattedGameName} yet. Check back soon!
            </Typography>
          </Fade>
        )}

        {/* Ad Banner */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd 
            slot="9391098809" 
            format="fluid" 
            layout="in-article"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SolutionPageProps> = async (context) => {
  const { game } = context.params as { game: string };
  
  try {
    // Set cache headers
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );
    context.res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());

    await dbConnect();
    
    const solutions = await Puzzle.find({ 
      heading: { $regex: game, $options: 'i' }
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

    return {
      props: {
        solutions: JSON.parse(JSON.stringify(solutions)),
        game
      },
    };
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return {
      props: {
        solutions: [],
        error: error instanceof Error ? error.message : 'Failed to load solutions',
        game
      },
    };
  }
};