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
  useTheme
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import AdSenseAd from '@/components/AdSenseAd';
import HeadSEO from '@/components/HeadSEO';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

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

export default function BlogPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cache API responses for better performance
        const cacheKey = 'dev-to-blog-cache';
        const cachedData = localStorage.getItem(cacheKey);
        const now = new Date().getTime();
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Use cache if it's less than 1 hour old
          if (now - timestamp < 3600000) {
            setFeaturedPost(data.featured);
            setBlogPosts(data.posts);
            setLoading(false);
            return;
          }
        }

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

        // Update cache
        localStorage.setItem(cacheKey, JSON.stringify({
          data: {
            featured: featuredData,
            posts: finalPosts
          },
          timestamp: now
        }));

        setFeaturedPost(featuredData);
        setBlogPosts(finalPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = useMemo(() => blogPosts, [blogPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = useMemo(() => (
    filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage)
  ), [filteredPosts, page, postsPerPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HeadSEO
        title="Tech Blog | LogicPuzzleMaster"
        description="Latest technology, programming, and coding articles from the DEV community"
        canonicalUrl="https://daily-puzzle-solve.vercel.app/blog"
      />
      
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
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={featuredPost.user.profile_image}
                    alt={featuredPost.user.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {featuredPost.user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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
            className="article-ad"
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 4
          }}
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
            currentPosts.map((post) => (
              <Card
                key={post.id}
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
                      priority={currentPosts.indexOf(post) < 3}
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
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={post.user.profile_image}
                        alt={post.user.name}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.user.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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
                  >
                    Read ({post.reading_time_minutes} min)
                  </Button>
                </Box>
              </Card>
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
          <AdSenseAd
            slot="9391098809"
            format="fluid"
            layout="in-article"
            style={{ display: 'block', textAlign: 'center' }}
            className="article-ad"
          />
        </Box>
      </Container>
    </>
  );
}