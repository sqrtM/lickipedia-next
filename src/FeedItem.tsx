import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import abcjsObj from 'abcjs'
import AbcVisualParams from 'abcjs'

import { feedItemType } from './Feed'


interface IFeedItemProps {
  parserParams: AbcVisualParams.AbcVisualParams,
  retrieveSavedLicks: (i: string) => void
  historyFeed: feedItemType[]
}

export default class FeedItem extends PureComponent<IFeedItemProps> {
  constructor(props: IFeedItemProps) {
    super(props);
    this.saveLick = this.saveLick.bind(this);
  }

  renderAbcNotation(ID: string, abcNotation: string, parserParams: abcjsObj.AbcVisualParams): void {
    abcjsObj.renderAbc(`abcjs-result-${ID}`, abcNotation, parserParams)
  }

  componentDidMount(): void {
    this.props.historyFeed.forEach(i => this.renderAbcNotation(i[0], i[1], i[2]))
  }

  componentDidUpdate(): void {
    this.props.historyFeed.forEach(i => this.renderAbcNotation(i[0], i[1], i[2]))
  }
  
  saveLick = (s: string): void => {
    console.log(s);
    this.props.retrieveSavedLicks(s)
  }

  render(): JSX.Element {
    return (
      <div className={styles.feedContainer}>
        {this.props.historyFeed.map(i =>
          <div key={Date.now() + Math.random()}>
            <div id={`abcjs-result-${i[0]}`} className={styles.feeditem} />
            <span className={styles.feedButtons}>
              <button>like</button>
              <button onClick={() => this.saveLick(i[0])}>save</button>
              <button>edit</button>
            </span>
          </div>
        )}
      </div>
    )
  }
}