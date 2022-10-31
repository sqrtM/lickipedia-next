import { renderAbc } from 'abcjs';
import * as React from 'react';
import styles from '../styles/RightColumn.module.scss'
import { feedItemType } from "./util"

export interface IRightColumnProps {
  savedLicks: string[],
  historyFeed: feedItemType[],
  savedNotation: feedItemType[],
}

// using "responsive: "resize"" doesn't work with the saved ones, but it does work with the main feed,
// so we will have two different sets of default parameters. One for the main feed, and the other for
// the "saved items" feed. 
// i believe this is because  { responsive: "resize" } overrides the classname of the .svg, and gets
// rid of the "onHover" command. this could probably be DOUBLY overridden, but that seems quite 
// weird for a relatively minor problem. Just make sure there is no "resposive" on the saved items.
const defaultSavedParams = {
  staffwidth: 525,
  wrap: {
    preferredMeasuresPerLine: 4,
    minSpacing: 0,
    maxSpacing: 0
  },
  jazzchords: true,
  selectionColor: "#03DAC6",
  paddingright: 15,
}


export default class RightColumn extends React.Component<IRightColumnProps> {
  constructor(props: IRightColumnProps) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover = () => this.props.savedNotation.forEach(i => renderAbc(`abcjs-saved-${i[0]}`, i[1], defaultSavedParams));

  public render(): JSX.Element {
    return (
      <div className={styles.rightColumn}>
        {this.props.savedLicks.map(i =>
          <div key={`RCdiv-${Math.random() + Date.now()}`} className={styles.savedLicks}>
            <span className={styles.lickName} onMouseEnter={this.handleHover} >{i}</span>
            <div className={styles.tooltip} id={`abcjs-saved-${i}`} />
          </div>
        )}
      </div>
    );
  }
}
