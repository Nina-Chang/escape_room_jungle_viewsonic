import React from 'react'
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const WholeGameCompletedPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const ExplanationSection=styled.div`
        position: absolute;
        top:5%;
        left: 50%;
        transform: translate(-50%);
    `

    const ExplanationText=styled.span`
        width: 1100px;
        position: absolute;
        z-index: 2;
        top:30%;
        left: 50%;
        transform: translate(-50%);
        font-size: 38px;
        font-weight: 700;
        text-align: center;
    `

    const ReturnButton=styled.div`
        position: absolute;
        top:70%;
        left: 50%;
        transform: translateX(-50%);
    `

  return (
    <div className="page-container" style={pageStyle}>
        <ExplanationSection>
            <ExplanationText>{cfg.strings.wholeGameCompletedExplanation || ""}</ExplanationText>
            <img src='/images/object/jungle_escape_clue_frame.png' style={{transform:'scale(1.3,1)'}} alt="jungle_escape_clue_frame"/>
            <ReturnButton>
                <img src='/images/object/jungle_escape_home_button.png' alt="jungle_escape_clue_frame" onClick={()=>navigateTo('start')}/>
            </ReturnButton>
        </ExplanationSection>
    </div>
  )
}
