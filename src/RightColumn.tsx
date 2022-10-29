import * as React from 'react';
import styles from '../styles/RightColumn.module.scss'
import { feedItemType, renderAbcNotation } from "./util"



export interface IRightColumnProps {
  savedLicks: string[],
  historyFeed: feedItemType[],
}

export default class RightColumn extends React.Component<IRightColumnProps> {
  constructor(props: IRightColumnProps) {
    super(props)
  }

  componentDidUpdate(): void {
    this.props.historyFeed.forEach(i => renderAbcNotation(i[0], i[1], i[2]))
  }

  public render(): JSX.Element {
    return (
      <div className={styles.rightColumn}>
        Saved Licks:
        {this.props.savedLicks.map(i =>
          <div key={`RCdiv-${Math.random() * Date.now()}`} className={styles.savedLicks}>
            <span className={styles.lickName}>{i}</span>
            <div className={styles.tooltip} id={`abcjs-result-${i}`} >music will appear on hover...</div>
          </div>
        )}
      </div>
    );
  }
}
