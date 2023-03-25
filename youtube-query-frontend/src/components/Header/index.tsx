import React from 'react' ;
import YoutubeYoodle from '/src/assets/Youtube.webp';

const Header = () => {
  return (
    <div className="row justify-content-center m-4">
        <div className='col text-center'>
          <h1>
            <img className="ytd-yoodle-renderer" src={YoutubeYoodle} alt="Card stars"></img>
          <span className="text-primary" id="header-text">Query</span></h1>
        </div>
      </div>
  )
}
export default Header;