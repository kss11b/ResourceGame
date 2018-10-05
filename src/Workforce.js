import React, { Component } from 'react';
import { List, fromJS, Map } from 'immutable';
import classNames from 'classnames';

export default class Workforce extends Component {
    workerCollectionGenerator = () => {
        const {
            workForce,
            detailWorker,
            availableActions,
            setDetailWorker,
            hideDetailWorker,
            assignWorker
        } = this.props;
        // console.log(detailWorker, 'generator')
        const menu = worker => (
            <div className="col s12">
                {availableActions.map(action => (
                    <a
                        name={worker.get('name')}
                        task={action.get('actionName')}
                        difficulty={action.get('difficulty')}
                        workerName={worker.get('name')}
                        className="waves-effect waves-light btn"
                        onClick={assignWorker}
                    >
                        {action.get('name')}
                    </a>
                ))}
            </div>
        );

        return workForce.map(x => (
            <div className="collection-item row" key={x.get('name')}>
                <p className="col s4">Name: {x.get('name')}</p>
                <p className="col s4">WorkLoad: {x.get('workLoad')}</p>

                <p className="col s4">
                    Task:{' '}
                    {parseInt(detailWorker) === x.get('name') ? (
                        <a
                            onClick={hideDetailWorker}
                            className="waves-effect waves-light btn"
                        >
                            Hide
                        </a>
                    ) : (
                        <a
                            onClick={setDetailWorker}
                            name={x.get('name')}
                            className={classNames(
                                'waves-effect waves-light btn',
                                { disabled: x.get('workLoad') }
                            )}
                        >
                            {x.get('workLoad')
                                ? x.get('task') || 'Busy'
                                : 'Assign'}
                        </a>
                    )}
                </p>

                {parseInt(detailWorker) === x.get('name') ? menu(x) : null}
            </div>
        ));
    };
    render() {
        const { workForce, addWorker } = this.props;
        return (
            <div>
                <a className="waves-effect waves-light btn" onClick={addWorker}>
                    Hire Worker
                </a>
                {workForce.size ? (
                    <div className="collection col s12">
                        {this.workerCollectionGenerator()}
                    </div>
                ) : null}
            </div>
        );
    }
}
