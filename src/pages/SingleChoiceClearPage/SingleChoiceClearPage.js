import SingleChoiceClearPageStyle from './SingleChoiceClearPage.module.css'


export const SingleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    return (
        <div className="page-container" style={pageStyle}>
            <div className={SingleChoiceClearPageStyle.explanationSection}>
                <span className={SingleChoiceClearPageStyle.explanationTextFirstLine}>You found...</span>
                <span className={SingleChoiceClearPageStyle.explanationTextSecondLine}>A Photo!</span>
                <img src='/images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed"/>
            </div>
            <div className={SingleChoiceClearPageStyle.clueSection}> 
                <img src='/images/object/jungle_escape_walkie_talkie.png' alt="jungle_escape_walkie_talkie"/>
            </div>
            <button className={SingleChoiceClearPageStyle.imageButton} onClick={()=>{setCurrentStepOnMap(3)}}>
                <img src='/images/object/jungle_escape_nect_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
            </button>
        </div>
    )
}
