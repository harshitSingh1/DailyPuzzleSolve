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

export default function PrivacyPage() {
  const theme = useTheme();

  const pageTitle = "Privacy Policy | PuzzleLogicHub - Your Data Protection";
  const pageDescription = "Learn how PuzzleLogicHub collects, uses, and protects your personal information. Read our comprehensive privacy policy.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/privacy";
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="privacy policy, data protection, personal information, cookies" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://daily-puzzle-solve.vercel.app/images/privacy-banner.jpg" />

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
            Privacy Policy
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
            className="privacy-ad"
          />
        </Box>

        {/* Content Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box itemScope itemType="http://schema.org/PrivacyPolicy">
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph itemProp="about">
              At PuzzleLogicHub, we respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and safeguard your data when
              you use our website and services.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect the following types of information:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li itemProp="acquires">
                <Typography variant="body1" paragraph>
                  <strong>Personal Information:</strong> Name, email address when you contact us
                </Typography>
              </li>
              <li itemProp="acquires">
                <Typography variant="body1" paragraph>
                  <strong>Usage Data:</strong> Pages visited, time spent, referring website
                </Typography>
              </li>
              <li itemProp="acquires">
                <Typography variant="body1" paragraph>
                  <strong>Cookies:</strong> To improve your browsing experience
                </Typography>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li>Provide and maintain our service</li>
              <li>Improve user experience</li>
              <li>Respond to inquiries and support requests</li>
              <li>Analyze usage patterns</li>
              <li>Prevent fraudulent activity</li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, or destruction.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Changes to This Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us through our
              Contact page.
            </Typography>
          </Box>
        </Box>

        {/* Additional GDPR Compliance Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
            Your Rights Under GDPR
          </Typography>
          <Typography variant="body1" paragraph>
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li>The right to access, update or delete your information</li>
            <li>The right of rectification</li>
            <li>The right to object</li>
            <li>The right of restriction</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </Box>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd
            slot="4661598458"
            format="autorelaxed"
            style={{ display: 'block' }}
            className="privacy-ad"
          />
        </Box>
      </Container>
    </>
  );
}