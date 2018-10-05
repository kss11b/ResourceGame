import React, { Component } from 'react';
import { List, fromJS, Map } from 'immutable';
import classNames from 'classnames';
import Market from './Market';
import ResourceTracker from './ResourceTracker';
import WorkForce from './Workforce';
import TradeCarts from './TradeCarts';
import './App.css';

export default class Clock extends Component {
    state = {
        workerCost: 1,
        time: 0,
        fish: 0,
        bread: 0,
        gold: 15,
        goldAdd: 0,
        fishAdd: 0,
        breadAdd: 0,
        fishMod: 1,
        breadMod: 1,
        goldMod: 1,
        fishSub: 0,
        breadSub: 0,
        goldSub: 0,
        warningMessage: '',
        warningCount: 0,
        working: List(),
        workForce: List(),
        detailWorker: null,
        breadValue: 1,
        fishValue: 1,
        breadMarket: 0,
        fishMarket: 0,
        tradeCarts: List([Map(), Map(), Map()]),
        detailMenu: null
    };

    componentDidMount() {
        this.interval = setInterval(() => this.calculateModifications(), 1000);
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
    ]);

    finishTask = worker => {
        switch (worker.get('task')) {
            case 'mineGold':
                return worker
                    .set('task', null)
                    .set('reward', Map({ type: 'gold', amount: 5 }));
            case 'fishing':
                console.log(
                    worker
                        .set('task', null)
                        .set('reward', Map({ type: 'fish', amount: 10 })),
                    'fisher'
                );
                return worker
                    .set('task', null)
                    .set('reward', Map({ type: 'fish', amount: 10 }));
            case 'bakeBread':
                return worker
                    .set('task', null)
                    .set('reward', Map({ type: 'bread', amount: 15 }));
            default:
                return worker;
        }
    };

    calculateMarketDynamics = () => {
        return Math.round(Math.random()) ? 1 : -1;
    };

    handleExchangeResource = e => {
        this.exchangeGoods(
            e.target.getAttribute('good'),
            parseInt(e.target.getAttribute('price')),
            e.target.getAttribute('actionType'),
            5
        );
    };

    exchangeGoods = (good, cost, action, amount) => {
        const { gold, goldAdd, goldSub } = this.state;
        if (action === 'buy') {
            console.log(goldSub, cost, `${good}Add`);
            if (cost <= gold - goldSub) {
                const modifiers = { goldSub: cost + goldSub };
                if (fromJS(this.state).get(`${good}Value`) > 0) {
                    modifiers[`${good}Market`] =
                        fromJS(this.state).get(`${good}Market`) + 1;
                }
                modifiers[`${good}Add`] =
                    amount + fromJS(this.state).get(`${good}Add`);
                console.log(
                    modifiers,
                    fromJS(this.state).get(`${good}Market`),
                    'buy modifiers'
                );
                this.setState(modifiers);
            }
        } else if (action === 'sell') {
            // console.log(good, cost, action, amount)
            if (
                cost <=
                fromJS(this.state).get(good) -
                    fromJS(this.state).get(`${good}Sub`)
            ) {
                const modifiers = { goldAdd: cost + goldAdd };
                if (fromJS(this.state).get(`${good}Value`) > 1) {
                    modifiers[`${good}Market`] =
                        fromJS(this.state).get(`${good}Market`) - 1;
                }
                modifiers[`${good}Sub`] =
                    amount + fromJS(this.state).get(`${good}Sub`);
                console.log(
                    modifiers,
                    fromJS(this.state).get(`${good}Market`),
                    'sell modifiers'
                );
                this.setState(modifiers);
            }
        }
    };

    payForTask = task => {
        const { gold, goldSub, workerCost } = this.state;
        switch (task) {
            case 'hireWorker':
                if (gold - goldSub - workerCost >= 0) {
                    this.setState({ goldSub: goldSub + 1 });
                    return true;
                }
            case 'mineGold':
                if (gold - goldSub - 2 >= 0) {
                    this.setState({ goldSub: goldSub + 1 });
                    return true;
                }
            case 'fishing':
                if (gold - goldSub - 2 >= 0) {
                    this.setState({ goldSub: goldSub + 3 });
                    return true;
                }
            case 'bakeBread':
                if (gold - goldSub - 2 >= 0) {
                    this.setState({ goldSub: goldSub + 2 });
                    return true;
                }
            default:
                return false;
        }
    };

    assignWorker = e => {
        if (this.payForTask(e.target.getAttribute('task'))) {
            const { workForce } = this.state;
            console.log(e.target.getAttribute('task'), 'workForce');
            const workerIndex = workForce.findIndex(
                x =>
                    x.get('name') ===
                    parseInt(e.target.getAttribute('workername'))
            );
            const updatedWorkForce = workForce
                .setIn([workerIndex, 'task'], e.target.getAttribute('task'))
                .setIn(
                    [workerIndex, 'workLoad'],
                    parseInt(e.target.getAttribute('difficulty'))
                );
            // console.log(updatedWorkForce.toJS(), 'updatedWorkForce')
            this.setState({ workForce: updatedWorkForce, detailWorker: null });
        }
    };

    addWorker = () => {
        if (this.payForTask('hireWorker')) {
            const { workForce } = this.state;
            const worker = {
                name: Math.round(Math.random() * 100000000),
                workLoad: 3,
                currentAction: null,
                reward: Map({})
            };
            this.setState({
                workForce: workForce.push(fromJS(worker))
            });
        }
    };

    decreaseWorkload = workForceObject => {
        // console.log(workForceObject, 'object')
        if (workForceObject.size) {
            // console.log(workForceObject.toJS(), 'decrease')
            return workForceObject.map(
                x =>
                    x.get('workLoad')
                        ? x.set('workLoad', x.get('workLoad') - 1)
                        : this.finishTask(x)
            );
        } else {
            return workForceObject;
        }
    };

    generateNewTradeCarts = () => {
        const { tradeCarts } = this.state;
        const updatedTradeCarts = tradeCarts.map(x => {
            const resourceTypes = List(['gold', 'fish', 'bread']);
            const askingIndex = Math.floor(Math.random() * resourceTypes.size);
            const modifiedResourceTypes = resourceTypes.remove(askingIndex);
            const givingIndex = Math.floor(
                Math.random() * modifiedResourceTypes.size
            );
            // console.log(resourceTypes.length, resourceTypes, askingIndex, modifiedResourceTypes, givingIndex, 'indexes')
            return x
                .set('asking', resourceTypes.get(askingIndex))
                .set('giving', modifiedResourceTypes.get(givingIndex))
                .set('amount', Math.floor(Math.random() * 8));
        });
        // console.log(tradeCarts, 'tradeCarts')
        // console.log(updatedTradeCarts.toJS(), 'updated trade carts')
        return updatedTradeCarts;
    };

    setDetailWorker = e => {
        // console.log(e.target.name, 'target')
        this.setState({ detailWorker: e.target.name });
    };

    hideDetailWorker = e => {
        this.setState({ detailWorker: null });
    };

    setDetailMenu = e => {
        this.setState({ detailMenu: e.target.name });
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
            breadAdd,
            fishAdd,
            goldAdd,
            warningCount,
            workForce,
            breadValue,
            fishValue,
            breadMarket,
            fishMarket,
            tradeCarts
        } = this.state;
        // console.log(fishMarket, breadMarket, 'market')
        const workForceRewards = workForce.map(x => x.get('reward'));
        // console.log(workForceRewards.toJS(), 'workforce rewards')
        const breadCalculation =
            time % 10
                ? breadValue + breadMarket
                : breadValue > 1
                    ? breadValue + this.calculateMarketDynamics() + breadMarket
                    : breadValue + 1 + breadMarket;
        const fishCalculation =
            time % 10
                ? fishValue + fishMarket
                : fishValue > 1
                    ? fishValue + this.calculateMarketDynamics() + fishMarket
                    : fishValue + 1;
        this.setState({
            time: time + 1,
            fish:
                workForceRewards
                    .filter(f => f.get('type') === 'fish')
                    .reduce((x, y) => x + y.get('amount'), fish) *
                    fishMod -
                fishSub +
                fishAdd,
            bread:
                workForceRewards
                    .filter(b => b.get('type') === 'bread')
                    .reduce((x, y) => x + y.get('amount'), bread) *
                    breadMod -
                breadSub +
                breadAdd,
            gold:
                workForceRewards
                    .filter(g => g.get('type') === 'gold')
                    .reduce((x, y) => x + y.get('amount'), gold) *
                    goldMod -
                goldSub +
                goldAdd,
            fishAdd: 0,
            breadAdd: 0,
            goldAdd: 0,
            fishSub: 0,
            breadSub: 0,
            goldSub: 0,
            breadMarket: 0,
            fishMarket: 0,
            breadValue: breadCalculation,
            fishValue: fishCalculation,
            warningCount: warningCount ? warningCount - 1 : 0,
            workForce: this.decreaseWorkload(
                workForce.map(x => x.set('reward', Map({})))
            ),
            tradeCarts:
                (time + 1) % 10 ? tradeCarts : this.generateNewTradeCarts()
        });
    };

    render() {
        // console.log(this.generateNewTradeCarts().toJS(), 'generate trade carts')
        // this.generateNewTradeCarts()
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
            detailWorker,
            breadValue,
            fishValue,
            tradeCarts,
            detailMenu
        } = this.state;

        const DisplayItem = () => {
            if (detailMenu === 'resources' || detailMenu === null) {
                return (
                    <ResourceTracker
                        gold={gold}
                        goldMod={goldMod}
                        time={time}
                        fish={fish}
                        fishMod={fishMod}
                        bread={bread}
                        breadMod={breadMod}
                    />
                );
            } else if (detailMenu === 'workForce') {
                return (
                    <WorkForce
                        addWorker={this.addWorker}
                        assignWorker={this.assignWorker}
                        workForce={workForce}
                        detailWorker={detailWorker}
                        availableActions={this.availableActions}
                        setDetailWorker={this.setDetailWorker}
                        hideDetailWorker={this.hideDetailWorker}
                    />
                );
            } else if (detailMenu === 'market') {
                return (
                    <Market
                        breadValue={breadValue}
                        fishValue={fishValue}
                        handleExchangeResource={this.handleExchangeResource}
                    />
                );
            } else if (detailMenu === 'tradeCarts') {
                return <TradeCarts tradeCarts={tradeCarts} />;
            } else {
                return <div />;
            }
        };

        return (
            <div className="row">
                {warningCount ? (
                    <div className="card-panel red dark-2 warning-card center-align">
                        <h1 className="white-text">{warningMessage}</h1>
                    </div>
                ) : null}

                <a
                    onClick={this.setDetailMenu}
                    name="resources"
                    className={classNames('waves-effect waves-light btn', {
                        disabled: detailMenu === 'resources '
                    })}
                >
                    Resources
                </a>
                <a
                    onClick={this.setDetailMenu}
                    name="market"
                    className={classNames('waves-effect waves-light btn', {
                        disabled: detailMenu === 'market'
                    })}
                >
                    Workforce
                </a>
                <a
                    onClick={this.setDetailMenu}
                    name="workForce"
                    className={classNames('waves-effect waves-light btn', {
                        disabled: detailMenu === 'workForce'
                    })}
                >
                    work
                </a>
                <a
                    onClick={this.setDetailMenu}
                    name="tradeCarts"
                    className={classNames('waves-effect waves-light btn', {
                        disabled: detailMenu === 'tradeCarts'
                    })}
                >
                    TradeCarts
                </a>

                <DisplayItem />
            </div>
        );
    }
}
