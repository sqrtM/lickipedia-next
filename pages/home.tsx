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

3.) One thing I would like to see is when you click on the "New Lick" input form, it should show a preview window of what you're writing. 

4.) Obviously, the "more" menu should exist, but this is not essential to the basic functioning, so it's fine for now.

5.) Left column will be a preview for the saved licks ??? interesting idea. like, onClick, it sends the data from the right to the left
and the music appears on the left column. could be cool since I don't really care about this being a 'social media' site.
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
