import TrueFalseQuizClearPageStyle from './TrueFalseQuizClearPage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from '../../hooks/useSendGameMessage';
import { useEffect,useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseQuizClearPage = ({ navigateTo, backgroundImage,setCurrentStepOnMap }) => {
    const reset=()=>{
        setCurrentStepOnMap(2)
        navigateTo('map')
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const { sendMessage }=useSendGameMessage()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 7});
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

    // 找出 sceneId 為 7 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 7) || [];

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
            <button className={`${TrueFalseQuizClearPageStyle.imageButton} ${buttonDisabled&&TrueFalseQuizClearPageStyle.buttonDisabled}`} 
                disabled={buttonDisabled}
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
