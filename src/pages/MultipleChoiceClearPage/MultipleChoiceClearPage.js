import { useEffect, useState } from 'react'
import MultipleChoiceClearPageStyle from './MultipleChoiceClearPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';
import useClickAnimation from '../../hooks/useClickAnimation'
import usePageAssets from '../../hooks/usePageAssets'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const MultipleChoiceClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const reset=()=>{
        navigateTo('map')
        setCurrentStepOnMap(4)
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const [isPicReveal, setIsPicReveal] = useState(false)
    const { sendMessage }=useSendGameMessage()
    const pageAssets = usePageAssets(cfg.assets, 9);
    const [buttonHidden, setButtonHidden] = useState(true)

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

    return (
        <div className="page-container" style={pageStyle}>
            <div className={MultipleChoiceClearPageStyle.explanationSection}>
                <div className={MultipleChoiceClearPageStyle.explanationTextFirstLine}>You found...</div>
                <div className={MultipleChoiceClearPageStyle.explanationTextSecondLine}>A Photo!</div>
                <img src='./images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed" loading="lazy" decoding="async"/>
            </div>
            <div className={MultipleChoiceClearPageStyle.clueSection}>
                <button onClick={()=>{
                    setIsPicReveal(true)
                    setButtonHidden(false)
                }}>
                    {
                        isPicReveal?
                        <img src='./images/object/jungle_escape_photo02.png' alt="jungle_escape_photo02" loading="lazy" decoding="async"/>
                        :<img src='./images/object/jungle_escape_photo01.png' alt="jungle_escape_photo02" loading="lazy" decoding="async"/>
                    }
                </button>
                <img src='./images/object/jungle_escape_camera.png' alt="jungle_escape_camera" loading="lazy" decoding="async"/>
            </div>
            <button 
            onMouseEnter={() => setButtonScale(1.1)}
            onMouseLeave={() => setButtonScale(1)}
            style={{transform: `translateX(-50%) scale(${buttonScale})`}}
            className={`${MultipleChoiceClearPageStyle.imageButton} ${buttonHidden&&MultipleChoiceClearPageStyle.buttonHidden}`} 
            onClick={()=>handleClickAnimation()}>
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
