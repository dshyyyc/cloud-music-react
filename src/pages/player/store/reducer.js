import * as actionTypes from "./constants";
import { Map } from "immutable";

const defaultState = Map({
    playList: [], // 播放列表
    currentSongIndex: 0, // 当前播放索引
    currentSong: {},
    sequence: 0, // 0为循环播放 1为随机播放 2为单曲循环
    lyricList: [], // 歌词解析列表
    currentLyricIndex: -1
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_SONG:
            return state.set("currentSong", action.currentSong);
        case actionTypes.CHANGE_PLAY_LIST:
            return state.set("playList", action.playList);
        case actionTypes.CHANGE_CURRENT_SONG_INDEX:
            return state.set("currentSongIndex", action.currentSongIndex)
        case actionTypes.CHANGE_SEQUENCE:
            return state.set("sequence", action.sequence);
        case actionTypes.CHANGE_LYRIC_LIST:
            return state.set("lyricList", action.lyricList);
        case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
            return state.set("currentLyricIndex", action.currentLyricIndex);
        default:
            return state;
    }
}

export default reducer;