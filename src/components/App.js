import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import Adapter from '../Adapter'
import TVShowList from './TVShowList'
import Nav from './Nav'
import SelectedShowContainer from './SelectedShowContainer'

function App() {
  const [shows, setShows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShow, setSelectedShow] = useState('')
  const [episodes, setEpisodes] = useState([])
  const [filterByRating, setFilterByRating] = useState('')

  useEffect(() => {
    Adapter.getShows().then((shows) => setShows(shows))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase())
  }
  // console.log(searchTerm)

  function handleFilter(e) {
    e.target.value === 'No Filter'
      ? setFilterByRating('')
      : setFilterByRating(e.target.value)
  }

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show)
      setEpisodes(episodes)
    })
  }

  let displayShows = shows

  if (filterByRating) {
    displayShows = displayShows.filter((s) => {
      // console.log(s)
      return s.rating.average >= parseInt(filterByRating)
    })
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        {!!selectedShow && (
          <Grid.Column width={4}>
            <SelectedShowContainer
              selectedShow={selectedShow}
              episodes={episodes}
            />
          </Grid.Column>
        )}

        <Grid.Column width={!!selectedShow ? 12 : 16}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default App
