let model = {
  running: false,
  time: 0
};

const update = (model = {running: false, time: 0}, action) => {
  const updates = {
    'TICK': (model) => Object.assign(model, {time: model.time + (model.running? 1: 0)}),
    'START': (model) => Object.assign(model, {running: true}),
    'STOP': (model) => Object.assign(model, {running: false}),
    'RESET': (model) => Object.assign(model, {running: false, time: 0})
  };
  return (updates[action.type] || (() => model))(model);
};

let view =  (m) => {
  let minutes = Math.floor(m.time/60);
  let seconds = m.time - (minutes * 60);
  let secondFormatted = `${seconds < 10 ? '0': ''}${seconds}`;
  let handler = (event) => {
    //OLD: model = update(model, m.running ? 'STOP' : 'START')
    container.dispatch(m.running ? {type: 'STOP'} : {type: 'START'});
  }

  let handlerReset = (event) => {
    container.dispatch({type: 'RESET'});
  }

  return <div>
    <p>{minutes}:{secondFormatted}</p>
    <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
    <button onClick={handlerReset}>Reset</button>
  </div>
}
/*
const createStore = (reducer) => {
  let internalState;
  let handlers = [];
  return {
    dispatch: (intent) => {
      internalState = reducer(internalState,intent);
      handlers.forEach(h => {h(); });
    },
    subscribe: (handler) => {
      handlers.push(handler);
    },
    getState: () => internalState
  }
}
*/
let container = Redux.createStore(update);

let intents = {
  TICK: 'TICK',
  STOP: 'STOP',
  START: 'START',
  RESET: 'RESET'
}

const render = () => {
  //ReactDOM.render(view(model),
  //  document.getElementById('root')
  //);
  ReactDOM.render(view(container.getState()),
    document.getElementById('root')
  );
}
//render();
container.subscribe(render);

setInterval(() => {
  //model = update(model, 'TICK');
  //render();
  container.dispatch({type:'TICK'});
}, 1000)
