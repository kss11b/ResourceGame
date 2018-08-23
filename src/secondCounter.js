import React, { Component } from 'react';
import './App.css';

export default class Clock extends Component {

  state = {
    time: 0,
    fish: 0,
    bread: 0,
    gold: 0,
    fishMod: 1,
    breadMod: 1,
    goldMod: 1,
    fishAdd: 0,
    breadAdd: 0,
    goldAdd: 0,

  }

componentDidMount() {
  this.interval = setInterval(() => this.calculateAdditions(), 1000)
}
componentWillUnmount() {
  clearInterval(this.interval);
}
mineGold = () => {
  console.log('mine')
  this.setState({goldAdd: Math.floor(Math.random() * 2)})
}
goFishing = () => {
  console.log('fish')
  this.setState({fishAdd: Math.round(Math.random() * 5)})
}
bakeBread = () => {
  console.log('bread')
  this.setState({breadAdd: Math.round(Math.random() * 10)})
}

calculateAdditions = () => {
  const {time, fish, fishAdd, fishMod, bread, breadAdd, breadMod, gold, goldAdd, goldMod} = this.state;
  this.setState(
    { time: time + 1,
      fish: fish + (fishAdd * fishMod) ,
      bread: bread + (breadAdd * breadMod),
      gold: gold + (goldAdd * goldMod),
      fishAdd: 0,
      breadAdd: 0,
      goldAdd: 0,
    });
}


  render(){
    return (
      <div>
      <h1>Resource Game</h1>
        <h1>Time</h1>
        <h3>{this.state.time}</h3>
        <h1>Fish</h1>
        <h3>{this.state.fish}</h3>
        <h1>Bread</h1>
        <h3>{this.state.bread}</h3>
        <h1>Gold</h1>
        <h3>{this.state.gold}</h3>
        <a className="waves-effect waves-light btn" onClick={this.mineGold}>Mine Gold</a>
        <a className="waves-effect waves-light btn" onClick={this.goFishing}>Go Fishing</a>
        <a className="waves-effect waves-light btn" onClick={this.bakeBread}>Bake Bread</a>
      </div>
    )
  }
}
