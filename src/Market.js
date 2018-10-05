import React, { Component } from 'react';

export default class Market extends Component {
    render() {
        const { fishValue, breadValue, handleExchangeResource } = this.props;
        return (
            <table className="striped centered col s12">
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Fish</td>
                        <td>{fishValue}</td>
                        <td>
                            <a
                                className="waves-effect waves-light btn"
                                price={fishValue}
                                good="fish"
                                actionType="buy"
                                onClick={handleExchangeResource}
                            >
                                Buy Fish
                            </a>
                            <a
                                className="waves-effect waves-light btn"
                                price={fishValue}
                                good="fish"
                                actionType="sell"
                                onClick={handleExchangeResource}
                            >
                                Sell Fish
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Bread</td>
                        <td>{breadValue}</td>
                        <td>
                            <a
                                className="waves-effect waves-light btn"
                                price={breadValue}
                                good="bread"
                                actionType="buy"
                                onClick={handleExchangeResource}
                            >
                                Buy Bread
                            </a>
                            <a
                                className="waves-effect waves-light btn"
                                price={breadValue}
                                good="bread"
                                actionType="sell"
                                onClick={handleExchangeResource}
                            >
                                Sell Bread
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
