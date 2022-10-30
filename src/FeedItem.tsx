import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import AbcVisualParams from 'abcjs'
import { feedItemType, renderAbcNotation } from "./util"

interface IFeedItemProps {
  parserParams: AbcVisualParams.AbcVisualParams,
  retrieveSavedLicks: (i: string) => void;
  recieveFork: (i: feedItemType) => void;
  historyFeed: feedItemType[];
}

export default class FeedItem extends PureComponent<IFeedItemProps> {
  constructor(props: IFeedItemProps) {
    super(props);
    this.saveLick = this.saveLick.bind(this);
    this.handleTranspose = this.handleTranspose.bind(this);
    this.handleFork = this.handleFork.bind(this);
  }

  getDate = () => new Date().toLocaleString()
  componentDidMount(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }
  componentDidUpdate(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }
  saveLick = (s: string): void => { this.props.retrieveSavedLicks(s) }
  handleTranspose = (e: any, i: feedItemType): void => renderAbcNotation(i[0], i[1],  {...i[2], visualTranspose: +e.target.value });
  handleFork(i: feedItemType): void { this.props.recieveFork(i) }

  render(): JSX.Element {
    return (
      <div className={styles.feedContainer} style={{width: "-webkit-fill-available"}}>
        {this.props.historyFeed.map(i =>
          <div key={Date.now() + Math.random()}>
            <div id={`abcjs-result-${i[0]}`} className={styles.feeditem} />
            <span className={styles.feedButtons}>
              <button onClick={() => this.saveLick(i[0])}>save</button>
              <button onClick={() => this.handleFork(i)}>fork</button>
              <span>transposition<input type='number' min='-24' max='24' placeholder='0' onChange={(e) => this.handleTranspose(e, i)} /></span>
              {i.length > 3 && <span>{i[3]}</span>}
              <span id={styles.date}>{this.getDate()}</span>
            </span>
          </div>
        )}
      </div>
    )
  }
}