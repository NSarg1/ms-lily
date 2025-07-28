import { useEffect } from 'react';
import { productsApi } from '@/service/products/products.api';

import styles from './products.module.scss';

export const Products = () => {
  useEffect(() => {
    (async () => {
      const res = await productsApi.getBrands();
      console.log(res);
    })();
  }, []);
  return <div className={styles.container}>Patients</div>;
};
