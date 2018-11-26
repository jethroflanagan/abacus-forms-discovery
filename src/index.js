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

    render() {
        return (
            <AppContainer className="App">
                {/*<FormElements {...this.state} />*/}
                <NormalForm {...this.state}/>
                <SettingsPanel settings={this.state} updateSetting={(name, value) => this.updateSetting(name, value)} />
            </AppContainer>
        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
