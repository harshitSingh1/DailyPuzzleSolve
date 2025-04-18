import { 
    Box, 
    Container, 
    Typography, 
    useTheme, 
    useMediaQuery,
    Fade,
    Slide
  } from '@mui/material';
  import HeadSEO from '@/components/HeadSEO';
  import AdBanner from '@/components/AdBanner';
  
  export default function PrivacyPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <>
        <HeadSEO
          title="Privacy Policy | LogicPuzzleMaster"
          description="Read our Privacy Policy to understand how we collect, use, and protect your personal information."
          canonicalUrl="https://yourdomain.com/privacy"
          keywords="privacy policy, data protection, personal information, cookies"
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
                Privacy Policy
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
                Last Updated: {new Date().toLocaleDateString()}
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Introduction
              </Typography>
              <Typography variant="body1" paragraph>
                At PuzzleLogicHub, we respect your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, and safeguard your data when
                you use our website and services.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We may collect the following types of information:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Personal Information:</strong> Name, email address when you contact us
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Usage Data:</strong> Pages visited, time spent, referring website
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Cookies:</strong> To improve your browsing experience
                  </Typography>
                </li>
              </Box>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
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
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, or destruction.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Changes to This Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy, please contact us through our
                Contact page.
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