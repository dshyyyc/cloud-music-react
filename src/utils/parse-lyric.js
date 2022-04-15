// 解析歌词

// [00:00.000] 作词 : 米果
// [00:01.000] 作曲 : 高橋優
// [00:02.000] 编曲 : 池窪浩一 (Kouichi Ikekubo)
// [00:25.237]这一路上走走停停
// [00:28.592]顺着少年漂流的痕迹
// [00:31.681]迈出车站的前一刻
// [00:34.795]竟有些犹豫
// [00:37.794]不禁笑这近乡情怯
// [00:41.191]仍无可避免
// [00:43.819]而长野的天
// [00:45.134]依旧那么暖


const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/; // 匹配方括号（用\转义）,匹配数字\d

export function parseLyric(lyricString) {
    const lineStrings = lyricString.split("\n");
    const lyrics = [];
    for (let line of lineStrings) {
        if (line) {
            const result = parseExp.exec(line); // 获取匹配后的结果
            if (!result) continue; // 如果没有匹配到，则跳过
            const time1 = result[1] * 60 * 1000; // 分钟
            const time2 = result[2] * 1000; //秒钟
            const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10; // 毫秒
            let time = time1 + time2 + time3;
            const content = line.replace(parseExp, "").trim(); // 获取歌词内容
            const lineObj = { time, content };
            lyrics.push(lineObj);
        }
    }
    return lyrics;
}