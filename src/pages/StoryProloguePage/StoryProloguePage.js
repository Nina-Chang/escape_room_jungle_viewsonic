import SoundButton from '../../components/SoundButton';
import StoryProloguePageStyle from './StoryProloguePage.module.css'
const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StoryProloguePage = ({ navigateTo, backgroundImage }) => {
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };


  return (
    <div className="page-container" style={pageStyle}>
        <span className={StoryProloguePageStyle.signalText}>Weak signal...</span>
        <div className={StoryProloguePageStyle.coordinatesText}>3°28'26.6"S<br/>62°12'12.7"W</div>
        <SoundButton className={StoryProloguePageStyle.imageButton} onClick={() => navigateTo('gameStart')}>
            <img src={cfg.images?.btnNext || 'images/object/jungle_escape_nect_button.png'} alt="Continue" loading="lazy" decoding="async"/>
        </SoundButton>
        <div className={StoryProloguePageStyle.conversationText}>
            {cfg.strings.previousStoryConversation || "[Team Member]:Hello? Can anyone hear me? We're lost...battery dying!"}
        </div>
    </div>
  )
}
