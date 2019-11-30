import React from 'react';
import styles from './SearchSuggest.less'

const searchIcon = require('../../assets/search.svg');

const SearchSuggest = ({ data, keyword, onClick }) => {
  return (
    <div className={styles.container} onClick={() => onClick(keyword)}>
      <div className={styles.title}>{'搜索：' + keyword}</div>
      {data.map((each, idx) => (
        <div className={styles.item} key={idx} onClick={() => onClick(each)}>
          <span className={styles.history}>
            <img src={searchIcon} alt="" />
          </span>
          <div className={styles.content}>{each}</div>
        </div>
      ))}
    </div>
  );
}

export default SearchSuggest;