import request from "./request"

// recommend组件相关的网络请求
export function getTopBanners() {
    return request({
        url: "/banner"
    })
}

// 热门推荐
export function getHotRecommend(limit) {
    return request({
        url: "/personalized?",
        params: {
            limit // 接受多少条数据
        }
    })
}

// 新碟上架
export function getNewAlbum(limit) {
    return request({
        url: "/top/album",
        params: {
            limit // 接受多少条数据
        }
    })
}

// 榜单
export function getTopList(idx) {
    return request({
        url: "/top/list",
        params: {
            idx
        }
    })
}

export function getArtistList(limit, cat) {
    return request({
        url: "/artist/list",
        params: {
            cat,
            limit
        }
    })
}