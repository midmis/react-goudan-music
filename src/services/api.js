import request from '../utils/request';

export const baseUrl = "http://127.0.0.1:4000";
export const storageKey = "search-history";

// 设置控制台是否输出服务器响应内容
const logData = process.env.NODE_ENV === 'development' ? true : false;

// 获取音乐url
export async function querySongUrl(songIds) {
  return request(`${baseUrl}/song/url?id=${songIds}`, { expirys: 60 * 1000 })
    .then(({ data }) => data[0])
    .catch(err => [])
    .then(log('querySongUrl'))
}

// 获取专辑内容
export async function queryAlbumInfo(albumId) {
  return request(`${baseUrl}/album?id=${albumId}`)
    .then(({ songs }) => songs[0].al)
    .catch(err => [])
    .then(log('queryAlbumInfo'))
}

// 获取推荐歌单
export async function queryRecommendPlayLists(limit = 30) {
  return request(`${baseUrl}/personalized?limit=${limit}`)
    .then(({ code, result }) => {
      return result.map(each => {
        return {
          id: each.id,
          name: each.name,
          type: each.type,
          picUrl: each.picUrl,
          playCount: each.playCount,
          trackCount: each.trackCount,
          trackNumberUpdateTime: each.trackNumberUpdateTime
        }
      })
    })
    .catch(err => [])
    .then(log('queryRecommendPlayLists'))
}

// 获取推荐的新音乐
export async function queryRecommendNewSongs() {
  return request(`${baseUrl}/personalized/newsong`)
    .then(({ code, result }) => {
      return result.map(each => {
        const song = each.song;
        return {
          id: song.id,
          name: song.name,
          artists: song.artists,
          album: song.album,
          duration: song.duration,
        }
      })
    })
    .catch(err => [])
    .then(log('queryRecommendNewSongs'))
}

// 获取热歌榜
export async function queryPopularSongs() {
  return request(`${baseUrl}/top/list?idx=1`)
    .then(({ code, playlist }) => {
      const {
        updateTime,
        trackCount,
        tracks,
        trackIds,
      } = playlist;

      const songs = tracks.map(song => {
        return {
          id: song.id,
          name: song.name,
          artists: song.ar,
          album: song.al,
          duration: song.dt,
        }
      });

      return {
        updateTime,
        songs,
        songIds: trackIds,
        songCount: trackCount,
      }
    })
    .catch(err => [])
    .then(log('queryPopularSongs'))
}

// 获取热搜
export async function queryHotSearch() {
  return request(`${baseUrl}/search/hot`)
    .then(({ result }) => result.hots.map(each => each.first))
    .catch(err => [])
    .then(log('queryHotSearch'))
}

// 获取搜索建议
export async function querySearchSuggest(keyword) {
  return request(`${baseUrl}/search/suggest?keywords=${keyword}&type=mobile`)
    .then(({ result }) => {
      return result.allMatch.map(each => each.keyword)
    })
    .catch(err => [])
    .then(log('querySearchSuggest'))
}

// 获取搜索结果
export async function querySearchResult(keyword, limit = 30, offset = 0) {
  return request(`${baseUrl}/search?keywords=${keyword}&limit=${limit}&offset=${offset}`)
    .then(({ result }) => result.songs)
    .catch(err => [])
    .then(log('querySearchResult'))
}

// 获取歌单内容
export async function queryPlayList(listId) {
  return request(`${baseUrl}/playlist/detail?id=${listId}`)
    .then(({ playlist }) => {
      let {
        id, name, trackCount, playCount, shareCount,
        coverImgUrl, creator, tracks, trackIds,
      } = playlist;
      creator = {
        userId: creator.userId,
        avatarUrl: creator.avatarUrl,
        signature: creator.signature,
        nickname: creator.nickname,
        backgroundUrl: creator.backgroundUrl,
      };
      tracks = tracks.map(song => {
        return {
          id: song.id,
          name: song.name,
          artists: song.ar,
          album: song.al,
          duration: song.dt,
        }
      });
      return {
        id,
        name,
        creator,
        playCount,
        shareCount,
        songCount: trackCount,
        songs: tracks,
        songIds: trackIds,
        coverImgUrl,
      }
    })
    .catch(err => ({}))
    .then(log('queryPlayList'))
}

function log(name) {
  return function (data) {
    if (logData)
      console.log(name, data);
    return data;
  }
}