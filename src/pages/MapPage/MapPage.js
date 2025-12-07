import MapPageStyle from "./MapPage.module.css"

export const MapPage = ({ navigateTo, backgroundImage }) => {
    const step=[
        { index:1,text:"Start your adventure at the River Camp. From there, follow the clues and work your way through the jungle to find the missing members."},
        { index:2,text:"Where do the clues lead?"},
        { index:3,text:"Where do the clues lead?"},
        { index:4,text:"Where do the clues lead?"},
    ]
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const RiverCampTextStyle={
        marginRight:'-40px',
        color:'#9E9B98'
    }

    const SwampTrapTextStyle={
        marginTop:'10px',
        marginLeft:'30px',
        color:'#9E9B98'
    }

    const StoneMazeTextStyle={
        color:'#9E9B98'
    }

    const BoneHillTextStyle={
        color:'#9E9B98'
    }

    const AncientTempleTextStyle={
        color:'#9E9B98',
        marginLeft:'-50px'
    }

    const MermaidCaveTextStyle={
        color:'#9E9B98',
        marginLeft:'-25px'
    }

    return (
        <div className="page-container" style={pageStyle}>
            <div className={MapPageStyle.mapSection}>
                <img src='/images/object/jungle_escape_map.png' alt="jungle_escape_map.png" />
            </div>
            <div className={MapPageStyle.explanationText}>
                {step[0].text}
            </div>
            <div className={MapPageStyle.riverCampIcon}>
                <span className={MapPageStyle.locationText} style={RiverCampTextStyle}>River Camp</span>
                <button className='image-button' onClick={()=>navigateTo('true false quiz')}>
                  <img src='/images/object/jungle_escape_river_camp_gray.png' alt="jungle_escape_river_camp_gray.png" width={200} height={93}/>
                </button>
            </div>
            <div className={MapPageStyle.swampTrapIcon}> 
                <button className='image-button' onClick={()=>navigateTo('single choice quiz')}>
                  <img src='/images/object/jungle_escape_swamp_trap_gray.png' alt="jungle_escape_swamp_trap_gray.png" width={247} height={108}/>
                </button>
                <span className={MapPageStyle.locationText} style={SwampTrapTextStyle}>Swamp Trap</span>
            </div>
            <div className={MapPageStyle.stoneMazeIcon}>
                <button className='image-button' onClick={()=>navigateTo('multiple choice quiz')}>
                   <img src='/images/object/jungle_escape_stone_maze_gray.png' alt="jungle_escape_stone_maze_gray.png" width={177} height={123}/>
                </button>
                <span className={MapPageStyle.locationText} style={StoneMazeTextStyle}>Stone Maze</span>
            </div> 
            <div className={MapPageStyle.boneHillIcon}>
                <button className='image-button'>
                   <img src='/images/object/jungle_escape_bone_hill_gray.png' alt="jungle_escape_bone_hill_gray.png" width={119} height={117}/>
                </button>
                <span className={MapPageStyle.locationText} style={BoneHillTextStyle}>Bone Hill</span>
            </div>
            <div className={MapPageStyle.ancientTempleIcon}>
                <button className='image-button' onClick={()=>navigateTo('final clue quiz')}>
                  <img src='/images/object/jungle_escape_ancient_temple_gray.png' alt="jungle_escape_ancient_temple_gray.png" width={116} height={131}/>
                </button>
                <span className={MapPageStyle.locationText} style={AncientTempleTextStyle}>Ancient Temple</span>
            </div>
            <div className={MapPageStyle.mermaidCaveIcon}>
                <button className='image-button'>
                   <img src='/images/object/jungle_escape_mermaid_cave_gray.png' alt="jungle_escape_mermaid_cave_gray.png" width={102} height={111}/>
                </button>
                <span className={MapPageStyle.locationText} style={MermaidCaveTextStyle}>Mermaid Cave</span>
            </div>
        </div>
    )
}
