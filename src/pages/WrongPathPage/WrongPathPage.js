import { useState } from 'react'
import WrongPathPageStyle from './WrongPathPage.module.css'

export const WrongPathPage = ({ navigateTo, backgroundImage,backTo,setCurrentProblemIndex }) => {
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
      navigateTo(backTo.page)
      setCurrentProblemIndex(backTo.problemIndex)
    }

  return (
    <div className="page-container" style={pageStyle}>
        <div className={WrongPathPageStyle.titleText}>
            You've lost your way in the jungle...
        </div>
        <button className={WrongPathPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translateX(-50%) scale(${buttonScale})`}}
         onClick={handleClick}>
            <img src='./images/object/jungle_escape_again_button.png' alt="Return to Map"  loading="lazy" decoding="async"/>
        </button>
    </div>
  )
}
