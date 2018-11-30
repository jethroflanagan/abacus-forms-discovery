import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { InputField } from '../components/InputField';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import { GroupHeading } from '../components/GroupHeading'
import { RangeSlider } from '../components/RangeSlider'
// import {
//   STRETCH_WIDTH,
//   SINGLE_PAGE,
//   FORCE_ERRORS,
//   ERROR_BREATHING_ROOM,
//   USE_GROUPS,
//   MULTI_COLUMN,
//   FIELD_GAP,
//   GROUP_GAP,
//   ERRORS_EXPAND,
//   PROGRESS_POSITION,
//   PROGRESS_TYPE,
//   SEPARATE_PAGES_FOR_PROGRESS,
//   PROGRESS_ORIENTATION,
//   INLINE_HELP,
//   SHOW_SUMMARY,
//   TYPEFORM,
//   PROGRESSIVE_DISCLOSURE,
// } from './Settings';

import { settings } from './Settings';

const Container = styled.div`
    background: #efefef;
    display: flex;
    max-width: 400px;
    min-height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    border-left: 1px solid #ddd;
    & > * {
        margin-bottom: 10px;
    }
`;

const Content = styled.div`
    padding: 20px;
    padding-top: 0;
    max-width: 400px;
    & > * {
        margin-bottom: 10px;
    }
`;
const GroupLabel = styled.div`
    display: flex;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    padding-top: 5px;
    border-top: 1px solid #aaa;
    &:first-child {
        border-top: none;
    }
`;

const Heading = styled.div`
    font-size: 24px;
    text-align: left;
    padding: 20px;
    padding-bottom: 0;
    color: ${colors.TEXT_NORMAL};
`;

const Top = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
`;
export class SettingsPanel extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            ...props.settings,
        };
    }

    onUpdateValue(name, value) {
        this.setState({
            [name]: value,
        });
        // settings = {
        //   ...settings,
        //   [name]: value,
        // }
        // this.props.onUpdateValue(name, value)
        console.log('value', name, value);
        this.props.updateSetting(name, value);
    }

    createLabel(name) {
        return <GroupLabel key={name}>{name}</GroupLabel>;
    }

    createListInput(name, options = {}) {
        const value = this.state[name];
        return <RadioButtonGroup label={settings[name].label} options={settings[name].options} value={value} onUpdateValue={value => this.onUpdateValue(name, value)} key={name} {...options}/>;
    }

    createNumberInput(name, options) {
        const value = this.state[name];
        options = {...settings[name], ...options};
        // return <InputField label={settings[name].label} value={value} onUpdateValue={value => this.onUpdateValue(name, value)} fieldWidth='50px' key={name} {...options}/>;
        return <RangeSlider label={settings[name].label} value={value} onUpdateValue={value => this.onUpdateValue(name, value)} fieldWidth='50px' key={name} {...options} />
    }

    createToggle(name, options) {
        const value = this.state[name];
        return <ToggleSwitch label={settings[name].label} checked={value} onUpdateValue={value => this.onUpdateValue(name, value)} key={name} {...options}/>;
    }

    render() {
        const {
          SINGLE_PAGE,
          MULTI_COLUMN,
        } = this.state;
        const toggle = (name, options) => this.createToggle(name, options);
        const label = (name, options) => this.createLabel(name, options);
        const number = (name, options) => this.createNumberInput(name, options);
        const list = (name, options) => this.createListInput(name, options);

        const disableForSinglePage = SINGLE_PAGE ? { disabled: true } : null;
        const disableForSingleColumn = MULTI_COLUMN === 'Single' ? { disabled: true } : null;
        const options = [
            label('Layout'),
            number('FORM_WIDTH'),
            toggle('STRETCH_WIDTH'),
            toggle('USE_GROUPS'),
            list('MULTI_COLUMN'),
            number('COLUMN_GAP', disableForSingleColumn),
            number('FIELD_GAP'),
            number('GROUP_GAP'),
            label('Progress'),
            toggle('SINGLE_PAGE'),
            list('PROGRESS_POSITION', disableForSinglePage),
            list('PROGRESS_TYPE', disableForSinglePage),
            list('PROGRESS_ORIENTATION', disableForSinglePage),
            list('SEPARATE_PAGES_FOR_PROGRESS', disableForSinglePage),
            label('Errors'),
            toggle('ERROR_BREATHING_ROOM'),
            toggle('ERRORS_EXPAND'),
            toggle('FORCE_ERRORS'),
            label('Flow'),
            toggle('SHOW_SUMMARY'),
            toggle('TYPEFORM'),
            list('PROGRESSIVE_DISCLOSURE'),
            list('INLINE_HELP'),
            toggle('UPSIDE_DOWN'),
        ];
        return (
            <Container>
                <Top>
                   <Heading>Settings</Heading>
                </Top>
                  <Content>
                      {options}
                  </Content>
            </Container>
        );
    }
}
