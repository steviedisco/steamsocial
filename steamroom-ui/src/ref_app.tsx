import { h, Component } from "preact";
import { useState, useEffect } from 'preact/hooks';

export function App(props) {
  const [name, setName] = useState(props.name);

  useEffect(() => {
    setTimeout(() => {
      setName("useEffect worked as expected");
    }, 2000);
  }, []);

  return (<div>
    <h1>Props: {props.name}</h1>
    <h1>State: {name}</h1>
  </div>);
}
