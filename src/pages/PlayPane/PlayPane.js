import React, { useEffect } from 'react';
import { connect } from 'dva';
import { CSSTransition } from 'react-transition-group';
import Header from '../../components/PlayPane/Header'
import Disc from '../../components/PlayPane/Disc'
import LyricList from '../../components/PlayPane/LyricList'
import ControlPane from '../../components/PlayPane/ControlPane'
import styles from './PlayPane.less';
import BgHolder from '../../components/BgHolder'
import { withRouter } from 'react-router-dom';

function PlayPane({ history, collapse, name, artists, expanded, albumPicUrl }) {
  // 监听返回键，收起面板
  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'POP' && location.hash === '#playtemp') {
        collapse();
        history.goBack();
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const onEntered = () => {
    history.push(history.location.pathname + '#playtemp');
    history.push(history.location.pathname + '#play');
  }

  return (
    <CSSTransition onEntered={onEntered} in={expanded} appear={true} timeout={500} classNames="panel" unmountOnExit>
      <div className={styles.container}>
        <BgHolder className={styles.filter} src={albumPicUrl} />
        <Header />
        <Disc />
        <LyricList name={name} artists={artists} />
        <ControlPane />
      </div>
    </CSSTransition>
  );
}

const mapState = ({ player }) => {
  return {
    name: player.name,
    artists: player.artists,
    expanded: player.expanded,
    albumPicUrl: player.album.picUrl,
  }
}

const mapDispatch = (dispatch) => {
  return {
    collapse() {
      dispatch({
        type: 'player/saveData',
        payload: {
          expanded: false
        }
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(PlayPane));
