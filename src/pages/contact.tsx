import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Snackbar,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import { useState } from 'react';
import HeadSEO from '@/components/HeadSEO';
import AdBanner from '@/components/AdBanner';

export default function ContactPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: '',
      subject: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadSEO
        title="Contact Us | LogicPuzzleMaster"
        description="Have questions or feedback? Get in touch with our team."
        canonicalUrl="https://daily-puzzle-solve.vercel.app/contact"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Fade in={true} timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: 'common.black',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2rem'
                }
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Have questions, suggestions, or found a bug? We&apos;d love to hear from you!
            </Typography>
          </Box>
        </Fade>

        {/* Ad Banner */}
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 6 }}>
            <AdBanner />
          </Box>
        </Slide>

        {/* Contact Form */}
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            p: 4,
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            },
            transition: 'all 0.3s ease'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Name Field */}
            <TextField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />

            {/* Email Field */}
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />

            {/* Subject Field */}
            <TextField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />

            {/* Message Field */}
            <TextField
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Box>

        {/* Success Message */}
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSuccess(false)} 
            severity="success"
            sx={{ width: '100%' }}
          >
            Your message has been sent successfully!
          </Alert>
        </Snackbar>

        {/* Error Message */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError('')} 
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

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