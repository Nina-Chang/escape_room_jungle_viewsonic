import WrongPathPageStyle from './WrongPathPage.module.css'

export const WrongPathPage = ({ navigateTo, backgroundImage,backTo,setCurrentProblemIndex }) => {
    const pageStyle = { 
      backgroundImage: `url(${backgroundImage})`,
      width:'1920px',
      height:'1080px',
      loading: 'eager'
    };

    const handleBackTo=()=>{
      navigateTo(backTo.page)
      setCurrentProblemIndex(backTo.problemIndex)
    }

  return (
    <div className="page-container" style={pageStyle}>
        <div className={WrongPathPageStyle.titleText}>
            You've lost your way in the jungle...
        </div>
        <button className={WrongPathPageStyle.imageButton}>
            <img src='/images/object/jungle_escape_again_button.png' alt="Return to Map" onClick={()=>{handleBackTo()}} loading="lazy" decoding="async"/>
        </button>
    </div>
  )
}
