import FinalClueQuizPageStyle from './FinalClueQuizPage.module.css'

export const FinalClueQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };
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
            <img src='/images/object/jungle_escape_question_frame03.png' alt="jungle_escape_question_frame03" loading="lazy" decoding="async"/>

            {
                currentProblemIndex===0
                &&
                <>
                    <div className={FinalClueQuizPageStyle.questionText}>{problem[0].question}</div>
                    <div className={FinalClueQuizPageStyle.answerOptionSection}>
                        <img src={problem[0].optionImageSrc[0]} alt="jungle_escape_id_card01" onClick={()=>setCurrentProblemIndex(1)} loading="lazy" decoding="async"/>
                        <img src={problem[0].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>handleNavigateToWrongPath(0)} loading="lazy" decoding="async"/>
                        <img src={problem[0].optionImageSrc[2]} alt="jungle_escape_id_card03" onClick={()=>handleNavigateToWrongPath(0)} loading="lazy" decoding="async"/>    
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
                            <img src={problem[1].optionImageSrc[0]} alt="jungle_escape_id_card01"  onClick={()=>handleNavigateToWrongPath(1)} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[1].option[1]}</div>
                            <img src={problem[1].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>setCurrentProblemIndex(2)} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[1].option[2]}</div>
                            <img src={problem[1].optionImageSrc[2]} alt="jungle_escape_id_card03" onClick={()=>handleNavigateToWrongPath(1)} loading="lazy" decoding="async"/>    
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
                            <img src={problem[2].optionImageSrc[0]} alt="jungle_escape_id_card01"  onClick={()=>handleNavigateToWrongPath(2)} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[2].option[1]}</div>
                            <img src={problem[2].optionImageSrc[1]} alt="jungle_escape_id_card02" onClick={()=>handleNavigateToWrongPath(2)} loading="lazy" decoding="async"/>
                        </div>
                        <div className={FinalClueQuizPageStyle.answerOptionWithText}>
                            <div className={FinalClueQuizPageStyle.answerText}>{problem[2].option[2]}</div>
                            <img src={problem[2].optionImageSrc[2]} className={FinalClueQuizPageStyle.answerCustomStyle} alt="jungle_escape_id_card03" width={250} onClick={()=>{handleGameSuccess()}} loading="lazy" decoding="async"/>    
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}
