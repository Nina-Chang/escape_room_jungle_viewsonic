import  SoundButton from "../../components/SoundButton";
import StartPageStyle from "./StartPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage}) => {
  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
  };

  const handleStartClick=()=>{
    navigateTo('prologue');
  }


  return (
    <div className='page-container' style={pageStyle}>
      <h1 className={StartPageStyle.title}>{cfg.strings.startTitle || 'Into the Jungle'}</h1>
      <h3 className={StartPageStyle.subTitle}>{cfg.strings.startSubtitle || 'The Missing Expedition'}</h3>
      <SoundButton className={StartPageStyle.imageButton} onClick={handleStartClick}>
        <img src='/images/object/jungle_escape_start_button.png' alt="Start Button" loading="lazy" />
        <span className={StartPageStyle.btnText}>Start</span>
      </SoundButton>
    </div>
  )
}
