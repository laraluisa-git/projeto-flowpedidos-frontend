import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listOrders } from "../services/orderService";
import { listProducts } from "../services/productService";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [o, p] = await Promise.all([listOrders(), listProducts()]);
        setOrders(o ?? []);
        setProducts(p ?? []);
      } finally {
        setLoading(false);
      }
    })().catch((e) => alert(e.message));
  }, [refresh]);

  const value = useMemo(
    () => ({
      orders,
      products,
      loading,
      refresh: () => setRefresh(r => r + 1),
    }),
    [orders, products, loading]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
