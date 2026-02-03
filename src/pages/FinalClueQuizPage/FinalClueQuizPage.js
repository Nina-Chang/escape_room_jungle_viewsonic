import { useState } from 'react'
import FinalClueQuizPageStyle from './FinalClueQuizPage.module.css'

export const FinalClueQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const initialButtonScale={A:1,B:1,C:1}
    const [buttonScale, setButtonScale] = useState(initialButtonScale);
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    const problem=[
        {
            question: 'Who was the first member to go missing?',
            option:[],
            optionImageSrc:['./images/object/jungle_escape_id_card01.png','./images/object/jungle_escape_id_card02.png','./images/object/jungle_escape_id_card03.png'],
            answer:'Fynn.B'
        },
        {
            question: 'Where did you find the walkie talkie?',
            option:['Mermaid Cave','Swamp Trap','Stone Maze'],
            optionImageSrc:['./images/object/jungle_escape_mermaid_cave.png','./images/object/jungle_escape_swamp_trap.png','./images/object/jungle_escape_stone_maze.png'],
            answer:'Swamp Trap'
        },
        {
            question: 'What specific clues finally led you to this discovery?',
            option:['A bag','A sign','A photo'],
            optionImageSrc:['./images/object/jungle_escape_bag.png','./images/object/jungle_escape_sjgn.png','./images/object/jungle_escape_photo01.png'],
            answer:'A photo'
        },
    ]

    const handleClick=async(btn,func)=>{
        setButtonScale({...initialButtonScale,[btn]:0.9});
        await new Promise(resolve => setTimeout(resolve, 100));
        setButtonScale({...initialButtonScale,[btn]:1});
        await new Promise(resolve => setTimeout(resolve, 500));
        func();
    }

    const handleNavigateToWrongPath=(currentIndex)=>{
        setWrongPathBackTo({page:'final clue quiz',problemIndex:currentIndex})
        navigateTo('wrong path')
    }

    const handleGameSuccess=()=>{
        setCurrentProblemIndex(0)
        navigateTo('game success')
    }


  return (
    <div className="page-container" style={pageStyle}>
        <div className={FinalClueQuizPageStyle.quizSection}>
            <div className={FinalClueQuizPageStyle.explanationSection}>Assemble the clues you've gathered. Only then will you uncover the truth and complete the rescue.</div>
            <img src='./images/object/jungle_escape_question_frame03.png' alt="jungle_escape_question_frame03" loading="lazy" decoding="async"/>

            {
                currentProblemIndex===0
                &&
                <>
                    <div className={FinalClueQuizPageStyle.questionText}>{problem[0].question}</div>
                    <div className={FinalClueQuizPageStyle.answerOptionSection}>
                        <img 
                            onMouseEnter={() => setButtonScale(prev => ({...prev, A:1.05}))}
                            onMouseLeave={() => setButtonScale(prev => ({...prev, A:1}))}
                            style={{transform: `scale(${buttonScale.A || 1})`}} 
                            src={problem[0].optionImageSrc[0]} 
                            alt="jungle_escape_id_card01" 
                            onClick={()=>handleClick('A',()=>setCurrentProblemIndex(1))} loading="lazy" decoding="async"/>
                        <img 
                            onMouseEnter={() => setButtonScale(prev => ({...prev, B:1.05}))}
                            onMouseLeave={() => setButtonScale(prev => ({...prev, B:1}))}
                            style={{transform: `scale(${buttonScale.B || 1})`}}
                            src={problem[0].optionImageSrc[1]} 
                            alt="jungle_escape_id_card02" 
                            onClick={()=>handleClick('B',()=>handleNavigateToWrongPath(0))} loading="lazy" decoding="async"/>
                        <img onMouseEnter={() => setButtonScale(prev => ({...prev, C:1.05}))}
                            onMouseLeave={() => setButtonScale(prev => ({...prev, C:1}))}
                            style={{transform: `scale(${buttonScale.C || 1})`}} 
                            src={problem[0].optionImageSrc[2]} 
                            alt="jungle_escape_id_card03" 
                            onClick={()=>handleClick('C',()=>handleNavigateToWrongPath(0))} loading="lazy" decoding="async"/>    
                    </div>
                </>
            }

            {
                currentProblemIndex===1
                &&
                <>
                    <div className={FinalClueQuizPageStyle.questionText}>{problem[1].question}</div>
                    <div className={FinalClueQuizPageStyle.answerOptionWithTextSection}>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[1].option[0]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, A:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, A:1}))}
                                style={{transform: `scale(${buttonScale.A || 1})`}} 
                                src={problem[1].optionImageSrc[0]} 
                                alt="jungle_escape_id_card01"  
                                onClick={()=>handleClick('A',()=>handleNavigateToWrongPath(1))} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[1].option[1]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, B:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, B:1}))}
                                style={{transform: `scale(${buttonScale.B || 1})`}} 
                                src={problem[1].optionImageSrc[1]} 
                                alt="jungle_escape_id_card02" 
                                onClick={()=>handleClick('B',()=>setCurrentProblemIndex(2))} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[1].option[2]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, C:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, C:1}))}
                                style={{transform: `scale(${buttonScale.C || 1})`}} 
                                src={problem[1].optionImageSrc[2]} 
                                alt="jungle_escape_id_card03" onClick={()=>handleClick('C',()=>handleNavigateToWrongPath(1))} loading="lazy" decoding="async"/>    
                        </div>
                    </div>
                </>
            }

            {
                currentProblemIndex===2
                &&
                <>
                    <div className={FinalClueQuizPageStyle.questionText}>{problem[2].question}</div>
                    <div className={FinalClueQuizPageStyle.answerOptionWithTextSection}>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[2].option[0]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, A:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, A:1}))}
                                style={{transform: `scale(${buttonScale.A || 1})`}}
                                src={problem[2].optionImageSrc[0]} 
                                alt="jungle_escape_id_card01"  
                                onClick={()=>handleClick('A',()=>handleNavigateToWrongPath(2))} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[2].option[1]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, B:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, B:1}))}
                                style={{transform: `scale(${buttonScale.B || 1})`}} 
                                src={problem[2].optionImageSrc[1]} 
                                alt="jungle_escape_id_card02" 
                                onClick={()=>handleClick('B',()=>handleNavigateToWrongPath(2))} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[2].option[2]}</div>
                            <img 
                                onMouseEnter={() => setButtonScale(prev => ({...prev, C:1.05}))}
                                onMouseLeave={() => setButtonScale(prev => ({...prev, C:1}))}
                                style={{transform: `scale(${buttonScale.C || 1})`}} 
                                src={problem[2].optionImageSrc[2]} 
                                className={FinalClueQuizPageStyle.answerCustomStyle} alt="jungle_escape_id_card03" width={250} 
                                onClick={()=>handleClick('C',()=>handleGameSuccess())} loading="lazy" decoding="async"/>    
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}
