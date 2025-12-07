import SingleChoiceQuizPageStyle from "./SingleChoiceQuizPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const SingleChoiceQuizPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };


  return (
    <div className="page-container" style={pageStyle}>
        <div className={SingleChoiceQuizPageStyle.questionSection}>
            <img src='/images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" />
        </div>
        <span className={SingleChoiceQuizPageStyle.questionIndexText}>
            1/9
        </span>
        <span className={SingleChoiceQuizPageStyle.questionText}>
            {cfg.questions[1]?.questions[0]?.question || `Is the object you found a compass?`}
        </span>
        <div className={SingleChoiceQuizPageStyle.answerSection}>
            <button className={SingleChoiceQuizPageStyle.imageButton}  onClick={()=>navigateTo('wrong path')}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[0]?.options[0] || `A`}</div>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 1" />
            </button>
            <button className={SingleChoiceQuizPageStyle.imageButton}  onClick={()=>navigateTo('wrong path')}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[0]?.options[1] || `B`}</div>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 2" />
            </button>
            <button className={SingleChoiceQuizPageStyle.imageButton} onClick={()=>navigateTo('single choice quiz clear')}>
                <div className={SingleChoiceQuizPageStyle.answerText}>{cfg.questions[1]?.questions[0]?.options[2] || `C`}</div>
                <img src='/images/object/jungle_escape_sigle_question_answer.png' alt="Option 2" />
            </button>
        </div>
    </div>
  )
}
