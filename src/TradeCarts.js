import React, { Component } from "react";

export default class TradeCarts extends Component {
  handleTradeGoods = e => {
    const { tradeGoods } = this.props;
    // console.log(asking, e.target.getAttribute("cart"), "cart");
    tradeGoods(
      e.target.getAttribute("asking"),
      e.target.getAttribute("giving"),
      parseInt(e.target.getAttribute("givingamount")),
      parseInt(e.target.getAttribute("askingamount"))
    );
  };
  render() {
    const { tradeCarts } = this.props;
    return (
      <table className="striped centered ">
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
              <td>{`${x.get("askingAmount")} ${x.get("asking")}`}</td>
              <td>{`${x.get("givingAmount")} ${x.get("giving")}`}</td>
              <td>
                <a
                  asking={x.get("asking")}
                  giving={x.get("giving")}
                  givingamount={x.get("givingAmount")}
                  askingamount={x.get("askingAmount")}
                  onClick={this.handleTradeGoods}
                  className="waves-effect waves-light btn"
                >
                  Trade {x.get("amount")}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
