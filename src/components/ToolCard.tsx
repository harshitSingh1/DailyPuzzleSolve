import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { Tool } from '@/types/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {tool.image && (
        <CardMedia
          component="img"
          height="140"
          image={tool.image}
          alt={tool.title}
          sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {tool.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tool.subheading}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Tool
        </Button>
      </Box>
    </Card>
  );
}