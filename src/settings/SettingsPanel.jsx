import * as React from "react";
import styled from "styled-components";
import * as colors from "../global/Colors";
import { ToggleSwitch } from '../components/ToggleSwitch';
import { InputField } from '../components/InputField';
import { RadioButtonGroup } from '../components/RadioButtonGroup';
import { 
  STRETCH_WIDTH,
  SINGLE_PAGE,
  FORCE_ERRORS,
  ERROR_BREATHING_ROOM,
  USE_GROUPS,
  MULTI_COLUMN,
  FIELD_GAP,
  GROUP_GAP,
  ERRORS_EXPAND,
  PROGRESS_POSITION,
  PROGRESS_TYPE,
  PROGRESS_ORIENTATION,
  INLINE_HELP,
  SHOW_SUMMARY,
  TYPEFORM,
} from './Settings';

import { settings, updateSetting } from './Settings';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
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
`;

export class SettingsPanel extends React.Component {
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      ...settings,
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
    updateSetting(name, value)
  }

  createLabel(name) {
    return (
      <GroupLabel>
        {name}
      </GroupLabel>
    );
  }

  createListInput(option) {
    const { name } = option;
    const value = option.options[this.state[name]];
    return (
      <RadioButtonGroup label={name} options={option.options} value={value} />
    );
  }

  createNumberInput(option) {
    const { name } = option;
    const value = this.state[name];
    return (
      <InputField label={name} value={value} />
    );
  }

  createToggle(option) {
    const { name } = option;
    const value = this.state[name];
    return (
      <ToggleSwitch
        label={name}
        checked={value}
        onUpdateValue={value => this.onUpdateValue(name, value)} />
    )
  }

  render() {
    // const { 
    //   [STRETCH_WIDTH]: stretchWidth,
    //   [SINGLE_PAGE]: singlePage,
    //   [FORCE_ERRORS]: forceErrors,
    //   [USE_GROUPS]: useGroups,
    // } = this.state;
    const toggle = name => this.createToggle(name);
    const label = name => this.createLabel(name);
    const number = name => this.createNumberInput(name);
    const list = name => this.createListInput(name);

    const options = [
      label('Layout'),
      toggle(STRETCH_WIDTH),
      toggle(SINGLE_PAGE),
      toggle(USE_GROUPS),
      toggle(MULTI_COLUMN),
      number(FIELD_GAP),
      number(GROUP_GAP),
      label('Errors'),    
      toggle(ERROR_BREATHING_ROOM),
      toggle(ERRORS_EXPAND),
      toggle(FORCE_ERRORS),
      label('Progress'),    
      list(PROGRESS_POSITION),
      list(PROGRESS_TYPE),
      list(PROGRESS_ORIENTATION),
      label('Flow'),    
      toggle(SHOW_SUMMARY),
      toggle(TYPEFORM),
      list(INLINE_HELP),
    ]
    return (
      <Container>
        <h2>Settings</h2>
        {options}
        {/*<ToggleSwitch 
          label={STRETCH_WIDTH}
          checked={stretchWidth} 
          onUpdateValue={value => this.onUpdateValue(STRETCH_WIDTH, value)} />*/}
      </Container>
    );
  }
}
