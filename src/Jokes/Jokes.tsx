import React, { useEffect, useState, CSSProperties } from 'react'

export const Jokes = () => {
  const URL = "https://api.chucknorris.io/jokes/random"
  const [data, setData] = useState([{}])
  const [filteredJokes, setFilteredJokes] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({})
  const [inputValue, setInputValue] = useState('')

  const row:CSSProperties = {
    border:"1px solid #dddddd",
    textAlign:"left",
    padding:"8px"
  }

  useEffect(() => {
    const fetchJoke1 = fetch(URL)
      .then((response) => response.json())
    const fetchJoke2 = fetch(URL)
      .then((response) => response.json())
    const fetchJoke3 = fetch(URL)
      .then((response) => response.json())
    Promise.all([fetchJoke1, fetchJoke2, fetchJoke3]).then(data => {
      setData(data)
      setFilteredJokes(data)
      setLoading(false)
    }).catch(error => {
      setError(error)
    })
    }, [])

  const displayJokes = () => {
    if (!loading && filteredJokes.length > 0) {
      return filteredJokes?.map((val:any, index) => {
        return (
          <tr key={index}>
            <td style={row}>{val?.value ?? val.input}</td>
          </tr>
        )
      })
    }
  }

  const handleSubmit = (event:any) => {
    event.preventDefault()
    const matches:any = []
    if (inputValue !== '') {
      return data.map((val:any) => {
        const joke = val.value
        const match = joke.match(new RegExp(inputValue))
        if (match) {
          matches.push(match)
        }
        return setFilteredJokes(matches)
      })
    }
  }

  const handleChanges = (e:any) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <h1>Jokes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChanges} placeholder='Search a joke...'/>
        <button type="submit">
          Search...
        </button>
      </form>
      <table style={{borderCollapse: "collapse"}}>
       <thead>
          <tr>
            <th style={{border:"1px solid #dddddd",textAlign:"left",padding:"8px"}}>Joke</th>
          </tr>
        </thead>
        <tbody>
          {displayJokes()}
        </tbody>
      </table>
    </div>
  )
}