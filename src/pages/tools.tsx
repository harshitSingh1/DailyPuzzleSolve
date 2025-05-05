import { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import { Tool } from '@/types/types';

// Lazy load non-critical components with optimized loading
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ 
    height: '90px', 
    background: '#f5f5f5',
    margin: '16px 0',
    borderRadius: '4px'
  }} />
});

interface ToolsProps {
  preprocessedTools?: {
    cleanDesc: string;
    tags: string[];
    tool: Tool;
  }[];
  error?: string;
}

// Pre-process data on server to reduce client-side work
function preprocessTools(tools: Tool[]) {
  return tools.map(tool => {
    const tagRegex = /#(\w+)/g;
    const tags: string[] = [];
    const cleanDesc = (tool.subheading || '').replace(tagRegex, (match, tag) => {
      tags.push(tag);
      return '';
    }).trim();
    
    return { cleanDesc, tags, tool };
  });
}

export default function Tools({ preprocessedTools = [], error }: ToolsProps) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Memoize filtered tools
  const filteredTools = useMemo(() => {
    if (!searchTerm) return preprocessedTools;

    const searchWords = searchTerm.toLowerCase().split(' ');
    return preprocessedTools.filter(({ tool, cleanDesc, tags }) => {
      const searchContent = `${tool.title.toLowerCase()} ${cleanDesc.toLowerCase()} ${tags.join(' ').toLowerCase()}`;
      return searchWords.some(word => searchContent.includes(word));
    });
  }, [searchTerm, preprocessedTools]);

  // Responsive layout
  const gridTemplateColumns = useMemo(() => {
    if (isSmallScreen) return 'repeat(auto-fill, minmax(280px, 1fr))';
    if (isMediumScreen) return 'repeat(auto-fill, minmax(320px, 1fr))';
    return 'repeat(auto-fill, minmax(350px, 1fr))';
  }, [isSmallScreen, isMediumScreen]);

  // SEO metadata
  const pageTitle = "Essential Developer Tools for Puzzle Solvers | LogicPuzzleMaster";
  const pageDescription = "Discover the best technology tools and resources for puzzle enthusiasts. Enhance your problem-solving skills with our curated collection.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/tools";
  const featuredImage = preprocessedTools[0]?.tool.image || "/default-tools-image.jpg";

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={featuredImage} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Developer Tools Collection",
            "description": pageDescription,
            "url": canonicalUrl,
            "numberOfItems": preprocessedTools.length,
            "itemListElement": preprocessedTools.slice(0, 5).map(({ tool }, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": tool.title,
                "description": tool.subheading,
                "url": tool.url,
                "applicationCategory": "DeveloperTool"
              }
            }))
          })}
        </script>
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
              component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: 'common.black',
              letterSpacing: '-0.5px',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Essential Developer Tools
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              mb: 3
            }}
          >
            Boost your puzzle-solving skills with these carefully selected tools
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box component="section" sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '50px',
                backgroundColor: 'background.paper',
                boxShadow: theme.shadows[1],
                '&:hover': {
                  boxShadow: theme.shadows[3]
                },
                transition: 'all 0.3s ease',
                height: '56px'
              },
              'aria-label': 'Search developer tools'
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent'
                },
                '&:hover fieldset': {
                  borderColor: 'transparent'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: `0 0 0 2px ${theme.palette.primary.light}`
                }
              }
            }}
          />
        </Box>

        {/* Ad Banner */}
        <Box component="section">
          <AdSenseAd 
            slot="4661598458" 
            format="autorelaxed" 
            style={{ display: 'block' }}
            aria-label="Advertisement"
          />
        </Box>

        {/* Tools Grid */}
        <Box 
          component="section"
          sx={{ 
            display: 'grid',
            gridTemplateColumns,
            gap: 4,
            my: 4
          }}
        >
          {filteredTools.length > 0 ? (
            filteredTools.map(({ tool, cleanDesc, tags }) => (
              <Card 
                key={tool._id}
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
                itemScope
                itemType="http://schema.org/SoftwareApplication"
              >
                {/* Tool Image and Title */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 3,
                  pb: 0
                }}>
                  <CardMedia
                    component="img"
                    image={tool.image || '/tool-placeholder.png'}
                    alt={`${tool.title} logo`}
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      objectFit: 'contain',
                      mr: 2,
                      borderRadius: '8px'
                    }}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    itemProp="image"
                  />
                  <Typography 
                    variant="h3"
                    sx={{ 
                      fontWeight: 600,
                      flexGrow: 1,
                      color: 'text.primary',
                      fontSize: '1.1rem'
                    }}
                    itemProp="name"
                  >
                    {tool.title}
                  </Typography>
                </Box>

                {/* Tool Description */}
                <CardContent sx={{ pt: 2, pb: '16px !important' }}>
                  <Typography
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      minHeight: '4em'
                    }}
                    itemProp="description"
                  >
                    {cleanDesc}
                  </Typography>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={`#${tag}`}
                          size="small"
                          sx={{ 
                            backgroundColor: 'primary.light',
                            color: 'white',
                            fontSize: '0.7rem',
                            height: '24px'
                          }}
                          itemProp="keywords"
                        />
                      ))}
                    </Box>
                  )}

                  {/* Visit Button */}
                  <Button
                    variant="contained"
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<LaunchIcon />}
                    sx={{
                      width: '100%',
                      fontWeight: 600,
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      },
                      minHeight: '44px'
                    }}
                    aria-label={`Visit ${tool.title}`}
                    itemProp="url"
                  >
                    Visit Tool
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                py: 4,
                color: 'text.secondary',
                gridColumn: '1 / -1'
              }}
            >
              {searchTerm 
                ? `No tools found matching "${searchTerm}"` 
                : 'No tools available at the moment.'}
            </Typography>
          )}
        </Box>

        {/* Informational Section */}
        <Box component="section" sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h2" component="h2" sx={{ 
            mb: 2, 
            fontSize: '1.5rem', 
            textAlign: 'center',
            color: 'common.black'
          }}>
            About Our Developer Tools Collection
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 2, 
            textAlign: 'center', 
            maxWidth: '800px', 
            mx: 'auto'
          }}>
            Our carefully curated selection of developer tools is designed to enhance your puzzle-solving workflow. 
            Each tool has been selected for its reliability, performance, and relevance to puzzle enthusiasts and 
            competitive programmers. We regularly update this collection with new, high-quality tools that can help 
            you work more efficiently.
          </Typography>
        </Box>

        {/* Bottom Ad */}
        <Box component="section">
          <AdSenseAd 
            slot="4661598458" 
            format="autorelaxed" 
            style={{ display: 'block' }}
            aria-label="Advertisement"
          />
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ToolsProps> = async ({ res }) => {
  try {
    // Set aggressive caching headers
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );

    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://daily-puzzle-solve.vercel.app/api/tools' 
      : 'http://localhost:3000/api/tools';

    const response = await fetch(apiUrl, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tools');
    }
    
    const { data } = await response.json();
    
    // Pre-process data on server
    const preprocessedTools = preprocessTools(data || []);

    return {
      props: {
        preprocessedTools,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        error: error instanceof Error ? error.message : 'Failed to load tools',
        preprocessedTools: []
      },
    };
  }
};