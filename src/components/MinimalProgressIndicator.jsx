import * as React from "react";
import styled from 'styled-components';
import * as colors from '../global/Colors';


const Track = styled.div`
  display: flex;
  height: 4px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Slider = styled.div`
  height: 100%;
  width: 100%;
  background: ${colors.FOCUS};
  border-radius: 20px;
`;

export class MinimalProgressIndicator extends React.Component {
  // Set default properties
  static defaultProps = {
    step: 1,
    totalSteps: 3,
  }

  render() {
    const { step, totalSteps } = this.props;
    return (
      <Track>
        <Slider style={{width: (step / totalSteps) * 100 + '%'}}/>
      </Track>
    );
  }
}
