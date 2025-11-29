import React from 'react'
import SoundButton from './SoundButton';
import styled from 'styled-components';
const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const PreviousStoryPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const imageButton={
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',

        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translate(-50%, -50%)',
    }

    const SignalText=styled.span`
        position: absolute;
        top:10%;
        left:50%;
        transform: translateX(-50%);
        font-size: 50px;
        font-weight:700;
        color: red;
    `

    const CoordinatesText=styled.span`
        width: 260px;
        height: 102px;
        text-align: end;
        position: absolute;
        top:10%;
        right:6%;
        font-size: 40px;
        color: white;
        letter-spacing: 1px;
    `

    const ConversationText=styled.span`
        width:1189px;
        height: 137px;
        position: absolute;
        bottom:15%;
        left:50%;
        transform: translateX(-50%);
        background-color: white;
        font-size: 50px;
        font-weight: 700;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;
    `

  return (
    <div className="page-container" style={pageStyle}>
        <SignalText>Weak signal...</SignalText>
        <CoordinatesText>3°28'26.6"S<br/>62°12'12.7"W</CoordinatesText>
        <SoundButton style={imageButton} onClick={() => navigateTo('instructions')}>
            <img src={cfg.images?.btnNext || 'images/object/jungle_escape_nect_button.png'} alt="Continue" />
        </SoundButton>
        <ConversationText>
            {cfg.strings.previousStoryConversation || "[Team Member]:Hello? Can anyone hear me? We're lost...battery dying!"}
        </ConversationText>
    </div>
  )
}
