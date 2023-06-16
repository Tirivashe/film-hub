import { Button, Group, Loader, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { useStore } from "../../store"
import { useFetchMoviesBySearch } from "../../hooks/fetchMovies"
import MovieCard from "../../components/MovieCard"
import { addMovieImage } from "../../utils/util"


export const SearchResults = () => {
  const query = useStore(state => state.query)
  const { isLoading, isError, isFetching, fetchNextPage, hasNextPage, data, isFetchingNextPage } = useFetchMoviesBySearch(query)

  const buttonAction = () => {
    if (hasNextPage) {
      fetchNextPage()
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if((isLoading || isFetching) && !isFetchingNextPage) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <Loader variant="dots" />
    </Stack>
    )
  }
  if(isError) {
    return (
      <Title>Oops, there has been an error</Title>
    )
  }

  if (data !== undefined && data.pages[0].results.length <= 0) {
    return (
      <Stack justify='center' align='center' w="100%" h="100%">
        <Title>Is there even such a movie? 🤨</Title>
      </Stack>
    )
  }

  return (
    <Stack>
      <Title order={2}>Search Results For: <Text span color="purple.3">{query}</Text></Title>
      <SimpleGrid 
        cols={5} 
        spacing="md" 
        verticalSpacing="3rem"
        breakpoints={[
          { maxWidth: "lg", cols: 3 },
          { maxWidth: "md", cols: 2, verticalSpacing: "xl" },
          { maxWidth: "xs", cols: 1, verticalSpacing: "lg" },
        ]}
      >
        { data?.pages?.map(page => page.results.map(movie => (
          <MovieCard key={movie.id} movie={addMovieImage(movie)}/>
        ))) }
      </SimpleGrid>
      <Group position='center'>
        <Button loading={isFetchingNextPage} mt="xl" onClick={buttonAction} >{ hasNextPage ?  "Load More" : "Back To Top" }</Button>
      </Group>
    </Stack>
  )
}