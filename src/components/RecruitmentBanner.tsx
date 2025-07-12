// components/RecruitmentBanner.tsx
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RecruitmentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('recruitmentBannerDismissed');
    setIsVisible(!isDismissed);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('recruitmentBannerDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: '#f0f7ff',
      padding: '12px',
      textAlign: 'center',
      borderBottom: '1px solid #d0e3ff',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px'
    }}>
      <p style={{ margin: 0, fontSize: '16px', color: '#1a365d' }}>
        We&apos;re looking for contributors to help grow this open-source project!
      </p>
      
      <Button
        variant="contained"
        color="primary"
        size="small"
        href="https://forms.gle/cf3NR7zrGdCeiieM9"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textTransform: 'none',
          fontWeight: 500
        }}
      >
        Join Us
      </Button>
      
      <Button
        onClick={handleDismiss}
        size="small"
        sx={{
          position: 'absolute',
          right: '8px',
          minWidth: '32px',
          color: '#666'
        }}
      >
        <CloseIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default RecruitmentBanner;