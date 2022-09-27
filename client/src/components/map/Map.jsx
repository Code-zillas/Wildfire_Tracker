//Use npm package @react-google-maps/api to render components Google map, loader, marker and popup window
//here is documentation https://react-google-maps-api-docs.netlify.app/#section-introduction
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api'
import { useState } from 'react'
import Signup from '../auth/Signup'
import axios from 'axios'
import Popup from './Popup'
import Login from '../auth/Login'

//set full screen for  map
const containerStyle = {
  width: '100%',
  height: '100%',
}

//Starting location (Greece)
const center = {
  lat: 38.4801,
  lng: 22.4941,
}

function Map({ markers, setMarkers }) {
  const localStorage = window.localStorage

  //When user login we take from localStorage username
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))

  const [currentLocationID, setCurrentLocationID] = useState(null)

  //state to store new markers
  const [newMarker, setNewMarker] = useState(null)

  //states to store information from user inputs (create new marker)
  const [userLocation, setUserLocation] = useState(null)
  const [userDescription, setUserDescription] = useState(null)
  const [firePower, setFirePower] = useState(0)

  //if user press button sign up or login popup modal window with create an account form or login
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  //popup window opens when user clicks on marker (based on marker id}
  const handleMarkerClick = (id) => {
    setCurrentLocationID(id)
  }

  //new marker creates when user clicks on map
  const handleAddNewMarker = (event) => {
    setNewMarker({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat(),
    })
  }

  //after user submit form that creates new marker data will be send to server and map will be updated with new marker
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    //create object with information about username, user location, description, power of fire, longitude and latitude
    const createdMarker = {
      username: currentUser,
      location: userLocation,
      desc: userDescription,
      power: firePower,
      latitude: newMarker.latitude,
      longitude: newMarker.longitude,
    }

    try {
      // create new marker
      console.log('createdMarker', createdMarker)
      const res = await axios.post('/markers', createdMarker)
      setMarkers([...markers, res.data])
      setNewMarker(null)
      console.log('res.data', res.data)
    } catch (error) {
      console.log(error)
    }
  }

  //user logout
  const handleLogout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onClick={handleAddNewMarker}
        zoomOnClick={false}
      >
        {/* render markers from server on map */}
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            icon={{
              url: require('../.././assets/firemarker.png'),
            }}
            onClick={() => handleMarkerClick(marker._id)}
          >
            {marker._id === currentLocationID && (
              <InfoWindowF
                position={{
                  lat: marker.latitude,
                  lng: marker.longitude,
                }}
              >
                <Popup marker={marker} />
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
        {newMarker && (
          <MarkerF
            position={{
              lat: newMarker.latitude,
              lng: newMarker.longitude,
            }}
            icon={{
              url: require('../.././assets/firemarker.png'),
            }}
          >
            {/* create new marker by clicking on map */}
            <InfoWindowF
              position={{
                lat: newMarker.latitude,
                lng: newMarker.longitude,
              }}
            >
              <div>
                <form onSubmit={handleFormSubmit}>
                  <label>Location</label>
                  <input
                    placeholder='Enter your location'
                    autoFocus
                    onChange={(event) => setUserLocation(event.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder='Describe situation'
                    onChange={(event) => setUserDescription(event.target.value)}
                  />
                  <label>Fire power</label>
                  <select
                    onChange={(event) => setFirePower(event.target.value)}
                  >
                    <option value='0' className = 'hidden'></option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <button type='submit' className='submit-button'>
                    Add Marker
                  </button>
                </form>
              </div>
            </InfoWindowF>
            //{' '}
          </MarkerF>
        )}
        {/* If there is user who login account than show button 'logout' */}
        {currentUser ? (
          <div>
            {' '}
            <p className='current-user'>{currentUser}</p>
            <button className='button logout' onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          // or if user is not logged or doesn't have account thant show buttons 'sign up' and 'login'
          <div className='buttons'>
            <button className='button login' onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className='button signup'
              onClick={() => setShowSignup(true)}
            >
              Sign up
            </button>
          </div>
        )}
        {showSignup && <Signup setShowSignup={setShowSignup} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
