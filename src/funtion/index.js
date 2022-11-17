const getTimeSong = (time) => {
    if (time === 0) {
        return "00:00";
    }
    const checkMinute = time / 60;
    const checkSecond = time % 60;
    const minute = checkMinute < 10 ? `0${Math.floor(checkMinute)}` : `${Math.floor(checkMinute)}`;
    const second = checkSecond < 10 ? `0${Math.floor(checkSecond)}` : `${Math.floor(checkSecond)}`;
    return `${minute}:${second}`;
};

const getTotalTimePlaylist = (time) => {
    const timeMinute = time / 60;
    let hour;
    let minute;

    if (time / 60 > 60) {
        hour = Math.floor(timeMinute / 60);
        minute = Math.floor(timeMinute % 60);
        return hour + " giờ " + minute + " phút";
    } else {
        minute = Math.floor(timeMinute);
        return minute + "phút";
    }
};

const setFollower = (follower) => {
    let countFollower = follower > 10000 ? Math.floor(follower / 1000) : follower;
    return `${countFollower}K`;
};

const playlistCanPlay = (playlist) => {
    const playlistCanPlay = Promise.resolve(playlist.filter((songItem) => songItem.isWorldWide));
    return playlistCanPlay;
};

const currentIndexSongPlay = (songId, playlist) => {
    const songIndex = Promise.resolve(playlist.findIndex((song) => song?.encodeId === songId));
    return songIndex;
};

const checkSongInPlaylist = (songId, playlist) => {
    const check = playlist.some((song) => song?.encodeId === songId);
    return check;
};

export { getTimeSong, setFollower, playlistCanPlay, currentIndexSongPlay, getTotalTimePlaylist, checkSongInPlaylist };
