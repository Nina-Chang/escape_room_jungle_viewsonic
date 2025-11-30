import React from 'react'
import SoundButton from './SoundButton';
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const InstructionsPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const imageButton={
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',

        position: 'absolute',
        top: '72%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
    
    const InstructionSection=styled.div`
        width:1100px;
        height: 600px;
        background-color: white;
        border-radius: 60px;
        position: absolute;
        top:52%;
        left:50%;
        transform: translate(-50%,-50%);
        border: 20px solid #F9B93B;
    `

    const AvatarsSection=styled.div`
        width: 150px;
        height: 150px;
        border-radius: 100px;
        border: 15px solid #F9B93B;
        background-color: #407338;
        position: absolute;
        top:-15%;
        left:50%;
        transform: translateX(-50%);
        overflow: hidden;
    `

    const AvatarsIconTop=styled.div`
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background-color: #C1DFBB;
        position: absolute;
        top:15%;
        left:30%;
    `
    const AvatarsIconBottom=styled.div`
        width: 90px;
        height: 40px;
        border-top-left-radius: 70px;
        border-top-right-radius: 70px;
        background-color: #C1DFBB;
        position: absolute;
        top:45%;
        left:20%;

        &::after{
            content: '';
            width: 90px;
            height: 35px;
            border-bottom-left-radius: 500px;
            border-bottom-right-radius: 500px;
            background-color: #C1DFBB;
            position: absolute;
            top:65%;

        }
    `

    const InstructionsText=styled.div`
        width: 1100px;
        height: 500px;
        position: absolute;
        top:5%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 45px;
        font-weight: 700;
    `

    const BtnText=styled.span`
        width: 352px;
        position: absolute; 
        top:45%;
        left:50%;
        font-size: 40px;
        font-weight:700;
        transform: translate(-50%,-50%);
    `

  return (
    <div className="page-container" style={pageStyle}>
        <InstructionSection>
            <AvatarsSection>
                <AvatarsIconTop></AvatarsIconTop>
                <AvatarsIconBottom></AvatarsIconBottom>
            </AvatarsSection>
            <InstructionsText>
                {cfg.strings.instructionsText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`}
            </InstructionsText>
        </InstructionSection>
        <SoundButton style={imageButton} onClick={()=>navigateTo('map')}>
            <img src='images/object/jungle_escape_mission_button.png' alt="Continue" />
            <BtnText>Start Mission</BtnText>
        </SoundButton>
    </div>
  )
}
