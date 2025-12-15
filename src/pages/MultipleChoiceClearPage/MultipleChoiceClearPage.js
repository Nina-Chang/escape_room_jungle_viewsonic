import { useState } from 'react'
import MultipleChoiceClearPageStyle from './MultipleChoiceClearPage.module.css'

export const MultipleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const [isPicReveal, setIsPicReveal] = useState(false)
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };


    return (
        <div className="page-container" style={pageStyle}>
            <div className={MultipleChoiceClearPageStyle.explanationSection}>
                <div className={MultipleChoiceClearPageStyle.explanationTextFirstLine}>You found...</div>
                <div className={MultipleChoiceClearPageStyle.explanationTextSecondLine}>A Photo!</div>
                <img src='/images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed"/>
            </div>
            <div className={MultipleChoiceClearPageStyle.clueSection}>
                <button onClick={()=>setIsPicReveal(true)}>
                    {
                        isPicReveal?
                        <img src='/images/object/jungle_escape_photo02.png' alt="jungle_escape_photo02"/>
                        :<img src='/images/object/jungle_escape_photo01.png' alt="jungle_escape_photo02"/>
                    }
                </button>
                <img src='/images/object/jungle_escape_camera.png' alt="jungle_escape_camera"/>
            </div>
            <button className={MultipleChoiceClearPageStyle.imageButton} onClick={()=>{setCurrentStepOnMap(4)}}>
                <img src='/images/object/jungle_escape_nect_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
            </button>
        </div>
    )
}
