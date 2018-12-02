import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { RadioButton } from './RadioButton';

const BORDER_COLOR = colors.TEXT_DISABLED;
const ACTIVE_BACKGROUND = '#efefef';
const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

const List = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Option = styled.div`
  padding: 10px 20px;
  background-color: ${p => p.active ? ACTIVE_BACKGROUND : '#fff'};
  border-bottom: 1px solid ${p => p.active || !p.hasContent ? 'transparent' : BORDER_COLOR};
  flex-grow: 1;
  &:not(:last-child) {
    border-right: 1px solid ${BORDER_COLOR};
    /* margin-right: 15px; */
  }
`;

const Label = styled.div`
    color: ${p => p.disabled ? colors.TEXT_DISABLED : colors.TEXT_NORMAL};
    margin-bottom: 5px;
    font-weight: 600;
`;

const Enclosed = styled.div`
  border: 1px solid ${BORDER_COLOR};
  border-radius: 4px;
  background-color: ${ACTIVE_BACKGROUND};
`;
const Content = styled.div`
  margin-top: 10px;
  padding: 20px;
  padding-bottom: 0;
`;

const Tab = styled.div`
`;
export class TabbedRadioButtonGroup extends React.Component {
  static defaultProps = {
    disabled: false,
    value: '',
    label: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (value === prevProps.value) return;
    if (this.state.value !== value) {
      this.setState({ value });
    }
  }

  toggle(value) {
    if (this.props.disabled) return;
    this.setState({
      value,
    });
    if (this.props.onUpdateValue) {
      this.props.onUpdateValue(value);
    }
  }

  render() {
    const { disabled, label, options, width } = this.props;
    const { value } = this.state;

    // TABS
    const tabs = this.props.tabs; // React.Children.toArray(this.props.tabs);
    let activeSegmentName = value;
    let activeTab = null;
    if (tabs && Object.keys(tabs).length) {
      activeTab = Object.hasOwnProperty.call(tabs, activeSegmentName) ? tabs[activeSegmentName] : null;
    }
    // END TABS
    return (
      <Container>
        { label ? <Label disabled={disabled}>{label}</Label> : null }
        <Enclosed>
          <List>
            { options.map(label =>
              <Option active={value === label} hasContent={activeTab != null}>
                <RadioButton label={label} checked={value === label} disabled={disabled} onClick={() => this.toggle(label)} key={label} />
              </Option>
            )}
          </List>
          { activeTab
            ? (
              <Content>
                <Tab>{activeTab}</Tab>
              </Content>
            ): null
          }
        </Enclosed>
      </Container>
    );
  }
}
