import React, { Component } from 'react';
import vscLogo from './images/vsc-logo.svg';
import gitLogo from './images/git-logo.svg';
import './App.css';
import Hero from './Hero';
class App extends Component {
  state = {
    showingCreds: false
  };
  async componentDidMount() {
    const res = await fetch('/api');
    const body = await res.json();
    this.setState(body);
  }

  renderCreds() {}
  render() {
    let creds;
    if (this.state.showingCreds) {
      creds = (
        <p id="creds">
          {navigator.platform === 'Win32'
            ? this.state.gitUrl
            : this.state.bashGitUrl}
        </p>
      );
    }
    return (
      <div className="App">
        <Hero endDate={this.state.expiry} host={this.state.host} />
        <div id="content">
          <div class="column vsc">
            <div class="icon">
              <img src={vscLogo} alt="VS Code" />
            </div>
            <div class="text">
              <p class="title">Start editing with VS Code</p>
              <p class="description">
                VS Code can deploy applications directly to Azure with the Azure
                App Service extension.
              </p>
              <p class="link">
                <a href={this.cloneHref()}>Clone to VS Code</a>
              </p>
              <p class="link">
                <a href={this.cloneInsidersHref()} id="clone-insiders">
                  Clone to VS Code Insiders
                </a>
              </p>
            </div>
          </div>

          <div class="column git">
            <div class="icon">
              <img src={gitLogo} alt="Git" />
            </div>
            <div class="text">
              <p class="title">Clone or push with Git</p>
              <p class="description">
                Review diffs, stage files, and make commits right from the
                editor.
              </p>
              <p class="link">
                <a
                  href="#"
                  onClick={this.toggleCreds.bind(this)}
                  id="show-creds"
                >
                  Generate your Git credentials
                </a>
              </p>
              {creds}
            </div>
          </div>
        </div>
      </div>
    );
  }

  cloneHref() {
    return `vscode://vscode.git/clone?url=${this.state.gitUrl}`;
  }

  cloneInsidersHref() {
    return `vscode-insiders://vscode.git/clone?url=${this.state.gitUrl}`;
  }

  toggleCreds() {
    this.setState({ showingCreds: !this.state.showingCreds });
  }
}

export default App;
