import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoadingData(props) {
	const { content, inverted = true } = props;

	return (
		<Dimmer active={true} inverted={inverted}>
			<Loader>{content}</Loader>
		</Dimmer>
	);
}
