import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../global/Colors';
import { Button } from '../components/Button';

const Container = styled.div`
	background: ${(p) => (p.isOpen ? '#efefef' : 'transparent')};
	display: flex;
	width: 580px;
	align-items: center;
	/* justify-content: center; */
	flex-direction: column;
`;

const Heading = styled.div`
	font-size: 24px;
	text-align: center;
  width: 100%;
	padding: 20px;
	padding-bottom: 0;
	color: ${colors.TEXT_NORMAL};
  padding-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  width: 100%;
  text-align: center;
  color: ${colors.TEXT_NORMAL};
  padding-bottom: 20px;

`;
export class ThankYou extends React.Component {
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<Heading>Thank you!</Heading>
				<Content>We'll get back to you soon.</Content>
        <Button onClick={() => this.props.reset()} label="Start again" />
			</Container>
		);
	}
}
