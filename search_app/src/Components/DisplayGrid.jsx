import React from 'react'
import {suggestionsData} from "./SuggestionsData";


export default class DisplayGrid extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="container-fluid search-container-height ">
                <div className="row">
                    {suggestionsData.map((book,j)=>{
                       return (
                            <div className="col-md-4">
                                <div className="panel panel-default r-2x b-a box-shadow-lg p-sm">
                                    <div className="hbox p-b-xs">
                                        <div className="col w-xs text-bold">
                                            <b>{book.title}</b>
                                        </div>
                                        <div className = "m-t-md">
                                            {book.summary}    
                                        </div>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <div className = "">
                                            {book.author}
                                        </div>
                                    </div>
                                </div>
                            </div>
                       )
                    })}
                </div>
            </div>
        )
    }
}
