import styled from "styled-components";
import  SoundButton from "./SoundButton";

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage}) => {

  const imageButton={
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',

    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
  };

  const StartPageTitle=styled.h1`
    position: absolute;
    top: 23%;
    width: 100%;
    text-align: center;
    font-size: 120px;
    font-weight:900;
  `
  const StartPageSubtitle=styled.h3`
    position: absolute;
    top: 38%;
    width: 100%;
    text-align: center;
    font-size: 65px;
    font-weight:800;
  `
  const BtnText=styled.span`
    position: absolute; 
    top:45%;
    left:50%;
    font-size: 55px;
    font-weight:700;
    transform: translate(-50%,-50%);
  `

  const handleStartClick=()=>{
    navigateTo('previousStory');
  }


  return (
    <div className='page-container' style={pageStyle}>
      <StartPageTitle>{cfg.strings.startTitle || 'Into the Jungle'}</StartPageTitle>
      <StartPageSubtitle>{cfg.strings.startSubtitle || 'The Missing Expedition'}</StartPageSubtitle>
      <SoundButton style={imageButton} onClick={handleStartClick}>
        <img src='/images/object/jungle_escape_start_button.png' alt="Start Button" />
        <BtnText>Start</BtnText>
      </SoundButton>
    </div>
  )
}
