import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import * as _ from 'lodash';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
`;

const List = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
    align-items: center;
`;

const Segment = styled.div`
    cursor: pointer;
    display: flex;
    padding: 0 15px;
    height: 100%;
    flex-grow: 1;
    flex-basis: 0;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    background: ${p => (
    p.active
      ? p.disabled ? '#ccc' : '#555'
      : p.disabled ? '#fafafa' : '#fff'
  )};
    color: ${p => (
    p.active
      ? '#fff'
      : p.disabled ? '#DDD' : '#555'
  )};
    &:not(:last-child) {
        border-right: 1px solid #ccc;
    }
`;
const Label = styled.div`
    color: ${colors.TEXT_NORMAL};
    margin-bottom: 5px;
    font-weight: 600;
    text-align: left;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Tab = styled.div`
`;

export class SegmentedControl extends React.PureComponent {
  static defaultProps = {
    options: [
      'Segment 1',
      'Segfault 2',
      'Seg 3',
    ],
    tabs: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      active: parseInt(props.active, 10),
      maxWidth: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.props;
    if (active === prevProps.active) return false;

    let value = parseInt(active);

    if (this.state.active !== value) {
      if (isNaN(value)) {
        value = null;
      }
      this.setState({ active: value });
    }
  }

  chooseActive(active) {
    return () => this.setState({
      active,
    });
  }

  updateMaxWidth(el) {
    this.setState({ maxWidth: el });
  }

  render() {
    const { options, disabled, label } = this.props;
    const { active } = this.state;
    const tabs = this.props.tabs; // React.Children.toArray(this.props.tabs);
    let activeSegmentName = null;
    let activeTab = null;
    if (!isNaN(active) && options.length && tabs && Object.keys(tabs).length) {
      activeSegmentName = !isNaN(active) ? options[active] : '';
      activeTab = Object.hasOwnProperty.call(tabs, activeSegmentName) ? tabs[activeSegmentName] : null;
    }
    return (
      <Container>
        {label ? <Label>{label}</Label> : null}

        <List>
          {options.map((segment, i) => <Segment key={i} active={active === i} disabled={disabled} onClick={this.chooseActive(i)}>{segment}</Segment>)}
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
