import React from 'react'
import {connect} from 'react-redux'
import SearchBox from './SearchBox'
import DisplayGrid from './DisplayGrid'

class SearchBook extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    is_disabled(){
        if (this.state.text === ""){
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="container-fluid ">
                <SearchBox />
                {/* <DisplayGrid /> */}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    null,
    mapDispatchToProps
)(SearchBook)