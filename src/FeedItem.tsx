import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import abcjsObj from 'abcjs'
import AbcVisualParams from 'abcjs'


interface IFeedItemProps {
  abcNotation: string,
  parserParams: AbcVisualParams.AbcVisualParams,
  retrieveSavedLicks?: (i: string) => void
  uniqueID?: string
}

interface RequiredProps {
  abcNotation: string,
  parserParams: AbcVisualParams.AbcVisualParams,
}

class FeedItem extends PureComponent<IFeedItemProps> {
  constructor(props: IFeedItemProps) {
    super(props);

    this.saveLick = this.saveLick.bind(this);
  }

  uniqueNumber = Date.now() + Math.random();

  renderAbcNotation({ abcNotation, parserParams }: RequiredProps): void {
    abcjsObj.renderAbc(
      `abcjs-result-${this.uniqueNumber}`,
      abcNotation,
      parserParams
    )
  }

  componentDidMount(): void {
    const { abcNotation, parserParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams })
  }

  componentDidUpdate(): void {
    const { abcNotation, parserParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams })
  }

  saveLick = (e: any): void => {
    console.log("id");
    this.props.retrieveSavedLicks?.("id")
  }

  render(): JSX.Element {
    return (
      <div className={styles.feedContainer}>
        <div id={`abcjs-result-${this.uniqueNumber}`} className={styles.feeditem} />
        <span className={styles.feedButtons}>
          <button>like</button>
          <button onClick={(e) => this.saveLick(e)}>save</button>
          <button>edit</button>
        </span>
      </div>
    )
  }
}

export default FeedItem