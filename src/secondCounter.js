import React, { Component } from "react";
import { List, fromJS } from "immutable";
import "./App.css";

export default class Clock extends Component {
  state = {
    time: 0,
    fish: 0,
    bread: 50,
    gold: 0,
    fishMod: 1,
    breadMod: 1,
    goldMod: 0,
    fishAdd: 0,
    breadAdd: 0,
    goldAdd: 0,
    fishSub: 0,
    breadSub: 0,
    goldSub: 0,
    warningMessage: "",
    warningCount: 0,
    working: List(),
    workForce: List(),
    detailWorker: null
  };

componentDidMount() {
  this.interval = setInterval(() => this.calculateModifications(), 1000)
}
componentWillUnmount() {
  clearInterval(this.interval);
}

availableActions = fromJS([
{
    name: 'Go Fishing',
    difficulty: 3,
    actionName: 'fishing'
  },
{
    name: 'Mine Gold',
    difficulty: 5,
    actionName: 'mineGold'
  },
 {
    name: 'Make Bread',
    difficulty: 2,
    actionName: 'bakeBread'
  }
])


  mineGold = () => {
    const { bread } = this.state;
    // console.log("mine");
    if (bread >= 4) {
      this.setState({
        goldAdd: Math.floor(Math.random() * 2),
        breadSub: 4
      });
    } else {
      this.setState({
        warningCount: 4,
        warningMessage: "bread credit declined"
      });
      // console.log();
    }
  };
  goFishing = () => {
    const { gold } = this.state;
    // console.log("fish");
    if (gold >= 1) {
      this.setState({
        fishAdd: Math.round(Math.random() * 5),
        goldSub: 1
      });
    } else {
      this.setState({
        warningCount: 4,
        warningMessage: "Your gold reserves are too low"
      });
    }
  };
  bakeBread = () => {
    const { fish } = this.state;
    // console.log("bread");
    if (fish >= 4) {
      this.setState({
        breadAdd: Math.round(Math.random() * 10),
        fishSub: 4
      });
    } else {
      this.setState({
        warningCount: 4,
        warningMessage: "Go fish"
      });
    }
  };

assignWorker = e => {
  const {workForce} = this.state;
  console.log(e.target.getAttribute('workername'), 'workForce')
  const workerIndex = workForce.findIndex(x => x.get('name') === parseInt(e.target.getAttribute('workername')))
  const updatedWorkForce =
  workForce
  .setIn([workerIndex, 'task'], e.target.getAttribute('task'))
  .setIn([workerIndex, 'workLoad'], parseInt(e.target.getAttribute('difficulty')))
  // console.log(updatedWorkForce.toJS(), 'updatedWorkForce')
  this.setState({workForce: updatedWorkForce})
}

addWorker = () => {
  const { workForce } = this.state;
  const worker = {
    name:Math.round(Math.random() * 100000000),
    workLoad: 10,
    currentAction: null,
  }
  this.setState({
    workForce: workForce.push(fromJS(worker))
  })
}

  decreaseWorkload = workForceObject => {
    // console.log(workForceObject, 'object')
    if (workForceObject.size) {
      // console.log(workForceObject.toJS(), 'decrease')
      return workForceObject.map(
        x => (x.get("workLoad") ? x.set("workLoad", x.get("workLoad") - 1) : x)
      );
    } else {
      return workForceObject;
    }
  };

workerCollectionGenerator = () => {
  const { workForce, detailWorker } = this.state;
  console.log(detailWorker, 'generator')
  const menu = worker => (
      <div className="col s12">
          {this.availableActions.map(action =>
          <a
            name={worker.get('name')}
            task={action.get('actionName')}
            difficulty={action.get('difficulty')}
            workerName={worker.get('name')}
            className="waves-effect waves-light btn"
            onClick={this.assignWorker}>

            {action.get('name')}
          </a>
        )}
      </div>
    );

    // assignWorker = (workerName, action) => {
    //   const { workForce } = this.state;
    //   const modifiedWorkforce = workForce.map(
    //     x =>
    //       parseInt(x.get("name")) === workerName
    //         ? x.set("currentAction", action)
    //         : x
    //   );
    //   this.setState({ workForce: modifiedWorkforce });
    // };

    return workForce.map(x => (
      <div className="collection-item row" key={x.get("name")}>
        <p className="col s4">Name: {x.get("name")}</p>
        <p className="col s4">WorkLoad: {x.get("workLoad")}</p>

        <p className="col s4">
          Task:{" "}
          {parseInt(detailWorker) === x.get("name") ? (
            <a
              onClick={this.hideDetailWorker}
              className="waves-effect waves-light btn"
            >
              Hide
            </a>
          ) : (
            <a
              onClick={this.setDetailWorker}
              name={x.get("name")}
              className="waves-effect waves-light btn"
            >
              {x.get("actionName") ? x.get("actionName") : "Assign"}
            </a>
          )}
        </p>

          {parseInt(detailWorker) === x.get('name') ? menu(x) : null}
        </div>
    )
  )
}

