import type { UserListProps } from '../container/TableRoot';
import React from 'react';

import styles from '@/styles/table.module.css';

function StudentGrid({ users }: UserListProps) {
  return (
    <div className={styles.studentGridContainer}>
      <div className={styles.studentCardList}>
        {users.map(({ id, name, username, company }) => (
          <div key={`${username}-${id}`} className={styles.studentCard}>
            <h3 className={styles.studentName}>
              <p>{name}</p>
            </h3>
            <p >
              Company: <span>{company.name}</span>
            </p>
            <span className="user-posts-link">
              <button>View Posts</button>
            </span>
          </div>
        ))}
        {!users.length && <h3>No users....</h3>}
      </div>
    </div>
  );
}

export default StudentGrid;