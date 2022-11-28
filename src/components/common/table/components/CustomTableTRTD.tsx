import styles from "@/styles/table.module.css";

function CustomTR({ children, ...rest }: ComponentWithChildrenProps) {
    return <tr className="text-left" {...rest}>{children}</tr>;
}

// border-dashed border-t border-gray-200  tdborder

function CustomTD({ children, ...rest }: ComponentWithChildrenProps) {
    return (
        <td  scope="col"  className="px-3" {...rest} >
            {children}
        </td>
    );
}

export { CustomTR, CustomTD };
