import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import Link from 'next/link';
import { ShopItem } from '@/types/types';

interface ShopCardProps {
  item: ShopItem;
}

export default function ShopCard({ item }: ShopCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.productName}
        sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {item.productName}
        </Typography>
        {item.rating > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={item.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {item.rating.toFixed(1)}
            </Typography>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {item.buttonText}
        </Button>
      </Box>
    </Card>
  );
}