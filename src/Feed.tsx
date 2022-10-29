import React from 'react';
import styles from '../styles/Feed.module.scss';
import FeedItem from './FeedItem';
import RightColumn from './RightColumn';

declare module uuidv4 {}
import {v4 as uuidv4} from 'uuid';
let newUUID = uuidv4();

export interface IFeedProps {
}

export interface IFeedState {
  title: string;
  key: string;
  composer: string,
  tClef: boolean,
  music: string,

  history: string[],

  savedLicks: string[],
}

export default class Feed extends React.Component<IFeedProps, IFeedState> {
  constructor(props: IFeedProps) {
    super(props);

    this.state = {
      title: '',
      key: '',
      composer: '',
      tClef: false,
      music: '',

      history: [],

      savedLicks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveSavedLicks = this.retrieveSavedLicks.bind(this)
  }

  handleChange(event: { target: { name: string, value: any; } }): void {
    const target = event.target;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  }

  handleSubmit(event: { preventDefault: () => void; }): void {
    let newString: string = `T:${this.state.title}\nM:4/4\nC:${this.state.composer}\nK:${this.state.key} clef=${this.state.tClef ? 'treble' : 'bass'}\n${this.state.music}`;
    this.setState({
      ...this.state,
      history: [newString, ...this.state.history],
    });
    alert('The following lick has been submitted: ' + newString);
    event.preventDefault();
  }

  retrieveSavedLicks = (i: string) => {
    console.log(i)
    if (!this.state.savedLicks.includes(i)) {
      this.setState({
        ...this.state,
        savedLicks: [...this.state.savedLicks, i]
      })
    }
  }

  public render(): JSX.Element {
    return (
      <div id={styles.window}>
        <div id={styles.leftColumn}>
          Hello
        </div>
        <div className={styles.feed}>
          <div id={styles.inputfield}>
            <form id={styles.form} onSubmit={this.handleSubmit}>
              <label>
                New Lick :
                <span><input type='text' name='title' placeholder='title' onChange={this.handleChange} /></span>
                <span><input type='text' name='key' placeholder='key' onChange={this.handleChange} /></span>
                <span><input type='text' name='composer' placeholder='composer' onChange={this.handleChange} /></span>
                <span>
                  <input type="radio" name='tClef' value='true' onChange={this.handleChange} checked /> treble
                  <input type="radio" name='tClef' value='false' onChange={this.handleChange} /> bass
                </span>
                <div><input type='textarea' name='music' placeholder='music' onChange={this.handleChange} id={styles.musicInput} /></div>
              </label>
              <input type='button' name='more' value='more' />
              <input type="submit" value='submit' />
            </form>
          </div>
          <div key={`feeddiv-${Math.random() + Date.now()}`}>
            {this.state.history.map(i =>
              <FeedItem
                uniqueID={newUUID}
                abcNotation={i}
                parserParams={{ staffwidth: 720, wrap: { preferredMeasuresPerLine: 4, minSpacing: 0, maxSpacing: 0 } }}
                retrieveSavedLicks={this.retrieveSavedLicks}
              />)}
          </div>
        </div>
        <div id={styles.rightColumn}>
          <RightColumn savedLicks={this.state.savedLicks} />
        </div>
      </div>
    );
  }
}