import React, { memo } from 'react'
import { getSizeImage } from '@/utils/format-utils';
import { AlbumWrapper } from './style'
import Item from 'antd/lib/list/Item';

// 新碟的封面，需传入info以及图片尺寸
const AlbumCover = memo((props) => {

    const { info, size = 130, width = 153, bgp = "-845px" } = props; // 图片的info，高度，宽度
    return (
        <AlbumWrapper size={size} width={width} bgp={bgp}>
            <div className='album-image'>
                <img src={getSizeImage(info.picUrl, size)} alt="" />
                <a href="/todo" className='cover image_cover'>{Item.name}</a>
            </div>
            <div className='album-info'>
                <div className='name'>{info.name}</div>
                <div className='artist text-nowrap'>{info.artist.name}</div>
            </div>
        </AlbumWrapper>
    )
})

export default AlbumCover;