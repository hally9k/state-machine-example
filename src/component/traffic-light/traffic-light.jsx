import * as React from "react";
import classnames from "classnames";
import "./traffic-light.scss";

export default class TrafficLight extends React.Component {
  render() {
    const { color, flashing }: Props = this.props;
    return (
      <div className="traffic-light">
        <div className={classnames({ lit: color === "red" })} />
        <div className={classnames({ lit: color === "orange", flashing })} />
        <div className={classnames({ lit: color === "green" })} />
      </div>
    );
  }
}
