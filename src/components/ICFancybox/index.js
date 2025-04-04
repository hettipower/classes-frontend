import React, { useRef, useEffect } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "components/ICFancybox/fancybox.css";

function ICFancybox({ delegate, options, children, ...rest }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegateItem = delegate || "[data-fancybox]";
        const optionsItem = options || {};

        NativeFancybox.bind(container, delegateItem, optionsItem);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <MDBox style={{ '--fancybox-zIndex': 10000 }} {...rest} ref={containerRef}>{children}</MDBox>;
}

// typechecking props for ICFancybox
ICFancybox.propTypes = {
    delegate: PropTypes.string,
    options: PropTypes.instanceOf(Object),
    children: PropTypes.node
};

export default ICFancybox;