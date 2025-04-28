import { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Pagination,
  useMediaQuery,
  useTheme,
  Skeleton
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Image from 'next/image';

// Lazy load non-critical components
const AdSenseAd = dynamic(() => import('@/components/AdSenseAd'), {
  ssr: false,
  loading: () => <div style={{ height: '90px', background: '#f5f5f5' }} />
});

interface BlogPost {
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  url: string;
  cover_image: string;
  reading_time_minutes: number;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
  };
}

interface BlogProps {
  featuredPost: BlogPost | null;
  blogPosts: BlogPost[];
  error?: string;
}

export default function BlogPage({ featuredPost, blogPosts, error }: BlogProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(!featuredPost);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  // Memoize filtered posts
  const filteredPosts = useMemo(() => blogPosts, [blogPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = useMemo(() => (
    filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage)
  ), [filteredPosts, page, postsPerPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (featuredPost) {
      setLoading(false);
    }
  }, [featuredPost]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const pageTitle = "Tech Blog & Programming Articles | LogicPuzzleMaster";
  const pageDescription = "Stay updated with the latest technology trends, programming tips, and coding articles from the DEV community.";
  const canonicalUrl = "https://daily-puzzle-solve.vercel.app/blog";
  const featuredImage = featuredPost?.cover_image || "https://daily-puzzle-solve.vercel.app/default-blog-image.jpg";

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
            "@type": "Blog",
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            mb: 4,
            color: 'common.black',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
              fontSize: '2rem'
            }
          }}
        >
          Trending Tech Articles
        </Typography>

        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 4 }} />
        ) : featuredPost && (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              mb: 6,
              boxShadow: 3,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 6
              },
              transition: 'all 0.3s ease'
            }}
            itemScope
            itemType="http://schema.org/BlogPosting"
          >
            {featuredPost.cover_image && (
              <Box
                sx={{
                  width: { xs: '100%', md: '40%' },
                  height: { xs: 200, md: 'auto' },
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Image
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{
                    objectFit: 'cover'
                  }}
                  priority
                  itemProp="image"
                />
              </Box>
            )}
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Chip
                label="Today's Trending"
                size="small"
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'white',
                  mb: 2,
                  alignSelf: 'flex-start'
                }}
              />
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary'
                }}
                itemProp="headline"
              >
                {featuredPost.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: 'text.secondary',
                  flexGrow: 1
                }}
                itemProp="description"
              >
                {featuredPost.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 'auto',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}
                itemProp="author"
                itemScope
                itemType="http://schema.org/Person"
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={featuredPost.user.profile_image}
                    alt={featuredPost.user.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                    itemProp="image"
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} itemProp="name">
                      {featuredPost.user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }} itemProp="datePublished">
                      {featuredPost.readable_publish_date} · {featuredPost.reading_time_minutes} min read
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  href={featuredPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<LaunchIcon />}
                  sx={{
                    borderRadius: '50px',
                    px: 3,
                    fontWeight: 600,
                    width: { xs: '100%', sm: 'auto' }
                  }}
                  aria-label={`Read article: ${featuredPost.title}`}
                  itemProp="url"
                >
                  Read Article
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        <Box sx={{ mb: 6 }}>
          <AdSenseAd
            slot="9391098809"
            format="fluid"
            layout="in-article"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </Box>


        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 4
          }}
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Card key={index} sx={{ width: '100%', mb: 2 }}>
                <Skeleton variant="rectangular" height={140} />
                <CardContent>
                  <Skeleton width="60%" height={24} />
                  <Skeleton width="100%" height={72} sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Skeleton width="80%" height={20} />
                      <Skeleton width="60%" height={16} sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            currentPosts.map((post, index) => (
              <div key={post.id} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <meta itemProp="position" content={String(index + 1)} />
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    },
                    transition: 'all 0.3s ease'
                  }}
                  itemScope
                  itemType="http://schema.org/BlogPosting"
                >
                  {post.cover_image && (
                    <Box sx={{ 
                      height: 140, 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        style={{
                          objectFit: 'cover'
                        }}
                        priority={index < 3}
                        itemProp="image"
                      />
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: 'text.primary',
                        minHeight: '3em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                      itemProp="headline"
                    >
                      {post.title}
                    </Typography>
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
                      {post.description}
                    </Typography>
                    {post.tag_list.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {post.tag_list.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: 'grey.200',
                              color: 'text.secondary',
                              fontSize: '0.7rem'
                            }}
                            itemProp="keywords"
                          />
                        ))}
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 'auto'
                      }}
                      itemProp="author"
                      itemScope
                      itemType="http://schema.org/Person"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={post.user.profile_image}
                          alt={post.user.name}
                          sx={{ width: 32, height: 32, mr: 1 }}
                          itemProp="image"
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }} itemProp="name">
                          {post.user.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }} itemProp="datePublished">
                        {post.readable_publish_date}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<LaunchIcon />}
                      fullWidth
                      sx={{
                        borderRadius: '50px',
                        fontWeight: 600
                      }}
                      aria-label={`Read article: ${post.title}`}
                      itemProp="url"
                    >
                      Read ({post.reading_time_minutes} min)
                    </Button>
                  </Box>
                </Card>
              </div>
            ))
          )}
        </Box>

        {!loading && filteredPosts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isSmallScreen ? 'small' : 'medium'}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 600
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontSize: '1.5rem', textAlign: 'center',color: 'common.black' }}>
            About Our Tech Blogs
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            Our tech blog brings you the latest insights, tutorials, and trends in programming and technology. 
            We curate content from top developers and industry experts to help you stay ahead in your coding journey. 
            From beginner tips to advanced techniques, our articles cover a wide range of topics to support developers at all levels.
          </Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <AdSenseAd
            slot="9391098809"
            format="fluid"
            layout="in-article"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BlogProps> = async ({ res }) => {
  try {
    // Set aggressive caching headers
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=1800'
    );
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());

    const [featuredResponse, monthlyResponse] = await Promise.all([
      fetch('https://dev.to/api/articles?tags=technology,job,programming,coding&top=1'),
      fetch('https://dev.to/api/articles?tags=technology,job,programming,coding&top=7')
    ]);

    const [featuredData] = await featuredResponse.json();
    const monthlyData = await monthlyResponse.json();

    const filteredMonthly = monthlyData.filter((post: BlogPost) => 
      post.id !== featuredData?.id
    );
    
    const finalPosts = filteredMonthly.length < monthlyData.length
      ? [...filteredMonthly, ...monthlyData.slice(30, 31)]
      : filteredMonthly.slice(0, 30);

    return {
      props: {
        featuredPost: featuredData || null,
        blogPosts: finalPosts || []
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        featuredPost: null,
        blogPosts: [],
        error: error instanceof Error ? error.message : 'Failed to load blog posts'
      },
    };
  }
};