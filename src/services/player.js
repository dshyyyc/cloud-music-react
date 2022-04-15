import request from "./request";

// 请求歌曲数据
export function getSongDetail(ids) {
    return request({
        url: "/song/detail",
        params: {
            ids
        }
    })
}

// 请求歌词数据
export function getLyric(id) {
    return request({
        url: "/lyric",
        params: {
            id
        }
    })
}