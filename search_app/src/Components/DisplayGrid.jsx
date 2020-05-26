import React from 'react'
import {connect} from 'react-redux'


class DisplayGrid extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        var x = this.props.books.length
        return (
            <div className="container-fluid search-container-height padding-t-b">
                <div className="row">
                    {this.props.books.map((book,j) => {
                       return (
                            <div key={j} className={`col-md-${j < Math.floor(x / 3) * 3 ? "4" : (x % 3 === 1? "12": "6")} col-sm-6`}>
                                <div className="panel b-a box-shadow-lg r-2x m-b-xl">
                                    <div className="p-sm b-b text-ellipsis">
                                        <span>
                                            <b>{book.title}</b>
                                        </span>
                                    </div>
                                    <div className="p-sm b-b grid-height">
                                        <div className="dis-in">{book.summary}</div>
                                    </div>
                                    <div className="p-sm">
                                        <span>{book.author}</span>
                                    </div>
                                </div>
                            </div>
                       )
                    })}
                </div>
                {!this.props.books.length && 
                    <div className="text-center">
                        <h5>No Book is Selected</h5>
                    </div>
                }
            </div>
        )
    }
}

function MapStateToProps(state){
	return {
        books : state.books
	}
}

export default connect(MapStateToProps)(DisplayGrid)
