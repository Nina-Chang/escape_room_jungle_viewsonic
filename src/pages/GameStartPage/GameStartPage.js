import SoundButton from '../../components/SoundButton';
import GameStartPageStyle from './GameStartPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameStartPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };


  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameStartPageStyle.explanationSection}>
            <div className={GameStartPageStyle.avatarsSection}>
                <div className={GameStartPageStyle.avatarsIconTop}></div>
                <div className={GameStartPageStyle.avatarsIconBottom}></div>
            </div>
            <div dangerouslySetInnerHTML={{__html:cfg.strings.explanationText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`}} className={GameStartPageStyle.explanationText}>
                {/* {cfg.strings.explanationText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`} */}
                {/* <p>[Headquarters]:</p>
                <p>That's the last we heard. <br/>The missing team needs your help.</p>
                <p>To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.</p> */}
            </div>
        </div>
        <SoundButton className={GameStartPageStyle.imageButton} onClick={()=>navigateTo('map')}>
            <img src='images/object/jungle_escape_mission_button.png' alt="Continue" />
            <div className={GameStartPageStyle.btnText}>Start Mission</div>
        </SoundButton>
    </div>
  )
}
