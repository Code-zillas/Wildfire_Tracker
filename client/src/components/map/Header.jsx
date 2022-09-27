import wildfire from '../.././assets/wildfire.png'

function Header() {
  return (
    <div className='header'>
      <div>
        <img src={wildfire} alt='wildfire' />
      </div>
      <h1>Wildfire Tracker</h1>
      <img src={wildfire} alt='wildfire' />
    </div>
  )
}

export default Header
