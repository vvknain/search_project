import React from 'react'
import SearchBox from './SearchBox'
import DisplayGrid from './DisplayGrid'

export default class SearchBook extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid ">
                <SearchBox />
                <DisplayGrid />
            </div>
        )
    }
}