import * as React from 'react';
import Feed from '../src/Feed';

/*
Problems to fix:
1.) a like button AND a save button is probably unnecessary since this isn't a social media webside.
we will get rid of like, and change "edit" to "fork" so it will work much the same way 
shadersandbox or Hydrasandbox work, wherein you can fork someone's lick and create your own.
ideally with a lineage shown as well. Easy transposition is also a necessity.

2.) Add additional information to the feed items. Date, author???, and tags are a minimum, but 
maybe there's other stuff worth putting there. 
*/

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <Feed />
      </div>
    );
  }
}
