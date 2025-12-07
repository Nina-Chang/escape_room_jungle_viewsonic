import SoundButton from '../../components/SoundButton';
import TrueFalseQuizPageStyle from './TrueFalseQuizPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const TrueFalseQuizPage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

  return (
    <div className="page-container" style={pageStyle}>
        <div className={TrueFalseQuizPageStyle.questionSection}>
            <img src='/images/object/jungle_escape_question_frame01.png' alt="jungle_escape_question_frame01" />
        </div>
        <span className={TrueFalseQuizPageStyle.questionIndexText}>
            1/9
        </span>
        <span className={TrueFalseQuizPageStyle.questionText}>
            {cfg.questions[0]?.questions[0]?.question || `Is the object you found a compass?`}
        </span>
        <div className={TrueFalseQuizPageStyle.trueButtonIcon}>
            <SoundButton className={TrueFalseQuizPageStyle.imageButton}>
                <img src='/images/object/jungle_escape_true.png' alt="jungle_escape_true" onClick={()=>navigateTo('true false quiz clear')}/>
            </SoundButton>
        </div>
        <div className={TrueFalseQuizPageStyle.falseButtonIcon}>
            <SoundButton className={TrueFalseQuizPageStyle.imageButton}>
                <img src='/images/object/jungle_escape_false.png' alt="jungle_escape_false" onClick={()=>navigateTo('wrong path')}/>
            </SoundButton>
        </div>
    </div>
  )
}
