import MapPageStyle from "./MapPage.module.css"

// 關卡順序為：river camp→ swamp trap→ stone maze→ ancient temple
export const MapPage = ({ navigateTo, backgroundImage,currentStep,setWrongPathBackTo }) => {
    const explanationText=[
        { index:1,text:"Start your adventure at the River Camp. From there, follow the clues and work your way through the jungle to find the missing members."},
        { index:2,text:"Where do the clues lead?"},
        { index:3,text:"Where do the clues lead?"},
        { index:4,text:"Where do the clues lead?"},
    ]
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading: 'eager'
    };

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

    // 在 component 內建立配置
    const locations = [
    {
        iconClass: MapPageStyle.riverCampIcon,
        name: 'River Camp',
        textStyle: RiverCampTextStyle,
        isActiveClick: currentStep === 1,
        isNormalImg: currentStep === 1,
        normalImg: '/images/object/jungle_escape_river_camp.png',
        grayImg: '/images/object/jungle_escape_river_camp_gray.png',
        width: 200, height: 93,
        altBase: 'jungle_escape_river_camp',
        onActiveClick: () => navigateTo('true false quiz'),
        hasSlideshow: true  // 動畫
    },
    {
        iconClass: MapPageStyle.swampTrapIcon,
        name: 'Swamp Trap',
        textStyle: SwampTrapTextStyle,
        isActiveClick: currentStep === 2,
        isNormalImg: currentStep === 2,
        normalImg: '/images/object/jungle_escape_swamp_trap.png',
        grayImg: '/images/object/jungle_escape_swamp_trap_gray.png',
        width: 247, height: 108,
        altBase: 'jungle_escape_swamp_trap',
        onActiveClick: () => navigateTo('single choice quiz')
    },
    {
        iconClass: MapPageStyle.stoneMazeIcon,
        name: 'Stone Maze',
        textStyle: StoneMazeTextStyle,
        isActiveClick: currentStep === 3,
        isNormalImg: currentStep === 2 || currentStep === 3,
        normalImg: '/images/object/jungle_escape_stone_maze.png',
        grayImg: '/images/object/jungle_escape_stone_maze_gray.png',
        width: 177, height: 123,
        altBase: 'jungle_escape_stone_maze',
        onActiveClick: () => navigateTo('multiple choice quiz')
    },
    {
        iconClass: MapPageStyle.boneHillIcon,
        name: 'Bone Hill',
        textStyle: BoneHillTextStyle,
        isActiveClick: false,
        isNormalImg: currentStep >= 2,
        normalImg: '/images/object/jungle_escape_bone_hill.png',
        grayImg: '/images/object/jungle_escape_bone_hill_gray.png',
        width: 119, height: 117,
        altBase: 'jungle_escape_bone_hill',
        onActiveClick: () => {}
    },
    {
        iconClass: MapPageStyle.ancientTempleIcon,
        name: 'Ancient Temple',
        textStyle: AncientTempleTextStyle,
        isActiveClick: currentStep === 4,
        isNormalImg: currentStep >= 2,
        normalImg: '/images/object/jungle_escape_ancient_temple.png',
        grayImg: '/images/object/jungle_escape_ancient_temple_gray.png',
        width: 116, height: 131,
        altBase: 'jungle_escape_ancient_temple',
        onActiveClick: () => navigateTo('final clue quiz')
    },
    {
        iconClass: MapPageStyle.mermaidCaveIcon,
        name: 'Mermaid Cave',
        textStyle: MermaidCaveTextStyle,
        isActiveClick: false,
        isNormalImg: currentStep >= 2,
        normalImg: '/images/object/jungle_escape_mermaid_cave.png',
        grayImg: '/images/object/jungle_escape_mermaid_cave_gray.png',
        width: 102, height: 111,
        altBase: 'jungle_escape_mermaid_cave',
        onActiveClick: () => {}
    }
    ];


    const MapLocationButton = ({
            isActiveClick,
            isNormalImg,
            normalImg,
            grayImg,
            width,
            height,
            altBase,
            onActiveClick,
        }) => {
        const handleClick = () => {
            if (isActiveClick) {
                onActiveClick();
            } else {
                handleWrongPath();
            }
        };

        const imgSrc = isNormalImg ? normalImg : grayImg;
        const alt = `${altBase}${isNormalImg ? '' : '_gray'}.png`;

        return (
            <button className="image-button" onClick={handleClick}>
                <img src={imgSrc} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
            </button>
        );
    };


    return (
        <div className="page-container" style={pageStyle}>
            <div className={MapPageStyle.mapSection}>
                <img src='/images/object/jungle_escape_map.png' alt="jungle_escape_map.png" loading="lazy" decoding="async"/>
            </div>
            <div className={MapPageStyle.explanationText}>
                {explanationText[currentStep-1].text}
            </div>
            {locations.map((location) => (
                <div key={location.name} className={location.iconClass}>
                    <MapLocationButton
                        isActiveClick={location.isActiveClick}
                        isNormalImg={location.isNormalImg}
                        normalImg={location.normalImg}
                        grayImg={location.grayImg}
                        width={location.width}
                        height={location.height}
                        altBase={location.altBase}
                        onActiveClick={location.onActiveClick}
                    />
                    <span className={MapPageStyle.locationText} style={location.textStyle}>
                        {location.name}
                    </span>

                    {/* River Camp 動畫 */}
                    {location.hasSlideshow && currentStep === 1 && (
                    <div className={MapPageStyle.slideshow}>
                        <div className={MapPageStyle.slideshow}>
                            <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger05.png" alt="finger frame 5" loading="lazy" decoding="async"/>
                            <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger04.png" alt="finger frame 4" loading="lazy" decoding="async"/>
                            <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger03.png" alt="finger frame 3" loading="lazy" decoding="async"/>
                            <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger02.png" alt="finger frame 2" loading="lazy" decoding="async"/>
                            <img className={MapPageStyle.slide} src="/images/object/jungle_escape_finger01.png" alt="finger frame 1" loading="lazy" decoding="async"/>
                        </div>
                    </div>
                    
                    )}
                </div>
            ))}
        </div>
    )
}
