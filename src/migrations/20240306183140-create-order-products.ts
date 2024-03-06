'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Order", // 'Users' would also work
          key: 'id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Product", // 'Products' would also work
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    });
  },
  async down(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.dropTable('OrderProducts');
  }
};