import { 
  useState, 
  useEffect, 
  useRef,
  useMemo,
  useCallback
} from 'react';
import { 
  GetServerSideProps 
} from 'next';
import dynamic from 'next/dynamic';
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
import HeadSEO from '@/components/HeadSEO';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import { Tool } from '@/types/types';

// Lazy load heavy components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), { ssr: false });
const Fade = dynamic(() => import('@mui/material/Fade'));
const Slide = dynamic(() => import('@mui/material/Slide'));
const Grow = dynamic(() => import('@mui/material/Grow'));

interface ToolsProps {
  tools: Tool[];
  error?: string;
}

export default function Tools({ tools: initialTools }: ToolsProps) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Memoize processed tools data
  const processedTools = useMemo(() => {
    return initialTools.map(tool => {
      const tagRegex = /#(\w+)/g;
      const tags: string[] = [];
      const cleanDesc = (tool.subheading || '').replace(tagRegex, (match, tag) => {
        tags.push(tag);
        return '';
      }).trim();
      
      return { ...tool, cleanDesc, tags };
    });
  }, [initialTools]);

  // Memoize filtered tools
  const filteredTools = useMemo(() => {
    if (!searchTerm) return processedTools;

    const searchWords = searchTerm.toLowerCase().split(' ');
    return processedTools.filter(tool => {
      const searchContent = `${tool.title.toLowerCase()} ${tool.cleanDesc.toLowerCase()} ${tool.tags.join(' ').toLowerCase()}`;
      return searchWords.some(word => searchContent.includes(word));
    });
  }, [searchTerm, processedTools]);

  // Calculate items per row based on screen size
  const itemsPerRow = useMemo(() => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  }, [isSmallScreen, isMediumScreen]);

  // Calculate min width based on items per row
  const minCardWidth = useMemo(() => {
    return `minmax(${itemsPerRow === 3 ? '300px' : itemsPerRow === 2 ? '350px' : '100%'}, 1fr)`;
  }, [itemsPerRow]);

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

  return (
    <>
      <HeadSEO
        title="Useful Tech Tools for Puzzle Solvers | LogicPuzzleMaster"
        description="Collection of useful technology tools and resources for puzzle enthusiasts"
        canonicalUrl="https://daily-puzzle-solve.vercel.app/tools"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Slide in={true} direction="down">
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: 'common.black',
                letterSpacing: '-0.5px',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem'
                }
              }}
            >
              Tools For Developers
            </Typography>
          </Slide>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 6 }}>
          <Grow in={true} timeout={1000}>
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
            />
          </Grow>
        </Box>

        <AdSenseAd 
          slot="4661598458" 
          format="autorelaxed" 
          style={{ display: 'block' }}
        />

        {/* Tools Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${minCardWidth})`,
          gap: 4,
          my: 4
        }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <Grow 
                key={tool._id} 
                in={true} 
                timeout={(index % 6) * 200 + 300}
                style={{ transformOrigin: '0 0 0' }}
              >
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
                    />
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        flexGrow: 1,
                        color: 'text.primary'
                      }}
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
                    >
                      Visit Tool
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            ))
          ) : (
            <Fade in={true}>
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
            </Fade>
          )}
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

export const getServerSideProps: GetServerSideProps<ToolsProps> = async () => {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://daily-puzzle-solve.vercel.app/api/tools' 
      : 'http://localhost:3000/api/tools';

    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      throw new Error('Failed to fetch tools');
    }
    
    const data = await res.json();
    
    return {
      props: {
        tools: data.data || [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        tools: [],
        error: 'Failed to load tools'
      },
    };
  }
};