import { memo } from "react";

import styles from '@/styles/table.module.css';

function CustomTable({children, ...rest}: ComponentWithChildrenProps) {
    return (
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative"  {...rest} >
          {children}
        </table>
    );
  }

const memoized = memo(CustomTable) as React.NamedExoticComponent<ComponentWithChildrenProps>;

export default memoized;