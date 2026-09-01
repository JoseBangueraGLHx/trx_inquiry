// Mock data for Account ID Drawer search & choices
export const mockAccountSearchResults = [
  {
    organization: "Movistar",
    key: "movistar",
    accounts: [
      { key: "mov1", account: "AG - 12345670", name: "Movistar Movil" },
      { key: "mov2", account: "AG - 12345671", name: "Movistar Hogar" },
    ],
  },
  {
    organization: "Personal",
    key: "personal",
    accounts: [
      { key: "per1", account: "AG - 12345672", name: "Personal Movil" },
      { key: "per2", account: "AG - 12345673", name: "Personal Fibra" },
      { key: "per3", account: "AG - 12345674", name: "Personal Flow" },
      { key: "per4", account: "AG - 12345675", name: "Personal Pay" },
    ],
  },
  {
    organization: "Telecom",
    key: "telecom",
    accounts: [
      { key: "tel1", account: "AG - 12345676", name: "Telecom Empresas" },
      { key: "tel2", account: "AG - 12345677", name: "Telecom Redes" },
    ],
  },
];

// Mock data for Table Transactions matching table1.png
export const mockTransactions = [
  {
    key: "TXN005",
    transactionId: "TXN005",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 210000.0,
    currency: "ARS",
    status: "Reversed",
  },
  {
    key: "TXN004",
    transactionId: "TXN004",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 220000.0,
    currency: "ARS",
    status: "Rejected",
  },
  {
    key: "TXN003",
    transactionId: "TXN003",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 230000.0,
    currency: "ARS",
    status: "Rejected",
  },
  {
    key: "TXN002",
    transactionId: "TXN002",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 240000.0,
    currency: "ARS",
    status: "Completed",
  },
  {
    key: "TXN010",
    transactionId: "TXN010",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 250000.0,
    currency: "ARS",
    status: "Reversed",
  },
  {
    key: "TXN011",
    transactionId: "TXN011",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 260000.0,
    currency: "ARS",
    status: "Completed",
  },
  {
    key: "TXN012",
    transactionId: "TXN012",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 270000.0,
    currency: "ARS",
    status: "Completed",
  },
  {
    key: "TXN013",
    transactionId: "TXN013",
    billerName: "Personal Movil",
    billerAccount: "BAC - 00101010101010110",
    transactionDttm: "11:08:2025 04:30:00",
    transactionAmt: 210000.0,
    currency: "ARS",
    status: "Reversed",
  },
];

// Mock data for Transaction Details Drawer matching detail1.png
export const mockTransactionDetailData = {
  transactionId: "TXN005",
  statusCd: "Reversed",
  operationStage: "Stage 3", // validar que campo es del swagger
  controlSignatureCd: "CS-2025-008",
  ordererBusinessRefTxt: "{Orderer Business Reference}",
  beneficiaryBusinessRefTxt: "{Beneficiary Business Reference}",
  amount: "ARS 210000.00", // Validar que campo es del swagger
  paymentMethodCd: "{ Debit / Credit }",
  channelStatusCd: "Completed",
  creationDate: "01-05-2026 04:30:00", // Validar que campo es del swagger
  dueDate: "01-15-2026", // Validar que campo es del swagger o si es dueDttm
  caseInformation: {
    requesterName: "Harry and Lloyd", // Validar que campo es del swagger
    reason: "customer_request", // Validar que campo es del swagger
    comment: "He wants to return it to her and hopefully win her heart in the process.", // Validar que campo es del swagger
    reversedBy: "Internal User (Back-Office)", // Validar que campo es del swagger
    reversedAt: "Nov 26, 2025 10:57:44", // Validar que campo es del swagger
  },
  consolidateKey: {
    numberValue: "{ Number value }", // Validar que campo es del swagger
    taxValue: "( Currency E.g. (IVA) ARS $Tax value )", // Validar que campo es del swagger
  },
  financialBreakdown: {
    amount: "ARS$150,000.00", // Validar que campo es del swagger
    charges: "ARS$280.75", // Validar que campo es del swagger
    fee: "ARS$275.50", // Validar que campo es del swagger
    commission: "ARS$4,200.00", // Validar que campo es del swagger
    netAmount: "ARS $205,800.00", // Validar que campo es del swagger
  },
  transactionInfo: {
    externalReferenceId: "TXN-968334",
    createdByTxt: "central.station.kiosk@westernunion.com",
    sourceCd: "Call Center",
    transactionTypeCd: "Payment",
    transactionDesc: "Internet Service Payment",
    systemReferenceId: "TXN027",
  },
};
