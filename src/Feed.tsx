import React from 'react';
import autosize from 'autosize';

import styles from '../styles/Feed.module.scss';

import FeedItem from './FeedItem';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';
import { feedItemType, defaultFeedParams } from './util';


// why UUID? Because other serialization functions
// would cause different floating point problems and
// other weird issues. giving each lick a UUID means
// it will be easy to tell everything apart. We
// can also make unique URLs with this later.
import { v4 as uuidv4 } from 'uuid';
import { AbcVisualParams, Editor } from 'abcjs';

export interface IFeedProps {
}

export interface IFeedState {
  title: string;
  key: string;
  composer: string;
  Clef: string;
  music: string;
  parent: string;

  history: feedItemType[];

  savedNotation: feedItemType[];
  savedLicks: string[];

  editorShown: boolean;
}


export default class Feed extends React.Component<IFeedProps, IFeedState> {
  // this is declared as "any", because if I declare it as an HTML element,
  // (which it is), it gets angry. any works, though, which is weird.
  textarea: any;
  constructor(props: IFeedProps) {
    super(props);

    this.state = {
      title: '',
      key: 'C',
      composer: '',
      Clef: 'treble',
      music: '',
      parent: '',

      history: [],

      savedNotation: [],
      savedLicks: [],

      editorShown: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveSavedLicks = this.retrieveSavedLicks.bind(this);
    this.recieveFork = this.recieveFork.bind(this);
  }


  componentDidMount(): void {
    autosize(this.textarea);
  }

  // this creates the editor.
  // however, it KEEPS CREATING
  // the editor over and over.
  // not efficent! can I fix this? ??? 
  componentDidUpdate(): void {
    const e = new Editor(
      "music",
      {
        canvas_id: "paper",
        warnings_id: "warnings",
        abcjsParams: defaultFeedParams,
      });
    autosize.update(this.textarea)
  }

  handleChange(event: { target: { name: string, value: any; } }): void {
    const target = event.target;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  }

  // this formats a UUID, a tuneString, the default parameters;
  // and a locale string which gets sent into the history 
  // to be sent into the FeedItems.
  handleSubmit(event: { preventDefault: () => void; }): void {
    let newString: string = `T:${this.state.title}\nM:4/4\nC:${this.state.composer}\nK:${this.state.key} clef=${this.state.Clef}\n${this.state.music}`;
    let params: AbcVisualParams = defaultFeedParams;
    let newFeedItem: feedItemType = [uuidv4(), newString, params, this.state.parent, new Date().toLocaleString()];
    this.setState({
      ...this.state,    // clear state on submit.
      title: '',
      key: 'C',
      composer: '',
      Clef: 'treble',
      music: '',
      parent: '',
      // "unshift" the newFeedItem into the history.
      // so it appears on top of the feed.
      history: [newFeedItem, ...this.state.history],
    });
    alert('The following lick has been submitted: ' + newString);
    event.preventDefault();
  }

  // this takes the saved licks from the FeedItem component and sends them to be state,
  // so they can be sent to the RightColumn.
  retrieveSavedLicks = (id: string): void => {
    let newSavedNotation: feedItemType[] = [...this.state.savedNotation];
    if (!this.state.savedLicks.includes(id)) {
      this.state.history.forEach(j => { if (j.includes(id)) { newSavedNotation.unshift(j) } })
      this.setState({
        ...this.state,
        savedLicks: [...this.state.savedLicks, id],
        savedNotation: [...newSavedNotation]
      });
    }
  }

  // take the info from a forked lick and
  // put it into state. this will populate
  // the text fields and create the readonly
  // parent field to put on the new child lick
  recieveFork = (fork: feedItemType): void => {
    // lots of string manip to get the 'tune object'
    // to split properly into the different text fields
    let musicArray = fork[1].split(`\n`, 5);
    this.setState({
      ...this.state,
      title: musicArray[0].split(":")[1],
      composer: musicArray[2].split(":")[1],
      key: musicArray[3].split(":")[1].split(" ")[0],
      Clef: musicArray[3].split("=")[1],
      music: musicArray[4],
      parent: fork[0],
    });
  }

  public render(): JSX.Element {
    return (
      <div id={styles.window}>
        <div id={styles.WindowLeftCol}>
          <LeftColumn />
        </div>
        <div className={styles.feed}>
          <div id={styles.inputfield}>
            <form id={styles.form} onSubmit={this.handleSubmit}>
              <label>
                <span id={styles.inputTopRow}>
                  <input type='text' name='title' placeholder='title' value={this.state.title} onChange={this.handleChange} />
                  <input type='text' name='key' placeholder='key' value={this.state.key} onChange={this.handleChange} />
                </span>
                <span className={styles.inputRowRow}>
                  <input type='text' name='composer' placeholder='composer' value={this.state.composer} onChange={this.handleChange} />
                  <span id={styles.radio}>
                    <input type="radio" name='Clef' value='treble' onChange={this.handleChange} checked={this.state.Clef === 'treble'} /> treble
                    <input type="radio" name='Clef' value='bass' onChange={this.handleChange} checked={this.state.Clef === 'bass'} /> bass
                  </span>
                </span>
                <div className={styles.inputRowCol}>
                  <textarea 
                    name='music' 
                    id="music" 
                    placeholder='music' 
                    value={this.state.music} 
                    onChange={this.handleChange} 
                    ref={c => (this.textarea = c)} 
                    rows={1} 
                  />
                  <span className={styles.parent}>
                    {this.state.parent &&
                      <input type='textarea' value={this.state.parent} readOnly />
                    }
                  </span>
                </div>
              </label>
              <input type='button' name='editor' value='editor' onClick={() => this.setState({ editorShown: !this.state.editorShown })} />
              {this.state.editorShown &&
                <div>
                  <div id="paper"></div>
                  <div id="warnings" style={{ color: "#BB68FC" }}></div>
                </div>
              }
              <input type="submit" value='submit' />
            </form>
          </div>
          <div>
            <FeedItem
              historyFeed={this.state.history}
              parserParams={defaultFeedParams}
              retrieveSavedLicks={this.retrieveSavedLicks}
              recieveFork={this.recieveFork}
            />
          </div>
        </div>
        <div id={styles.WindowRightCol}>
          <RightColumn
            savedLicks={this.state.savedLicks}
            historyFeed={this.state.history}
            savedNotation={this.state.savedNotation}
          />
        </div>
      </div>
    );
  }
}