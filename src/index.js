import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
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

function onAnswerSelected(answer) {
    console.log("===")
    const isCorrect = state.turnData.author.books.some((b) => b === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
}

function App() {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}

function AddAuthorForm({match}) {
    return <div>
        <h1>Add Author</h1>
        <p>{JSON.stringify(match)}</p>
    </div>
}

function render() {
    ReactDOM.render(
    <BrowserRouter>
    <React.Fragment>
    <Route exact path="/" component={App} />
        <Route path="/add" component={AddAuthorForm} />
    </React.Fragment> 
    </BrowserRouter>, document.getElementById('root'));
}
render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
