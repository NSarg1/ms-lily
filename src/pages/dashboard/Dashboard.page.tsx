import { useState } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

import styles from './dashboard.module.scss';

const hoursArr: number[] = Array.from({ length: 25 }, (_, i) => i);

export const DashboardPage = () => {
  const [isFullVisible, setIsFullVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const formattedHours = hoursArr.slice(isFullVisible ? 0 : 8);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <Typography.Title>Welcome, Narek Sargsyan</Typography.Title>
          <Typography.Text>wish you a productive day...</Typography.Text>
        </div>
      </div>
    </div>
  );
};
