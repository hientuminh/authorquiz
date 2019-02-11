// https://codepen.io/hientuminh/project/editor/XmnyVm
let model = {
  running: false,
  time: 0
};

const update = (model = {running: false, time: 0}, intent) => {
  const updates = {
    'TICK': (model) => Object.assign(model, {time: model.time + (model.running? 1: 0)}),
    'START': (model) => Object.assign(model, {running: true}),
    'STOP': (model) => Object.assign(model, {running: false})
  };
  return (updates[intent] || (() => model))(model);
};

let view =  (m) => {
  let minutes = Math.floor(m.time/60);
  let seconds = m.time - (minutes * 60);
  let secondFormatted = `${seconds < 10 ? '0': ''}${seconds}`;
  let handler = (event) => {
    //OLD: model = update(model, m.running ? 'STOP' : 'START')
    container.dispatch(m.running ? 'STOP' : 'START');
  }

  return <div>
    <p>{minutes}:{secondFormatted}</p>
    <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
  </div>
}

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

let container = createStore(update);

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
  container.dispatch('TICK');
}, 1000)

/*
- Chạy vào dispath('TICK')=
*/
