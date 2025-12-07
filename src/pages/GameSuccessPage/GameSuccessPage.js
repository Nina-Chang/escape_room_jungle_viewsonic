import GameSuccessPageStyle from './GameSuccessPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameSuccessPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameSuccessPageStyle.explanationSection}>
            <div className={GameSuccessPageStyle.explanationText}>{cfg.strings.wholeGameCompletedExplanation || "Congratulations! Thanks to your efforts, the team is safe, and the ancient temple has been discovered!"}</div>
            <img src='/images/object/jungle_escape_clue_frame.png' style={{transform:'scale(1.3,1)'}} alt="jungle_escape_clue_frame"/>
            <div className={GameSuccessPageStyle.returnButton}>
                <img src='/images/object/jungle_escape_home_button.png' alt="jungle_escape_clue_frame" onClick={()=>navigateTo('start')}/>
            </div>
        </div>
    </div>
  )
}
