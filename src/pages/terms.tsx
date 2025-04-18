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
  
  export default function TermsPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <>
        <HeadSEO
          title="Terms of Service | LogicPuzzleMaster"
          description="Review our Terms of Service governing your use of LogicPuzzleMaster website and services."
          canonicalUrl="https://yourdomain.com/terms"
          keywords="terms of service, terms and conditions, website terms, user agreement"
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
                Terms of Service
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
                Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By accessing or using the PuzzleLogicHub website, you agree to be bound by these Terms
                of Service. If you do not agree to all the terms, you may not access the website or use
                our services.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                User Responsibilities
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to use our website for lawful purposes only and not to:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute harmful or malicious content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users' enjoyment of the service</li>
              </Box>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                All content on this website, including text, graphics, logos, and software, is the
                property of PuzzleLogicHub or its content suppliers and protected by copyright laws.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
              PuzzleLogicHub shall not be liable for any indirect, incidental, special, or
                consequential damages resulting from the use or inability to use our services.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right to modify these terms at any time. Your continued use of the
                website after such changes constitutes your acceptance of the new terms.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Governing Law
              </Typography>
              <Typography variant="body1" paragraph>
                These terms shall be governed by and construed in accordance with the laws of India,
                without regard to its conflict of law provisions.
              </Typography>
            </Box>
  
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                For any questions about these Terms of Service, please contact us through our Contact page.
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