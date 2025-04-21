import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
  Fade
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';
import Puzzle from '@/models/Puzzle';
import dbConnect from '@/utils/dbConnect';
import HeadSEO from '@/components/HeadSEO';

// Lazy load heavy components
const YouTube = dynamic(() => import('react-youtube'), { ssr: false });
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), { ssr: false });

interface SolutionPageProps {
  solutions: {
    _id: string;
    heading: string;
    ytVideo: string;
    screenshots: string[];
    createdAt: Date;
  }[];
  game: string;
}

export default function SolutionPage({ solutions, game }: SolutionPageProps) {
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

  return (
    <>
      <HeadSEO
        title={`${formattedGameName} Solutions | LogicPuzzleHub`}
        description={`Step-by-step solutions for ${formattedGameName} puzzles with images and video explanations`}
        canonicalUrl={`https://daily-puzzle-solve.vercel.app/solutions/${game.toLowerCase()}`}
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Fade in={true} timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: 'common.black',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem'
                }
              }}
            >
              {formattedGameName} Puzzle Solutions
            </Typography>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Get All Puzzle Answers: Browse the collection of {formattedGameName.toLowerCase()} puzzle solutions with proper explanations
            </Typography>
          </Box>
        </Fade>

        {/* Ad Banner */}
        {AdSenseAd && (
          <Box sx={{ mb: 6 }}>
            <AdSenseAd 
              slot="9391098809" 
              format="fluid" 
              layout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </Box>
        )}

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
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
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
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                    >
                      Video Solution
                    </Button>
                    <Button
                      variant={viewMode === 'images' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('images')}
                    >
                      Image Solution
                    </Button>
                  </Box>

                  {/* Video Solution */}
                  {viewMode === 'video' && solution.ytVideo && (
                    <Box sx={{ 
                      mb: 4,
                      position: 'relative',
                      paddingBottom: '56.25%', // 16:9 aspect ratio
                      height: 0,
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }}>
                      {YouTube && (
                        <YouTube
                          videoId={getVideoId(solution.ytVideo) || ''}
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 0, // Changed from 1 to 0 for better performance
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
                        >
                          <Image
                            src={screenshot}
                            alt={`Step ${idx + 1}`}
                            width={800}
                            height={600}
                            priority={idx < 2} // Only prioritize first 2 images
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '400px',
                              objectFit: 'contain'
                            }}
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
                    >
                      Share Solution
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
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
        {AdSenseAd && (
          <Box sx={{ mt: 6 }}>
            <AdSenseAd 
              slot="9391098809" 
              format="fluid" 
              layout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { game } = context.params as { game: string };
  
  try {
    await dbConnect();
    
    // Find solutions where heading contains the game name (case insensitive)
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
    return {
      props: {
        solutions: [],
        error: error instanceof Error ? error.message : 'Failed to load Solutions',
        game
      },
    };
  }
};