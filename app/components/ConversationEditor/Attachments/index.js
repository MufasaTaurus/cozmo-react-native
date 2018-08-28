import React from 'react';
import SVG from 'components/SVG';


export class Attachments extends React.Component {

    render() {
        return (
            <div className="text-editor-attachments">
                { this.props.attachments.map((a, index) => {
                    const size = (a.file.size / 1000000).toFixed(2) + 'MB';
                    const isPDF = a.file.type === 'application/pdf';
                    return (
                        <div className="file" key={ index }>
                            <div className="preview">
                                { isPDF ? <SVG icon="file" size="50"/> : <img src={ a.src } width={ 50 } height={ 50 }/> }
                            </div>
                            <div className="info">
                                <span className="cancel" onClick={ () => this.props.onRemove( index ) }>
                                    <SVG icon="cancel" size="18" />
                                </span>
                                <div className="size">{ size }</div>
                                <div>{ a.file.name }</div>
                            </div>
                        </div>
                    );
                }) }
            </div>
        );
    }
}

export default Attachments;

