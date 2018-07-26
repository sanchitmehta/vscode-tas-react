import React, { Component } from 'react';
import { nodeLogo } from './logos';
import './Hero.css';

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: timeTo(this.props.endDate),
      intervalId: null
    };
  }
  render() {
    return (
      <div id="hero">
        <p className="countdown">
          This free web app will expire in
          <strong> {this.state.remainingTime}</strong>
        </p>
        <img src={nodeLogo} alt="Azure App Service" />
        <h1>Welcome to React on Azure App Service</h1>
        <h2>
          Hosted at <a href={this.props.host}>{this.props.host}</a>
        </h2>
        <p>
          To get started, make changes to your web app using the options below
          and redeploy to see your changes.
        </p>
      </div>
    );
  }

  componentDidMount() {
    const intervalId = setInterval(this.interval.bind(this), 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  interval() {
    this.setState({
      remainingTime: timeTo(this.props.endDate)
    });
    this.render();
  }
}

function timeTo(ts) {
  if (!ts) {
    return '...';
  }
  const t = Date.parse(ts + ' UTC') - Date.parse(new Date());
  const minutes = Math.floor(t / 1000 / 60);
  const seconds = (t - minutes * 60 * 1000) / 1000;

  return `${minutes} min ${seconds} sec`;
}
