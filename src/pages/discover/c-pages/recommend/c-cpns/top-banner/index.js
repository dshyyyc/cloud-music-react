import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getTopBannerAction } from '../../store/actionCreators'
import { Carousel } from 'antd'
import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl
} from "./style"

const TopBanner = memo(() => {
    // 当前轮播图切换到了第几张
    const [currentIndex, setCurrentIndex] = useState(0);

    // 从redux中获取当前状态，并存入topBanners中
    // 第一个参数是一个函数，每次函数调用返回的对象是不同的，而selector比较前后两个对象时用的是===，因此有性能问题
    // 第二个参数为shallowEqual，浅比较可以解决以上性能问题，依赖的state没有发生改变时，不重新渲染组件
    const { topBanners } = useSelector(state => ({
        topBanners: state.getIn(["recommend", "topBanners"]) // getIn传入一个可迭代，与下一行等效
        // topBanners:state.get("recommend").get("topBanners") // 注意使用immutable以后这里要用get来取数据
    }), shallowEqual);
    const dispatch = useDispatch(); // 引入dispatch

    // 通过button控制轮播图前后跳转（此处ref表示轮播图组件）
    const bannerRef = useRef();

    // 组件挂载后发送网络请求获取轮播图数据
    useEffect(() => {
        dispatch(getTopBannerAction()); // 直接dispatch action发送网络请求更新数据
    }, [dispatch])

    // 轮播图切换前的回调（beforeChange）
    const bannerChange = useCallback((from, to) => {
        setCurrentIndex(to); // to是轮播图当前要切换到第几页
    }, []);

    // 获取背景图片（毛玻璃图）的url（根据state中的currentIndex）
    const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20"); // 初始化时topBanners时空的，所以用&&判读一下

    return (
        // bgImage传入style component中，就可以在style中用props接受（此处为图片后的毛玻璃效果）
        <BannerWrapper bgImage={bgImage}>
            <div className='banner w980'>
                <BannerLeft>
                    {/* antd轮播图组件 */}
                    <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
                        {
                            topBanners.map((item, index) => {
                                return (
                                    <div className='banner-item' key={item.imageUrl}>
                                        <img className='image' src={item.imageUrl} alt={item.typeTitle} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </BannerLeft>
                {/* 右侧客户端下载 */}
                <BannerRight></BannerRight>
                <BannerControl>
                    <button className='btn left' onClick={e => bannerRef.current.prev()}></button>
                    <button className='btn right' onClick={e => bannerRef.current.next()}></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
})

export default TopBanner