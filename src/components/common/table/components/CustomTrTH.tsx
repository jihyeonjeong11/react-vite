
function CustomTR({ children, ...rest }: ComponentWithChildrenProps) {
    return <tr {...rest}>{children}</tr>;
}

function CustomTH({ children, ...rest }: ComponentWithChildrenProps) {
    return (
        <th {...rest} scope="col" className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
            {children}
        </th>
    );
}

export { CustomTR, CustomTH };
