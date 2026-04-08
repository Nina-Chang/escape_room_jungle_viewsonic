import React, { useEffect, useState,useRef } from 'react'
import SingleChoiceClearPageStyle from './SingleChoiceClearPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';
import useClickAnimation from '../../hooks/useClickAnimation';
import usePageAssets from '../../hooks/usePageAssets';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};
export const SingleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap,bgmAudio }) => {
    const reset=()=>{
        setCurrentStepOnMap(3)
        navigateTo('map')
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const { sendMessage }=useSendGameMessage()
    const pageAssets = usePageAssets(cfg.assets, 9);
    const [itemDisabled, setItemDisabled] = useState(false)
    const [buttonHidden, setButtonHidden] = useState(true)
    const walkieTalkieRef = useRef(null);

    useEffect(() => {
        walkieTalkieRef.current = new Audio(cfg.sounds.walkieTalkie || "./sounds/walkie_talkie.mp3");
        
        const audio = walkieTalkieRef.current;

        sendMessage({ sceneId: 9 });

        // 卸載（換頁）時執行
        return () => {
            audio.pause();           // 暫停播放
            audio.src = "";          // 清除原始路徑
            audio.load();            // 強制釋放資源
        };
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

    const handleAudioPlay=()=>{
        if (itemDisabled|| !walkieTalkieRef.current) return;
        setItemDisabled(true)
        walkieTalkieRef.current.play(e => {
            console.error("Audio play failed", e)
            setItemDisabled(false)
        });
        walkieTalkieRef.current.addEventListener('ended',()=>{
            setItemDisabled(false)
            setButtonHidden(false)
        })
    }

    return (
        <div className="page-container" style={pageStyle}>
            <div className={SingleChoiceClearPageStyle.explanationSection}>
                <span className={SingleChoiceClearPageStyle.explanationTextFirstLine}>You found...</span>
                <span className={SingleChoiceClearPageStyle.explanationTextSecondLine}>A Walkie Talkie!</span>
                <img src='./images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={`${SingleChoiceClearPageStyle.clueSection} ${itemDisabled&&SingleChoiceClearPageStyle.itemDisabled}`}> 
                <img src='./images/object/jungle_escape_walkie_talkie.png' alt="jungle_escape_walkie_talkie" loading="lazy" decoding="async"/>
                <span className={SingleChoiceClearPageStyle.clueText}>Playback Message</span>
                <span style={{ cursor: itemDisabled ? 'not-allowed' : 'pointer' }} onClick={()=>{handleAudioPlay()}} className={SingleChoiceClearPageStyle.clickButton}></span>
            </div>
            <button 
            className={`${SingleChoiceClearPageStyle.imageButton} ${buttonHidden&&SingleChoiceClearPageStyle.buttonHidden}`} 
            onMouseEnter={() => setButtonScale(1.1)}
            onMouseLeave={() => setButtonScale(1)}
            style={{transform: `translateX(-50%) scale(${buttonScale})`}}
            onClick={handleClickAnimation}>
                <img src='./images/object/jungle_escape_nect_button.png' alt="Return to Map" loading="lazy" decoding="async"/>
            </button>
            {pageAssets.map((asset) => (
                <div key={asset.RawId || asset.id} style={asset.style}>
                    {asset.Type === 'Text' ? 
                    (
                        asset.displayContent
                    ) 
                    : (
                        <img 
                            src={asset.displayContent} 
                            alt="game-asset" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                display: 'block' 
                            }} 
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
