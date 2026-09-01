import api from "../api/axiosInstance";

/**
 * Servicio para obtener cuentas de agente por CUIT
 * @param {*} cuit
 * @returns data de rsta
 */
export const getAccountByCuit = async (cuit) => {
  const { data } = await api.get(`/v1/bo/billers/${cuit}/agent`);
  return data;
};

/**
 * Servicio para obtener cuentas de agente por workstation ID
 * @param {*} workstationId
 * @returns  data de rsta
 */
export const getAccountByWorkstation = async (workstationId) => {
  const { data } = await api.get(`/v1/bo/workstations/${workstationId}/agent`);
  return data;
};

/**
 * Servicio para obtener la lista de transacciones
 * @param {*} params
 * @returns data de rsta
 */
export const getTransactions = async (params) => {
  const { data } = await api.get(`/v1/trx/transactions`, { params });
  return data;
};

/**
 * Servicio para obtener una transaccion por payment item ID
 * @param {*} paymentItemId
 * @returns data de rsta
 */
export const getTransactionByPaymentItemId = async (paymentItemId) => {
  const { data } = await api.get(`/v1/trx/transactions/${paymentItemId}`);
  return data;
};
