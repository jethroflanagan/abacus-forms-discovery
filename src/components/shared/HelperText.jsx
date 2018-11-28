import * as React from "react";
import styled from 'styled-components';
import * as colors from '../../global/Colors';
import { IconError } from '../icons/IconError';
import { IconWarning } from '../icons/IconWarning';
import { IconSuccess } from '../icons/IconSuccess';

const HelperTextContainer = styled.div`
    display: flex;
    margin-top: 5px;
`;

const StatusIcon = styled.div`
    margin-right: 5px;
    width: 16px;
    height: 16px;
`;

const Message = styled.div`
    color: ${p => p.statusColor};
    font-size: 14px;
`;


export class HelperText extends React.PureComponent {
  // Set default properties
  static defaultProps = {
    message: "",
    status: "",
  }

  render() {
    const { message, status } = this.props;
    let statusColor = '#555';
    let statusIcon = null;
    switch (status) {
        case 'error':
            statusColor = colors.ERROR;
            statusIcon = <IconError />;
            break;
        case 'warning':
            statusColor = colors.WARNING;
            statusIcon = <IconWarning />;
            break;
        case 'success':
            statusColor = colors.SUCCESS;
            statusIcon = <IconSuccess />;
            break;
    }
    return (
      <HelperTextContainer>
          {statusIcon ? <StatusIcon>{statusIcon}</StatusIcon> : null}
          <Message statusColor={statusColor}>{message}&nbsp;</Message>
      </HelperTextContainer>
    );
  }
}
