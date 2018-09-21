import React, { Component } from "react";
import { List, fromJS, Map } from "immutable";
import classNames from "classnames"
import "./App.css";

export default class Clock extends Component {
  state = {
    workerCost: 1,
    time: 0,
    fish: 0,
    bread: 0,
    gold: 15,
    // goldAdd: 0,
    // fishAdd: 0,
    // breadAdd: 0,
    fishMod: 1,
    breadMod: 1,
    goldMod: 1,
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
    name: 'Bake Bread',
    difficulty: 2,
    actionName: 'bakeBread'
  }
])

finishTask = worker => {
  switch(worker.get('task')){
    case 'mineGold':
      return worker.set('task', null).set('reward', Map({type: 'gold', amount: 5}))
    case 'fishing':
      console.log(worker.set('task', null).set('reward', Map({type: 'fish', amount: 10})), 'fisher')
      return worker.set('task', null).set('reward', Map({type: 'fish', amount: 10}))
    case 'bakeBread':
      return worker.set('task', null).set('reward', Map({type: 'bread', amount: 15}))
    default:
      return worker
  }
}





  // mineGold = () => {
  //   const { bread } = this.state;
  //   // console.log("mine");
  //   if (bread >= 4) {
  //     this.setState({
  //       goldAdd: Math.floor(Math.random() * 2),
  //       breadSub: 4
  //     });
  //   } else {
  //     this.setState({
  //       warningCount: 4,
  //       warningMessage: "bread credit declined"
  //     });
  //     // console.log();
  //   }
  // };
  // goFishing = () => {
  //   const { gold } = this.state;
  //   // console.log("fish");
  //   if (gold >= 1) {
  //     this.setState({
  //       fishAdd: Math.round(Math.random() * 5),
  //       goldSub: 1
  //     });
  //   } else {
  //     this.setState({
  //       warningCount: 4,
  //       warningMessage: "Your gold reserves are too low"
  //     });
  //   }
  // };
  // bakeBread = () => {
  //   const { fish } = this.state;
  //   // console.log("bread");
  //   if (fish >= 4) {
  //     this.setState({
  //       breadAdd: Math.round(Math.random() * 10),
  //       fishSub: 4
  //     });
  //   } else {
  //     this.setState({
  //       warningCount: 4,
  //       warningMessage: "Go fish"
  //     });
  //   }
  // };

payForTask = task => {
  const {gold, goldSub, workerCost} = this.state
  switch(task){
    case 'hireWorker':
    if(gold - goldSub - workerCost >= 0){
      this.setState({goldSub: goldSub + 1})
      return true
    }
    case 'mineGold':
      if(gold - goldSub - 2 >= 0){
        this.setState({goldSub: goldSub + 1})
        return true
      }
    case 'fishing':
      if(gold - goldSub - 2 >= 0) {
      this.setState({goldSub: goldSub + 3})
      return true
    }
    case 'bakeBread':
      if(gold - goldSub - 2 >= 0){
      this.setState({goldSub: goldSub + 2})
      return true
    }
    default:
      return false
  }
}


assignWorker = e => {
  if(this.payForTask(e.target.getAttribute('task'))){
  const {workForce} = this.state;
  console.log(e.target.getAttribute('task'), 'workForce')
  const workerIndex = workForce.findIndex(x => x.get('name') === parseInt(e.target.getAttribute('workername')))
  const updatedWorkForce =
  workForce
  .setIn([workerIndex, 'task'], e.target.getAttribute('task'))
  .setIn([workerIndex, 'workLoad'], parseInt(e.target.getAttribute('difficulty')))
  // console.log(updatedWorkForce.toJS(), 'updatedWorkForce')
  this.setState({workForce: updatedWorkForce, detailWorker:null})
}
}

addWorker = () => {
  if(this.payForTask('hireWorker')){
    const { workForce } = this.state;
    const worker = {
      name:Math.round(Math.random() * 100000000),
      workLoad: 3,
      currentAction: null,
      reward: Map({})
    }
    this.setState({
      workForce: workForce.push(fromJS(worker))
    })
  }
}

  decreaseWorkload = workForceObject => {
    // console.log(workForceObject, 'object')
    if (workForceObject.size) {
      // console.log(workForceObject.toJS(), 'decrease')
      return workForceObject.map(
        x => (x.get("workLoad") ? x.set("workLoad", x.get("workLoad") - 1) : this.finishTask(x))
      );
    } else {
      return workForceObject;
    }
  };

workerCollectionGenerator = () => {
  const { workForce, detailWorker } = this.state;
  // console.log(detailWorker, 'generator')
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
              className={classNames("waves-effect waves-light btn", {disabled: x.get('workLoad')})}
            >
              {x.get("workLoad") ? x.get("task") || 'Busy' : "Assign"}
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
      fishMod,
      bread,
      breadMod,
      gold,
      goldMod,
      breadSub,
      fishSub,
      goldSub,
      warningCount,
      workForce
    } = this.state;

    const workForceRewards = workForce.map(x => x.get('reward'))
      // console.log(workForceRewards.toJS(), 'workforce rewards')

    this.setState({
      time: time + 1,
      fish: workForceRewards.filter(f => f.get('type') === 'fish').reduce((x, y) => x + y.get('amount'), fish) * fishMod - fishSub,
      bread: workForceRewards.filter(b => b.get('type') === 'bread').reduce((x, y) => x + y.get('amount'), bread) * breadMod - breadSub,
      gold: workForceRewards.filter(g => g.get('type') === 'gold').reduce((x, y) => x + y.get('amount'), gold) * goldMod - goldSub,
      fishAdd: 0,
      breadAdd: 0,
      goldAdd: 0,
      fishSub: 0,
      breadSub: 0,
      goldSub: 0,
      warningCount: warningCount ? warningCount - 1 : 0,
      workForce: this.decreaseWorkload(workForce.map(x => x.set('reward', Map({}))))
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
      fishMod,
      goldMod,
      breadMod,
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

        <h1>Resource Game</h1>
        <a className="waves-effect waves-light btn" onClick={this.addWorker}>
          Create Worker
        </a>

        <table className="striped centered">
  <thead>
    <tr>
        <th>Resource</th>
        <th>Held</th>
        <th>Bonus</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Time</td>
      <td>{time}</td>
      <td>{0}</td>
    </tr>
    <tr>
      <td>Gold</td>
      <td>{gold}</td>
      <td>{goldMod}</td>
    </tr>
    <tr>
      <td>Fish</td>
      <td>{fish}</td>
      <td>{fishMod}</td>
    </tr>
    <tr>
      <td>Bread</td>
      <td>{bread}</td>
      <td>{breadMod}</td>
    </tr>
  </tbody>
</table>

{workForce.size ? (
  <div className="collection col s12">
    {this.workerCollectionGenerator()}
  </div>
) : null}




        {/* <div className="row">
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
        </div> */}
      </div>
    );
  }
}
