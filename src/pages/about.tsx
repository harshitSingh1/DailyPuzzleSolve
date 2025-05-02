import { 
  Box, 
  Container, 
  Typography, 
  useTheme
} from '@mui/material';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

export default function AboutPage() {
  const theme = useTheme();

  const pageTitle = "About PuzzleLogicHub | Puzzle Solutions & Learning Resources";
  const pageDescription = "Discover PuzzleLogicHub's mission to provide high-quality puzzle solutions, tutorials, and tools for enthusiasts of all skill levels.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/about";
  const featuredImage = "https://daily-puzzle-solve.vercel.app/images/about-banner.jpg";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="about PuzzleLogicHub, puzzle solutions, brain games, logic puzzles, about us" />

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
            "@type": "AboutPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "publisher": {
              "@type": "Organization",
              "name": "PuzzleLogicHub",
              "logo": {
                "@type": "ImageObject",
                "url": "https://daily-puzzle-solve.vercel.app/logo.png"
              }
            }
          })}
        </script>
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }} itemScope itemType="http://schema.org/AboutPage">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            itemProp="headline"
          >
            About PuzzleLogicHub
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.5rem',
              [theme.breakpoints.down('md')]: {
                fontSize: '1.25rem'
              }
            }}
          >
            Empowering puzzle enthusiasts with comprehensive solutions and learning resources
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mb: 6 }}>
          <AdSenseAd
            slot="3923231851"
            format="auto"
            style={{ display: 'block' }}
            className="about-ad"
          />
        </Box>

        {/* Content Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Box itemScope itemType="http://schema.org/Organization">
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph>
              <span itemProp="name">PuzzleLogicHub</span> was founded in <span itemProp="foundingDate">2025</span> by a team of puzzle enthusiasts who wanted to create
              a comprehensive resource for puzzle solvers of all levels. We&apos;re dedicated to providing
              high-quality solutions, strategies, and tools to help you master logic puzzles.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to make puzzle-solving accessible and enjoyable for everyone. We believe that
              regular mental exercise through puzzles can improve cognitive function, problem-solving skills,
              and overall mental well-being.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              What We Offer
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li itemScope itemType="http://schema.org/Service">
                <Typography variant="body1" paragraph>
                  <strong itemProp="name">Daily Puzzle Solutions:</strong> <span itemProp="description">Step-by-step explanations for popular puzzles</span>
                </Typography>
              </li>
              <li itemScope itemType="http://schema.org/Service">
                <Typography variant="body1" paragraph>
                  <strong itemProp="name">Video Tutorials:</strong> <span itemProp="description">Visual guides for complex puzzles</span>
                </Typography>
              </li>
              <li itemScope itemType="http://schema.org/Service">
                <Typography variant="body1" paragraph>
                  <strong itemProp="name">Strategy Guides:</strong> <span itemProp="description">Tips to improve your solving skills</span>
                </Typography>
              </li>
              <li itemScope itemType="http://schema.org/Service">
                <Typography variant="body1" paragraph>
                  <strong itemProp="name">Tool Recommendations:</strong> <span itemProp="description">Curated list of helpful puzzle-solving tools</span>
                </Typography>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Our Team
            </Typography>
            <Typography variant="body1" paragraph>
              Our team consists of puzzle champions, software developers, and educators who are passionate
              about sharing their knowledge. We&apos;re constantly working to expand our library of resources
              and improve your puzzle-solving experience.
            </Typography>
          </Box>
        </Box>

        {/* Additional Content for SEO */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
            Why Puzzles Matter
          </Typography>
          <Typography variant="body1" paragraph>
            Puzzles are more than just entertainment - they&apos;re powerful tools for cognitive development. 
            Regular puzzle-solving can enhance memory, improve problem-solving skills, and even reduce stress. 
            At PuzzleLogicHub, we&apos;re committed to helping you reap these benefits through our carefully curated content.
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd
            slot="3923231851"
            format="auto"
            style={{ display: 'block' }}
            className="about-ad"
          />
        </Box>
      </Container>
    </>
  );
}