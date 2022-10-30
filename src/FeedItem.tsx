import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import AbcVisualParams, { renderAbc, strTranspose, TuneObject, TuneObjectArray } from 'abcjs'

import { feedItemType, renderAbcNotation } from "./util"

const defaultFeedParams = { 
  responsive: "resize", 
  staffwidth: 720, 
  wrap: { 
    preferredMeasuresPerLine: 4, 
    minSpacing: 0, 
    maxSpacing: 0 
  }, 
  jazzchords: true,
  selectionColor: "#03DAC6",
  paddingright: 15,
}


interface IFeedItemProps {
  parserParams: AbcVisualParams.AbcVisualParams,
  retrieveSavedLicks: (i: string) => void
  historyFeed: feedItemType[]
}

export default class FeedItem extends PureComponent<IFeedItemProps> {
  constructor(props: IFeedItemProps) {
    super(props);
    this.saveLick = this.saveLick.bind(this);
    // this.handleTranspose = this.handleTranspose.bind(this);
  }

  componentDidMount(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }

  componentDidUpdate(): void { this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2])) }
  
  saveLick = (s: string): void => { this.props.retrieveSavedLicks(s) }

  /*
  con't figure out how to get a transpose to work, so putting it away for now.
  maybe later!
  
  handleTranspose = (e: any, i: feedItemType): void => {
    let visualObj: TuneObjectArray = renderAbc(`abcjs-result-${i[0]}`, i[1]);
    let tranString: any = strTranspose(i[1], visualObj[0], +e.target.value);
    console.log(tranString, i[1]);
    renderAbcNotation(i[0], tranString, i[2]);
  }
  */

  render(): JSX.Element {
    return (
      <div className={styles.feedContainer}>
        {this.props.historyFeed.map(i =>
          <div key={Date.now() + Math.random()}>
            <div id={`abcjs-result-${i[0]}`} className={styles.feeditem} />
            <span className={styles.feedButtons}>
              <button onClick={() => this.saveLick(i[0])}>save</button>
              <button>fork</button>
            </span>
          </div>
        )}
      </div>
    )
  }
}