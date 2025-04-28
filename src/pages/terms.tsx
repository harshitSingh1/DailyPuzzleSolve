import { 
  Box, 
  Container, 
  Typography, 
  useTheme
} from '@mui/material';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

export default function TermsPage() {
  const theme = useTheme();

  const pageTitle = "Terms of Service | PuzzleLogicHub - Usage Guidelines";
  const pageDescription = "Review the terms and conditions governing your use of PuzzleLogicHub's services and content.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/terms";
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="terms of service, usage terms, website terms, conditions of use" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://daily-puzzle-solve.vercel.app/images/terms-banner.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "datePublished": "2025-01-01",
            "dateModified": lastUpdated
          })}
        </script>
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }} itemScope itemType="http://schema.org/WebPage">
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
            Terms of Service
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.25rem'
            }}
          >
            Last Updated: <time itemProp="dateModified" dateTime={lastUpdated}>{lastUpdated}</time>
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mb: 6 }}>
          <AdSenseAd
            slot="4661598458"
            format="autorelaxed"
            style={{ display: 'block' }}
            className="terms-ad"
          />
        </Box>

        {/* Content Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing or using PuzzleLogicHub, you agree to be bound by these Terms of Service. 
              If you do not agree to all the terms and conditions, you may not access the Website or use any services.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Description of Service
            </Typography>
            <Typography variant="body1" paragraph>
              PuzzleLogicHub provides puzzle solutions, tutorials, and related content for educational and entertainment purposes. 
              The service is provided &quot;as is&quot; and we make no warranties regarding its accuracy or completeness.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              User Responsibilities
            </Typography>
            <Typography variant="body1" paragraph>
              As a user of this Website, you agree to:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li>Use the content for personal, non-commercial purposes only</li>
              <li>Not redistribute or republish any content without permission</li>
              <li>Not use the Website in any unlawful manner</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              All content on this Website, including text, graphics, logos, and images, is the property of PuzzleLogicHub 
              or its content suppliers and protected by international copyright laws.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              PuzzleLogicHub shall not be liable for any indirect, incidental, special, consequential or punitive damages 
              resulting from your use of or inability to use the service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Changes to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these terms at any time. Your continued use of the Website after such 
              modifications constitutes your acceptance of the new terms.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where 
              PuzzleLogicHub is established, without regard to its conflict of law provisions.
            </Typography>
          </Box>
        </Box>

        {/* Additional Section for User Content */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
            User-Generated Content
          </Typography>
          <Typography variant="body1" paragraph>
            If the Website allows user submissions, you retain ownership of any content you submit but grant us 
            a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content.
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd
            slot="4661598458"
            format="autorelaxed"
            style={{ display: 'block' }}
            className="terms-ad"
          />
        </Box>
      </Container>
    </>
  );
}