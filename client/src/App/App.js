import { useState, useEffect } from 'react'
import axios from 'axios'
import Map from '../components/map/Map'
import Header from '../components/map/Header'

function App() {
  const [markers, setMarkers] = useState([])

  //fetching data about all markers from db
  useEffect(() => {
    const getMarkers = async () => {
      try {
        const res = await axios.get('/markers')
        setMarkers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMarkers()
  }, [])

  return (
    <div className='app'>
      <Header />
      <Map markers={markers} setMarkers={setMarkers} />
    </div>
  )
}

export default App
