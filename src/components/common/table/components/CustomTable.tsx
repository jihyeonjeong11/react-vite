import React from 'react';
import styles from '@/styles/table.module.css';

function CustomTable({children, ...rest}: ComponentWithChildrenProps) {
    return (
        <table {...rest} className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          {children}
        </table>
    );
  }

const memoized = React.memo(CustomTable) as React.NamedExoticComponent<ComponentWithChildrenProps>;

export default memoized;