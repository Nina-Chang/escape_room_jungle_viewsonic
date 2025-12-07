import WrongPathPageStyle from './WrongPathPage.module.css'

export const WrongPathPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={WrongPathPageStyle.titleText}>
            You've lost your way in the jungle...
        </div>
        <button className={WrongPathPageStyle.imageButton}>
            <img src='/images/object/jungle_escape_again_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
        </button>
    </div>
  )
}
