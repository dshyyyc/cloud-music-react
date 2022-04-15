import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'antd'
import { getNewAlbumAction } from '../../store/actionCreators'
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import AlbumCover from '@/components/album-cover'
import { AlbumWrapper } from './style'
import { NEW_ALBUM_LIMIT, NEW_ALBUM_PER_PAGE } from '@/common/constants'

const NewAlbum = memo(() => {

    const { newAlbums } = useSelector(state => ({
        newAlbums: state.getIn(["recommend", "newAlbums"])
    }), shallowEqual);

    const dispatch = useDispatch();

    // 按键切换轮播图页面
    const pageRef = useRef();

    useEffect(() => {
        dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT));
    }, [dispatch]);

    return (
        <AlbumWrapper>
            <ThemeHeaderRCM title="新碟上架" />
            <div className='content'>
                <button className='arrow arrow-left sprite_02' onClick={e => pageRef.current.prev()}></button>
                <div className='album'>
                    <Carousel dots={false} ref={pageRef}>
                        {
                            // 一共两页轮播图，每页放五张
                            [0, 1].map(item => {
                                return (
                                    <div key={item} className="page">
                                        {
                                            newAlbums.slice(item * NEW_ALBUM_PER_PAGE, (item + 1) * NEW_ALBUM_PER_PAGE).map(item => {
                                                return <AlbumCover key={item.id} info={item} size={100} width={118} bgp="-570px">{item.name}</AlbumCover>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <button className='arrow arrow-right sprite_02' onClick={e => pageRef.current.next()}></button>
                {/* {
                    newAlbums.map((item, index) => {
                        return (
                            <div key={item.id}>{item.name}</div>
                        )
                    })
                } */}
            </div>
        </AlbumWrapper>
    )
})

export default NewAlbum