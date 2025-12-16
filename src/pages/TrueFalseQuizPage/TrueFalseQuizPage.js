import React, { useState, useMemo } from 'react';
import SoundButton from '../../components/SoundButton';
import TrueFalseQuizPageStyle from './TrueFalseQuizPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const initialButtonState=[{button:true,status:-1},{button:false,status:-1}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:not yet to choose
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const trueFalseQuizSum=cfg?.questions[0].questions.length
    const totalProblemSum = useMemo(() => cfg?.questions?.reduce((sum, group) => sum + group.questions.length, 0) || 0, [cfg?.questions]);

    const trueItem = isCorrect.find(item => item.button === true);
    const falseItem = isCorrect.find(item => item.button === false);

    const reset=()=>{
        setIsCorrect(initialButtonState);
        setButtonDisabled(false)
    }

    const handleAnswer=(button)=>{
        setButtonDisabled(true)
        if(cfg.questions[0].questions[currentProblemIndex].answer===button){
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
                if(currentProblemIndex<trueFalseQuizSum-1){
                    setCurrentProblemIndex(currentProblemIndex+1)
                }
                else{
                    navigateTo('true false quiz clear')
                    setCurrentProblemIndex(0)
                }
                reset()
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
                setWrongPathBackTo({page:'true false quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                reset()
            },500)
        }
    }

    const AnswerIcon = ({ isTrueButton, status }) => {
        let imgSrc = '';
        const type = isTrueButton ? 'true' : 'false';

        if (status === -1) {// 還沒選
            imgSrc = `/images/object/jungle_escape_${type}.png`;
        } else if (status === 1) {// 答對
            imgSrc = `/images/object/jungle_escape_right_${type}.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `/images/object/jungle_escape_wrong_${type}.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_${type}_${status}`} loading="lazy"/>
        );
    };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={TrueFalseQuizPageStyle.questionSection}>
            <img src='/images/object/jungle_escape_question_frame01.png' alt="jungle_escape_question_frame01" loading="lazy" />
        </div>
        <span className={TrueFalseQuizPageStyle.questionIndexText}>
            {currentProblemIndex+1}/{totalProblemSum}
        </span>
        <span className={TrueFalseQuizPageStyle.questionText}>
            {cfg.questions[0]?.questions[currentProblemIndex]?.question || ``}
        </span>
        <div className={TrueFalseQuizPageStyle.trueButtonIcon}>
            <SoundButton disabled={buttonDisabled} className={TrueFalseQuizPageStyle.imageButton} onClick={()=>{handleAnswer(true)}}>
                <AnswerIcon isTrueButton={true} status={trueItem.status}/>
            </SoundButton>
        </div>
        <div className={TrueFalseQuizPageStyle.falseButtonIcon}>
            <SoundButton disabled={buttonDisabled} className={TrueFalseQuizPageStyle.imageButton} onClick={()=>{handleAnswer(false)}}>
                <AnswerIcon isTrueButton={false} status={falseItem.status}/>
            </SoundButton>
        </div>
    </div>
  )
}
