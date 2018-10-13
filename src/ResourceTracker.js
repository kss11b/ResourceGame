import React, { Component } from "react";

export default class ResourceTracker extends Component {
  render() {
    const { time, fish, gold, bread } = this.props;
    return (
      <table className="striped centered">
        <thead>
          <tr>
            <th>Resource</th>
            <th>Held</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Time</td>
            <td>{time}</td>
          </tr>
          <tr>
            <td>Gold</td>
            <td>{gold}</td>
          </tr>
          <tr>
            <td>Fish</td>
            <td>{fish}</td>
          </tr>
          <tr>
            <td>Bread</td>
            <td>{bread}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
