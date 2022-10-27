import styles from '@/styles/table.module.css';

function CustomTable({children, ...rest}: ComponentWithChildrenProps) {
    return (
        <table {...rest} className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          {children}
        </table>
    );
  }
  export default CustomTable;