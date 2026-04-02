import React, { useState, useMemo,useRef, useEffect } from 'react';
import useSendGameMessage from '../../hooks/useSendGameMessage';
import usePageAssets from '../../hooks/usePageAssets';
import MultipleChoiceQuizPageStyle from './MultipleChoiceQuizPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const MultipleChoiceQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const [buttonHidden, setButtonHidden] = useState(false)
    const initialButtonState=[{button:'A',optionText:'',status:-2},{button:'B',optionText:'',status:-2},{button:'C',optionText:'',status:-2},{button:'D',optionText:'',status:-2}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:already choose -2:not yet to choose
    const isProcessing = useRef(false);
    const [clickingBtn, setClickingBtn] = useState(null);
    const { sendMessage }=useSendGameMessage()
    const pageAssets = usePageAssets(cfg.assets, 10);

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 10});
    }, [sendMessage]);
    
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    const mcQuestions = useMemo(() => {
        return cfg?.questions?.[0]?.questions?.filter(q => q.type === 'multiple_choice') || [];
    }, []);
    // 計算是非題 + 單選題的總數，用於序號顯示
    const prevQuestionsCount = useMemo(() => {
        return cfg?.questions?.[0]?.questions?.filter(q => q.type === 'true_false' || q.type === 'single_choice').length || 0;
    }, []);
    const multipleChoiceSum=mcQuestions.length;
    const totalProblemSum = cfg?.questions?.[0]?.questions?.length || 0;
    const currentQ = mcQuestions[currentProblemIndex];

    const handleChooseAnswer=(button)=>{
        setIsCorrect(prev =>
            prev.map((item,index) =>
                item.button===button
                ? { ...item, status: item.status===-1?-2:item.status===-2?-1:item.status,optionText:currentQ?.options[index] }  
                : { ...item, optionText:currentQ?.options[index] } 
            )
        );
        setClickingBtn(null)
    }

    const handleClick=async(btn)=>{
        setClickingBtn(btn);
        setTimeout(()=>{
            handleChooseAnswer(btn);
        },200)
    }

    const handleSubmitClick=async()=>{
        // 防止重複點擊
        if (isProcessing.current) return;
        isProcessing.current = true;
        setClickingBtn('submit');
        handleSubmitAnswer()
    }

    const aButtonItem = isCorrect.find(item => item.button === 'A');
    const bButtonItem = isCorrect.find(item => item.button === 'B');
    const cButtonItem = isCorrect.find(item => item.button === 'C');
    const dButtonItem = isCorrect.find(item => item.button === 'D');

    const reset=()=>{
        setIsCorrect(initialButtonState);
        setButtonHidden(false)
        setClickingBtn(null)
        isProcessing.current=false;
    }

    const handleSubmitAnswer=()=>{
        setButtonHidden(true)
        const choosedItem=isCorrect.filter(item=>item.status===-1).map(item=>item.optionText)
        const correctAnswer=currentQ?.answer || [];
        const isAllCorrect=choosedItem.length===correctAnswer.length && choosedItem.every((item,index)=>item===correctAnswer[index])
        // 更改按鈕狀態
        const updateState = isCorrect.map(item => {
            const isChosen = item.status === -1; // 是否被選中

            if (isChosen) {
                // 只有在全對 (isAllCorrect) 的情況下，選中的才會變綠色 (1)
                return {
                    ...item,
                    status: isAllCorrect ? 1 : 0 
                };
            } else {
                // 未選中的項目，不論它是不是正確答案，一律維持原狀 (-1，即黃色)
                return {
                    ...item,
                    status: -1
                };
            }
        });
        setIsCorrect(updateState)

        if(isAllCorrect ){// 全對
            // 音效
            const audioPlayer=new Audio(cfg.sounds.correct || './sounds/correct.mp3')
            audioPlayer.volume=0.316;
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
            },1000)
        }
        else{
            // 音效
            const audioPlayer=new Audio(cfg.sounds.wrong || './sounds/wrong.mp3')
            audioPlayer.volume=0.316;
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                setWrongPathBackTo({page:'multiple choice quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                reset()
            },1000)
        }
    }

    const AnswerBackground = React.memo(({ status }) => {
        let imgSrc = '';

        if (status === -1) {// 已選擇
            imgSrc = `./images/object/jungle_escape_multiple_question_answer_hover.png`;
        } else if (status === -2) {// 還沒選
            imgSrc = `./images/object/jungle_escape_multiple_question_answer.png`;
        } else if (status === 1) {// 答對
            imgSrc = `./images/object/jungle_escape_multiple_question_right_answer.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `./images/object/jungle_escape_multiple_question_wrong_answer.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_multiple_question_${status}`} loading="lazy" decoding="async" />
        );
    });

  return (
    <div className="page-container" style={pageStyle}>
        <div className={MultipleChoiceQuizPageStyle.quizSection}>
            <img src='./images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" loading="lazy" decoding="async" />
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionIndexText}>
            {prevQuestionsCount+currentProblemIndex+1}/{totalProblemSum}
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionText}>
            {currentQ?.question || `Is the object you found a compass?`}
        </div>
        <div className={MultipleChoiceQuizPageStyle.answerSection}>
            <button 
            disabled={isProcessing.current}
            className={`${MultipleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'A' ? MultipleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('A')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{currentQ?.options[0] || `A`}</span>
                <AnswerBackground status={aButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current}
            className={`${MultipleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'B' ? MultipleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('B')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{currentQ?.options[1] || `B`}</span>
                <AnswerBackground status={bButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current}
            className={`${MultipleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'C' ? MultipleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('C')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{currentQ?.options[2] || `C`}</span>
                <AnswerBackground status={cButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current}
            className={`${MultipleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'D' ? MultipleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('D')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{currentQ?.options[3] || `D`}</span>
                <AnswerBackground status={dButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current} 
            className={`${MultipleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'submit' ? MultipleChoiceQuizPageStyle.clicking : ''} ${buttonHidden&&MultipleChoiceQuizPageStyle.buttonHidden}`} 
            onClick={()=>handleSubmitClick()}>
                <span className={MultipleChoiceQuizPageStyle.submitButtonText}>Submit</span>
                <img src='./images/object/jungle_escape_submit_button.png' alt="Submit" loading="lazy" decoding="async"/>
            </button>
        </div>
        {pageAssets.map((asset) => (
            <div key={asset.RawId || asset.id} style={asset.style}>
                {asset.Type === 'Text' ? 
                (
                    asset.displayContent
                ) 
                : (
                    <img 
                        src={asset.displayContent} 
                        alt="game-asset" 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            display: 'block' 
                        }} 
                    />
                )}
            </div>
        ))}
    </div>
  )
}
