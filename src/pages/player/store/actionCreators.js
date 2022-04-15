import { getSongDetail, getLyric } from "@/services/player";
import { getRandom } from "@/utils/math-utils";
import { parseLyric } from "@/utils/parse-lyric";
import * as actionTypes from "./constants";

const changeCurrentSongAction = currentSong => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
})

// 修改播放列表
const changePlayListAction = playList => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList
});

// 修改当前播放索引
const changeCurrentSongIndexAction = currentSongIndex => ({
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex
});

// 播放当前歌曲
export const getSongDetailAction = ids => {
    // 这里会接收到两个参数
    return (dispatch, getState) => {

        // 根据id查找playList中是否有该歌曲
        const playList = getState().getIn(["player", "playList"]);
        const songIndex = playList.findIndex(songs => songs.id === ids); // 如果找到的话返回索引值（根据songs对象的id属性比较）

        // 判断是否找到歌曲
        let song = null;
        if (songIndex !== -1) { // 找到了歌曲
            dispatch(changeCurrentSongIndexAction(songIndex)); //修改当前播放索引
            song = playList[songIndex];
            dispatch(changeCurrentSongAction(song));
            dispatch(getLyricAction(song.id));
        } else { // 没有找到,则请求歌曲数据
            getSongDetail(ids).then(res => {
                song = res.songs && res.songs[0];
                if (!song) return; // 如果没有取到，则直接返回
                // 将请求到的歌曲添加到播放列表中
                const newPlayList = [...playList];
                newPlayList.push(song);
                // 更新redux中的播放列表
                dispatch(changePlayListAction(newPlayList));
                //更新redux中当前索引(播放列表中最后一首)
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
                // 更新当前播放歌曲
                dispatch(changeCurrentSongAction(song));

                // 请求歌曲的歌词
                dispatch(getLyricAction(song.id));
            })
        }


    }
}

export const changeSequenceAction = sequence => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
});

export const changeCurrentIndexAndSongAction = tag => {
    // 根据tag派发当前播放歌曲索引（为了拿到dispatch，需要像异步操作一样返回函数
    return (dispatch, getState) => {
        const playList = getState().getIn(["player", "playList"]);
        const sequence = getState().getIn(["player", "sequence"]);
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
        switch (sequence) {
            case 1: // 随机播放
                let randomIndex = -1;
                // 随机到与当前歌曲不同的随机数
                while (randomIndex === currentSongIndex || randomIndex === -1) {
                    randomIndex = getRandom(playList.length);
                }
                currentSongIndex = randomIndex;
                break;
            default: // 顺序播放（即使时单曲循环，在点击时也是切换下一首）
                currentSongIndex += tag; // 根据tag决定是前一首还是后一首
                if (currentSongIndex >= playList.length) currentSongIndex = 0;
                if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        }


        const currentSong = playList[currentSongIndex];
        dispatch(changeCurrentSongAction(currentSong));
        dispatch(changeCurrentSongIndexAction(currentSongIndex));

        // 请求歌词
        dispatch(getLyricAction(currentSong.id));
    }
}


const changeLyricListAction = lyricList => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList
})

// 根据id获取歌词
export const getLyricAction = id => {
    return dispatch => {
        getLyric(id).then(res => {
            const lyric = res.lrc.lyric;
            const lyricList = parseLyric(lyric);
            dispatch(changeLyricListAction(lyricList));
        })
    }
}

// 当前歌词索引
export const changeCurrentLyricIndexAction = currentLyricIndex => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    currentLyricIndex
})