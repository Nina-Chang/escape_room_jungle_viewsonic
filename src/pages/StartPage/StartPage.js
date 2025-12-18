import StartPageStyle from "./StartPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage}) => {
  const pageStyle = { 
      backgroundImage: `url(${backgroundImage})`,
      width:'1920px',
      height:'1080px',
      loading: 'eager'
  };

  const handleStartClick=()=>{
    navigateTo('prologue');
  }


  return (
    <div className='page-container' style={pageStyle}>
      <h1 className={StartPageStyle.title}>{cfg.strings.startTitle || 'Into the Jungle'}</h1>
      <h3 className={StartPageStyle.subTitle}>{cfg.strings.startSubtitle || 'The Missing Expedition'}</h3>
      <button className={StartPageStyle.imageButton} onClick={handleStartClick}>
        <img src='/images/object/jungle_escape_start_button.png' alt="Start Button" loading="lazy" decoding="async" />
        <span className={StartPageStyle.btnText}>Start</span>
      </button>
    </div>
  )
}
