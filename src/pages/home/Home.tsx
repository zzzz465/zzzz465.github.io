import { Button, Text, Skeleton, Box, Title, Stack } from '@mantine/core'
import { IconPlayerPlay } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { MovieSlider } from '../../components/movie/MovieSlider'
import { useMovieQueries, Movie } from '../../hooks/queries/movieQueries'

interface MovieSection {
  title: string
  movies: Movie[]
}

export default function Home() {
  const { isLoading, isError, data } = useMovieQueries()

  if (isLoading) {
    return <Skeleton height="100vh" />
  }

  if (isError) {
    return <Box p="xl">Error loading movies</Box>
  }

  const [trending, topRated, nowPlaying, upcoming] = data
  const featured = trending?.results[0]

  const sections: MovieSection[] = [
    { title: 'Trending Now', movies: trending?.results || [] },
    { title: 'Now Playing', movies: nowPlaying?.results || [] },
    { title: 'Top Rated', movies: topRated?.results || [] },
    { title: 'Upcoming', movies: upcoming?.results || [] },
  ]

  return (
    <Box bg="dark.9" miw="100vw" mih="100vh">
      {featured && (
        <Box
          pos="relative"
          h="80vh"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            pos="absolute"
            inset={0}
            style={{
              background: 'linear-gradient(to top, var(--mantine-color-dark-9), transparent)',
            }}
          />
          <Box pos="absolute" bottom={0} left={0} p="xl" w={{ base: '100%', md: '50%' }}>
            <Title order={1} c="white" size="h1" fw="bold" mb="md">
              {featured.title}
            </Title>
            <Text c="white" mb="xl" lineClamp={3}>
              {featured.overview}
            </Text>
            <Button
              component={Link}
              to={`/movies/${featured.id}`}
              leftSection={<IconPlayerPlay size={20} />}
              size="lg"
              color="red"
            >
              Play Now
            </Button>
          </Box>
        </Box>
      )}

      <Stack py="xl" mt="-4rem" pos="relative" style={{ zIndex: 1 }}>
        {sections.map((section) => (
          <MovieSlider key={section.title} title={section.title} movies={section.movies} />
        ))}
      </Stack>
    </Box>
  )
}
