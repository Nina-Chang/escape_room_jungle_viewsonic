import React, { useRef } from "react";
// import defaultClick from '../sounds/click.mp3';

/**
 * 可重複使用的音效按鈕
 *
 * Props:
 * - sound (string): 音效檔案路徑 (例如 "/sounds/click.mp3")，若未提供則使用 "/sounds/click.mp3"
 * - children (node): 按鈕顯示的內容
 * - onClick (function): 按鈕點擊後額外執行的事件
 * - className (string): 可傳入自訂 CSS 樣式
 */
function SoundButton({ sound, children, onClick, className,style }) {
  const audioRef = useRef(new Audio(sound));

  const handleClick = (e) => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button  onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  );
}

export default SoundButton;
