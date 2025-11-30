import React from 'react'
import styled from 'styled-components';
import SoundButton from './SoundButton';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseItemPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const ProblemSection=styled.div`
        position: absolute;
        left:52%;
    `

    const ProblemIndexText=styled.span`
        width: 570px;
        position: absolute;
        top:10%;
        left:60%;
        color:#000;
        font-size: 40px;
        font-weight: 700;
        text-align: center;
    `


    const ProblemText=styled.span`
        width: 570px;
        position: absolute;
        top:20%;    
        left:60%;
        color:#000;
        font-size: 40px;
        font-weight: 700;
    `

    const TrueBtnIcon=styled.span`
        position: absolute;
        top:45%;
        left:60%;
    `
    const FalseBtnIcon=styled.span`
        position: absolute;
        top:45%;
        left:75%;
    `

  return (
    <div className="page-container" style={pageStyle}>
        <ProblemSection>
            <img src='/images/object/jungle_escape_question_frame01.png' alt="jungle_escape_question_frame01" />
        </ProblemSection>
        <ProblemIndexText>
            1/9
        </ProblemIndexText>
        <ProblemText>
            {cfg.questions[0]?.questions[0]?.question || `Is the object you found a compass?`}
        </ProblemText>
        <TrueBtnIcon>
            <SoundButton className='image-button'>
                <img src='/images/object/jungle_escape_true.png' alt="jungle_escape_true" onClick={()=>navigateTo('map')}/>
            </SoundButton>
        </TrueBtnIcon>
        <FalseBtnIcon>
            <SoundButton className='image-button'>
                <img src='/images/object/jungle_escape_false.png' alt="jungle_escape_false" onClick={()=>navigateTo('map')}/>
            </SoundButton>
        </FalseBtnIcon>
    </div>
  )
}
