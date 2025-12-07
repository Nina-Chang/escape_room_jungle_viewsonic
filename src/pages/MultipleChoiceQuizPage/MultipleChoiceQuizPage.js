import SoundButton from '../../components/SoundButton';
import MultipleChoiceQuizPageStyle from './MultipleChoiceQuizPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const MultipleChoiceQuizPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` }

  return (
    <div className="page-container" style={pageStyle}>
        <div className={MultipleChoiceQuizPageStyle.quizSection}>
            <img src='/images/object/jungle_escape_question_frame02.png' alt="jungle_escape_single_selection_frame01" />
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionIndexText}>
            1/9
        </div>
        <div className={MultipleChoiceQuizPageStyle.questionText}>
            {cfg.questions[2]?.questions[0]?.question || `Is the object you found a compass?`}
        </div>
        <div className={MultipleChoiceQuizPageStyle.answerSection}>
            <button className={MultipleChoiceQuizPageStyle.imageButton}  onClick={()=>navigateTo('wrong path')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[0]?.options[0] || `A`}</span>
                <img src='/images/object/jungle_escape_multiple_question_answer.png' alt="Option 1" />
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton}  onClick={()=>navigateTo('wrong path')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[0]?.options[1] || `B`}</span>
                <img src='/images/object/jungle_escape_multiple_question_answer.png' alt="Option 2" />
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton} onClick={()=>navigateTo('wrong path')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[0]?.options[2] || `C`}</span>
                <img src='/images/object/jungle_escape_multiple_question_answer.png' alt="Option 2" />
            </button>
            <button className={MultipleChoiceQuizPageStyle.imageButton} onClick={()=>navigateTo('wrong path')}>
                <span className={MultipleChoiceQuizPageStyle.answerText}>{cfg.questions[2]?.questions[0]?.options[3] || `C`}</span>
                <img src='/images/object/jungle_escape_multiple_question_answer.png' alt="Option 2" />
            </button>
            <SoundButton className={`${MultipleChoiceQuizPageStyle.imageButton}`} style={{marginLeft:'20px'}} onClick={()=>navigateTo('multiple choice clear')}>
                <span className={MultipleChoiceQuizPageStyle.submitButtonText}>Submit</span>
                <img src='/images/object/jungle_escape_submit_button.png' alt="Submit" />
            </SoundButton>
        </div>
    </div>
  )
}
