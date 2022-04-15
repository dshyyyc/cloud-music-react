import * as actionTypes from "./constants";
import {
    getTopBanners,
    getHotRecommend,
    getNewAlbum,
    getTopList,
    getArtistList
} from "@/services/recommend";

// 利用请求到的轮播图数据更新recommand中topBanners中的数据
const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
});

// getTopBanners得到的res为请求到的轮播图数据
export const getTopBannerAction = () => {
    return dispatch => {
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res));
        })
    }
};

const changeHotRecommendAction = res => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result
});

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        getHotRecommend(limit).then(res => {
            dispatch(changeHotRecommendAction(res));
        })
    }
};

const changeNewAlbumAction = res => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums
});

export const getNewAlbumAction = limit => {
    return dispatch => {
        // 网络请求
        getNewAlbum(limit).then(res => {
            dispatch(changeNewAlbumAction(res));
        })
    }
};

// 飙升榜
const changeUpRankingAction = res => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res.playlist
})

// 新歌榜
const changeNewRankingAction = res => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res.playlist
})

// 原创榜
const changeOriginRankingAction = res => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res.playlist
});

export const getTopListAction = idx => {
    return dispatch => {
        getTopList(idx).then(res => {
            switch (idx) {
                case 0:
                    dispatch(changeNewRankingAction(res));
                    break;
                case 2:
                    dispatch(changeOriginRankingAction(res));
                    break;
                case 3:
                    dispatch(changeUpRankingAction(res));
                    break;
                default:
            }
        })
    }
}

const changeSettleSingsAction = (res) => ({
    type: actionTypes.CHANGE_SETTLE_SONGER,
    settleSings: res.artists
});

export const getSettleSingers = () => {
    return dispath => {
        getArtistList(5, 5001).then(res => {
            dispath(changeSettleSingsAction(res))
        })
    }
}