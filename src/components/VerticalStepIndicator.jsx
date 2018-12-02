import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';


const Container = styled.div`
  display: flex;
  margin-right: 20px;
  margin-top: 15px;
  padding-right: 20px;
  min-width: 160px;
  border-right: 1px solid #efefef;
`;
const Label = styled.div`
  font-size: 18px;
  color: ${p => p.type === 'current' ? colors.FOCUS : colors.TEXT_NORMAL};
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
  color: ${p => p.type === 'upcoming' ? colors.TEXT_NORMAL : '#fff'};
  border-radius: 40px;
  width: 30px;
  height: 30px;
  border: 1px solid ${p => p.type === 'upcoming' ? colors.TEXT_NORMAL : 'transparent'};
  background-color: ${p => p.type === 'complete'
    ? colors.TEXT_NORMAL
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
    currentStep: 1,
    steps: [
      { label: 'First' },
      { label: 'Second' },
      { label: 'Third' },
    ],
  }

  createStep({ stepInfo, index, currentStep }) {
    const type = index < currentStep
      ? 'complete'
      : index === currentStep
        ? 'current'
        : 'upcoming';
    return (
      <StepContainer key={index}>
        <Step type={type}>
          { type === 'complete' ? <Tick style={{fill: '#fff'}} /> : index + 1 }
        </Step>
        <Label type={type}>{stepInfo.label}</Label>
      </StepContainer>
    );
  }

  render() {
    // current step is adjsut by -1 for ease of calcs in `createStep`
    const { currentStep, steps } = this.props;

    return (
      <Container>
        {/* <Track>
        </Track> */}
        <StepTrack>
          {steps.map((stepInfo, index) => this.createStep({ index, stepInfo, currentStep: currentStep - 1 }))}
        </StepTrack>
      </Container>
    );
  }
}
