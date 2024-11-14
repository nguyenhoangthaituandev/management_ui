import React from 'react';
import { Spinner } from 'react-bootstrap';

function WithLoading(WrappedComponent) {

    function HOC(props) {
        const { isLoading, ...rest } = props;

        if (isLoading) {
            return (
                <Spinner
                    animation="border"
                    variant="primary"
                    size="sm"
                    className="me-2"
                />
            );
        }

        return <WrappedComponent {...rest} />;
    }

    return HOC;
}

export default WithLoading;