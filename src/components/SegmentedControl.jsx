import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
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

export class SegmentedControl extends React.Component {
  static defaultProps = {
    segments: [
      'Segment 1',
      'Segfault 2',
      'Seg 3',
    ],
  }

  constructor(props) {
    super(props);
    this.state = {
      active: parseInt(props.active, 10),
      maxWidth: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { numSegments, active } = this.props;

    if (active === prevProps.active) return;

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
    const { numSegments, segments, disabled } = this.props;
    const { active } = this.state;

    return (
      <Container>
        <List>
          {segments.map((segment, i) => <Segment key={i} active={active === i} disabled={disabled} onClick={this.chooseActive(i)}>{segment}</Segment>)}
        </List>
      </Container>
    );
  }
}
