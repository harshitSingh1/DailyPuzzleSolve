import { useState, useRef } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  IconButton
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import dynamic from 'next/dynamic';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';

// Lazy load AdSense component
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), { 
  ssr: false,
  loading: () => <div style={{ height: '100px', background: '#f5f5f5' }} />
});

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  
  const games: Game[] = [
    {
      id: '1',
      title: 'Chess',
      description: 'Master the king of strategy games—sharpen focus, foresight, and mental stamina in every move.',
      image: '/images/chess.jpg',
      url: 'https://www.chess.com/',
      tags: ['Strategy', 'Puzzle', 'Board']
    },
    {
      id: '2',
      title: 'Sudoku',
      description: 'Train your brain with numbers—classic Sudoku boosts logic, patience, and pattern recognition.',
      image: '/images/sudoku.jpeg',
      url: 'https://sudoku.com/',
      tags: ['Focus', 'Logic', 'Puzzle']
    },
    {
      id: '3',
      title: 'Connect 4',
      description: 'Think ahead and block your rival—Connect 4 is a fun and fast-paced tactical duel of minds',
      image: '/images/connect-4.png',
      url: 'https://www.sudoku.com',
      tags: ['Board', 'Strategy', 'Skill']
    },
    {
      id: '4',
      title: 'Checkers',
      description: 'Simple yet smart—checkers trains strategic thinking and helps develop sharp decision-making skills.',
      image: '/images/Checkers.png',
      url: 'https://www.247checkers.com/',
      tags: ['Board', 'Logic', 'Strategy']
    },
    {
      id: '5',
      title: 'Minesweeper',
      description: 'Uncover the field without blowing up! A perfect logic test packed into a classic brain teaser.',
      image: '/images/minesweepers.jpeg',
      url: 'https://minesweeper.online',
      tags: ['Logic', 'Focus', 'Brain']
    },
    {
      id: '6',
      title: '2048 Game',
      description: 'Swipe to win! Merge tiles, reach 2048, and test your tactical thinking under pressure.',
      image: '/images/game2048.jpg',
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

  const pageTitle = "Brain Training Games Collection | PuzzleLogicHub";
  const pageDescription = "Challenge your mind with our collection of the best puzzle games. Improve logic, strategy and problem-solving skills with these carefully selected brain games.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/games";
  const featuredImage = "https://daily-puzzle-solve.vercel.app/images/chess.jpg";

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
            "@type": "CollectionPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "hasPart": games.map(game => ({
              "@type": "Game",
              "name": game.title,
              "description": game.description,
              "url": game.url,
              "keywords": game.tags.join(", ")
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
              mb: 3,
              color: 'common.black',
              [theme.breakpoints.down('md')]: {
                fontSize: '2rem'
              }
            }}
          >
            Brain Training Games
          </Typography>
          
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              [theme.breakpoints.down('md')]: {
                fontSize: '1rem'
              }
            }}
          >
            Challenge your mind and improve cognitive skills
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
              aria-label="Scroll tags left"
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
                  aria-label={`Filter by ${tag}`}
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
              aria-label="Scroll tags right"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* Ad Banner */}
        <Box sx={{ mb: 6, height: '100px' }}>
          <AdSenseAd 
            slot="3955548106" 
            format="fluid"
            style={{ 
              display: 'block',
              height: '100px',
              maxHeight: '100px'
            }}
          />
        </Box>

        {/* Games Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4,
            mb: 4
          }}
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <div key={game.id} itemProp="itemListElement" itemScope itemType="http://schema.org/Game">
                <meta itemProp="position" content={String(index + 1)} />
                <Card
                  sx={{
                    width: '100%',
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
                    <Image
                      src={game.image}
                      alt={`${game.title} game screenshot`}
                      fill
                      priority={index < 3}
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      itemProp="image"
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Game Title */}
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'text.primary',
                        minHeight: '3em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '1.25rem'
                      }}
                      itemProp="name"
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
                      itemProp="description"
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
                          itemProp="keywords"
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
                      aria-label={`Play ${game.title}`}
                      itemProp="url"
                    >
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
              No games found matching your selected filters.
            </Typography>
          )}
        </Box>

        {/* Additional Content Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontSize: '1.5rem', textAlign: 'center', color: 'common.black' }}>
            Why Play Puzzle Games?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            Puzzle games offer more than just entertainment—they&apos;re powerful tools for cognitive development. 
            Regular play can improve memory, enhance problem-solving skills, boost concentration, and even 
            help prevent cognitive decline. Our carefully selected games target different mental skills, from 
            logical reasoning to strategic planning, ensuring a comprehensive brain workout.
          </Typography>
        </Box>

        {/* Ad Banner */}
        <Box sx={{ mt: 6, height: '100px' }}>
          <AdSenseAd 
            slot="3955548106" 
            format="fluid"
            style={{ 
              display: 'block',
              height: '100px',
              maxHeight: '100px'
            }}
          />
        </Box>
      </Container>
    </>
  );
}