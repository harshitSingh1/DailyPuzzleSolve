import { 
    Box, 
    Container, 
    Typography, 
    useTheme, 
    Fade,
    Slide
  } from '@mui/material';
  import HeadSEO from '@/components/HeadSEO';
  import AdBanner from '@/components/AdBanner';
  
  export default function AboutPage() {
    const theme = useTheme();
  
    return (
      <>
        <HeadSEO
          title="About LogicPuzzleMaster | Puzzle Solutions & Resources"
          description="Learn about LogicPuzzleMaster - your go-to source for daily puzzle solutions, expert strategies, and brain-teasing challenges."
          canonicalUrl="https://yourdomain.com/about"
          keywords="about LogicPuzzleMaster, puzzle solutions, brain games, logic puzzles, about us"
        />
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Page Header */}
          <Fade in={true} timeout={500}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                About PuzzleLogicHub
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
                Our mission is to help puzzle enthusiasts improve their skills and enjoy mental challenges
              </Typography>
            </Box>
          </Fade>
  
          {/* Ad Banner */}
          <Slide direction="up" in={true} timeout={800}>
            <Box sx={{ mb: 6 }}>
              <AdBanner />
            </Box>
          </Slide>
  
          {/* Content Sections */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Who We Are
              </Typography>
              <Typography variant="body1" paragraph>
              PuzzleLogicHub was founded in 2025 by a team of puzzle enthusiasts who wanted to create
                a comprehensive resource for puzzle solvers of all levels. We&apos;re dedicated to providing
                high-quality solutions, strategies, and tools to help you master logic puzzles.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to make puzzle-solving accessible and enjoyable for everyone. We believe that
                regular mental exercise through puzzles can improve cognitive function, problem-solving skills,
                and overall mental well-being.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                What We Offer
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Daily Puzzle Solutions:</strong> Step-by-step explanations for popular puzzles
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Video Tutorials:</strong> Visual guides for complex puzzles
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Strategy Guides:</strong> Tips to improve your solving skills
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Tool Recommendations:</strong> Curated list of helpful puzzle-solving tools
                  </Typography>
                </li>
              </Box>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Our Team
              </Typography>
              <Typography variant="body1" paragraph>
                Our team consists of puzzle champions, software developers, and educators who are passionate
                about sharing their knowledge. We&apos;re constantly working to expand our library of resources
                and improve your puzzle-solving experience.
              </Typography>
            </Box>
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