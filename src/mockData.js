export const mockTransactions = [
  {
    key: "TXN0001",
    transactionId: "TXN0001",
    controlSignature: "CS-2025-0012",
    workstation: "WS-ABCD1234",
    paycode: "PC-2152M601",
    date: "23/01/2026 16:42:50",
    amount: 13897.0,
    currency: "ARS",
    status: "Completed",
    agentAccount: "AG-87654321",
  },
  {
    key: "TXN0002",
    transactionId: "TXN0002",
    controlSignature: "CS-2025-0001",
    workstation: "WS-ABCD1234",
    paycode: "PC-12A34574",
    date: "23/01/2026 12:34:59",
    amount: 5276.0,
    currency: "ARS",
    status: "Reversed",
    agentAccount: "AG-87654321",
  },
  {
    key: "TXN0003",
    transactionId: "TXN0003",
    controlSignature: "CS-2025-0002",
    workstation: "WS-ABCD1234",
    paycode: "PC-87B9M723",
    date: "23/01/2026 01:10:25",
    amount: 22317.0,
    currency: "ARS",
    status: "Pending",
    agentAccount: "AG-87654321",
  },
  {
    key: "TXN0004",
    transactionId: "TXN0004",
    controlSignature: "CS-2025-0003",
    workstation: "WS-ABCD1234",
    paycode: "PC-45C66578",
    date: "23/01/2026 02:05:06",
    amount: 24471.0,
    currency: "ARS",
    status: "CompletedError",
    agentAccount: "AG-87654321",
  },
];

export const mockDataWorkstation = [
  { key: "ABCD1234", account: "ABCD1234", name: "kiosko Calamuchita" },
  { key: "22222222", account: "22222222", name: "Gonza" },
  { key: "33333333", account: "33333333", name: "Mati" },
];

export const mockDataAccountId = [
  { key: "87654321", account: "87654321", name: "Agent One" },
  { key: "12345678", account: "12345678", name: "Agent Two" },
  { key: "11223344", account: "11223344", name: "Agent Three" },
];

export const dataDrawerView = [
  {
    controlSignature: "CS-2025-008",
    amount: "ARS 210000.00",
    workstation: "WS-ABCD1234",
    paymentMethod: "Credit",
    financialAmount: "ARS 210,000.00",
    commission: "ARS 4,200.00",
    taxes: "ARS 0.00",
    netAmount: "ARS 205,800.00",
    externalReference: "TXN-966334",
    createdBy: "central.station.kiosk@westernunion.com",
    source: "Call Center",
    transactionType: "Payment",
    description: "Internet Service Payment",
    systemReference: "TXN027",
  },
];

export const historyData = [
  {
    date: "2025/10/16 - 09:00",
    description: "Submitted by John Doe",
    status: "done",
  },
  {
    date: "2025/10/16 - 09:00",
    description: "Approved by Felipe Shikasho",
    status: "done",
  },
  {
    date: "2025/10/16 - 09:00",
    description: "Processing by ACM System",
    status: "pending",
  },
  {
    date: "2025/10/16 - 09:00",
    description: "Transaction Completed by ACM System",
    status: "done",
  },
];
