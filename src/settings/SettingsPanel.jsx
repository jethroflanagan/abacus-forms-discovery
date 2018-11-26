import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { InputField } from '../components/InputField';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import { GroupHeading } from '../components/GroupHeading'
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
    background: ${ p => p.isOpen ? '#efefef' : 'transparent' };
    display: flex;
    max-width: 400px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
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
            isOpen: true,
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
        return <GroupLabel>{name}</GroupLabel>;
    }

    createListInput(name, options = {}) {
        console.log('op', options)
        const value = this.state[name];
        return <RadioButtonGroup label={settings[name].label} options={settings[name].options} value={value} onUpdateValue={value => this.onUpdateValue(name, value)} key={name} {...options}/>;
    }

    createNumberInput(name, options) {
        const value = this.state[name];
        return <InputField label={settings[name].label} value={value} onUpdateValue={value => this.onUpdateValue(name, value)} fieldWidth='50px' key={name} {...options}/>;
    }

    createToggle(name, options) {
        const value = this.state[name];
        return <ToggleSwitch label={settings[name].label} checked={value} onUpdateValue={value => this.onUpdateValue(name, value)} key={name} {...options}/>;
    }

    toggleVisibility() {
        console.log(this.state.isOpen)
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        const {
            isOpen,
          SINGLE_PAGE,
        } = this.state;
        const toggle = (name, options) => this.createToggle(name, options);
        const label = (name, options) => this.createLabel(name, options);
        const number = (name, options) => this.createNumberInput(name, options);
        const list = (name, options) => this.createListInput(name, options);

        const resolveSinglePage = SINGLE_PAGE ? { disabled: true } : null;
        const options = [
            label('Layout'),
            toggle('STRETCH_WIDTH'),
            toggle('USE_GROUPS'),
            toggle('MULTI_COLUMN'),
            number('FIELD_GAP'),
            number('GROUP_GAP'),
            label('Progress'),
            toggle('SINGLE_PAGE'),
            list('PROGRESS_POSITION', resolveSinglePage),
            list('PROGRESS_TYPE', resolveSinglePage),
            list('PROGRESS_ORIENTATION', resolveSinglePage),
            list('SEPARATE_PAGES_FOR_PROGRESS', resolveSinglePage),
            label('Errors'),
            toggle('ERROR_BREATHING_ROOM'),
            toggle('ERRORS_EXPAND'),
            toggle('FORCE_ERRORS'),
            label('Flow'),
            toggle('SHOW_SUMMARY'),
            toggle('TYPEFORM'),
            list('PROGRESSIVE_DISCLOSURE'),
            list('INLINE_HELP'),
        ];
        return (
            <Container isOpen={isOpen}>
                <Top>
                    { isOpen ? <Heading>Settings</Heading> : null }
                    <MenuToggle onClick={()=>this.toggleVisibility()}>
                        <MenuIcon />
                    </MenuToggle>
                </Top>
                { isOpen ? (
                    <Content>
                        {options}
                    </Content>
                ): null }
            </Container>
        );
    }
}
