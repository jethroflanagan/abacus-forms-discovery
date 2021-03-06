import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { RadioButton } from './RadioButton';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

const List = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    & > * {
      /* margin-right: 30px; */
      margin-bottom: 5px;
      &:last-child {
        /* margin-right: 0; */
        margin-bottom: 0;
      }
    }
`;
const Label = styled.div`
    color: ${p => p.disabled ? colors.TEXT_DISABLED : colors.TEXT_NORMAL};
    margin-bottom: 5px;
    font-weight: 600;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Tab = styled.div`
`;
export class RadioButtonGroup extends React.Component {
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
    const { disabled, label, options } = this.props;
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
        <List>
          { options.map(label => <RadioButton label={label} checked={value === label} disabled={disabled} onClick={() => this.toggle(label)} key={label} />)}
        </List>
        { activeTab
          ? (
            <Content>
              <Tab>{activeTab}</Tab>
            </Content>
          ): null
        }
      </Container>
    );
  }
}
