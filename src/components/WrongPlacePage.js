import React from 'react'
import styled from 'styled-components';

export const WrongPlacePage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const TitleText=styled.div`
        width:1250px;
        height: 240px;
        position: absolute;
        top:40%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 110px;
        font-weight: 800;
        color:#042B17;
        text-align: center;
    `

    const buttonStyle={
        position: 'absolute',
        top:'60%',
        left:'50%',
        transform:'translateX(-50%)',
    }

  return (
    <div className="page-container" style={pageStyle}>
        <TitleText>
            You've lost your way in the jungle...
        </TitleText>
        <button className='image-button' style={buttonStyle}>
            <img src='/images/object/jungle_escape_again_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
        </button>
    </div>
  )
}
