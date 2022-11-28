
function CustomTR({ children, ...rest }: ComponentWithChildrenProps) {
    return <tr {...rest}>{children}</tr>;
}


// thborder border-b 

function CustomTH({ children, ...rest }: ComponentWithChildrenProps) {
    return (
        <th  scope="col" className="py-2 px-3 sticky top-0 " {...rest}>
            {children}
        </th>
    );
}

export { CustomTR, CustomTH };
