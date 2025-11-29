import React from 'react'
import SoundButton from './SoundButton';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const InstructionsPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };
    

  return (
    <div className="page-container" style={pageStyle}>
      <SoundButton className="image-button continue-button shake" onClick={() => navigateTo('board')}>
        <img src={cfg.images?.btnNext || 'images/stage_jeopardy_next_button.png'} alt="Continue" />
      </SoundButton>
    </div>
  )
}
