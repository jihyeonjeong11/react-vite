import type { UserListProps } from '../container/TableRoot';
import React from 'react';

import styles from '@/styles/table.module.css';

function StudentTable({ users }: UserListProps) {
    return (
      <div className={styles.studentsTableContainer}>
        <table className={styles.studentsTable}>
          <thead className={styles.studentTableHead}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.studentTableBody}>
            {users.map(({ id, name, username, company }) => (
              <tr key={username}>
                <td>{id}</td>
                <td>
                  <p>{name}</p>
                </td>
                <td>
                  <p>{company.name}</p>
                </td>
                <td>
                  <button>View Posts</button>
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan={4}>No users....</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  export default StudentTable;