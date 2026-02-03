import { useState } from 'react'
import TrueFalseQuizClearPageStyle from './TrueFalseQuizClearPage.module.css'

export const TrueFalseQuizClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const [buttonScale, setButtonScale] = useState(1);
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    const handleClick=async()=>{
      setButtonScale(0.9);
      await new Promise(resolve => setTimeout(resolve, 100));
      setButtonScale(1);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStepOnMap(2)
      navigateTo('map')
    }
    
    return (
        <div className="page-container" style={pageStyle}>
            <div className={TrueFalseQuizClearPageStyle.explanationSection}>
                <span className={TrueFalseQuizClearPageStyle.explanationTextFirstLine}>You found...</span>
                <span className={TrueFalseQuizClearPageStyle.explanationTextSecondLine}>A Notebook!</span>
                <img src='./images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={TrueFalseQuizClearPageStyle.clueSection}>
                <span className={TrueFalseQuizClearPageStyle.clueTextFirstLine}>DATE: 08/16</span>
                <span className={TrueFalseQuizClearPageStyle.clueTextSecondLine}>We lost comms with Fynn.B. Last heard he was going toward the marsh...</span>
                <img src='./images/object/jungle_escape_notebook.png' alt="jungle_escape_notebook" loading="lazy" decoding="async"/>
            </div>
            <button className={TrueFalseQuizClearPageStyle.imageButton}
                onMouseEnter={() => setButtonScale(1.1)}
                onMouseLeave={() => setButtonScale(1)}
                style={{transform: `translateX(-50%) scale(${buttonScale})`}}
                onClick={handleClick}>
                <img src='./images/object/jungle_escape_nect_button.png' alt="Return to Map" loading="lazy" decoding="async"/>
            </button>
        </div>
    )
}
