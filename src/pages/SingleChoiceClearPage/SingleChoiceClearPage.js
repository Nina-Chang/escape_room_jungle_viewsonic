import React, { useState } from 'react'
import SingleChoiceClearPageStyle from './SingleChoiceClearPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};
export const SingleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap,bgmAudio }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const handleAudioPlay=()=>{
        // 播放對講機音檔時背景音樂音量轉小 直到音檔結束
        setButtonDisabled(true)// 不能換頁
        if(bgmAudio) bgmAudio.volume=0.2
        const audioPlayer=new Audio(cfg.sounds.walkieTalkie || "sounds/walkie_talkie.mp3")
        audioPlayer.play(e => console.error("Audio play failed", e));
        audioPlayer.addEventListener('ended',()=>{
            if(bgmAudio) bgmAudio.volume=0.5
            setButtonDisabled(false)
        })
    }

    return (
        <div className="page-container" style={pageStyle}>
            <div className={SingleChoiceClearPageStyle.explanationSection}>
                <span className={SingleChoiceClearPageStyle.explanationTextFirstLine}>You found...</span>
                <span className={SingleChoiceClearPageStyle.explanationTextSecondLine}>A Photo!</span>
                <img src='/images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={SingleChoiceClearPageStyle.clueSection}> 
                <img src='/images/object/jungle_escape_walkie_talkie.png' alt="jungle_escape_walkie_talkie" loading="lazy" decoding="async"/>
                <span onClick={()=>{handleAudioPlay()}} className={SingleChoiceClearPageStyle.clickButton}></span>
            </div>
            <button disabled={buttonDisabled} className={`${SingleChoiceClearPageStyle.imageButton} ${buttonDisabled&&SingleChoiceClearPageStyle.buttonDisabled}`} onClick={()=>{setCurrentStepOnMap(3)}}>
                <img src='/images/object/jungle_escape_nect_button.png' alt="Return to Map" onClick={()=>navigateTo('map')} loading="lazy" decoding="async"/>
            </button>
        </div>
    )
}
