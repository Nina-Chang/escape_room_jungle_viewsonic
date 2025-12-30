import GameStartPageStyle from './GameStartPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameStartPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };


  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameStartPageStyle.explanationSection}>
            <div className={GameStartPageStyle.avatarsSection}>
                <img className={GameStartPageStyle.avatarsIcon} src='./images/object/jungle_escape_avatars_icon.png' alt="jungle_escape_team_avatars" loading="lazy" decoding="async"/>
            </div>
            <div dangerouslySetInnerHTML={{__html:cfg.strings.startGameExplanationText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`}} className={GameStartPageStyle.explanationText}>
            </div>
        </div>
        <button className={GameStartPageStyle.imageButton} onClick={()=>navigateTo('map')}>
            <img src='./images/object/jungle_escape_mission_button.png' alt="Continue" loading="lazy" decoding="async"/>
            <div className={GameStartPageStyle.btnText}>Start Mission</div>
        </button>
    </div>
  )
}
