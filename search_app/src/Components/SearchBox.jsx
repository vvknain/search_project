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
            <span>{suggestion.title}</span>
        );
    }

    onSubmit(){
        this.setState({value: ""})
        this.props.addBook(this.state.selected_suggestion)
    }

    render() {

        const inputProps = {
            placeholder: 'Search for the book',
            value: this.state.value,
            onChange: this.onChange
          };

        return (
            <div className="container-fluid search-container-height padding-t-b">
                <div className="text-center padding-t-b">
                    <h2 style={{fontWeight: 400}}>Search Books</h2>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
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
                        </div>
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-lg btn-primary" disabled={this.is_disabled()}
                            onClick={() => this.onSubmit()}>submit
                        </button>
                    </div>
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