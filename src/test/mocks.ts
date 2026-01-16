import type { Producto } from '../tipos/producto';

// Productos de prueba para tests
export const productosMock: Producto[] = [
  {
    id: '1',
    name: 'Laptop Pro X1',
    price: 1299.99,
    description: 'Potente laptop para profesionales con procesador de última generación',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/laptop/400/300',
  },
  {
    id: '2',
    name: 'Mouse Inalámbrico',
    price: 29.99,
    description: 'Mouse ergonómico con conexión Bluetooth y alta precisión',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/mouse/400/300',
  },
  {
    id: '3',
    name: 'Teclado Mecánico RGB',
    price: 89.99,
    description: 'Teclado mecánico con iluminación RGB y switches azules',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/keyboard/400/300',
  },
  {
    id: '4',
    name: 'Mochila para Laptop',
    price: 49.99,
    description: 'Mochila resistente al agua con compartimento acolchado para laptop de 15 pulgadas',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/backpack/400/300',
  },
];

// Producto individual para tests
export const productoMock: Producto = productosMock[0];

// Producto nuevo para tests de creación
export const productoNuevoMock = {
  name: 'Producto de Prueba',
  price: 99.99,
  description: 'Descripción del producto de prueba para testing',
  category: 'Test',
  image: '',
};
