import styles from "@/styles/table.module.css";

function CustomTR({ children, ...rest }: ComponentWithChildrenProps) {
    return <tr className="text-left" {...rest}>{children}</tr>;
}

function CustomTD({ children, ...rest }: ComponentWithChildrenProps) {
    return (
        <td  {...rest} scope="col"  className="border-dashed border-t border-gray-200 px-3">
            {children}
        </td>
    );
}

export { CustomTR, CustomTD };
