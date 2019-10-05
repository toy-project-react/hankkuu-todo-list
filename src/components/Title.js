import React from 'react';

const Title = (props) => {
    return (
        <div className="page-header">
		    <h1>{props.value}</h1>
	    </div>
    );
};

export default Title;