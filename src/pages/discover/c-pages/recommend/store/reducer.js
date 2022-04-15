import * as actionTypes from "./constants";
import { Map } from "immutable";

// 使用immutable中Map包裹
const defaultState = Map({
    topBanners: [], // 轮播图数据
    hotRecommends: [],
    newAlbums: [], // 新碟上架

    upRanking: {}, // 榜单
    newRanking: {},
    originRanking: {},
    settleSings: []
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanners", action.topBanners); // 会返回新的对象
        // return { ...state, topBanners: action.topBanners }; // 拷贝数据带来的内存消耗
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends", action.hotRecommends);
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums", action.newAlbums);
        case actionTypes.CHANGE_UP_RANKING:
            return state.set("upRanking", action.upRanking);
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set("newRanking", action.newRanking);
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set("originRanking", action.originRanking);
        case actionTypes.CHANGE_SETTLE_SONGER:
            return state.set("settleSings", action.settleSings)
        default:
            return state;
    }
}

export default reducer;