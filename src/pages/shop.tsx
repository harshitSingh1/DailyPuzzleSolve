import { 
  useState, 
  useMemo 
} from 'react';
import { 
  GetServerSideProps 
} from 'next';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  Chip,
  Rating,
  Divider,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import HeadSEO from '@/components/HeadSEO';
import { ShopItem } from '@/types/types';
import React from 'react';

const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ 
    height: '90px', 
    background: '#f5f5f5',
    margin: '16px 0',
    borderRadius: '4px'
  }} />
});

interface ShopProps {
  preprocessedItems?: {
    cleanDescription: string;
    price: string | null;
    discount: string | null;
    item: ShopItem;
  }[];
  error?: string;
}

const ShopItemCard = React.memo(({ 
  item, 
  cleanDescription, 
  price, 
  discount,
  cardWidth 
}: { 
  item: ShopItem;
  cleanDescription: string;
  price: string | null;
  discount: string | null;
  cardWidth: string;
}) => (
  <Card 
    sx={{ 
      width: cardWidth,
      minWidth: 280,
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3
      }
    }}
  >
    {discount && (
      <Chip
        label={discount}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontWeight: 'bold',
          zIndex: 1,
          backgroundColor: '#FFA500',
          color: '#000',
          fontSize: '0.75rem',
          height: '24px'
        }}
      />
    )}

    <CardMedia
      component="img"
      height="220"
      image={item.image}
      alt={item.productName}
      sx={{ 
        objectFit: 'contain',
        p: 2,
        backgroundColor: 'grey.50'
      }}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
    />

    <CardContent sx={{ flexGrow: 1, pt: 2, pb: '16px !important' }}>
      <Typography
        gutterBottom 
        variant="h6" 
        component="h3"
        sx={{ 
          fontWeight: 600,
          color: '#000',
          minHeight: '4.5em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          mb: -3
        }}
      >
        {item.productName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Rating
          value={item.rating || 0}
          precision={0.5}
          readOnly
          sx={{ mr: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {(item.rating || 0).toFixed(1)}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ 
          mb: 2,
          minHeight: '4em',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {cleanDescription}
      </Typography>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 'auto'
      }}>
        {price && (
          <Typography
            variant="h6"
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            {price}
          </Typography>
        )}
        <Button
          variant="contained"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          sx={{
            ml: 'auto',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          {item.buttonText || 'Buy Now'}
        </Button>
      </Box>
    </CardContent>
  </Card>
));

ShopItemCard.displayName = 'ShopItemCard';

export default function Shop({ preprocessedItems, error }: ShopProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [category, setCategory] = useState('All');

  const cardWidth = useMemo(() => {
    if (isSmallScreen) return '100%';
    if (isMediumScreen) return 'calc(50% - 16px)';
    return 'calc(33.33% - 16px)';
  }, [isSmallScreen, isMediumScreen]);

  const filteredItems = useMemo(() => {
    if (!preprocessedItems) return [];
    if (category === 'All') return preprocessedItems;
    
    return preprocessedItems.filter(({ item }) => {
      const description = item.description?.toLowerCase() || '';
      return description.includes(category.toLowerCase());
    });
  }, [category, preprocessedItems]);

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!preprocessedItems) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <HeadSEO
        title="Buy Books and Games | PuzzleLogicHub"
        description="Collection of useful technology tools and resources for puzzle enthusiasts"
        canonicalUrl="https://daily-puzzle-solve.vercel.app/shop"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
                fontSize: '2rem'
              }
            }}
          >
            Puzzle Books &amp; Games
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
            Discover mind-blowing books and puzzle games to challenge yourself.
          </Typography>

          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            aria-label="product category"
            sx={{
              mb: 4,
              '& .MuiToggleButtonGroup-grouped': {
                border: '1px solid rgba(25, 118, 210, 0.5)',
                '&:not(:first-of-type)': {
                  borderRadius: '4px',
                  borderLeft: '1px solid rgba(25, 118, 210, 0.5)'
                },
                '&:first-of-type': {
                  borderRadius: '4px'
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)'
                }
              }
            }}
          >
            {['All', 'Tech', 'Puzzles', 'Books'].map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          justifyContent: 'center'
        }}>
          {filteredItems.length > 0 ? (
            filteredItems.map(({ item, cleanDescription, price, discount }) => (
              <ShopItemCard 
                key={item._id}
                item={item}
                cleanDescription={cleanDescription}
                price={price}
                discount={discount}
                cardWidth={cardWidth}
              />
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 4, gridColumn: '1 / -1' }}>
              {category === 'All'
                ? 'No products available at the moment.'
                : `No ${category} products found.`}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 4 }} /> {/* Reduced from 6 to 4 */}

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Can&apos;t find what you&apos;re looking for?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.open('https://www.amazon.com', '_blank')}
            sx={{
              px: 4,
              fontWeight: 600
            }}
          >
            Products Only For You
          </Button>
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

export const getServerSideProps: GetServerSideProps<ShopProps> = async ({ res }) => {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );

    const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://daily-puzzle-solve.vercel.app/api/shops'
      : 'http://localhost:3000/api/shops';

    const response = await fetch(apiUrl, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch shop items');
    }
    
    const { data } = await response.json();
    
    const preprocessedItems = data.map((item: ShopItem) => {
      const description = item.description || '';
      const priceRegex = /(Rs|₹)\s*([\d,]+)\s*\/-/;
      const discountRegex = /\(([^)]+)\)/;
      
      const priceMatch = description.match(priceRegex);
      const discountMatch = description.match(discountRegex);
      
      const cleanDescription = description
        .replace(priceRegex, '')
        .replace(discountRegex, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      return {
        cleanDescription,
        price: priceMatch ? `${priceMatch[1]} ${priceMatch[2]}/-` : null,
        discount: discountMatch ? discountMatch[1] : null,
        item
      };
    });

    return {
      props: {
        preprocessedItems,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        error: error instanceof Error ? error.message : 'Failed to load items',
        preprocessedItems: []
      },
    };
  }
};