import { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
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
import { ShopItem } from '@/types/types';

// Static imports for critical components
import React from 'react';

// Lazy load non-critical components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
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
    itemScope
    itemType="http://schema.org/Product"
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
      itemProp="image"
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
        itemProp="name"
      >
        {item.productName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
        <Rating
          value={item.rating || 0}
          precision={0.5}
          readOnly
          sx={{ mr: 1 }}
          itemProp="ratingValue"
        />
        <Typography variant="body2" color="text.secondary" itemProp="reviewCount">
          {(item.rating || 0).toFixed(1)}
        </Typography>
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="worstRating" content="0" />
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
        itemProp="description"
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
            itemProp="offers"
            itemScope
            itemType="http://schema.org/Offer"
          >
            <span itemProp="price" content={price.replace(/[^\d.]/g, '')}>{price}</span>
            <link itemProp="availability" href="http://schema.org/InStock" />
            <link itemProp="url" href={item.url} />
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
          aria-label={`Buy ${item.productName}`}
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

  const pageTitle = "Premium Puzzle Books & Games Collection | LogicPuzzleHub";
  const pageDescription = "Explore our curated collection of mind-challenging puzzle books and games. Find the perfect brain teasers for all skill levels with detailed solutions.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/shop";
  const featuredImage = preprocessedItems.length > 0 ? preprocessedItems[0].item.image : "https://daily-puzzle-solve.vercel.app/default-shop-image.jpg";

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
                aria-label={`Filter by ${cat}`}
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
            filteredItems.map(({ item, cleanDescription, price, discount }, index) => (
              <div key={item._id} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <meta itemProp="position" content={String(index + 1)} />
                <ShopItemCard 
                  item={item}
                  cleanDescription={cleanDescription}
                  price={price}
                  discount={discount}
                  cardWidth={cardWidth}
                />
              </div>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 4, gridColumn: '1 / -1' }}>
              {category === 'All'
                ? 'No products available at the moment.'
                : `No ${category} products found.`}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontSize: '1.5rem', color: 'common.black' }}>
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
            aria-label="Browse more products on Amazon"
          >
            Browse More Products
          </Button>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            Our carefully curated selection of puzzle books and games is designed to challenge minds of all skill levels. 
            Whether you&apos;re a beginner looking to improve your problem-solving skills or an expert seeking complex challenges, 
            we have something for everyone. Each product in our collection has been selected for its quality, educational value, 
            and ability to provide hours of engaging mental exercise.
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

export const getServerSideProps: GetServerSideProps<ShopProps> = async ({ res }) => {
  try {
    // Set aggressive caching headers
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );
    res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());

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