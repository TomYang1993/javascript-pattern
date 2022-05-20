// documentation: eventually react to events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }


  //documentation: constantly react to events
  const throttleFunction  = (func, interval) => {
    // If setTimeout is already scheduled, no need to do anything

    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) return;
      timeout = setTimeout(() => {
        
        func.apply(context, args);
        timeout = null;
      }, interval);
    };
  }

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
            if ((Date.now() - lastRan) >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
         }, limit - (Date.now() - lastRan));
      }
    }
  }



// bug: even in class component, debounce is called every render, hence every debounce is a new function
  class MyComponent extends React.Component {
    handleButtonClick = () => {
      console.log('The button was clicked')
    }
    render() {
      return (
        <button onClick={debounce(this.handleButtonClick, 500)}>
          Click the button
        </button>
      )
    }
  }

  // documentation: so in class component, we defined in method, not in handler, in function component we have to use useRef or useMemo
  
  class MyComponent extends React.Component {
    handleButtonClick = debounce(() => {
      console.log('The button was clickeds')
    }, 500)
    render() {
      return <button onClick={this.handleButtonClick}>Click the button</button>
    }
  }


    // documentation: useCallback remembers the callback, so when on click event happens, handler wll still call the handler function, but the function will not create new instance, because it's the same callback
        // documentation: useMemo remembers the value, when on click event happens, handler should remember the function value as the same

  export default function App() {
    const [count, setCount] = useState(0);
  
    const debouncedChangeHandler = useCallback(() => {
      console.log("callback");
      return function () {
        console.log("inner");
      };
    }, []);
  
    const debounceMemoHandler = useMemo(() => {
      console.log("memo");
    }, []);
  
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button>{count}</button>
  
        <button onClick={() => setCount((count) => count + 1)}>add</button>
        <button onClick={debouncedChangeHandler}>debounce</button>
        <button onClick={debounceMemoHandler}>debounce memo</button>
      </div>
    );
  }