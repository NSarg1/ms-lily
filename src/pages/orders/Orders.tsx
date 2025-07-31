import { useEffect } from 'react';
import { ordersApi } from '@/service/orders/orders.api';

import styles from './orders.module.scss';

export const Orders = () => {
  useEffect(() => {
    (async () => {
      try {
        const res = await ordersApi.getUserOrders({ headers: {} });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div className={styles.container}>Patients</div>;
};
