import React from 'react';
import styles from "@/styles/table.module.css";

function CustomTableHead({ children, ...rest }: ComponentWithChildrenProps) {
    return <thead  {...rest}>{children}</thead>;
}


const memoized = React.memo(CustomTableHead) as React.NamedExoticComponent<ComponentWithChildrenProps>;


export default memoized;
