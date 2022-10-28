import * as React from 'react';
import styles from '../styles/RightColumn.module.scss'

export interface IRightColumnProps {
    savedLicks: number[],
}

export default class RightColumn extends React.Component<IRightColumnProps> {
    constructor(props: IRightColumnProps) {
        super(props)
    }

    public render(): JSX.Element {
        return (
            <div>
                Saved Licks:
                { this.props.savedLicks.map(i => { return(
                    <div>
                        <div key={i}>
                            {i}
                        </div>
                    </div>
                )})}
            </div>
        );
    }
}
