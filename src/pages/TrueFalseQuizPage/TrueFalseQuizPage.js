import React, { useState, useMemo,useRef, useEffect } from 'react';
import TrueFalseQuizPageStyle from './TrueFalseQuizPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';


const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseQuizPage = ({ navigateTo, backgroundImage,setWrongPathBackTo,currentProblemIndex,setCurrentProblemIndex }) => {
    const [buttonScale, setButtonScale] = useState({true:1,false:1});
    const initialButtonState=[{button:true,status:-1},{button:false,status:-1}]
    const [isCorrect, setIsCorrect] = useState(initialButtonState) // 0:false 1:true -1:not yet to choose
    const isProcessing = useRef(false);
    const { sendMessage }=useSendGameMessage()

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 6});
    }, [sendMessage]);
    
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    // 找出 sceneId 為 6 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 6) || [];

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

    const tfQuestions = useMemo(() => {
        return cfg?.questions?.[0]?.questions?.filter(q => q.type === 'true_false') || [];
    }, []);

    // trueFalseQuizSum 現在只計算是非題的數量
    const trueFalseQuizSum = tfQuestions.length;
    const totalProblemSum = cfg?.questions?.[0]?.questions.length;

    const trueItem = isCorrect.find(item => item.button === true);
    const falseItem = isCorrect.find(item => item.button === false);

    const reset=()=>{
        setIsCorrect(initialButtonState);
        isProcessing.current = false;
    }

    const handleClick=async(btn)=>{
        // 防止重複點擊
        if (isProcessing.current) return;
        isProcessing.current = true;
        setButtonScale(prev => ({ ...prev, [btn]: 0.9 }));
        await new Promise(resolve => setTimeout(resolve, 100));
        setButtonScale(prev => ({ ...prev, [btn]: 1 }));
        await new Promise(resolve => setTimeout(resolve, 50));
        handleAnswer(btn)
    }

    const handleAnswer=(button)=>{
        const currentQuestion = tfQuestions[currentProblemIndex];
        if(currentQuestion?.answer === button){
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
                if(currentProblemIndex<trueFalseQuizSum-1){
                    setCurrentProblemIndex(currentProblemIndex+1)
                }
                else{
                    navigateTo('true false quiz clear')
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
                setWrongPathBackTo({page:'true false quiz',problemIndex:currentProblemIndex})
                navigateTo('wrong path')
                reset()
            },1000)
        }
    }

    const AnswerIcon = ({ isTrueButton, status }) => {
        let imgSrc = '';
        const type = isTrueButton ? 'true' : 'false';

        if (status === -1) {// 還沒選
            imgSrc = `./images/object/jungle_escape_${type}.png`;
        } else if (status === 1) {// 答對
            imgSrc = `./images/object/jungle_escape_right_${type}.png`;
        } else if (status === 0) {// 答錯
            imgSrc = `./images/object/jungle_escape_wrong_${type}.png`;
        }

        return (
            <img src={imgSrc} alt={`jungle_escape_${type}_${status}`} loading="lazy" decoding="async"/>
        );
    };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={TrueFalseQuizPageStyle.questionSection}>
            <img src='./images/object/jungle_escape_question_frame01.png' alt="jungle_escape_question_frame01" loading="lazy" decoding="async" />
        </div>
        <span className={TrueFalseQuizPageStyle.questionIndexText}>
            {currentProblemIndex+1}/{totalProblemSum}
        </span>
        <span className={TrueFalseQuizPageStyle.questionText}>
            {tfQuestions[currentProblemIndex]?.question || ``}
        </span>
        <div className={TrueFalseQuizPageStyle.trueButtonIcon}>
            <button 
            disabled={isProcessing.current} 
            className={TrueFalseQuizPageStyle.imageButton} 
            style={{transform: `scale(${buttonScale.true || 1})`}}
            onClick={()=>{handleClick(true)}}>
                <AnswerIcon isTrueButton={true} status={trueItem.status}/>
            </button>
        </div>
        <div className={TrueFalseQuizPageStyle.falseButtonIcon}>
            <button 
            disabled={isProcessing.current} 
            className={TrueFalseQuizPageStyle.imageButton} 
            style={{transform: `scale(${buttonScale.false || 1})`}}
            onClick={()=>{handleClick(false)}}>
                <AnswerIcon isTrueButton={false} status={falseItem.status}/>
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
