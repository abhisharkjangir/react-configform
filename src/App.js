import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import formjson from './formjson'

const form = formjson.form;

class App extends Component {
  constructor() {
    super()
    this.state ={};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    form.elements.map(ele =>
      this.setState({[ele.key] : ele.value})
    )
  }

  componentDidMount(){

  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(this.state);
  }

  handleChange (e) {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    return (
      <div>
        <h1>Dynamic JSON Forms </h1> <span>with React JS</span>
        <Form name={form.title} id={form.id} submit={this.handleSubmit}>
          {form.elements && form.elements.map(ele =>
            MapElements(ele, this.state, this.handleChange)
          )}
          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  }
}

export default App;

const MapElements = (ele,state,handleChange) => {

  switch (ele.element) {
    case 'text':
      return <TextBox state={state} handleChange={handleChange} element={ele}/>
    case 'password':
      return <PasswordBox state={state} handleChange={handleChange} element={ele}/>
    case 'select':
      return <Select state={state} handleChange={handleChange} element={ele}/>
    // case 'checkbox':
    //   return <Checkbox state={state} handleChange={handleChange} element={ele}/>
    // case 'radio':
    //   return <Radio state={state} handleChange={handleChange} element={ele}/>
    case 'textarea':
      return <Textarea state={state} handleChange={handleChange} element={ele}/>
    default:
      return null
  }
}

// Form Element
const Form = (props) => <form name={props.name} id={props.id} onSubmit={props.submit}>{props.children}</form>

// Textarea
const Textarea = (props) => {
  let attrs = {
    id : props.element.key,
    name : props.element.key,
    disabled : props.element.disable,
    value : props.state[props.element.key],
    placeholder : props.element.placeholder,
    onChange : props.handleChange
  }
  return (
    <div>
      <br/><label>{props.element.label}</label><br/>
      <textarea {...attrs}/><br/>
    </div>
  )
}

// Checkbox
// const Radio = (props) => {
//   return <div>
//     <br/><label>{props.element.label}</label><br/>
//     {props.element.list && props.element.list.map(cb => <div key={cb.id}><input type="radio" value={cb.value} name={props.element.key} checked={cb.checked} disabled={cb.disable}/>{cb.name}</div>)}
//   </div>
// }

// Checkbox
// const Checkbox = (props) => {
//   return <div>
//     <br/><label>{props.element.label}</label><br/>
//     {props.element.list && props.element.list.map(cb => <div key={cb.id}><input onChange={props.handleChange} type="checkbox" value={cb.value} name={props.element.key} checked={cb.checked} disabled={cb.disable}/>{cb.name}</div>)}
//   </div>
// }

// DropDown
const Select = (props) => {
  let attrs = {
    id : props.element.key,
    name : props.element.key,
    disabled : props.element.disable,
    value : props.state[props.element.key],
    placeholder : props.element.placeholder,
    multiple : props.element.multiple,
    onChange : props.handleChange
  }
  return (
    <div>
      <br/><label>{props.element.label}</label><br/>
      <select {...attrs}>
        {props.element.options.list && props.element.options.list.map(op => <option key={op.id} {...op}>{op.name}</option>)}
      </select>
    </div>
  )
}

// TextBox Element
const TextBox = (props) => {
  let attrs = {
    type : 'text',
    id : props.element.key,
    name : props.element.key,
    disabled : props.element.disable,
    value : props.state[props.element.key],
    placeholder : props.element.placeholder,
    onChange : props.handleChange
  }
  return (
    <div>
      <br/><label>{props.element.label}</label><br/>
      <input {...attrs}/><br/>
    </div>
  )
}

// Password Element
const PasswordBox = (props) => {
  let attrs = {
    type : 'password',
    id : props.element.key,
    name : props.element.key,
    disabled : props.element.disable,
    value : props.state[props.element.key],
    placeholder : props.element.placeholder,
    onChange : props.handleChange
  }
  return (
    <div>
      <br/><label>{props.element.label}</label><br/>
      <input {...attrs}/><br/>
    </div>
  )
}
