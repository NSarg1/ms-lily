import { useState } from 'react';
import { IProduct, TagProps } from '@/service/service.types';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Image, Input, Row, Select, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import styles from './products.module.scss';

import { mockProducts } from './products.mock';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();

  // Get unique categories and brands for filters
  const categories = Array.from(new Set(products.map((p) => p.category.name)));
  const brands = Array.from(new Set(products.map((p) => p.brand.name)));

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand.name === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleEdit = (product: IProduct) => {
    console.log('Edit product:', product);
    // TODO: Implement edit functionality
  };

  const handleDelete = (productId: number) => {
    console.log('Delete product:', productId);
    // TODO: Implement delete functionality
  };

  const handleView = (product: IProduct) => {
    console.log('View product:', product);
    // TODO: Implement view functionality
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'error', text: 'Out of Stock' };
    if (stock <= 5) return { color: 'warning', text: 'Low Stock' };
    return { color: 'success', text: 'In Stock' };
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string | null) => (
        <Image
          width={50}
          height={50}
          src={image ? `https://via.placeholder.com/50x50?text=Shoe` : undefined}
          fallback="https://via.placeholder.com/50x50?text=No+Image"
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
      ),
    },
    {
      title: 'IProduct Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string, record: IProduct) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
      filters: categories.map((cat) => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category.name === value,
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Brand',
      dataIndex: ['brand', 'name'],
      key: 'brand',
      filters: brands.map((brand) => ({ text: brand, value: brand })),
      onFilter: (value, record) => record.brand.name === value,
      render: (brand: string) => <Tag color="green">{brand}</Tag>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      render: (price: string) => <span style={{ fontWeight: 500 }}>${price}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      render: (stock: number) => {
        const status = getStockStatus(stock);
        return <Badge status={status.color as any} text={`${stock} (${status.text})`} />;
      },
    },
    {
      title: 'Size/Color',
      key: 'details',
      render: (_, record: IProduct) => (
        <div>
          <Tag color="default">Size: {record.size}</Tag>
          <Tag color="default">{record.color}</Tag>
        </div>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: TagProps[]) => (
        <div>
          {tags.map((tag) => (
            <Tag key={tag.id} color="purple" style={{ marginBottom: '2px' }}>
              {tag.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record: IProduct) => (
        <Space size="small">
          <Tooltip title="View">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Products Management
              </Title>
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />}>
                Add New IProduct
              </Button>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search products..."
                allowClear
                enterButton={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Select
                placeholder="Category"
                allowClear
                style={{ width: '100%' }}
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Select
                placeholder="Brand"
                allowClear
                style={{ width: '100%' }}
                value={selectedBrand}
                onChange={setSelectedBrand}
              >
                {brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredProducts.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};
