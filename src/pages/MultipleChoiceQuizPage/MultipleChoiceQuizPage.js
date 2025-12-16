import React, { useState, useMemo } from 'react';
import SoundButton from '../../components/SoundButton';
import MultipleChoiceQuizPageStyle from './MultipleChoiceQuizPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const MultipleChoiceQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const [buttonHidden, setButtonHidden] = useState(false)
    const initialButtonState=[{button:'A',optionText:'',status:-2},{button:'B',optionText:'',status:-2},{button:'C',optionText:'',status:-2},{button:'D',optionText:'',status:-2}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:already choose -2:not yet to choose
    const pageStyle = { backgroundImage: `url(${backgroundImage})` }

    const trueFalseQuizSum=cfg?.questions[0].questions.length
    const singleChoiceSum=cfg?.questions[1].questions.length
    const multipleChoiceSum=cfg?.questions[2].questions.length
    const totalProblemSum = useMemo(() => cfg?.questions?.reduce((sum, group) => sum + group.questions.length, 0) || 0, [cfg?.questions]);

    const aButtonItem = isCorrect.find(item => item.button === 'A');
    const bButtonItem = isCorrect.find(item => item.button === 'B');
    const cButtonItem = isCorrect.find(item => item.button === 'C');
    const dButtonItem = isCorrect.find(item => item.button === 'D');

    const handleChooseAnswer=(button)=>{
        setIsCorrect(prev =>
            prev.map((item,index) =>
                item.button===button
                ? { ...item, status: -1,optionText:cfg.questions[2]?.questions[currentProblemIndex]?.options[index] }  
                : { ...item, optionText:cfg.questions[2]?.questions[currentProblemIndex]?.options[index] } 
            )
        );
    }

    const reset=()=>{
        setIsCorrect(initialButtonState);
        setButtonHidden(false)
    }

    const handleSubmitAnswer=()=>{
        setButtonHidden(true)
        const choosedItem=isCorrect.filter(item=>item.status===-1).map(item=>item.optionText)
        const correctAnswer=cfg.questions[2].questions[currentProblemIndex].answers|| []
        const isAllCorrect=choosedItem.length===correctAnswer.length && choosedItem.every((item,index)=>item===correctAnswer[index])
        // 更改按鈕狀態
        const updateState=isCorrect.map(item=>{
            if(item.status!==-1){
                return item
            }

            return{
                ...item,
                status:isAllCorrect?1:0
            }
        })
        setIsCorrect(updateState)

        if(isAllCorrect ){// 全對
            // 音效
            const audioPlayer=new Audio(cfg.sounds.correct || '/sounds/correct.mp3')
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                if(currentProblemIndex<multipleChoiceSum-1){
                    setCurrentProblemIndex(currentProblemIndex+1)
                }
                else{
                    navigateTo('multiple choice quiz clear')
                    setCurrentProblemIndex(0)
                }
                reset()
            },500)
        }
        else{
            // 音效
            const audioPlayer=new Audio(cfg.sounds.wrong || '/sounds/wrong.mp3')
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                setWrongPathBackTo({page:'multiple choice quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                reset()
            },500)
        }
    }

    const AnswerBackground = ({ status }) => {
        let imgSrc = '';

        if (status === -1) {// 已選擇
            imgSrc = `/images/object/jungle_escape_multiple_question_answer_hover.png`;
        } else if (status === -2) {// 還沒選
            imgSrc = `/images/object/jungle_escape_multiple_question_answer.png`;
        } else if (status === 1) {// 答對
            imgSrc = `/images/object/jungle_escape_multiple_question_right_answer.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `/images/object/jungle_escape_multiple_question_wrong_answer.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_multiple_question_${status}`} loading="lazy" />
        );
    };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={MultipleChoiceQuizPageStyle.quizSection}>
            <img src='/images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" loading="lazy" />
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionIndexText}>
            {trueFalseQuizSum+singleChoiceSum+currentProblemIndex+1}/{totalProblemSum}
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionText}>
            {cfg.questions[2]?.questions[currentProblemIndex]?.question || `Is the object you found a compass?`}
        </div>
        <div className={MultipleChoiceQuizPageStyle.answerSection}>
            <button className={MultipleChoiceQuizPageStyle.imageButton}  onClick={()=>handleChooseAnswer('A')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[currentProblemIndex]?.options[0] || `A`}</span>
                <AnswerBackground status={aButtonItem.status}/>
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton}  onClick={()=>handleChooseAnswer('B')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[currentProblemIndex]?.options[1] || `B`}</span>
                <AnswerBackground status={bButtonItem.status}/>
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton} onClick={()=>handleChooseAnswer('C')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[currentProblemIndex]?.options[2] || `C`}</span>
                <AnswerBackground status={cButtonItem.status}/>
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton} onClick={()=>handleChooseAnswer('D')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[currentProblemIndex]?.options[3] || `D`}</span>
                <AnswerBackground status={dButtonItem.status}/>
            </button>
            <SoundButton className={`${MultipleChoiceQuizPageStyle.imageButton} ${buttonHidden&&MultipleChoiceQuizPageStyle.buttonHidden}`} style={{marginLeft:'20px'}} onClick={()=>handleSubmitAnswer()}>
                <span className={MultipleChoiceQuizPageStyle.submitButtonText}>Submit</span>
                <img src='/images/object/jungle_escape_submit_button.png' alt="Submit" loading="lazy"/>
            </SoundButton>
        </div>
    </div>
  )
}
