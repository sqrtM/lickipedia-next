import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import abcjsObj from 'abcjs'

declare module "abcjs"; 

interface IFeedItemProps {
  abcNotation: string,
  parserParams: any, 
  engraverParams: any, 
  renderParams: any
}

class FeedItem extends PureComponent<IFeedItemProps> {
  uniqueNumber = Date.now() + Math.random();
  static propTypes: { 
    abcNotation: PropTypes.Requireable<string>; 
    parserParams: PropTypes.Requireable<object>; 
    engraverParams: PropTypes.Requireable<object>;
    renderParams: PropTypes.Requireable<object>;
  }
  static defaultProps: { 
    abcNotation: string; 
    parserParams: {}; 
    engraverParams: { 
      responsive: string 
    }; 
    renderParams: { 
      viewportHorizontal: boolean 
    } }

  renderAbcNotation({ abcNotation, parserParams, engraverParams, renderParams }: IFeedItemProps): void {
    abcjsObj.renderAbc(
      'abcjs-result-' + this.uniqueNumber,
      abcNotation,
      parserParams,
      //engraverParams,
      //renderParams
    )
  }

  componentDidMount() {
    const { abcNotation, parserParams, engraverParams, renderParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams, engraverParams, renderParams })
  }

  componentDidUpdate() {
    const { abcNotation, parserParams, engraverParams, renderParams } = this.props
    this.renderAbcNotation({ abcNotation, parserParams, engraverParams, renderParams })
  }

  render() {
    return (
      <div>
        <div id={'abcjs-result-' + this.uniqueNumber} className="feedItem" />
      </div>
    )
  }
}

FeedItem.propTypes = {
  abcNotation: PropTypes.string,
  parserParams: PropTypes.object,
  engraverParams: PropTypes.object,
  renderParams: PropTypes.object,
}

FeedItem.defaultProps = {
  abcNotation: '',
  parserParams: {},
  engraverParams: { responsive: 'resize' },
  renderParams: { viewportHorizontal: true },
}

export default FeedItem