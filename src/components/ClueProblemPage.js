import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';


const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const ClueProblemPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };
    const [problemIndex,setProblemIndex]=useState(0)
    const problem=[
        {
            question: 'Who was the first member to go missing?',
            option:[],
            optionImageSrc:['images/object/jungle_escape_id_card01.png','images/object/jungle_escape_id_card02.png','images/object/jungle_escape_id_card03.png'],
            answer:'Fynn.B'
        },
        {
            question: 'Where did you find the walkie talkie?',
            option:['Mermaid Cave','Swamp Trap','Stone Maze'],
            optionImageSrc:['images/object/jungle_escape_mermaid_cave.png','images/object/jungle_escape_swamp_trap.png','images/object/jungle_escape_stone_maze.png'],
            answer:'Swamp Trap'
        },
        {
            question: 'What specific clues finally led you to this discovery?',
            option:['A bag','A sign','A photo'],
            optionImageSrc:['images/object/jungle_escape_bag.png','images/object/jungle_escape_sjgn.png','images/object/jungle_escape_photo01.png'],
            answer:'A photo'
        },
    ]

    const ProblemSection=styled.div`
        position: absolute;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
    `

    const ExplanationSection=styled.div`
        width: 1000px;
        position: absolute; 
        top:3%;
        left: 15%;
        font-size: 36px;
        font-weight: 700;
        text-align: center;
    `

    const QuestionSection=styled.div`
        width: 1000px;
        position: absolute;
        top:25%;
        left:50%;
        transform: translateX(-50%);
        font-size: 36px;
        font-weight: 700;
        text-align: center;
    `

    const AnswerSection=styled.div`
        position: absolute;
        top:35%;
        left:50%;
        transform: translateX(-50%);
        & img {
            margin: 0 30px; 
            cursor: pointer;
        }
        display: flex;
    `

    const AnswerWithTextSection=styled.div`
        position: absolute;
        top:45%;
        left:50%;
        transform: translateX(-50%);
        & img {
            margin: 0 100px; 
            cursor: pointer;
        }
        display: flex;
        text-align: center;
    `

    const AnswerOptionSection=styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        font-weight:600;
    `

    const AnswerText=styled.span`
        margin-bottom: 25px;
    `

    const photoStyle={
        rotate:'-12deg',

    }

  return (
    <div className="page-container" style={pageStyle}>
        <ProblemSection>
            <ExplanationSection>Assemble the clues you've gathered. Only then will you uncover the truth and complete the rescue.</ExplanationSection>
            <img src='/images/object/jungle_escape_question_frame03.png' alt="jungle_escape_question_frame03" />

            {
                problemIndex===0
                &&
                <>
                    <QuestionSection>{problem[0].question}</QuestionSection>
                    <AnswerSection>
                        <img src={problem[0].optionImageSrc[0]} alt="jungle_escape_id_card01" onClick={()=>setProblemIndex(1)} />
                        <img src={problem[0].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>navigateTo('wrong place')}/>
                        <img src={problem[0].optionImageSrc[2]} alt="jungle_escape_id_card03" onClick={()=>navigateTo('wrong place')}/>    
                    </AnswerSection>
                </>
            }

            {
                problemIndex===1
                &&
                <>
                    <QuestionSection>{problem[1].question}</QuestionSection>
                    <AnswerWithTextSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[1].option[0]}</AnswerText>
                            <img src={problem[1].optionImageSrc[0]} alt="jungle_escape_id_card01"  onClick={()=>navigateTo('wrong place')} />
                        </AnswerOptionSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[1].option[1]}</AnswerText>
                            <img src={problem[1].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>setProblemIndex(2)}/>
                        </AnswerOptionSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[1].option[2]}</AnswerText>
                            <img src={problem[1].optionImageSrc[2]} alt="jungle_escape_id_card03" onClick={()=>navigateTo('wrong place')}/>    
                        </AnswerOptionSection>
                    </AnswerWithTextSection>
                </>
            }

            {
                problemIndex===2
                &&
                <>
                    <QuestionSection>{problem[2].question}</QuestionSection>
                    <AnswerWithTextSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[2].option[0]}</AnswerText>
                            <img src={problem[2].optionImageSrc[0]} alt="jungle_escape_id_card01"  onClick={()=>navigateTo('wrong place')} />
                        </AnswerOptionSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[2].option[1]}</AnswerText>
                            <img src={problem[2].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>navigateTo('wrong place')}/>
                        </AnswerOptionSection>
                        <AnswerOptionSection>
                            <AnswerText>{problem[2].option[2]}</AnswerText>
                            <img src={problem[2].optionImageSrc[2]} style={photoStyle} alt="jungle_escape_id_card03" width={250} onClick={()=>navigateTo('wrong place')}/>    
                        </AnswerOptionSection>
                    </AnswerWithTextSection>
                </>
            }
        </ProblemSection>
    </div>
  )
}
