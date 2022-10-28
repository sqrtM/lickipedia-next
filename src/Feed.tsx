import React from 'react';
import '../styles/App.module.scss';
import FeedItem from './FeedItem';

export interface IFeedProps {
}

export interface IFeedState {
  title: string;
  key: string;
  tClef: boolean;
  music: string;

  history: string[];
}

export default class Feed extends React.Component<IFeedProps, IFeedState> {
  constructor(props: IFeedProps) {
    super(props);

    this.state = {
      title: '',
      key: '',
      tClef: false,
      music: '',

      history: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: { name : string, value: any; } }): void {
    const target = event.target;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  }

  handleSubmit(event: { preventDefault: () => void; }): void {
    let newString: string = `T:${this.state.title}\nM:4/4\nC:Trad.\nK:${this.state.key} clef=${this.state.tClef ? 'treble' : 'bass'}\n${this.state.music}`;
    this.setState({
      ...this.state,
      history: [...this.state.history, newString],
    });
    alert('The following lick has been submitted: ' + newString);
    event.preventDefault();
  }

  public render() {
    return (
      <div className="feed">
        <div id='input-field'>
          <form onSubmit={this.handleSubmit}>
            <label>
              New Lick :
              <input type='text' name='title' placeholder='title' onChange={this.handleChange}/>
              <input type='text' name='key' placeholder='key' onChange={this.handleChange}/>
              <input type='text' name='music' placeholder='music' onChange={this.handleChange}/>
            </label>
            <input type="submit" value='submit' />
          </form> 
        </div>
        <div>
          { this.state.history.reverse().map(i => 
          <FeedItem
            abcNotation={i}
            parserParams={{}}
            engraverParams={{ responsive: 'resize' }}
            renderParams={{ viewportHorizontal: true }}
          />) }
        </div>
      </div>
    );
  }
}