import * as React from 'react';
import Feed from '../src/Feed';

/*
Problems to fix:
1.) because I am reversing the map array, the unique IDs get placed backwards from the HTML elements.
Find a way to ensure that the feed goes backwards, but the IDs remain the same (unshifting ???).

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
