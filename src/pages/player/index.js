import React, { memo } from 'react'
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'

const Player = memo(() => {
    return (
        <PlayerWrapper>
            <div className="content w980">
                <PlayerLeft>
                    <h2>PlayerInfo</h2>
                    <h2>SongContent</h2>
                </PlayerLeft>
                <PlayerRight>
                    <h2>SimiPlaylist</h2>
                    <h2>SimiSong</h2>
                    <h2>Download</h2>
                </PlayerRight>
            </div>
        </PlayerWrapper>
    )
})

export default Player;