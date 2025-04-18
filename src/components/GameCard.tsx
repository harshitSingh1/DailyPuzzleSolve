import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';
import { Fade } from '@mui/material';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    subheading: string;
    image: string;
    gameType: string;
  };
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Fade in={true}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3
          }
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={game.image}
          alt={game.title}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 700 }}>
            {game.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {game.subheading}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Link href={`/solutions/${game.gameType}`} passHref>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: '50px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                View Solutions
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}