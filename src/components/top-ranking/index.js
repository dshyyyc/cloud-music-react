import React, { memo } from 'react'
import { getSizeImage } from '@/utils/format-utils';
import { getSongDetailAction } from '@/pages/player/store'
import { TopRankingWrapper } from './style'
import { useDispatch } from 'react-redux';

const TopRanking = memo((props) => {
    const { info } = props;
    const { tracks = [] } = info;

    const dispatch = useDispatch();

    // 点击后在播放列表中添加，并播放当前歌曲
    const playMusic = (item) => {
        dispatch(getSongDetailAction(item.id));
    };

    return (
        <TopRankingWrapper>
            <div className='header'>
                <div className='image'>
                    <img src={getSizeImage(info.coverImgUrl)} alt="" />
                    <a href="/tofo" className='image_cover'>ranking</a>
                </div>
                <div className='info'>
                    <a href="/todo">{info.name}</a>
                    <div>
                        <button className='btn play sprite_02'></button>
                        <button className='btn favor sprite_02'></button>
                    </div>
                </div>
            </div>

            <div className='list'>
                {
                    tracks.slice(0, 10).map((item, index) => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className='rank'>{index + 1}</div>
                                <div className='info'>
                                    <span className='name text-nowrap'>{item.name}</span>
                                    <div className="operate">
                                        <button className='btn sprite_02 play' onClick={e => playMusic(item)}></button>
                                        <button className='btn sprite_icon2 addto'></button>
                                        <button className='btn sprite_02 favor'></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="footer"></div>
        </TopRankingWrapper>
    )
});

export default TopRanking;