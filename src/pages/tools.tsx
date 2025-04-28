import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
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
  useMediaQuery,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import { Tool } from '@/types/types';

// Lazy load non-critical components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

interface ToolsProps {
  tools: Tool[];
  error?: string;
}

// Pre-process tools data on server to reduce client-side work
function preprocessTools(tools: Tool[]) {
  return tools.map(tool => {
    const tagRegex = /#(\w+)/g;
    const tags: string[] = [];
    const cleanDesc = (tool.subheading || '').replace(tagRegex, (match, tag) => {
      tags.push(tag);
      return '';
    }).trim();
    
    return { ...tool, cleanDesc, tags };
  });
}

export default function Tools({ tools: initialTools, error }: ToolsProps) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Use pre-processed tools from server when available
  const processedTools = useMemo(() => 
    initialTools ? preprocessTools(initialTools) : [], 
    [initialTools]
  );

  // Memoize filtered tools with debounced search
  const filteredTools = useMemo(() => {
    if (!searchTerm) return processedTools;

    const searchWords = searchTerm.toLowerCase().split(' ');
    return processedTools.filter(tool => {
      const searchContent = `${tool.title.toLowerCase()} ${tool.cleanDesc.toLowerCase()} ${tool.tags.join(' ').toLowerCase()}`;
      return searchWords.some(word => searchContent.includes(word));
    });
  }, [searchTerm, processedTools]);

  // Responsive layout calculations
  const gridTemplateColumns = useMemo(() => {
    if (isSmallScreen) return 'repeat(auto-fill, minmax(280px, 1fr))';
    if (isMediumScreen) return 'repeat(auto-fill, minmax(320px, 1fr))';
    return 'repeat(auto-fill, minmax(350px, 1fr))';
  }, [isSmallScreen, isMediumScreen]);

  // Handle search focus on "/" key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
      searchRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const pageTitle = "Essential Developer Tools for Puzzle Solvers | LogicPuzzleMaster";
  const pageDescription = "Discover the best technology tools and resources for puzzle enthusiasts. Enhance your problem-solving skills with our curated collection of developer tools.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/tools";
  const featuredImage = processedTools.length > 0 ? processedTools[0].image : "https://daily-puzzle-solve.vercel.app/default-tools-image.jpg";

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
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${canonicalUrl}?search={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }} itemScope itemType="http://schema.org/ItemList">
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
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem',
                },
              }}
            >
              Tools For Developers
            </Typography>
          
          <Typography
            variant="h6"
            component="h2"
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              mb: 3,
              [theme.breakpoints.down('md')]: {
                fontSize: '1rem'
              }
            }}
          >
            Boost your puzzle-solving skills with these carefully selected tools
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputRef={searchRef}
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
              }
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
            aria-label="Search developer tools"
          />
        </Box>

        <AdSenseAd 
          slot="4661598458" 
          format="autorelaxed" 
          style={{ display: 'block' }}
        />

        {/* Tools Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns,
          gap: 4,
          my: 4
        }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <Fade in={true} key={tool._id} timeout={300} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
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
                      alt={tool.title}
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
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        flexGrow: 1,
                        color: 'text.primary'
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
                      {tool.cleanDesc}
                    </Typography>

                    {/* Tags */}
                    {tool.tags.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {tool.tags.map((tag, i) => (
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
                        }
                      }}
                      aria-label={`Visit ${tool.title}`}
                      itemProp="url"
                    >
                      Visit Tool
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
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

        {/* Additional Content Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontSize: '1.5rem', textAlign: 'center',color: 'common.black' }}>
            About Our Tool Collection
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            Our carefully curated selection of developer tools is designed to enhance your puzzle-solving workflow. 
            Whether you&apos;re debugging complex algorithms or optimizing your solutions, these tools will help you work 
            more efficiently. Each tool has been selected for its reliability, performance, and relevance to puzzle 
            enthusiasts and competitive programmers.
          </Typography>
        </Box>

        <AdSenseAd 
          slot="4661598458" 
          format="autorelaxed" 
          style={{ display: 'block' }}
        />
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
    res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());

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
    
    return {
      props: {
        tools: data || [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        tools: [],
        error: error instanceof Error ? error.message : 'Failed to load tools'
      },
    };
  }
};