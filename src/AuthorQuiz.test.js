import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()})

const state = {
  turnData: {
    books: ['Huckleberry Finn', 'Pride and Prejudice', 'A Tale of Two Cities', 'Jokes and Their Relation to the Unconscious'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/mark-twain.jpg',
      books: [
        'Huckleberry Finn',
        'Tom Sawyer',
        'A Connecticut Yankee at King Arthur\'s Court'
      ]
    },
  },
  highlight: 'none'
}

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  });

  describe('when no answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    });

    it('should have no background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  });

  describe('when wrong answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}} />);
    });

    it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    })
  });

  describe('when correct answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}} />);
    });

    it('should have green background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    })
  });

  describe('when the first answer is selected', () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');
    });

    it('handleAnswerSelected should be call', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('selected receive Huckleberry Finn', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith('Huckleberry Finn');
    });
  });
})

