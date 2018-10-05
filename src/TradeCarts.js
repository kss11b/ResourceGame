import React, { Component } from 'react';

export default class TradeCarts extends Component {
    render() {
        const { tradeCarts } = this.props;
        return (
            <table className="striped centered col s12">
                <thead>
                    <tr>
                        <th>Asking</th>
                        <th>Giving</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {tradeCarts.map(x => (
                        <tr>
                            <td>{x.get('asking')}</td>
                            <td>{x.get('giving')}</td>
                            <td>
                                <a className="waves-effect waves-light btn">
                                    Trade {x.get('amount')}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