  setDetailWorker = e => {
    // console.log(e.target.name, 'target')
    this.setState({ detailWorker: e.target.name });
  };

  hideDetailWorker = e => {
    this.setState({ detailWorker: null });
  };

  calculateModifications = () => {
    const {
      time,
      fish,
      fishAdd,
      fishMod,
      bread,
      breadAdd,
      breadMod,
      gold,
      goldAdd,
      goldMod,
      breadSub,
      fishSub,
      goldSub,
      warningCount,
      workForce
    } = this.state;
    this.setState({
      time: time + 1,
      fish: fish + fishAdd * fishMod - fishSub,
      bread: bread + breadAdd * breadMod - breadSub,
      gold: gold + goldAdd * goldMod - goldSub,
      fishAdd: 0,
      breadAdd: 0,
      goldAdd: 0,
      fishSub: 0,
      breadSub: 0,
      goldSub: 0,
      warningCount: warningCount ? warningCount - 1 : 0,
      workForce: this.decreaseWorkload(workForce)
    });
  };


  render(){
    // console.log('render')
    const {
      warningMessage,
      time,
      warningCount,
      fish,
      bread,
      gold,
      workForce,
      detailWorker
    } = this.state;

    // console.log(detailWorker, 'detailWorker')
    // console.log(workForce ? workForce : null)

    return (
      <div>
        {warningCount ? (
          <div className="card-panel red dark-2 warning-card center-align">
            <h1 className="white-text">{warningMessage}</h1>
          </div>
        ) : null}

        <h1>Resource Game {workForce ? workForce.size : 0}</h1>
        <a className="waves-effect waves-light btn" onClick={this.addWorker}>
          Create Worker
        </a>
        {/* <a className="waves-effect waves-light btn" onClick={this.mineGold}>Mine Gold</a>
      <a className="waves-effect waves-light btn" onClick={this.goFishing}>Go Fishing</a>
      <a className="waves-effect waves-light btn" onClick={this.bakeBread}>Bake Bread</a>
      <a className="waves-effect waves-light btn" onClick={this.addWorker}>Create Worker</a> */}

        <div className="row">
          <div className="col s4">
            <h1>Time</h1>
            <h3>{time}</h3>
          </div>

          <div className="col s4">
            <h1>Fish</h1>
            <h3>{fish}</h3>
          </div>

          <div className="col s4">
            <h1>Bread</h1>
            <h3>{bread}</h3>
          </div>

          <div className="col s4">
            <h1>Gold</h1>
            <h3>{gold}</h3>
          </div>
          {workForce.size ? (
            <div className="collection col s12">
              {this.workerCollectionGenerator()}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}



//
// const worker = {
//   workLoad: 0,
//   currentAction: null,
// }
//
// const workerA = {
//   workLoad: 0,
//   currentAction: null,
// }
//
// const workerB = {
//   workLoad: 0,
//   currentAction: null,
// }
//
// const workerC = {
//   workLoad: 0,
//   currentAction: null,
// }
//
// workforce = [workerA, workerB, workerC]
//
// setState {workForce: workforce.getIn([0, 'workLoad'])}
//
// actionArray = workforce.map(worker => worker.currentAction)
//
// ['fishing', 'mining', 'fishing']
//
//
//
// const availableActions = {
//   fishing: {
//     name: 'Go Fishing',
//     difficulty: 3,
//   },
//   goldMining:{
//     name: 'Mine Gold',
//     difficulty: 5
//   },
//   bread: {
//     name: 'Make Bread',
//     difficulty: 2,
//   }
// }
