// utility functions and types which are used across the app

import * as abc from 'abcjs';

export type feedItemType = [
    uniqueID: string,
    musicNotation: string,
    params: abc.AbcVisualParams,
    parent: string,
    date: string
];

export const renderAbcNotation = (ID: string, abcNotation: string, parserParams: abc.AbcVisualParams): void => {
    abc.renderAbc(`abcjs-result-${ID}`, abcNotation, parserParams);
}

// using "responsive: "resize"" doesn't work with the saved ones, but it does work with the main feed,
// so we will have two different sets of default parameters. One for the main feed, and the other for
// the "saved items" feed. 
// i believe this is because  { responsive: "resize" } overrides the classname of the .svg, and gets
// rid of the "onHover" command. this could probably be DOUBLY overridden, but that seems quite 
// weird for a relatively minor problem. Just make sure there is no "resposive" on the saved items.
export const defaultFeedParams = {
    responsive: "resize",
    staffwidth: 720,
    wrap: {
        preferredMeasuresPerLine: 4,
        minSpacing: 0,
        maxSpacing: 0
    },
    jazzchords: true,
    selectionColor: "#03DAC6",
    paddingright: 15,
    visualTranspose: 0,
};
