// import { Alert, Card, Collapse, Descriptions, Divider, Tag, Typography } from "antd";
// import React from "react";
// import { dataDrawerView } from "../../mockData";

// const { Text, Title } = Typography;
// const { Panel } = Collapse;

// const DetailViewTab = ({ transactionData }) => {
//   const data = { ...transactionData, ...dataDrawerView[0] };

//   return (
//     <div>
//       <Alert
//         title="Unfortunately, this transaction cannot be reversed."
//         description="The reversal period for the Biller Account has expired since the transaction was processed X hours ago."
//         type="warning"
//         showIcon
//         closable
//       />
//       {/* Información Básica de la Transacción */}
//       <div style={{ marginTop: 16 }}>
//         <div style={{ margin: "0 16px" }}>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Text type="secondary">Transaction ID</Text>
//             <Tag color="success" style={{ color: "#016630" }} variant="outlined">
//               Completed
//             </Tag>
//           </div>
//           <Title level={5} style={{ marginTop: 4 }}>
//             {data.transactionId}
//           </Title>
//         </div>
//         <Divider style={{ margin: "12px 0" }} />

//         {/* Seccion 0, info transaction  */}
//         <Card style={{ marginBottom: "16px", borderRadius: "8px", border: "none" }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//             {[
//               { label: "Control Signature", value: data.controlSignature || "N/A" },
//               { label: "Amount", value: data.amount || "N/A" },
//               { label: "Workstation", value: data.workstation || "N/A" },
//               { label: "Payment Method", value: data.paymentMethod || "N/A" },
//             ].map((item, index) => (
//               <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Text type="secondary">{item.label}:</Text>
//                 <Text style={{ textAlign: "right", maxWidth: "60%" }}>{item.value}</Text>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Sección 1: Financial Breakdown */}
//         <Card style={{ marginBottom: "16px", borderRadius: "8px", border: "none" }} bodyStyle={{ padding: 0 }}>
//           <Collapse ghost expandIconPosition="end">
//             <Panel header={<Text strong>Financial Breakdown</Text>} key="1" style={{ padding: "0px 16px" }}>
//               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                 {[
//                   { label: "Amount", value: data.amount || "N/A" },
//                   { label: "Commission", value: data.commission || "N/A" },
//                   { label: "Taxes", value: data.taxes || "N/A" },
//                   { label: "Net Amount", value: data.netAmount || "N/A" },
//                 ].map((item, index) => (
//                   <>
//                     {item.label === "Net Amount" ? (
//                       // Renderizado especial para Net Amount
//                       <>
//                         <Divider style={{ margin: "8px 0" }} />
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                           <Text strong>{item.label}:</Text>
//                           <Text strong style={{ fontSize: "16px" }}>
//                             {item.value}
//                           </Text>
//                         </div>
//                       </>
//                     ) : (
//                       // Renderizado estándar para los demás campos
//                       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
//                         <Text type="secondary">{item.label}:</Text>
//                         <Text style={{ textAlign: "right", maxWidth: "60%" }}>{item.value}</Text>
//                       </div>
//                     )}
//                   </>
//                 ))}
//               </div>
//             </Panel>
//           </Collapse>
//         </Card>

//         {/* Sección 2: Transaction Information */}
//         <Card style={{ borderRadius: "8px", border: "none" }} bodyStyle={{ padding: 0 }}>
//           <Collapse ghost expandIconPosition="end">
//             <Panel header={<Text strong>Transaction Information</Text>} key="2" style={{ padding: "0px 16px" }}>
//               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                 {[
//                   { label: "External Reference", value: data.externalReference || "N/A" },
//                   { label: "Created By", value: data.createdBy || "N/A" },
//                   { label: "Source", value: data.source || "N/A" },
//                   { label: "Transaction Type", value: data.transactionType || "N/A" },
//                   { label: "Description", value: data.description || "N/A" },
//                   { label: "System Reference", value: data.systemReference || "N/A" },
//                 ].map((item, index) => (
//                   <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
//                     <Text type="secondary">{item.label}:</Text>
//                     <Text style={{ textAlign: "right", maxWidth: "60%" }}>{item.value}</Text>
//                   </div>
//                 ))}
//               </div>
//             </Panel>
//           </Collapse>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DetailViewTab;

import { Alert, Card, Collapse, Divider, Tag, Typography } from "antd";
import { dataDrawerView } from "../../mockData";

const { Text, Title } = Typography;
const { Panel } = Collapse;

