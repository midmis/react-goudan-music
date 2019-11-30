import React from 'react';
import MusicList from '../MusicList/MusicList';
import styles from './ListBody.less'
import { url2bgStyle } from '../../utils/utils';

const coverUrl = require('../../assets/cover.png');

const ListBody = ({ inited, songCount, songs }) => {
  const marginBottom = inited ? "60px" : "0";

  return (
    <div className={styles.container} style={{ marginBottom }}>
      <div className={styles.list}>
        <div className={styles.title}>
          <span className={styles.icon} style={url2bgStyle(coverUrl)}></span>
          <span className={styles.playAll}>播放全部</span>
          <span className={styles.songCount}>(共{songCount.toLocaleString()}首)</span>
        </div>
        <MusicList data={songs} withRank={true} />
      </div>
    </div>
  )
};


export default ListBody;
