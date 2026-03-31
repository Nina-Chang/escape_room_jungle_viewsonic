import WrongPathPageStyle from './WrongPathPage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from '../../hooks/useSendGameMessage';
import usePageAssets from '../../hooks/usePageAssets';
import { useEffect,useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const WrongPathPage = ({ navigateTo, backgroundImage,backTo,setCurrentProblemIndex }) => {
    const reset=()=>{
      navigateTo(backTo.page)
      setCurrentProblemIndex(backTo.problemIndex)
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const { sendMessage }=useSendGameMessage()
    const pageAssets = usePageAssets(cfg.assets, 5);
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
      // 當這一頁載入時，立刻通知外層
      sendMessage({ sceneId: 5});
    }, [sendMessage]);

    useEffect(()=>{
      const handleEnded = () => setButtonDisabled(false);
      const audioPlayer=new Audio(cfg.sounds.wrongPath || './sounds/wrong_path.wav')
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

  return (
    <div className="page-container" style={pageStyle}>
        <div className={WrongPathPageStyle.titleText}>
            You've lost your way in the jungle...
        </div>
        <button className={`${WrongPathPageStyle.imageButton} ${buttonDisabled&&WrongPathPageStyle.buttonDisabled}`}
          disabled={buttonDisabled}
          onMouseEnter={() => setButtonScale(1.1)}
          onMouseLeave={() => setButtonScale(1)}
          style={{transform: `translateX(-50%) scale(${buttonScale})`}}
          onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_again_button.png' alt="Return to Map"  loading="lazy" decoding="async"/>
        </button>
        {pageAssets.map((asset, index) => (
            <div key={asset.id || index} style={asset.style}>
            {asset.text}
            </div>
        ))}
    </div>
  )
}
