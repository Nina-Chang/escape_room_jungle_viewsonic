import WrongPathPageStyle from './WrongPathPage.module.css'
import useClickAnimation from '../../components/useClickAnimation';

export const WrongPathPage = ({ navigateTo, backgroundImage,backTo,setCurrentProblemIndex }) => {
  const reset=()=>{
    navigateTo(backTo.page)
    setCurrentProblemIndex(backTo.problemIndex)
  }
  const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)

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
        <button className={WrongPathPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translateX(-50%) scale(${buttonScale})`}}
         onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_again_button.png' alt="Return to Map"  loading="lazy" decoding="async"/>
        </button>
    </div>
  )
}