// Constantes
const STYLES = {
  container: {
    marginTop: 16,
  },
  header: {
    margin: "0 16px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 4,
  },
  divider: {
    margin: "12px 0",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    border: "none",
  },
  cardBody: {
    padding: 0,
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  fieldRowWithMargin: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fieldValue: {
    textAlign: "right",
    maxWidth: "60%",
  },
  netAmountRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  netAmountValue: {
    fontSize: 16,
  },
  netAmountDivider: {
    margin: "8px 0",
  },
  panel: {
    padding: "0px 16px",
  },
  tag: {
    color: "#016630",
  },
};

const MESSAGES = {
  alertTitle: "Unfortunately, this transaction cannot be reversed.",
  alertDescription:
    "The reversal period for the Biller Account has expired since the transaction was processed X hours ago.",
  statusCompleted: "Completed",
  transactionIdLabel: "Transaction ID",
  financialBreakdown: "Financial Breakdown",
  transactionInformation: "Transaction Information",
  notAvailable: "N/A",
};

// Configuración de campos por sección
const TRANSACTION_INFO_FIELDS = [
  { label: "Control Signature", key: "controlSignature" },
  { label: "Amount", key: "amount" },
  { label: "Workstation", key: "workstation" },
  { label: "Payment Method", key: "paymentMethod" },
];

const FINANCIAL_BREAKDOWN_FIELDS = [
  { label: "Amount", key: "amount" },
  { label: "Commission", key: "commission" },
  { label: "Taxes", key: "taxes" },
  { label: "Net Amount", key: "netAmount", isHighlight: true },
];

const TRANSACTION_DETAIL_FIELDS = [
  { label: "External Reference", key: "externalReference" },
  { label: "Created By", key: "createdBy" },
  { label: "Source", key: "source" },
  { label: "Transaction Type", key: "transactionType" },
  { label: "Description", key: "description" },
  { label: "System Reference", key: "systemReference" },
];

// Componente para el Alert de advertencia
const WarningAlert = () => (
  <Alert title={MESSAGES.alertTitle} description={MESSAGES.alertDescription} type="warning" showIcon closable />
);

// Componente para el header de la transacción
const TransactionHeader = ({ transactionId }) => (
  <div style={STYLES.header}>
    <div style={STYLES.headerRow}>
      <Text type="secondary">{MESSAGES.transactionIdLabel}</Text>
      <Tag color="success" style={STYLES.tag} variant="outlined">
        {MESSAGES.statusCompleted}
      </Tag>
    </div>
    <Title level={5} style={STYLES.title}>
      {transactionId}
    </Title>
  </div>
);

// Componente para renderizar un campo estándar
const InfoField = ({ label, value, style }) => (
  <div style={style}>
    <Text type="secondary">{label}:</Text>
    <Text style={STYLES.fieldValue}>{value || MESSAGES.notAvailable}</Text>
  </div>
);

// Componente para renderizar el Net Amount destacado
const NetAmountField = ({ value }) => (
  <>
    <Divider style={STYLES.netAmountDivider} />
    <div style={STYLES.netAmountRow}>
      <Text strong>Net Amount:</Text>
      <Text strong style={STYLES.netAmountValue}>
        {value || MESSAGES.notAvailable}
      </Text>
    </div>
  </>
);

// Componente para la sección de información básica
const BasicInfoSection = ({ data }) => (
  <Card style={STYLES.card}>
    <div style={STYLES.fieldContainer}>
      {TRANSACTION_INFO_FIELDS.map((field, index) => (
        <InfoField key={index} label={field.label} value={data[field.key]} style={STYLES.fieldRow} />
      ))}
    </div>
  </Card>
);

// Componente para la sección de desglose financiero
const FinancialBreakdownSection = ({ data }) => (
  <Card style={STYLES.card} bodyStyle={STYLES.cardBody}>
    <Collapse ghost expandIconPosition="end">
      <Panel header={<Text strong>{MESSAGES.financialBreakdown}</Text>} key="1" style={STYLES.panel}>
        <div style={STYLES.fieldContainer}>
          {FINANCIAL_BREAKDOWN_FIELDS.map((field, index) => {
            if (field.isHighlight) {
              return <NetAmountField key={index} value={data[field.key]} />;
            }
            return (
              <InfoField key={index} label={field.label} value={data[field.key]} style={STYLES.fieldRowWithMargin} />
            );
          })}
        </div>
      </Panel>
    </Collapse>
  </Card>
);

// Componente para la sección de información de transacción
const TransactionInfoSection = ({ data }) => (
  <Card style={STYLES.card} bodyStyle={STYLES.cardBody}>
    <Collapse ghost expandIconPosition="end">
      <Panel header={<Text strong>{MESSAGES.transactionInformation}</Text>} key="2" style={STYLES.panel}>
        <div style={STYLES.fieldContainer}>
          {TRANSACTION_DETAIL_FIELDS.map((field, index) => (
            <InfoField key={index} label={field.label} value={data[field.key]} style={STYLES.fieldRow} />
          ))}
        </div>
      </Panel>
    </Collapse>
  </Card>
);

const DetailViewTab = ({ transactionData }) => {
  const data = { ...transactionData, ...dataDrawerView[0] };

  return (
    <div>
      <WarningAlert />

      <div style={STYLES.container}>
        <TransactionHeader transactionId={data.transactionId} />
        <Divider style={STYLES.divider} />

        <BasicInfoSection data={data} />
        <FinancialBreakdownSection data={data} />
        <TransactionInfoSection data={data} />
      </div>
    </div>
  );
};

export default DetailViewTab;
