import MapPageStyle from "./MapPage.module.css"

// 關卡順序為：river camp→ swamp trap→ stone maze→ ancient temple
export const MapPage = ({ navigateTo, backgroundImage,currentStep,setWrongPathBackTo }) => {
    const step=[
        { index:1,text:"Start your adventure at the River Camp. From there, follow the clues and work your way through the jungle to find the missing members."},
        { index:2,text:"Where do the clues lead?"},
        { index:3,text:"Where do the clues lead?"},
        { index:4,text:"Where do the clues lead?"},
    ]
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const RiverCampTextStyle={
        marginRight:'-40px',
        color:currentStep===1?'#000':'#9E9B98'
    }

    const SwampTrapTextStyle={
        marginTop:'10px',
        marginLeft:'30px',
        color:currentStep===2?'#000':'#9E9B98'
    }

    const StoneMazeTextStyle={
        color:currentStep===2 || currentStep===3?'#000':'#9E9B98'
    }

    const BoneHillTextStyle={
        color:currentStep===2 || currentStep===3 || currentStep===4?'#000':'#9E9B98'
    }

    const AncientTempleTextStyle={
        color:currentStep===2 || currentStep===3 || currentStep===4?'#000':'#9E9B98',
        marginLeft:'-50px'
    }

    const MermaidCaveTextStyle={
        color:currentStep===2 || currentStep===3 || currentStep===4?'#000':'#9E9B98',
        marginLeft:'-25px'
    }

    const handleWrongPath=()=>{
        setWrongPathBackTo({page:'map',problemIndex:0})
        navigateTo('wrong path')
    }

    return (
        <div className="page-container" style={pageStyle}>
            <div className={MapPageStyle.mapSection}>
                <img src='/images/object/jungle_escape_map.png' alt="jungle_escape_map.png" loading="lazy"/>
            </div>
            <div className={MapPageStyle.explanationText}>
                {step[0].text}
            </div>
            <div className={MapPageStyle.riverCampIcon}>
                <span className={MapPageStyle.locationText} style={RiverCampTextStyle}>River Camp</span>
                {
                    currentStep===1?
                    <button className='image-button' onClick={()=>navigateTo('true false quiz')}>
                        <img src='/images/object/jungle_escape_river_camp.png' alt="jungle_escape_river_camp_gray.png" width={200} height={93}  loading="lazy"/>
                    </button>
                    :
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_river_camp_gray.png' alt="jungle_escape_river_camp_gray.png" width={200} height={93} loading="lazy"/>
                    </button>
                }
                {
                    currentStep===1 &&
                    <div className={MapPageStyle.slideshow}>
                        {/* <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger01.png" alt="image 1" loading="lazy"/> */}
                        {/* <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger02.png" alt="image 2" loading="lazy"/> */}
                        {/* <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger03.png" alt="image 3" loading="lazy"/> */}
                        <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger04.png" alt="image 4" loading="lazy"/>
                        {/* <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger05.png" alt="image 5" loading="lazy"/> */}
                    </div>
                }
            </div>
            <div className={MapPageStyle.swampTrapIcon}> 
                {
                    currentStep===2
                    ?
                    <button className='image-button' onClick={()=>navigateTo('single choice quiz')}>
                        <img src='/images/object/jungle_escape_swamp_trap.png' alt="jungle_escape_swamp_trap_gray.png" width={247} height={108} loading="lazy"/>
                    </button>
                    :
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_swamp_trap_gray.png' alt="jungle_escape_swamp_trap_gray.png" width={247} height={108} loading="lazy"/> 
                    </button>
                }
                <span className={MapPageStyle.locationText} style={SwampTrapTextStyle}>Swamp Trap</span>
            </div>
            <div className={MapPageStyle.stoneMazeIcon}>
                {
                    currentStep===2
                    ?
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_stone_maze.png' alt="jungle_escape_stone_maze.png" width={177} height={123} loading="lazy"/>
                    </button>
                    :
                    (
                        currentStep===3
                        ?
                        <button className='image-button' onClick={()=>navigateTo('multiple choice quiz')}>
                            <img src='/images/object/jungle_escape_stone_maze.png' alt="jungle_escape_stone_maze_gray.png" width={177} height={123} loading="lazy"/>
                        </button>
                        :
                        <button className='image-button' onClick={()=>handleWrongPath()}>
                            <img src='/images/object/jungle_escape_stone_maze_gray.png' alt="jungle_escape_stone_maze_gray.png" width={177} height={123} loading="lazy"/>
                        </button>
                    )
                }
                <span className={MapPageStyle.locationText} style={StoneMazeTextStyle}>Stone Maze</span>
            </div> 
            <div className={MapPageStyle.boneHillIcon}>
                {
                    currentStep===2 || currentStep===3 || currentStep===4?
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_bone_hill.png' alt="jungle_escape_bone_hill_gray.png" width={119} height={117} loading="lazy"/>
                    </button>
                    :
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_bone_hill_gray.png' alt="jungle_escape_bone_hill_gray.png" width={119} height={117} loading="lazy"/>
                    </button>
                }
                <span className={MapPageStyle.locationText} style={BoneHillTextStyle}>Bone Hill</span>
            </div>
            <div className={MapPageStyle.ancientTempleIcon}>
                {
                    currentStep===2 || currentStep===3?
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_ancient_temple.png' alt="jungle_escape_ancient_temple_gray.png" width={116} height={131} loading="lazy"/>
                    </button>
                    :
                    (
                        currentStep===4?
                        <button className='image-button' onClick={()=>navigateTo('final clue quiz')}>
                            <img src='/images/object/jungle_escape_ancient_temple.png' alt="jungle_escape_ancient_temple_gray.png" width={116} height={131} loading="lazy"/>
                        </button>
                        :
                        <button className='image-button' onClick={()=>handleWrongPath()}>
                            <img src='/images/object/jungle_escape_ancient_temple_gray.png' alt="jungle_escape_ancient_temple_gray.png" width={116} height={131} loading="lazy"/>
                        </button>
                    )
                }
                <span className={MapPageStyle.locationText} style={AncientTempleTextStyle}>Ancient Temple</span>
            </div>
            <div className={MapPageStyle.mermaidCaveIcon}>
                {
                    currentStep===2 || currentStep===3 || currentStep===4?
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_mermaid_cave.png' alt="jungle_escape_mermaid_cave_gray.png" width={102} height={111} loading="lazy"/>
                    </button>
                    :
                    <button className='image-button' onClick={()=>handleWrongPath()}>
                        <img src='/images/object/jungle_escape_mermaid_cave_gray.png' alt="jungle_escape_mermaid_cave_gray.png" width={102} height={111} loading="lazy"/>
                    </button>
                }
                <span className={MapPageStyle.locationText} style={MermaidCaveTextStyle}>Mermaid Cave</span>
            </div>
        </div>
    )
}
