import { 
  useState, 
  useEffect, 
  useRef 
} from 'react';
import { 
  GetServerSideProps 
} from 'next';
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
  Slide,
  Grow
} from '@mui/material';
import HeadSEO from '@/components/HeadSEO';
import AdBanner from '@/components/AdBanner';
import axios from 'axios';
import { Tool } from '@/types/types';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';

interface ToolsProps {
  tools: Tool[];
  error?: string; // Added error prop to interface
}

export default function Tools({ tools: initialTools }: ToolsProps) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(initialTools);
  const searchRef = useRef<HTMLInputElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Process description to extract and remove tags
  const processDescription = (description = '') => {
    const tagRegex = /#(\w+)/g;
    const tags: string[] = [];
    const cleanDesc = description.replace(tagRegex, (match, tag) => {
      tags.push(tag);
      return '';
    }).trim();
    
    return { cleanDesc, tags };
  };

  // Filter tools based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTools(initialTools);
      return;
    }

    const searchWords = searchTerm.toLowerCase().split(' ');
    const results = initialTools.filter(tool => {
      const { cleanDesc, tags } = processDescription(tool.subheading);
      const searchContent = `${tool.title.toLowerCase()} ${cleanDesc.toLowerCase()} ${tags.join(' ').toLowerCase()}`;
      return searchWords.some(word => searchContent.includes(word));
    });

    setFilteredTools(results);
  }, [searchTerm, initialTools]); // Changed from tools to initialTools

  // Focus search on "/" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate items per row based on screen size
  const getItemsPerRow = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  };

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

        <AdBanner />

        {/* Tools Grid */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          my: 4
        }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const { cleanDesc, tags } = processDescription(tool.subheading);
              
              return (
                <Grow 
                  key={tool._id} 
                  in={true} 
                  timeout={(index % 6) * 200 + 300}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Card 
                    sx={{ 
                      width: `calc(${100 / getItemsPerRow()}% - ${theme.spacing(4)})`,
                      minWidth: 300,
                      maxWidth: 400,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[6]
                      },
                      [theme.breakpoints.down('sm')]: {
                        width: '100%'
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
              );
            })
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
                {searchTerm 
                  ? `No tools found matching "${searchTerm}"` 
                  : 'No tools available at the moment.'}
              </Typography>
            </Fade>
          )}
        </Box>

        <AdBanner />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ToolsProps> = async () => {
  try {
    const res = await axios.get('/api/tools', {
      baseURL: process.env.NEXT_PUBLIC_API_URL || 
              (process.env.NODE_ENV === 'production' 
                ? 'https://daily-puzzle-solve.vercel.app' 
                : 'http://localhost:3000')
    });
    return {
      props: {
        tools: res.data.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        tools: [],
        error: error instanceof Error ? error.message : 'Failed to load tools'
      },
    };
  }
};