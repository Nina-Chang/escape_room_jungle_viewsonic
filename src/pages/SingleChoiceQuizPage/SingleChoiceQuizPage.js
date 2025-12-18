import React, { useMemo, useState } from "react";
import SoundButton from '../../components/SoundButton'
import SingleChoiceQuizPageStyle from "./SingleChoiceQuizPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const SingleChoiceQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const initialButtonState=[{button:'A',status:-1},{button:'B',status:-1},{button:'C',status:-1}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:not yet to choose
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    const trueFalseQuizSum=cfg?.questions[0].questions.length
    const singleChoiceSum=cfg?.questions[1].questions.length
    const totalProblemSum = useMemo(() => cfg?.questions?.reduce((sum, group) => sum + group.questions.length, 0) || 0, [cfg?.questions]);

    const aButtonItem = isCorrect.find(item => item.button === 'A');
    const bButtonItem = isCorrect.find(item => item.button === 'B');
    const cButtonItem = isCorrect.find(item => item.button === 'C');

    const handleAnswer=(button,optionText)=>{
        if(cfg.questions[1].questions[currentProblemIndex].answer===optionText){
            // 更改按鈕狀態
            setIsCorrect(prev =>
                prev.map(item =>
                    item.button===button
                    ? { ...item, status: 1 }  
                    : item
                )
            );
            // 音效
            const audioPlayer=new Audio(cfg.sounds.correct || '/sounds/correct.mp3')
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                if(currentProblemIndex<singleChoiceSum-1){
                    setCurrentProblemIndex(currentProblemIndex+1)
                }
                else{
                    navigateTo('single choice quiz clear')
                    setCurrentProblemIndex(0)
                }
                setIsCorrect(initialButtonState);
            },500)
        }
        else{
            // 更改按鈕狀態
            setIsCorrect(prev =>
                prev.map(item =>
                    item.button===button
                    ? { ...item, status: 0 }  
                    : item
                )
            );
            // 音效
            const audioPlayer=new Audio(cfg.sounds.wrong || '/sounds/wrong.mp3')
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                setWrongPathBackTo({page:'single choice quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                setIsCorrect(initialButtonState);
            },500)
        }
    }

    const AnswerBackground = ({ status }) => {
        let imgSrc = '';

        if (status === -1) {// 還沒選
            imgSrc = `/images/object/jungle_escape_sigle_question_answer.png`;
        } else if (status === 1) {// 答對
            imgSrc = `/images/object/jungle_escape_sigle_question_right_answer.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `/images/object/jungle_escape_sigle_question_wrong_answer.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_sigle_question_${status}`}  loading="lazy" decoding="async"/>
        );
    };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={SingleChoiceQuizPageStyle.questionSection}>
            <img src='/images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" loading="lazy" decoding="async" />
        </div>
        <span className={SingleChoiceQuizPageStyle.questionIndexText}>
            {trueFalseQuizSum+currentProblemIndex+1}/{totalProblemSum}
        </span>
        <span className={SingleChoiceQuizPageStyle.questionText}>
            {cfg.questions[1]?.questions[currentProblemIndex]?.question || ``}
        </span>
        <div className={SingleChoiceQuizPageStyle.answerSection}>
            <SoundButton className={SingleChoiceQuizPageStyle.imageButton}  onClick={()=>handleAnswer('A',`${cfg.questions[1]?.questions[currentProblemIndex]?.options[0]}`)}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[currentProblemIndex]?.options[0] || `A`}</div>
                <AnswerBackground status={aButtonItem.status}/>
            </SoundButton>
            <SoundButton className={SingleChoiceQuizPageStyle.imageButton}  onClick={()=>handleAnswer('B',`${cfg.questions[1]?.questions[currentProblemIndex]?.options[1]}`)}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[currentProblemIndex]?.options[1] || `B`}</div>
                <AnswerBackground status={bButtonItem.status}/>
            </SoundButton>
            <SoundButton className={SingleChoiceQuizPageStyle.imageButton} onClick={()=>handleAnswer('C',`${cfg.questions[1]?.questions[currentProblemIndex]?.options[2]}`)}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[currentProblemIndex]?.options[2] || `C`}</div>
                <AnswerBackground status={cButtonItem.status}/>
            </SoundButton>
        </div>
    </div>
  )
}
