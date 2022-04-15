import React, { memo } from 'react'
import { getCount, getSizeImage } from '../../utils/format-utils';
import { SongsCoverWrapper } from './style'

// 热门推荐中歌曲的封面（可复用，传入歌曲的信息props）
const SongsCover = memo((props) => {
    const { info } = props;

    return (
        <SongsCoverWrapper>
            <div className='cover-top'>
                <img src={getSizeImage(info.picUrl, 140)} alt="" />
                <div className='cover sprite_cover'>
                    <div className='info sprite_cover'>
                        <span>
                            <i className='sprite_icon erji'></i>
                            {getCount(info.playCount)}
                        </span>
                    </div>
                </div>
            </div>
            <div className='cover-bottom text-nowrap'>
                {info.name}
            </div>
            <div className='cover-source text-nowrap'>
                by {info.copywriter}
                {/* by {info.copywriter || info.creator.nickname} */}
            </div>

        </SongsCoverWrapper >
    )
})

export default SongsCover