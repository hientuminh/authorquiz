import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';

const authors = [
    {
        name: 'Hien',
        imageUrl: 'images/authors/hien.jpg',
        imageSource: '',
        books: ['Thejlj']
    }
]

const state = {
    turnData: {
        author: authors[0],
        book: authors[0].books
    }
}
ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
