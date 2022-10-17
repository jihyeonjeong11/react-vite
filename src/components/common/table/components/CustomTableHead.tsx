import styles from "@/styles/table.module.css";

function CustomTableHead({ children, ...rest }: ComponentWithChildrenProps) {
    return <thead  {...rest}>{children}</thead>;
}
export default CustomTableHead;
