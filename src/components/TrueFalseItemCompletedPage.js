import React from 'react'
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseItemCompletedPage = ({ navigateTo, backgroundImage }) => {
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

    const ClueTextOne=styled.span`
        position: absolute;
        top:14%;
        left: 33%;
        font-size: 20px;
        font-weight: 700;
        rotate: 4deg;
    `

    const ClueTextTwo=styled.span`
        width: 330px;
        position: absolute;
        top:27%;
        left: 8%;
        font-size: 22px;
        font-weight: 700;
        rotate: 4deg;
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
                <ExplanationTextTwo>A Notebook!</ExplanationTextTwo>
                <img src='/images/object/jungle_escape_clue_frame.png' alt="jungle_escape_true_false_completed"/>
            </ExplanationSection>
            <ClueSection>
                <ClueTextOne>DATE: 08/16</ClueTextOne>
                <ClueTextTwo>We lost comms with Fynn.B. Last heard he was going toward the marsh...</ClueTextTwo>
                <img src='/images/object/jungle_escape_notebook.png' alt="jungle_escape_notebook"/>
            </ClueSection>
            <ButtonSection>
                <button className='image-button'>
                    <img src='/images/object/jungle_escape_nect_button.png' alt="Return to Map" onClick={()=>navigateTo('map')}/>
                </button>
            </ButtonSection>
        </div>
    )
}
