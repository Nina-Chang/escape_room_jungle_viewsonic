import React, { useEffect, useState } from 'react'
import SingleChoiceClearPageStyle from './SingleChoiceClearPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';
import useClickAnimation from '../../hooks/useClickAnimation';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};
export const SingleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap,bgmAudio }) => {
    const reset=()=>{
        setCurrentStepOnMap(3)
        navigateTo('map')
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const { sendMessage }=useSendGameMessage()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 9});
    }, [sendMessage]);

    useEffect(()=>{
        const audioPlayer=new Audio(cfg.sounds.findItems || './sounds/find items.mp3')
        audioPlayer.volume=0.316;
        audioPlayer.play().catch((e)=>console.log('Audio Failed',e))
    },[])

    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    // 找出 sceneId 為 9 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 9) || [];

    // 建立一個產生 Style 的 function
    const getAssetStyle = (asset) => ({
        position: 'absolute',
        left: asset.position.x,
        top: asset.position.y,
        width:asset.textWidth,
        height:asset.textHeight,
        fontFamily: asset.fontFamily,
        textAlign:asset.textAlign,
        fontSize:asset.fontSize,
        color: asset.color,
        fontWeight: asset.fontWeight,
        fontStyle: asset.fontStyle,
        textDecoration: asset.textDecoration,
        pointerEvents: 'none', // 如果只是裝飾文字，防止擋住按鈕點擊
        zIndex:"99"
    });

    const handleAudioPlay=()=>{
        const audioPlayer=new Audio(cfg.sounds.walkieTalkie || "./sounds/walkie_talkie.mp3")
        audioPlayer.play(e => console.error("Audio play failed", e));
        audioPlayer.addEventListener('ended',()=>{
            setButtonDisabled(false)
        })
    }

    return (
        <div className="page-container" style={pageStyle}>
            <div className={SingleChoiceClearPageStyle.explanationSection}>
                <span className={SingleChoiceClearPageStyle.explanationTextFirstLine}>You found...</span>
                <span className={SingleChoiceClearPageStyle.explanationTextSecondLine}>A Walkie Talkie!</span>
                <img src='./images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={SingleChoiceClearPageStyle.clueSection}> 
                <img src='./images/object/jungle_escape_walkie_talkie.png' alt="jungle_escape_walkie_talkie" loading="lazy" decoding="async"/>
                <span onClick={()=>{handleAudioPlay()}} className={SingleChoiceClearPageStyle.clickButton}></span>
            </div>
            <button 
            disabled={buttonDisabled} 
            className={`${SingleChoiceClearPageStyle.imageButton} ${buttonDisabled&&SingleChoiceClearPageStyle.buttonDisabled}`} 
            onMouseEnter={() => setButtonScale(1.1)}
            onMouseLeave={() => setButtonScale(1)}
            style={{transform: `translateX(-50%) scale(${buttonScale})`}}
            onClick={handleClickAnimation}>
                <img src='./images/object/jungle_escape_nect_button.png' alt="Return to Map" loading="lazy" decoding="async"/>
            </button>
            {pageAssets.map((asset, index) => (
                <div key={index} style={getAssetStyle(asset)}>
                {asset.text}
                </div>
            ))}
        </div>
    )
}
