import React, { Component } from 'react';

export default class ResourceTracker extends Component {
    render() {
        const {
            time,
            fish,
            fishMod,
            gold,
            goldMod,
            bread,
            breadMod
        } = this.props;
        return (
            <table className="striped centered col s12">
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
        );
    }
}
