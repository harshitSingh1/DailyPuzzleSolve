import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Divider, 
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
  Slide,
  IconButton,
  Stack
} from '@mui/material';
import { useState, useRef } from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LaunchIcon from '@mui/icons-material/Launch';
import AdBanner from '@/components/AdBanner';
import HeadSEO from '@/components/HeadSEO';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export default function GamesPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  
  const games: Game[] = [
    {
      id: '1',
      title: 'Chess',
      description: 'Master the king of strategy games—sharpen focus, foresight, and mental stamina in every move.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Chess_pieces_close_up.jpg',
      url: 'https://www.chess.com/',
      tags: ['Strategy', 'Puzzle', 'Board']
    },
    {
      id: '2',
      title: 'Sudoku',
      description: 'Train your brain with numbers—classic Sudoku boosts logic, patience, and pattern recognition.',
      image: 'https://raw.githubusercontent.com/harshitSingh1/BreakBuddy/refs/heads/main/images/tasks/sudoku.jpeg',
      url: 'https://sudoku.com/',
      tags: ['Focus', 'Logic', 'Puzzle']
    },
    {
      id: '3',
      title: 'Connect 4',
      description: 'Think ahead and block your rival—Connect 4 is a fun and fast-paced tactical duel of minds',
      image: 'https://www.calculators.org/games/titles/connect-4.png',
      url: 'https://www.sudoku.com',
      tags: ['Board', 'Strategy', 'Skill']
    },
    {
      id: '4',
      title: 'Checkers',
      description: 'Simple yet smart—checkers trains strategic thinking and helps develop sharp decision-making skills.',
      image: 'https://www.247checkers.com/images/how-to-play/Checkers-start1.png',
      url: 'https://www.247checkers.com/',
      tags: ['Board', 'Logic', 'Strategy']
    },
    {
      id: '5',
      title: 'Minesweeper',
      description: 'Uncover the field without blowing up! A perfect logic test packed into a classic brain teaser.',
      image: 'https://store-images.s-microsoft.com/image/apps.48814.13510798887052059.3dc63a1e-31ca-4538-b5fb-372cd5d7dbc8.e6941503-cd87-48fa-939e-b691bcd61ec3?h=1080',
      url: 'https://minesweeper.online',
      tags: ['Logic', 'Focus', 'Brain']
    },
    {
      id: '6',
      title: '2048 Game',
      description: 'Swipe to win! Merge tiles, reach 2048, and test your tactical thinking under pressure.',
      image: 'https://imgs.crazygames.com/games/2048/cover_16x9-1707828856995.png?metadata=none&quality=70&width=467.5',
      url: 'https://2048game.com/',
      tags: ['Strategy', 'Logic', 'Brain']
    }
  ];

  const allTags = [...new Set(games.flatMap(game => game.tags))];

  const filteredGames = selectedTags.length === 0 
    ? games 
    : games.filter(game => game.tags.some(tag => selectedTags.includes(tag)));

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tagsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeadSEO
        title="Puzzle Games Collection | LogicPuzzleMaster"
        description="Explore our collection of the best puzzle games to challenge your mind"
        canonicalUrl="https://yourdomain.com/games"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              mb: 3,
              color: 'common.black',
              [theme.breakpoints.down('md')]: {
                fontSize: '2rem'
              }
            }}
          >
            Train Your Brain
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <IconButton 
              onClick={() => scrollTags('left')}
              sx={{ 
                mr: 1,
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)'
                }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            
            <Box
              ref={tagsContainerRef}
              sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                py: 1,
                px: 1
              }}
            >
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  onClick={() => handleTagClick(tag)}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                  sx={{
                    borderRadius: '50px',
                    borderColor: 'primary.main',
                    backgroundColor: selectedTags.includes(tag) 
                      ? 'primary.main' 
                      : 'transparent',
                    color: selectedTags.includes(tag) 
                      ? 'common.white' 
                      : 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: selectedTags.includes(tag)
                        ? 'primary.dark'
                        : 'rgba(25, 118, 210, 0.1)'
                    },
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                />
              ))}
            </Box>
            
            <IconButton 
              onClick={() => scrollTags('right')}
              sx={{ 
                ml: 1,
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)'
                }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={500}>
          <Box sx={{ mb: 6 }}>
            <AdBanner />
          </Box>
        </Slide>

        {/* Games Grid */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            mb: 4
          }}
        >
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <Grow in={true} timeout={index * 150} key={game.id}>
                <Card
                  sx={{
                    width: { xs: '100%', sm: 345, md: 300 },
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  {/* Game Image */}
                  <Box 
                    sx={{ 
                      height: 180,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Game Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'text.primary',
                        minHeight: '3em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {game.title}
                    </Typography>
                    
                    {/* Game Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color: 'text.secondary',
                        minHeight: '4em',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {game.description}
                    </Typography>
                    
                    {/* Game Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {game.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            borderRadius: '4px',
                            backgroundColor: 'grey.200',
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'primary.dark'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        />
                      ))}
                    </Box>
                    
                    <Button
                      variant="contained"
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<SportsEsportsIcon />}
                      fullWidth
                      sx={{
                        borderRadius: '50px',
                        fontWeight: 600,
                        mt: 'auto',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          transform: 'scale(1.02)',
                          boxShadow: `0 4px 8px ${theme.palette.primary.main}`
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Play Now
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
                  color: 'text.secondary'
                }}
              >
                No games found matching your selected filters.
              </Typography>
            </Fade>
          )}
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