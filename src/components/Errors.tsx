import * as React from 'react';

const textError = {
    color: '#eb2b4f',
    fontSize: '12px',
    fontFamily: 'Work Sans',
    lineHeight: '25px',
    marginTop: '0px',
};

export class TextError extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { error: props.error };
    }

    public render() {
        return (
            <div>
                <p style={textError}>{this.state.error}</p>
            </div>
        );
    }
}
