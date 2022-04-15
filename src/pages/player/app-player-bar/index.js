import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Slider, message } from 'antd';
import {
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    changeCurrentIndexAndSongAction,
    changeSequenceAction,
    getSongDetailAction,
    changeCurrentLyricIndexAction
} from '../store/actionCreators';
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format-utils';


const AppPlayerBar = memo(() => {

    // 记录当前播放进度
    const [currentTime, setCurrentTime] = useState(0);

    // 记录当前拖动进度
    const [progress, setProgress] = useState(0);

    // 是否当前正在拖动进度条
    const [isChanging, seIsChanging] = useState(false);

    // 是否正在播放音乐
    const [isPlaying, setIsPlaying] = useState(false);

    const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(state => ({
        // 获取当前歌曲
        currentSong: state.getIn(["player", "currentSong"]),
        // 获取当前播放顺序，以进行下一次切换（0顺序-1随机-2单曲）
        sequence: state.getIn(["player", "sequence"]),
        // 获取歌词
        lyricList: state.getIn(["player", "lyricList"]),
        // 获取当前歌词索引
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    }), shallowEqual)

    const dispatch = useDispatch();

    // audio ref
    const audioRef = useRef();

    useEffect(() => {
        dispatch(getSongDetailAction(1330348068));
    }, [dispatch]);

    // 挂载后获取播放音乐的src （http://xxx.mp3)
    useEffect(() => {
        audioRef.current.src = getPlayUrl(currentSong.id);
        // 刚进入页面时是不允许自动播放的，因此要用then处理
        audioRef.current.play().then(res => {
            setIsPlaying(true);
        }).catch(err => {
            setIsPlaying(false);
        });
    }, [currentSong])
    // 歌曲封面图片
    const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
    // 歌手名
    const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
    // 歌曲总时长
    const duration = currentSong.dt || 0;
    // 当前播放进度
    // const progress = currentTime / duration * 100;

    // 播放/暂停音乐（按钮回调）
    const playMusic = useCallback(() => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // 根据播放进度更新状态，进度变化时就会调用（状态中存储当前进度）
    const timeUpdate = e => {
        const currentTime = e.target.currentTime;
        if (!isChanging) {
            setCurrentTime(currentTime * 1000);
            setProgress(currentTime * 1000 / duration * 100); // 若未在拖动过程中，则根据播放进度设置当前progress
        }

        // 获取当前的歌词
        let i = 0;
        for (; i < lyricList.length; i++) {
            let lyricItem = lyricList[i];
            if (currentTime * 1000 < lyricItem.time) {
                // 找到第一个大于当前时间的歌词,则前一个索引即为当前歌词
                break;
            }
        }
        if (currentLyricIndex !== i - 1) { // 索引发生变化时再dispatch
            dispatch(changeCurrentLyricIndexAction(i - 1));
            const content = lyricList[i - 1] && lyricList[i - 1].content;
            message.open({
                key: "lyric",
                content: content,
                duration: 0,
                className: "lyric-class"
            })
        }
    };

    // 滑块位置发生改变时（拖动时回调）
    const sliderChange = useCallback(value => {
        seIsChanging(true); // 当前正在拖动
        const currentTime = value / 100 * duration;
        setCurrentTime(currentTime); // 拖动时修改显示的当前播放时间
        setProgress(value);
    }, [duration]);

    // 滑块停止时（拖动停止时回调）
    const sliderAfterChange = useCallback(value => {
        // 结束拖动时将播放进度设置为当前进度条所在的位置
        const currentTime = value / 100 * duration / 1000;
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime * 1000); // 防止进度条回跳（拿到的是旧的state）
        seIsChanging(false); // 停止拖动
        if (!isPlaying) {
            playMusic(); // 拖动结束时，如果时暂停状态，则开始播放
        }
    }, [duration, isPlaying, playMusic]);

    // 修改播放顺序
    const changeSequence = () => {
        let currentSequence = sequence + 1;
        if (currentSequence > 2) currentSequence = 0;
        dispatch(changeSequenceAction(currentSequence));
    }

    // 切歌
    const changeMusic = (tag) => {
        // tag = -1 前一首  1 后一首
        dispatch(changeCurrentIndexAndSongAction(tag)); // 切歌逻辑写在action中
    }

    // 处理歌曲播放结束时，下一首的情况
    const handleMusicEnded = () => {
        if (sequence === 2) { // 单曲循环
            audioRef.current.currentTime = 0; // 再播放一遍
            audioRef.current.play();
        } else {
            dispatch(changeCurrentIndexAndSongAction(1));
        }
    }

    return (
        <PlaybarWrapper className='sprite_player'>
            <div className='content w980'>
                <Control isPlaying={isPlaying}>
                    <button className='sprite_player prev'
                        onClick={e => changeMusic(-1)}></button>
                    <button className='sprite_player play'
                        onClick={e => playMusic()}></button>
                    <button className='sprite_player next'
                        onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className='image'>
                        <NavLink to="/discover/player">
                            <img src={getSizeImage(picUrl, 35)} alt="" />
                        </NavLink>
                    </div>
                    <div className='info'>
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href='/' className="singer-name">{singerName}</a>
                        </div>
                        <div className="progress">
                            <Slider defaultValue={0}
                                value={progress}
                                onChange={sliderChange}
                                onAfterChange={sliderAfterChange} />
                            <div className="time">
                                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                                <span className="divider"></span>
                                <span className="duration">{formatMinuteSecond(duration)}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_player">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
                        <button className="sprite_player btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded} />
        </PlaybarWrapper>
    )
})

export default AppPlayerBar;