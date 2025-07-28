import { useEffect } from 'react';
import { ordersApi } from '@/service/orders/orders.api';

import styles from './orders.module.scss';

export const Orders = () => {
  useEffect(() => {
    (async () => {
      const res = await ordersApi.getUserOrders();
      console.log(res);
    })();
  }, []);

  return <div className={styles.container}>Patients</div>;
};
