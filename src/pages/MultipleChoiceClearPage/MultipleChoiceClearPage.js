import { useEffect, useState } from 'react'
import MultipleChoiceClearPageStyle from './MultipleChoiceClearPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';
import useClickAnimation from '../../hooks/useClickAnimation'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const MultipleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const reset=()=>{
        navigateTo('map')
        setCurrentStepOnMap(4)
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const [isPicReveal, setIsPicReveal] = useState(false)
    const { sendMessage }=useSendGameMessage()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 11});
    }, [sendMessage]);

    useEffect(()=>{
        const handleEnded = () => setButtonDisabled(false);
        const audioPlayer=new Audio(cfg.sounds.findItems || './sounds/find items.mp3')
        audioPlayer.volume=0.316
        audioPlayer.play().catch((e)=>console.log('Audio Failed',e))
        audioPlayer.addEventListener('ended',handleEnded)
    
        return () => {
            audioPlayer.removeEventListener('ended',handleEnded);
            audioPlayer.pause();
            audioPlayer.src = ""; // 釋放記憶體
        };
    },[])

    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    // 找出 sceneId 為 11 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 11) || [];

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

    return (
        <div className="page-container" style={pageStyle}>
            <div className={MultipleChoiceClearPageStyle.explanationSection}>
                <div className={MultipleChoiceClearPageStyle.explanationTextFirstLine}>You found...</div>
                <div className={MultipleChoiceClearPageStyle.explanationTextSecondLine}>A Photo!</div>
                <img src='./images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={MultipleChoiceClearPageStyle.clueSection}>
                <button onClick={()=>setIsPicReveal(true)}>
                    {
                        isPicReveal?
                        <img src='./images/object/jungle_escape_photo02.png' alt="jungle_escape_photo02" loading="lazy" decoding="async"/>
                        :<img src='./images/object/jungle_escape_photo01.png' alt="jungle_escape_photo02" loading="lazy" decoding="async"/>
                    }
                </button>
                <img src='./images/object/jungle_escape_camera.png' alt="jungle_escape_camera" loading="lazy" decoding="async"/>
            </div>
            <button 
            disabled={buttonDisabled}
            onMouseEnter={() => setButtonScale(1.1)}
            onMouseLeave={() => setButtonScale(1)}
            style={{transform: `translateX(-50%) scale(${buttonScale})`}}
            className={`${MultipleChoiceClearPageStyle.imageButton} ${buttonDisabled&&MultipleChoiceClearPageStyle.buttonDisabled}`} 
            onClick={()=>handleClickAnimation()}>
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
