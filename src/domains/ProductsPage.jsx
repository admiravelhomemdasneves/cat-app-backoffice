import React from "react";
import ProductsStore from "../stores/ProductsStore";
import DataTable from "../components/DataTable";
//import { useGetProducts, useGetProductById, usePostProduct, usePutProduct, useDeleteProduct } from "../services/productService";
//import productEntity from "../entities/productEntity";

const ProductsPage = () => { 
  return (
    <DataTable 
      storeGet = { ProductsStore.GetProducts }
      storeDelete = { ProductsStore.DeleteProducts}
      storeSave = { ProductsStore.SaveProducts }
      idField = { ProductsStore.idField }
      sampleRow = { ProductsStore.sampleRow}
      contentColumns = { ProductsStore.productsColumns }
      visibilityModel = { ProductsStore.visibilityModel }
      pageTitle = { ProductsStore.pageTitle }
      pageSubtitle = { ProductsStore.pageSubtitle }
    />
  )
};

export default ProductsPage;
