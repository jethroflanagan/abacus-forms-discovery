import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 580px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
const Label = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${colors.TEXT_NORMAL};
`;
const Track = styled.div`
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #555;
    height: 20px;
    padding: 5px;
    border-radius: 25px;
    width: 100%;
`;
const Slider = styled.div`
  height: 100%;
  width: 100%;
  background: #888;
  border-radius: 20px;
`;

export class VerticalStepIndicator extends React.Component {
  // Set default properties
  static defaultProps = {
    step: 1,
    totalSteps: 3,
  }

  render() {
    const { label, step, totalSteps } = this.props;
    return (
      <Container>
        <Label>Step {step} of {totalSteps}</Label>
        <Track>
          <Slider style={{width: (step / totalSteps) * 100 + '%'}}/>
        </Track>
      </Container>
    );
  }
}
