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
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ShopItem } from '@/types/types';
import HeadSEO from '@/components/HeadSEO';
import { useState, useEffect } from 'react';

interface ShopProps {
  shopItems?: ShopItem[];
  error?: string;
}

export default function Shop({ shopItems: initialShopItems, error }: ShopProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems || []);
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>(initialShopItems || []);
  const [loading, setLoading] = useState(!initialShopItems);
  const [category, setCategory] = useState('All');
  
  useEffect(() => {
    if (!initialShopItems && !error) {
      setLoading(true);
      axios.get('/api/shops')
        .then(response => {
          setShopItems(response.data.data);
          setFilteredItems(response.data.data);
        })
        .catch(() => {
          // Handle error if needed
        })
        .finally(() => setLoading(false));
    }
  }, [initialShopItems, error]);

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string | null,
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    if (category === 'All') {
      setFilteredItems(shopItems);
    } else {
      const filtered = shopItems.filter(item => {
        const description = item.description?.toLowerCase() || '';
        return description.includes(category.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  }, [category, shopItems]);

  const processDescription = (description = '') => {
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
      discount: discountMatch ? discountMatch[1] : null
    };
  };

  const getItemsPerRow = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  };

  const handleSuggestProduct = () => {
    const shoppingSites = [
      'https://www.amazon.com',
      'https://www.flipkart.com',
      'https://www.ebay.com',
      'https://www.aliexpress.com'
    ];
    const randomSite = shoppingSites[Math.floor(Math.random() * shoppingSites.length)];
    window.open(randomSite, '_blank');
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (loading) {
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
        canonicalUrl="https://yourdomain.com/tools"
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
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center'
        }}>
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const { cleanDescription, price, discount } = processDescription(item.description);
              
              return (
                <Card 
                  key={item._id}
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
                      boxShadow: 3
                    },
                    [theme.breakpoints.down('sm')]: {
                      width: '100%'
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
                        transform: 'none !important',
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
              );
            })
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 4 }}>
              {category === 'All' 
                ? 'No products available at the moment.' 
                : `No ${category} products found.`}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Can&apos;t find what you&apos;re looking for?
          </Typography>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleSuggestProduct}
            sx={{
              px: 4,
              fontWeight: 600
            }}
          >
            Products Only For You
          </Button>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ShopProps> = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`);
    return {
      props: {
        shopItems: res.data.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        error: error instanceof Error ? error.message : 'Failed to load Items',
        shopItems: []
      },
    };
  }
};