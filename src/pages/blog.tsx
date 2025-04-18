import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Avatar, 
  Chip, 
  Divider, 
  Pagination,
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import AdBanner from '@/components/AdBanner';
import HeadSEO from '@/components/HeadSEO';
import Skeleton from '@mui/material/Skeleton';

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

  // Fetch all data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch in parallel
        const [featuredResponse, monthlyResponse] = await Promise.all([
          fetch('https://dev.to/api/articles?tags=technology,job,programming,coding&top=1'),
          fetch('https://dev.to/api/articles?tags=technology,job,programming,coding&top=7')
        ]);

        const [featuredData] = await featuredResponse.json();
        const monthlyData = await monthlyResponse.json();

        setFeaturedPost(featuredData);
        
        // Filter out the featured post if it exists in the monthly data
        const filteredMonthly = monthlyData.filter((post: BlogPost) => 
          post.id !== featuredData?.id
        );
        
        // If we filtered out the featured post, take the next one to maintain 30 posts
        const finalPosts = filteredMonthly.length < monthlyData.length
          ? [...filteredMonthly, ...monthlyData.slice(30, 31)]
          : filteredMonthly.slice(0, 30);

        setBlogPosts(finalPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoized filtered posts to avoid duplicates
  const filteredPosts = useMemo(() => {
    return blogPosts;
  }, [blogPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Optimize image URLs with Cloudinary-like parameters
  const optimizeImageUrl = (url: string, width = 600) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      return url;
    } catch {
      return url;
    }
  };

  return (
    <>
      <HeadSEO
        title="Tech Blog | LogicPuzzleMaster"
        description="Latest technology, programming, and coding articles from the DEV community"
        canonicalUrl="https://yourdomain.com/blog"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
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

        {/* Featured Post */}
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 4 }} />
        ) : featuredPost && (
          <Fade in={true} timeout={500}>
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
                  <img
                    src={optimizeImageUrl(featuredPost.cover_image, 800)}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    loading="lazy"
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
                      src={optimizeImageUrl(featuredPost.user.profile_image, 100)}
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
          </Fade>
        )}

        {/* Ad Banner */}
        <Slide direction="up" in={!loading} timeout={800}>
          <Box sx={{ mb: 6 }}>
            <AdBanner />
          </Box>
        </Slide>

        {/* Regular Blog Posts */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            mb: 4
          }}
        >
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Grow in={true} timeout={index * 150} key={index}>
                <Card sx={{ width: { xs: '100%', sm: 345 }, mb: 2 }}>
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
              </Grow>
            ))
          ) : (
            currentPosts.map((post, index) => (
              <Grow in={true} timeout={index * 150} key={post.id}>
                <Card
                  sx={{
                    width: { xs: '100%', sm: 345 },
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
                      <img
                        src={optimizeImageUrl(post.cover_image, 500)}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        loading="lazy"
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
                          src={optimizeImageUrl(post.user.profile_image, 100)}
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
              </Grow>
            ))
          )}
        </Box>

        {/* Pagination */}
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

        {/* Ad Banner */}
        <Slide direction="up" in={!loading} timeout={800}>
          <Box sx={{ mt: 6 }}>
            <AdBanner />
          </Box>
        </Slide>
      </Container>
    </>
  );
}