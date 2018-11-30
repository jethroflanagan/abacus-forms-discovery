import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { SettingsPanel } from './settings/SettingsPanel';
import { FormElements } from './FormElements';
import { NormalForm } from './forms/NormalForm';
import styled from 'styled-components';

import './styles.css';
import {
  settings
} from './settings/Settings';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScrollContainer = styled.div`
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const MenuToggle = styled.div`
    display: inline-flex;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #fff;
    padding: 0 10px;
    cursor: pointer;
`;

const MenuIcon = styled.div`
    display: inline-block;
    width: 100%;
    height: 14px;
    border-top: 2px #333 solid;
    border-bottom: 2px #333 solid;
    &:after {
        content: '';
        display: block;
        background: #333;
        margin-top: 4px;
        width: 100%;
        height: 2px;
    }
`;

const MenuContainer = styled.div`
    position: sticky;
    right: 0;
    top: 0;
    height: 0;
    justify-content: flex-end;
    display: flex;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
      
        // make it like: `{ SETTING_NAME: <value> }`
        const settingValues = {};
        _.each(settings, (setting, key) => {
          settingValues[key] = setting.value;
        });
        this.state = {
          ...settingValues,
        };
        console.log (this.state);
    }
    updateSetting(name, value) {
        this.setState({
            [name]: value,
        });
    }

    toggleSettingsMenu() {
      this.setState({
          isSettingsVisible: !this.state.isSettingsVisible,
      })
  }
    render() {
      const { isSettingsVisible } = this.state;
        return (
            <AppContainer className="App">
                <ScrollContainer style={{ flexGrow: '1' }}>
                  <MenuContainer>
                    <MenuToggle onClick={()=>this.toggleSettingsMenu()}>
                      <MenuIcon />
                    </MenuToggle>
                  </MenuContainer>
                  <NormalForm {...this.state}/>
                </ScrollContainer>
                { isSettingsVisible ? <ScrollContainer><SettingsPanel settings={this.state} updateSetting={(name, value) => this.updateSetting(name, value)} /></ScrollContainer> : null }
            </AppContainer>
        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
