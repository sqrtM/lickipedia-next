import * as abc from 'abcjs';

export type feedItemType = [
    uniqueID: string, 
    musicNotation: string, 
    params: abc.AbcVisualParams,
];

export const renderAbcNotation = (ID: string, abcNotation: string, parserParams: abc.AbcVisualParams): void => {
    abc.renderAbc(`abcjs-result-${ID}`, abcNotation, parserParams);
  }
