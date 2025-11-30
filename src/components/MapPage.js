import React from 'react'
import styled from 'styled-components';


export const MapPage = ({ navigateTo, backgroundImage }) => {
    const step=[
        { index:1,text:"Start your adventure at the River Camp. From there, follow the clues and work your way through the jungle to find the missing members."},
        { index:2,text:"Where do the clues lead?"},
        { index:3,text:"Where do the clues lead?"},
        { index:4,text:"Where do the clues lead?"},
    ]
    const pageStyle = { backgroundImage: `url(${backgroundImage})` };

    const MapSection=styled.div`
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    `

    const ExplanationText=styled.div`
        width: 435px;
        height: 285px;
        position: absolute;
        top:18%;
        left:16%;
        color:#000000;
        font-size: 36px;
        font-weight: 700;

        display: flex;
        align-items: center;
    `

    const RiverCampIcon=styled.div`
        position: absolute;
        top:54%;
        left:33%;
        display: flex;
    `

    const SwampTrapIcon=styled.div`
        position: absolute;
        top:28%;
        left:40%;
        display: flex;
        flex-direction: column;
    `

    const StoneMazeIcon=styled.div`
        position: absolute;
        top:40%;
        left:50%;
        display: flex;
        flex-direction: column;
    `

    const BoneHillIcon=styled.div`
        position: absolute;
        top:30%;
        left:65%;
        display: flex;
        flex-direction: column;
    `

    const AncientTempleIcon=styled.div`
        position: absolute;
        top:47%;
        left:66%;
        display: flex;
        flex-direction: column;
    `

    const MermaidCaveIcon=styled.div`
        position: absolute;
        top:62%;
        left:56%;
        display: flex;
        flex-direction: column;
    `

    const PositionText=styled.span`
        font-size: 30px;
        font-weight: 600;
    `

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
            <MapSection>
                <img src='/images/object/jungle_escape_map.png' alt="jungle_escape_map.png" />
            </MapSection>
            <ExplanationText>
                {step[0].text}
            </ExplanationText>
            <RiverCampIcon>
                <PositionText style={RiverCampTextStyle}>River Camp</PositionText>
                <img src='/images/object/jungle_escape_river_camp_gray.png' alt="jungle_escape_river_camp_gray.png" width={200} height={93}/>
            </RiverCampIcon>
            <SwampTrapIcon>
                <img src='/images/object/jungle_escape_swamp_trap_gray.png' alt="jungle_escape_swamp_trap_gray.png" width={247} height={108}/>
                <PositionText style={SwampTrapTextStyle}>Swamp Trap</PositionText>
            </SwampTrapIcon>
            <StoneMazeIcon>
                <img src='/images/object/jungle_escape_stone_maze_gray.png' alt="jungle_escape_stone_maze_gray.png" width={177} height={123}/>
                <PositionText style={StoneMazeTextStyle}>Stone Maze</PositionText>
            </StoneMazeIcon>
            <BoneHillIcon>
                <img src='/images/object/jungle_escape_bone_hill_gray.png' alt="jungle_escape_bone_hill_gray.png" width={119} height={117}/>
                <PositionText style={BoneHillTextStyle}>Bone Hill</PositionText>
            </BoneHillIcon>
            <AncientTempleIcon>
                <img src='/images/object/jungle_escape_ancient_temple_gray.png' alt="jungle_escape_ancient_temple_gray.png" width={116} height={131}/>
                <PositionText style={AncientTempleTextStyle}>Ancient Temple</PositionText>
            </AncientTempleIcon>
            <MermaidCaveIcon>
                <img src='/images/object/jungle_escape_mermaid_cave_gray.png' alt="jungle_escape_mermaid_cave_gray.png" width={102} height={111}/>
                <PositionText style={MermaidCaveTextStyle}>Mermaid Cave</PositionText>
            </MermaidCaveIcon>
        </div>
    )
}
