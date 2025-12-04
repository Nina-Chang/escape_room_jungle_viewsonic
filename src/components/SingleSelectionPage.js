import React from 'react'
import styled from 'styled-components';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const SingleSelectionPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const QuestionSection=styled.div`
        position: absolute;
        left:50%;
        transform: translateX(-50%);
    `

    const ProblemIndexText=styled.span`
        position: absolute;
        top:25%;
        left:50%;
        color:#000;
        font-size: 40px;
        font-weight: 700;
        transform: translateX(-50%);
    `

    const ProblemText=styled.span`
        width: 720px;
        position: absolute;
        top:33%;    
        left:50%;
        transform: translateX(-50%);
        color:#000;
        font-size: 40px;
        font-weight: 700;
    `

    const AnswerSection=styled.div`
        position: absolute;
        top:45%;
        left:54%;
        transform: translateX(-50%);

        & button {
            margin: 8px 0;
        }
    `

    const buttonStyle={
        position: 'relative',
    }

    const AnswerText=styled.span`
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        font-size: 36px;
        font-weight: 700;
    `


  return (
    <div className="page-container" style={pageStyle}>
        <QuestionSection>
            <img src='/images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" />
        </QuestionSection>
        <ProblemIndexText>
            1/9
        </ProblemIndexText>
        <ProblemText>
            {cfg.questions[1]?.questions[0]?.question || `Is the object you found a compass?`}
        </ProblemText>
        <AnswerSection>
            <button className='image-button' style={buttonStyle}  onClick={()=>navigateTo('wrong place')}>
                <AnswerText>{cfg.questions[1]?.questions[0]?.options[0] || `A`}</AnswerText>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 1" />
            </button>
            <button className='image-button' style={buttonStyle}  onClick={()=>navigateTo('wrong place')}>
                <AnswerText>{cfg.questions[1]?.questions[0]?.options[1] || `B`}</AnswerText>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 2" />
            </button>
            <button className='image-button' style={buttonStyle} onClick={()=>navigateTo('single selection completed')}>
                <AnswerText>{cfg.questions[1]?.questions[0]?.options[2] || `C`}</AnswerText>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 2" />
            </button>
        </AnswerSection>
    </div>
  )
}
