import React, { useMemo, useState,useRef, useEffect } from "react";
import useSendGameMessage from '../../hooks/useSendGameMessage';
import SingleChoiceQuizPageStyle from "./SingleChoiceQuizPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const SingleChoiceQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const initialButtonState=[{button:'A',status:-1},{button:'B',status:-1},{button:'C',status:-1}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:not yet to choose
    const isProcessing = useRef(false);
    const { sendMessage }=useSendGameMessage()
    const [clickingBtn, setClickingBtn] = useState(null);

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 8});
    }, [sendMessage]);
    
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    // 找出 sceneId 為 8 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 8) || [];

    // 建立一個產生 Style 的 function
    const getAssetStyle = (asset) => ({
        position: 'absolute',
        left: asset.position.x,
        top: asset.position.y,
        width:asset.textWidth,
        height:asset.textHeight,
        fontFamily: asset.fontFamily,
        textAlign:asset.textAlign,
        fontSize:asset.fontSize,
        color: asset.color,
        fontWeight: asset.fontWeight,
        fontStyle: asset.fontStyle,
        textDecoration: asset.textDecoration,
        pointerEvents: 'none', // 如果只是裝飾文字，防止擋住按鈕點擊
        zIndex:"99"
    });

    const scQuestions = useMemo(() => {
        return cfg?.questions?.[0]?.questions?.filter(q => q.type === 'single_choice') || [];
    }, []);

    const trueFalseQuizSum = useMemo(() => {
        return cfg?.questions?.[0]?.questions?.filter(q => q.type === 'true_false').length || 0;
    }, []);

    const singleChoiceSum=scQuestions.length;
    const totalProblemSum = cfg?.questions?.[0]?.questions?.length

    const handleClick=async(btn,optionTxt)=>{
        // 防止重複點擊
        if (isProcessing.current) return;
        isProcessing.current = true;
        setClickingBtn(btn);

        handleAnswer(btn,optionTxt)
    }

    const aButtonItem = isCorrect.find(item => item.button === 'A');
    const bButtonItem = isCorrect.find(item => item.button === 'B');
    const cButtonItem = isCorrect.find(item => item.button === 'C');

    const reset=()=>{
        setIsCorrect(initialButtonState);
        isProcessing.current=false
        setClickingBtn(null)
    }

    const handleAnswer=(button,optionText)=>{
        const currentQuestion = scQuestions[currentProblemIndex];
        if(currentQuestion?.answer === optionText){
            // 更改按鈕狀態
            setIsCorrect(prev =>
                prev.map(item =>
                    item.button===button
                    ? { ...item, status: 1 }  
                    : item
                )
            );
            // 音效
            const audioPlayer=new Audio(cfg.sounds.correct || './sounds/correct.mp3')
            audioPlayer.volume=0.316;
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
                reset()
            },1000)
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
            const audioPlayer=new Audio(cfg.sounds.wrong || './sounds/wrong.mp3')
            audioPlayer.volume=0.316;
            audioPlayer.play().catch(e => console.error("Audio play failed", e));
            // 導向頁面
            setTimeout(()=>{
                setWrongPathBackTo({page:'single choice quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                reset()
            },1000)
        }
    }

    const AnswerBackground = React.memo(({ status }) => {
        let imgSrc = '';

        if (status === -1) {// 還沒選
            imgSrc = `./images/object/jungle_escape_sigle_question_answer.png`;
        } else if (status === 1) {// 答對
            imgSrc = `./images/object/jungle_escape_sigle_question_right_answer.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `./images/object/jungle_escape_sigle_question_wrong_answer.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_sigle_question_${status}`}  loading="lazy" decoding="async"/>
        );
    });

  return (
    <div className="page-container" style={pageStyle}>
        <div className={SingleChoiceQuizPageStyle.questionSection}>
            <img src='./images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" loading="lazy" decoding="async" />
        </div>
        <span className={SingleChoiceQuizPageStyle.questionIndexText}>
            {trueFalseQuizSum+currentProblemIndex+1}/{totalProblemSum}
        </span>
        <span className={SingleChoiceQuizPageStyle.questionText}>
            {scQuestions[currentProblemIndex].question || ``}
        </span>
        <div className={SingleChoiceQuizPageStyle.answerSection}>
            <button 
            disabled={isProcessing.current} 
            className={`${SingleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'A' ? SingleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>{handleClick('A',scQuestions[currentProblemIndex]?.options[0])}}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{scQuestions[currentProblemIndex]?.options[0] || `A`}</div>
                <AnswerBackground status={aButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current} 
            className={`${SingleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'B' ? SingleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('B',`${scQuestions[currentProblemIndex]?.options[1]}`)}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{scQuestions[currentProblemIndex]?.options[1] || `B`}</div>
                <AnswerBackground status={bButtonItem.status}/>
            </button>
            <button 
            disabled={isProcessing.current} 
            className={`${SingleChoiceQuizPageStyle.imageButton} ${clickingBtn === 'C' ? SingleChoiceQuizPageStyle.clicking : ''}`}
            onClick={()=>handleClick('C',`${scQuestions[currentProblemIndex]?.options[2]}`)}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{scQuestions[currentProblemIndex]?.options[2] || `C`}</div>
                <AnswerBackground status={cButtonItem.status}/>
            </button>
        </div>
        {pageAssets.map((asset, index) => (
            <div key={index} style={getAssetStyle(asset)}>
            {asset.text}
            </div>
        ))}
    </div>
  )
}
