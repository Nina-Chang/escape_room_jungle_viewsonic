import React from 'react'
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const SingleSelectionCompletedPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const ExplanationSection=styled.div`
        position: absolute;
        top:5%;
        left:50%;
        transform: translateX(-50%);
    `

    const ExplanationTextOne=styled.span`
        position: absolute;
        top:17%;
        left:50%;
        transform: translateX(-50%);
        font-size: 50px;
        font-weight: 600;
    `

    const ExplanationTextTwo=styled.span`
        position: absolute;
        top:42%;
        left:50%;
        transform: translateX(-50%);
        font-size: 60px;
        font-weight: 800;
    `

    const ClueSection=styled.div`
        position: absolute;
        top:30%;
        left:50%;
        transform: translateX(-50%);
    `

    const ButtonSection=styled.div`
        position: absolute;
        top:80%;
        left:50%;
        transform: translateX(-50%);
    `

    return (
        <div className="page-container" style={pageStyle}>
            <ExplanationSection>
                <ExplanationTextOne>You found...</ExplanationTextOne>
                <ExplanationTextTwo>A Photo!</ExplanationTextTwo>
                <img src='/images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed"/>
            </ExplanationSection>
            <ClueSection>
                <img src='/images/object/jungle_escape_walkie_talkie.png' alt="jungle_escape_walkie_talkie"/>
            </ClueSection>
            <ButtonSection>
                <button className='image-button'>
                    <img src='/images/object/jungle_escape_nect_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
                </button>
            </ButtonSection>
        </div>
    )
}
