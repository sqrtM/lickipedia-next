import * as React from 'react';
import styles from '../styles/LeftColumn.module.scss'

export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  public render() {
    return (
      <div id={styles.LeftColumn}>
        <div className={styles.title}>
          Lickipedia
        </div>
      </div>
    );
  }
}
