import React, { PureComponent } from 'react'
import styles from '../styles/FeedItem.module.scss'
import PropTypes from 'prop-types'
import abcjsObj from 'abcjs'
import AbcVisualParams from 'abcjs'

interface IFeedItemProps {
  abcNotation: string,
  parserParams: AbcVisualParams.AbcVisualParams, 
}

class FeedItem extends PureComponent<IFeedItemProps> {
  uniqueNumber = Date.now() + Math.random();
  static propTypes: { 
    abcNotation: PropTypes.Requireable<string>; 
    parserParams: PropTypes.Requireable<AbcVisualParams.AbcVisualParams>; 
  }
  static defaultProps: { 
    abcNotation: string; 
    parserParams: AbcVisualParams.AbcVisualParams; 
  }

  renderAbcNotation({ abcNotation, parserParams }: IFeedItemProps): void {
    abcjsObj.renderAbc(
      'abcjs-result-' + this.uniqueNumber,
      abcNotation,
      parserParams
    )
  }

  componentDidMount() {
    const { abcNotation, parserParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams })
  }

  componentDidUpdate() {
    const { abcNotation, parserParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams })
  }

  render() {
    return (
      <div>
        <div id={'abcjs-result-' + this.uniqueNumber} className={styles.feeditem} />
      </div>
    )
  }
}

export default FeedItem