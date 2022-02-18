import React, { useState } from 'react'
import Episode from './Episode'

function SelectedShowContainer(props) {
  const [selectedSeason, setSelectedSeason] = useState(1)

  // console.log(props.episodes)
  // in app js using selectShow func we got episodes but since there are
  // multiple episodes with the same season we need to get the seasons values once
  // ,thus using unique function.
  // console.log(!!props.episodes)
  function mapSeasons() {
    if (!!props.episodes) {
      let seasons = unique(props.episodes.map((e) => e.season))
      // console.log(seasons)

      return seasons.map((s) => {
        return (
          <option value={s} key={s}>
            Season {s}
          </option>
        )
      })
    }
  }

  // console.log(props.episodes)
  function mapEpisodes() {
    return props.episodes
      .filter((e) => e.season === parseInt(selectedSeason))
      .map((e) => {
        return <Episode eachEpisode={e} key={e.id} />
      })
  }

  function handleSelectionChange(e) {
    setSelectedSeason(e.target.value)
  }

  const { selectedShow } = props
  return (
    <div style={{ position: 'static' }}>
      <h2>{selectedShow.name}</h2>
      <img src={selectedShow.image.medium} alt='' />
      <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
      <p>Premiered: {selectedShow.premiered}</p>
      <p>Status: {selectedShow.status}</p>
      <p>Average Rating: {selectedShow.rating.average}</p>
      <select style={{ display: 'block' }} onChange={handleSelectionChange}>
        {mapSeasons()}
      </select>
      {mapEpisodes()}
    </div>
  )
}

export default SelectedShowContainer

// Array.prototype.unique = function () {
//   const arr = []
//   for (let i = 0; i < this.length; i++) {
//     if (!arr.includes(this[i])) {
//       arr.push(this[i])
//     }
//   }
//   return arr
// }

function unique(array) {
  const arr = []
  for (let i = 0; i < array.length; i++) {
    if (!arr.includes(array[i])) {
      arr.push(array[i])
    }
  }
  return arr
}
