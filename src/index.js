import React from 'react';
import ReactDOM from 'react-dom';
import { SettingsPanel } from './settings/SettingsPanel';
import { FormElements } from './FormElements';
import { NormalForm } from './forms/NormalForm';
import styled from 'styled-components';

import './styles.css';
import {
    STRETCH_WIDTH,
    SINGLE_PAGE,
    USE_GROUPS,
    MULTI_COLUMN,
    FIELD_GAP,
    GROUP_GAP,
    
    ERRORS_EXPAND,
    ERROR_BREATHING_ROOM,
    FORCE_ERRORS,

    PROGRESS_POSITION,
    PROGRESS_TYPE,
    PROGRESS_ORIENTATION,
    SEPARATE_PAGES_FOR_PROGRESS,

    SHOW_SUMMARY,
    TYPEFORM,
    HIDDEN_FIELDS,
    PROGRESSIVE_DISCLOSER,
    INLINE_HELP,
} from './settings/Settings';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [STRETCH_WIDTH.name]: false,
            [SINGLE_PAGE.name]: false,
            [FORCE_ERRORS.name]: false,
            [ERROR_BREATHING_ROOM.name]: true,
            [USE_GROUPS.name]: true,
            [MULTI_COLUMN.name]: true,
            [FIELD_GAP.name]: 10,
            [GROUP_GAP.name]: 10,
            [ERRORS_EXPAND.name]: false,
            [PROGRESS_POSITION.name]: 0,
            [PROGRESS_TYPE.name]: 0,
            [PROGRESS_ORIENTATION.name]: 0,
            [INLINE_HELP.name]: 0,
            [SHOW_SUMMARY.name]: true,
            [TYPEFORM.name]: false,
        };
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
