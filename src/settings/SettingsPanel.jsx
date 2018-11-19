import * as React from "react";
import styled from "styled-components";
import * as colors from "../global/Colors";
import { ToggleSwitch } from '../components/ToggleSwitch';
import { 
  STRETCH_WIDTH, 
  SINGLE_PAGE, 
  FORCE_ERRORS, 
  USE_GROUPS, 
  MULTI_COLUMN,
} from './Settings';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  & > * {
    margin-bottom: 10px;
  }
`;

export class SettingsPanel extends React.Component {
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  onUpdateValue(name, value) {
    this.setState({
      [name]: value,
    });
    // this.props.onUpdateValue(name, value)
  }

  createToggle(name) {
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
    const options = [
      toggle(STRETCH_WIDTH),
      toggle(SINGLE_PAGE),
      toggle(FORCE_ERRORS),
      toggle(USE_GROUPS),
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
