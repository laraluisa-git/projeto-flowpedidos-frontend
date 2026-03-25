import { apiFetch } from "./apiClient";

export async function listProducts() {
  const data = await apiFetch("/produtos");

  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.nome ?? p.name,
    category: p.categoria ?? p.category ?? "",
    stockQty: p.stockQty ?? p.stock_qty ?? 0,
    minStockQty: p.minStockQty ?? p.min_stock_qty ?? 0,
    unitPrice: p.unitPrice ?? p.unit_price ?? 0,
    isActive: p.isActive ?? p.is_active ?? true,
    createdAt: p.createdAt ?? p.criadoEm ?? p.criadoem,
    updatedAt: p.updatedAt ?? p.atualizadoEm,
  }));
}

export async function createProduct(payload) {
  return apiFetch("/produtos", { method: "POST", body: payload });
}

export async function updateProduct(id, payload) {
  return apiFetch(`/produtos/${id}`, { method: "PUT", body: payload });
}

export async function deleteProduct(id) {
  return apiFetch(`/produtos/${id}`, { method: "DELETE" });
}
