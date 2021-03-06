import React, { Fragment } from 'react';
import spinner from '../../img/loading.gif';

const Spinner = () => {
	return (
		<Fragment>
			<img
				src={spinner}
				style={{ width: '200px', margin: 'auto', display: 'block' }}
				alt='loading'
			/>
		</Fragment>
	);
};

export default Spinner;
