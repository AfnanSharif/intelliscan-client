import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'

export default function Search() {
  const router = useRouter()
  const { query } = router.query
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`,
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          setResults(data)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      fetchResults()
    }
  }, [query])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error: {error}</Typography>

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        {results ? (
          <div>
            <Typography variant="h6" component="h2">
              Web Results
            </Typography>
            {results.webResults && results.webResults.length > 0 ? (
              results.webResults.map((result, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    component="a"
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </Typography>
                  <Typography>{result.snippet}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No web results found.</Typography>
            )}
            <Typography variant="h6" component="h2">
              GitHub Repositories
            </Typography>
            {results.githubResults && results.githubResults.length > 0 ? (
              results.githubResults.map((repo, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    component="a"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No GitHub repositories found.</Typography>
            )}
            <Typography variant="h6" component="h2">
              YouTube Videos
            </Typography>
            {results.youtubeResults && results.youtubeResults.length > 0 ? (
              results.youtubeResults.map((video, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    component="a"
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.title}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No YouTube videos found.</Typography>
            )}
          </div>
        ) : (
          <Typography>No results found.</Typography>
        )}
      </Box>
    </Container>
  )
}
