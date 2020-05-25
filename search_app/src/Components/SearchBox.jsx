import React from 'react'
import {connect} from 'react-redux'
import Autosuggest from "react-autosuggest";
import {getSearchBooks, addBook, receiveBooks} from '../action/main_action'


class SearchBox extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            isSuggestionAccepted: false,
            selected_suggestion: {}
        }
        
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    }

    is_disabled(){
        if (this.state.value === ""){
            return true
        } else {
            return false
        }
    }

    onChange(event, {newValue}) {
        this.setState({ value: newValue }, () => {
            if(this.state.selected_suggestion.title !== this.state.value) {
                this.setState({isSuggestionAccepted: false, selected_suggestion: {}})
            }
        });
    }

    onSuggestionSelected(event, data) {
        this.setState({isSuggestionAccepted: true, selected_suggestion: data.suggestion});
    }

    onSuggestionsFetchRequested({value}) {
        if(value.length > 0 && this.state.isSuggestionAccepted === false && this.state.value !== value) {
            this.props.getBooks(value);
        } 
    };

    onSuggestionsClearRequested(){
        this.props.clearBooks()
    };

    getDefaultValue() {
        return this.state.value;
    }

    getSuggestionValue(suggestion) {
        return suggestion.title;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                <span>{suggestion.title}</span><br/>
            </div>
        );
    }

    render() {

        const inputProps = {
            placeholder: 'Search for the book',
            value: this.state.value,
            onChange: this.onChange,
            className: "form-control"
          };

        return (
            <div className="container-fluid search-container-height padding-t-b">
                <div className="text-center">
                    <h2>Search Books</h2>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 col-md-offset-3">
                        <form action="form-group">
                            <div className="">
                                <Autosuggest
                                    suggestions={this.props.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={inputProps}
                                    onSuggestionSelected={(event,data) => this.onSuggestionSelected(event, data)}
                                />
                                <button type="button" className="btn btn-primary m-t-md" disabled={this.is_disabled()}
                                    onClick={() => this.props.addBook(this.state.selected_suggestion)}>submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBooks:(data)=>{
			dispatch(getSearchBooks(data))
        },
        addBook: (book) => {
            dispatch(addBook(book))
        },
        clearBooks: () => {
            dispatch(receiveBooks([]))
        }
    }
}

function MapStateToProps(state){
	return {
        suggestions : state.search_books
	}
}

export default connect(MapStateToProps,mapDispatchToProps)(SearchBox)