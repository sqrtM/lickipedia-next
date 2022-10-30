import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import AbcVisualParams, { renderAbc, strTranspose, TuneObject, TuneObjectArray } from 'abcjs'
import { feedItemType, renderAbcNotation, defaultFeedParams } from "./util"

interface IFeedItemProps {
  parserParams: AbcVisualParams.AbcVisualParams,
  retrieveSavedLicks: (i: string) => void
  historyFeed: feedItemType[]
}

export default class FeedItem extends PureComponent<IFeedItemProps> {
  constructor(props: IFeedItemProps) {
    super(props);
    this.saveLick = this.saveLick.bind(this);
    this.handleTranspose = this.handleTranspose.bind(this);
  }

  componentDidMount(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }
  componentDidUpdate(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }
  saveLick = (s: string): void => { this.props.retrieveSavedLicks(s) }
  handleTranspose = (e: any, i: feedItemType): void => renderAbcNotation(i[0], i[1],  {...i[2], visualTranspose: +e.target.value });

  render(): JSX.Element {
    return (
      <div className={styles.feedContainer}>
        {this.props.historyFeed.map(i =>
          <div key={Date.now() + Math.random()}>
            <div id={`abcjs-result-${i[0]}`} className={styles.feeditem} />
            <span className={styles.feedButtons}>
              <button onClick={() => this.saveLick(i[0])}>save</button>
              <button>fork</button>
              transposition<input type='number' min='-24' max='24' onChange={(e) => this.handleTranspose(e, i)} />
              <span id={styles.date}>{new Date().toLocaleString()}</span>
            </span>
          </div>
        )}
      </div>
    )
  }
}