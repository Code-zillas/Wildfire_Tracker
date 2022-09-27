//npm package "Moment" displays time in format from now, e.g. "5 minutes ago".
import Moment from 'react-moment'
import image from '../.././assets/firepower.png'

function Popup({ marker }) {
  console.log(marker.power)

  return (
    <div className='card'>
      <label>Location</label>
      <h4 className='place'>{marker.location}</h4>
      <label>Description</label>
      <span className='description'>{marker.desc}</span>
      <label>Fire power</label>
      <div className='power'>
        {Array(marker.power).fill(
          <img src={image} alt='fire' className='firepower-icon' />
        )}
      </div>
      <label>Information from</label>
      <span className='username'>{marker.username}</span>
      <label>Created</label>
      <span className='date'>
        <Moment fromNow>{marker.createdAt}</Moment>
      </span>
    </div>
  )
}

export default Popup
