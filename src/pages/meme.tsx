import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Slider, 
  IconButton,
  useMediaQuery,
  useTheme,
  Grow,
  Slide,
  CircularProgress,
  Skeleton,
  Menu,
  MenuItem,
  Popover,
  TextField
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import CloseIcon from '@mui/icons-material/Close';
import NextImage from 'next/image';
import AdBanner from '@/components/AdBanner';
import HeadSEO from '@/components/HeadSEO';
import { ChromePicker } from 'react-color';

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  isDragging: boolean;
}

interface RedditPost {
  data: {
    id: string;
    title: string;
    url: string;
    permalink: string;
  };
}

export default function MemeGenerator() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const [templates, setTemplates] = useState<Meme[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Meme | null>(null);
  const [fontSize, setFontSize] = useState<number>(32);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [fontFamily, setFontFamily] = useState<string>('Impact');
  const [loading, setLoading] = useState(true);
  
  const [popularMemes, setPopularMemes] = useState<RedditPost[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [filter, setFilter] = useState<'Trending' | 'Latest' | 'Top Weekly' | 'Best Of All Time'>('Trending');

  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [fontMenuAnchor, setFontMenuAnchor] = useState<HTMLElement | null>(null);
  const [textEditAnchor, setTextEditAnchor] = useState<HTMLElement | null>(null);

  const fonts = ['Impact', 'Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Verdana'];

  // Fetch meme templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        if (data.success) {
          setTemplates(data.data.memes.slice(0, 12));
          setSelectedTemplate(data.data.memes[0]);
        }
      } catch (error) {
        console.error('Error fetching meme templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchPopularMemes = async () => {
      try {
        setGalleryLoading(true);
        let url = '';
        let timeParam = '';
        
        switch(filter) {
          case 'Latest':
            url = 'https://www.reddit.com/r/programmingmemes/new.json?limit=12';
            break;
          case 'Trending':
            url = 'https://www.reddit.com/r/programmingmemes/hot.json?limit=12';
            break;
          case 'Top Weekly':
            url = 'https://www.reddit.com/r/programmingmemes/top.json?limit=12';
            timeParam = '&t=week';
            break;
          case 'Best Of All Time':
            url = 'https://www.reddit.com/r/programmingmemes/top.json?limit=12';
            timeParam = '&t=month';
            break;
        }
        
        const response = await fetch(`${url}${timeParam}`);
        const data = await response.json();
        
        const memes = data?.data?.children || [];
        setPopularMemes(memes);
      } catch (error) {
        console.error('Error fetching popular memes:', error);
        setPopularMemes([]);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchPopularMemes();
  }, [filter]);

  useEffect(() => {
    if (!selectedTemplate || !canvasRef.current) return;
  
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const maxWidth = isSmallScreen ? 350 : 500;
      const ratio = Math.min(maxWidth / img.width, 500 / img.height);
      
      if (canvasRef.current) {
        canvasRef.current.width = img.width * ratio;
        canvasRef.current.height = img.height * ratio;
  
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
  
          textElements.forEach(textEl => {
            ctx.fillStyle = textEl.color;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = textEl.fontSize / 8;
            ctx.textAlign = 'center';
            ctx.font = `bold ${textEl.fontSize}px ${textEl.fontFamily}`;
            ctx.strokeText(textEl.text, textEl.x, textEl.y);
            ctx.fillText(textEl.text, textEl.x, textEl.y);
          });
        }
      }
    };
    img.src = selectedTemplate.url;
  }, [selectedTemplate, textElements, isSmallScreen]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find if we clicked on a text element
    const clickedText = textElements.find(text => {
      const textWidth = canvasRef.current?.getContext('2d')?.measureText(text.text).width || 0;
      return (
        x >= text.x - textWidth/2 &&
        x <= text.x + textWidth/2 &&
        y >= text.y - text.fontSize &&
        y <= text.y
      );
    });
    
    if (clickedText) {
      setActiveTextId(clickedText.id);
      setDragOffset({
        x: x - clickedText.x,
        y: y - clickedText.y
      });
      // Set dragging state
      setTextElements(textElements.map(el => 
        el.id === clickedText.id ? { ...el, isDragging: true } : el
      ));
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !activeTextId) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update position if dragging
    setTextElements(textElements.map(el => {
      if (el.id === activeTextId && el.isDragging) {
        return { 
          ...el, 
          x: x - dragOffset.x,
          y: y - dragOffset.y
        };
      }
      return el;
    }));
  };

  const handleCanvasMouseUp = () => {
    // Clear dragging state
    setTextElements(textElements.map(el => ({ ...el, isDragging: false })));
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || activeTextId) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newTextId = Date.now().toString();
    setTextElements([...textElements, {
      id: newTextId,
      text: 'Click to edit',
      x,
      y,
      fontSize,
      fontFamily,
      color: textColor,
      isDragging: false
    }]);
    setActiveTextId(newTextId);
    setTextInput('Click to edit');
    setTextEditAnchor(canvas);
  };

  const handleTextDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>, id: string) => {
    e.stopPropagation();
    setActiveTextId(id);
    const text = textElements.find(t => t.id === id);
    if (text) {
      setTextInput(text.text);
      setTextEditAnchor(e.currentTarget);
    }
  };

  const handleDeleteText = (id: string) => {
    setTextElements(textElements.filter(el => el.id !== id));
    if (activeTextId === id) {
      setActiveTextId(null);
    }
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(textElements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    if (activeTextId) {
      updateTextElement(activeTextId, { text: e.target.value });
    }
  };

  const handleDownload = (url?: string) => {
    if (url) {
      // Download for gallery memes
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = url;
      link.click();
    } else {
      // Download for created meme
      if (!canvasRef.current) return;
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handleShare = async (url?: string) => {
    try {
      if (url) {
        // Share for gallery memes
        if (navigator.share) {
          await navigator.share({
            title: 'Check out this programming meme!',
            url: url
          });
        } else {
          window.open(url, '_blank');
        }
      } else {
        // Share for created meme
        if (!canvasRef.current) return;
        const blob = await new Promise<Blob | null>(resolve => {
          canvasRef.current?.toBlob(resolve, 'image/png');
        });
        
        if (blob) {
          const file = new File([blob], 'meme.png', { type: 'image/png' });
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Check out this meme I made!'
            });
          } else {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRandomMeme = () => {
    if (templates.length === 0) return;
    const randomIndex = Math.floor(Math.random() * templates.length);
    setSelectedTemplate(templates[randomIndex]);
    setTextElements([]);
    setActiveTextId(null);
  };

  const openColorPicker = (event: React.MouseEvent<HTMLElement>) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const closeColorPicker = () => {
    setColorPickerAnchor(null);
  };

  const openFontMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFontMenuAnchor(event.currentTarget);
  };

  const closeFontMenu = () => {
    setFontMenuAnchor(null);
  };

  const closeTextEdit = () => {
    setTextEditAnchor(null);
    setActiveTextId(null);
  };

  return (
    <>
      <HeadSEO
        title="Programming Meme Generator | PuzzleLogicHub"
        description="Create and share hilarious programming and tech memes"
        canonicalUrl="https://yourdomain.com/memes"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: 'common.black',
                textAlign: 'center',
                letterSpacing: '-0.5px',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem'
                }
              }}
            >
              DevMode: Here LOLs Are Born
            </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'text.secondary',
            fontSize: '1.2rem'
          }}
        >
          A tale for the grandkids: This is how I met your Meme-ther!
        </Typography>

        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={500}>
          <Box sx={{ mb: 6 }}>
            <AdBanner />
          </Box>
        </Slide>

        {/* Meme Creator Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 6
        }}>
          {/* Canvas Preview */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
            position: 'relative'
          }}>
            {loading ? (
              <Box sx={{ 
                width: 500, 
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <canvas 
                  ref={canvasRef} 
                  onClick={handleCanvasClick}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onDoubleClick={(e) => activeTextId && handleTextDoubleClick(e, activeTextId)}
                  style={{ 
                    maxWidth: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: activeTextId ? 'move' : 'default'
                  }}
                />
                {activeTextId && (
                  <Box sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <span>Click here to delete text &#128073;</span>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteText(activeTextId)}
                      sx={{ color: 'white' }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </>
            )}
          </Box>
          
          {/* Controls */}
          <Box sx={{ 
            width: { xs: '100%', md: 350 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRandomMeme}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                New Template
              </Button>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setActiveTextId(null);
                  setTextEditAnchor(null);
                }}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                Add Text
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FormatColorTextIcon />}
                onClick={openColorPicker}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                Text Color
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<FontDownloadIcon />}
                onClick={openFontMenu}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                {fontFamily}
              </Button>
            </Box>
            
            {/* Color Picker Popover */}
            <Popover
              open={Boolean(colorPickerAnchor)}
              anchorEl={colorPickerAnchor}
              onClose={closeColorPicker}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ChromePicker
                color={textColor}
                onChangeComplete={(color) => {
                  setTextColor(color.hex);
                  if (activeTextId) {
                    updateTextElement(activeTextId, { color: color.hex });
                  }
                }}
              />
            </Popover>
            
            {/* Font Menu */}
            <Menu
              anchorEl={fontMenuAnchor}
              open={Boolean(fontMenuAnchor)}
              onClose={closeFontMenu}
            >
              {fonts.map((font) => (
                <MenuItem
                  key={font}
                  onClick={() => {
                    setFontFamily(font);
                    if (activeTextId) {
                      updateTextElement(activeTextId, { fontFamily: font });
                    }
                    closeFontMenu();
                  }}
                  sx={{ fontFamily: font }}
                >
                  {font}
                </MenuItem>
              ))}
            </Menu>
            
            {/* Font Size Slider */}
            <Box>
              <Typography gutterBottom sx={{ fontWeight: 600 }}>
                Font Size: {fontSize}px
              </Typography>
              <Slider
                value={fontSize}
                onChange={(_, value) => {
                  setFontSize(value as number);
                  if (activeTextId) {
                    updateTextElement(activeTextId, { fontSize: value as number });
                  }
                }}
                min={16}
                max={64}
                sx={{
                  color: 'primary.main',
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload()}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                Download
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => handleShare()}
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                Share
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Text Edit Popover */}
        <Popover
          open={Boolean(textEditAnchor)}
          anchorEl={textEditAnchor}
          onClose={closeTextEdit}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Box sx={{ p: 2 }}>
            <TextField
              value={textInput}
              onChange={handleTextInputChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              onClick={closeTextEdit}
              fullWidth
            >
              Done
            </Button>
          </Box>
        </Popover>

        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 6 }}>
            <AdBanner />
          </Box>
        </Slide>

        {/* Popular Memes Gallery */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'common.black',
              textAlign: 'center'
            }}
          >
            Puzzled? Same. Let&apos;s Meme Instead
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
            flexWrap: 'wrap'
          }}>
            {['Trending', 'Latest', 'Top Weekly', 'Best Of All Time'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'contained' : 'outlined'}
                onClick={() => setFilter(f as 'Trending' | 'Latest' | 'Top Weekly' | 'Best Of All Time')}
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                {f}
              </Button>
            ))}
          </Box>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            mb: 6
          }}
        >
          {galleryLoading ? (
            Array.from(new Array(12)).map((_, index) => (
              <Grow in={true} timeout={index * 150} key={index}>
                <Card sx={{ width: { xs: '100%', sm: 300 }, height: 300 }}>
                  <Skeleton variant="rectangular" height={240} />
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Skeleton variant="rectangular" width="50%" height={36} />
                      <Skeleton variant="rectangular" width="50%" height={36} />
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            ))
          ) : (
            popularMemes.map((meme, index) => (
              <Grow in={true} timeout={index * 150} key={meme.data.id}>
                <Card
                  sx={{
                    width: { xs: '100%', sm: 350 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box sx={{ 
                    height: 350,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <NextImage
                      src={meme.data.url}
                      alt={meme.data.title}
                      width={350}
                      height={350}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '350px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1
                  }}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(meme.data.url)}
                      sx={{
                        borderRadius: '50px',
                        fontWeight: 600,
                        flex: 1
                      }}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ShareIcon />}
                      onClick={() => handleShare(`https://reddit.com${meme.data.permalink}`)}
                      sx={{
                        borderRadius: '50px',
                        fontWeight: 600,
                        flex: 1
                      }}
                    >
                      Share
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            ))
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