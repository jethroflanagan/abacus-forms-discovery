import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';

const Container = styled.div`
    display: flex;
    margin-right: 20px;
    margin-top: 15px;
    min-width: 160px;
    border-right: 1px solid #efefef;
`;
const Label = styled.div`
  font-size: 18px;
  color: ${p => p.type !== 'current' ? colors.TEXT_DISABLED : colors.TEXT_NORMAL};
  margin-left: 10px;
`;
// const Track = styled.div`
//   display: inline-flex;
//   width: 2px;
//   background-color: ${colors.TEXT_NORMAL};
// `;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => p.type === 'upcoming' ? colors.TEXT_DISABLED : '#fff'};
  border-radius: 40px;
  width: 30px;
  height: 30px;
  border: 1px solid ${p => p.type === 'upcoming' ? colors.TEXT_DISABLED : 'transparent'};
  background-color: ${p => p.type === 'complete'
    ? colors.TEXT_DISABLED
    : p.type === 'current'
      ? colors.FOCUS
      : 'transparent'};
`;

const StepContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  &:not(:last-child):before {
    content: '';
    display: block;
    width: 1px;
    height: 20px;
    background-color: ${colors.TEXT_DISABLED};
    position: absolute;
    left: 15px;
    top: 100%;
  }
`;

const StepTrack = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export class VerticalStepIndicator extends React.Component {
  // Set default properties
  static defaultProps = {
    value: 1,
    steps: [
      { label: 'Payment'},
      { label: 'Notice' },
      { label: 'Ok' },
      { label: 'Ok' },
      { label: 'Ok' },
      { label: 'Yes' },
    ],
  }

  createStep({ step, index, currentStep }) {
    const type = index < currentStep
      ? 'complete'
      : index === currentStep
        ? 'current'
        : 'upcoming';
    return (
      <StepContainer>
        <Step type={type}>
          { type === 'complete' ? <Tick style={{fill: '#fff'}} /> : index + 1 }
        </Step>
        <Label type={type}>{step.label}</Label>
      </StepContainer>
    );
  }

  render() {
    const { value, steps } = this.props;
console.log(value, steps)

    return (
      <Container>
        {/* <Track>
        </Track> */}
        <StepTrack>
          {steps.map((step, index) => this.createStep({ index, step, currentStep: value }))}
        </StepTrack>
      </Container>
    );
  }
}
