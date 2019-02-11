let model = {
  running: false,
  time: 0
};

const update = (model = {running: false, time: 0}, action) => {
  const updates = {
    'TICK': (model) => Object.assign({}, model, {time: model.time + (model.running? 1: 0)}),
    'START': (model) => Object.assign({}, model, {running: true}),
    'STOP': (model) => Object.assign({}, model, {running: false}),
    'RESET': (model) => Object.assign({}, model, {running: false, time: 0})
  };
  return (updates[action.type] || (() => model))(model);
};

let Stopwatch =  ReactRedux.connect(mapStateToProps, mapDispatchToProps)((props) => {
  let minutes = Math.floor(props.time/60);
  let seconds = props.time - (minutes * 60);
  let secondFormatted = `${seconds < 10 ? '0': ''}${seconds}`;

  return <div>
    <p>{minutes}:{secondFormatted}</p>
    <button onClick={props.running ? props.onStop : props.onStart}>{props.running ? 'Stop' : 'Start'}</button>
    <button onClick={props.onReset}>Reset</button>
  </div>
});

function mapStateToProps(state) {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => { dispatch({type: 'START'}); },
    onStop: () => { dispatch({type: 'STOP'}); },
    onReset: () => { dispatch({type: 'RESET'}); }
  };
};

let container = Redux.createStore(update);

let intents = {
  TICK: 'TICK',
  STOP: 'STOP',
  START: 'START',
  RESET: 'RESET'
}

ReactDOM.render(
  <ReactRedux.Provider store={container}>
    <Stopwatch />
  </ReactRedux.Provider>,
document.getElementById('root')
);

setInterval(() => {
  //model = update(model, 'TICK');
  //render();
  container.dispatch({type:'TICK'});
}, 1000)
