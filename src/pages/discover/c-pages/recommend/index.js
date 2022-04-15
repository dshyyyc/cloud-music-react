import React, { memo } from 'react'
import HotRadio from './c-cpns/hot-radio';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RecommendRanking from './c-cpns/recommend-ranking';
import SettleSinger from './c-cpns/settle-singer';
import TopBanner from './c-cpns/top-banner';
import UserLogin from './c-cpns/user-login';
import { 
    RecommendWraper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style';

const Recommend = memo(() => {
    return (
        <RecommendWraper >
            <TopBanner/>
            <Content className='w980'>
                <RecommendLeft>
                    {/* 热门推荐 */}
                    <HotRecommend/>
                    <NewAlbum/>
                    <RecommendRanking/>
                </RecommendLeft>
                <RecommendRight>
                    <UserLogin/>
                    <SettleSinger/>
                    <HotRadio/>
                </RecommendRight>
            </Content>
        </RecommendWraper>
    )
})

export default Recommend;

// const Recommend = memo(props => {
//     const { getBanners, topBanners } = props;
//     useEffect(() => {
//         getBanners();
//     }, [getBanners])
//     return (
//         <div>
            
//         </div>
//     )
// })

// // 此处的state是在store中合并的state(combineReducer)，所以要通过recommend来取
// const mapStateToProps = state => ({
//     topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//     getBanners: () => {
//         // 中间件的目的就是能在dispatch中传入函数
//         dispatch(getTopBannerAction())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Recommend);