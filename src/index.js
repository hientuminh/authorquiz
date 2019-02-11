import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from  'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import { shuffle, sample } from 'underscore';
import * as serviceWorker from './serviceWorker';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/mark-twain.jpg',
        books: [
            'Huckleberry Finn',
            'Tom Sawyer',
            'A Connecticut Yankee at King Arthur\'s Court'
        ]
    },
    {
        name: 'Jane Austen',
        imageUrl: 'images/authors/jane-austen.jpg',
        books: [
            'Pride and Prejudice',
            'Sense and Sensibility',
            'Emma'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/joseph-conrad.png',
        books: [
            'Heart of Darkness'
        ]
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charles-dickens.jpg',
        books: [
            'A Tale of Two Cities',
            'A Christmas Carol',
            'David Copperfield',
            'Bleak House'
        ]
    },
    {
        name: 'Sigmunnd Freud',
        imageUrl: 'images/authors/sigmund-freud.jpg',
        books: [
            'Jokes and Their Relation to the Unconscious',
            'Civilization and Its Discontents',
            'The Interpretation of Dreams'
        ]
    },
    {
        name: 'Friedrich Nietzsche',
        imageUrl: 'images/authors/friedrich-nietzsche.jpg',
        books: [
            'Thus Spake Zarathustra',
            'Ecce Homo',
            'Beyond Good and Evil',
            'Twilight of the Idols'
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/william-shakespeare.jpg',
        books: [
            'King Lear',
            'A Midsummer Night\'s Dream',
            'Hamlet',
            'Richard III',
            'The Comedy of Errors'
        ]
    }
]

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p , c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBook = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBook);

    return {
        books: fourRandomBook,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((b) => b === action.answer);
            return Object.assign({}, state, { highlight: isCorrect? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, { highlight: '', turnData: getTurnData(state.authors)});
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {authors: state.authors.concat([action.author])});
        default:
            return state;
    }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AuthorQuiz} />
            <Route path="/add" component={AddAuthorForm} />
        </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root')
);
serviceWorker.unregister();
