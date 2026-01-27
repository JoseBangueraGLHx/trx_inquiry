// import React, { useState } from "react";
// import { Drawer, Button, Typography, Tabs, Flex, Space } from "antd";
// import DetailViewTab from "../tabs/detailViewTab";
// import HistoryViewTab from "../tabs/historyViewTab";
// import { ArrowLeftOutlined } from "@ant-design/icons";

// const { Text, Title } = Typography;

// const STYLES = {
//   footer: {
//     display: "flex",
//     gap: 10,
//     padding: 10,
//   },
// };

// const ReverseTransactionDrawer = ({ visible, onClose, transactionData }) => {
//   // Estado para controlar qué contenido mostrar en el body
//   const [activeKey, setActiveKey] = useState("details");

//   if (!transactionData) return null;

//   // 1. Definimos el encabezado completo (Título + Pestañas) como un bloque sólido
//   const customHeader = (
//     <div style={{ margin: "-16px -24px" }}>
//       {" "}
//       {/* Márgenes negativos para cubrir todo el header del Drawer */}
//       <div style={{ padding: "16px 24px" }}>
//         <Space size={0} style={{ display: "flex", flexDirection: "column", lineHeight: 1, alignItems: "baseline" }}>
//           <Title level={5} style={{ margin: 0 }}>
//             Transaction Details
//           </Title>
//           <Text type="secondary" style={{ fontSize: "13px", fontWeight: "normal" }}>
//             View complete information about this transaction.
//           </Text>
//         </Space>
//       </div>
//       {/* Las pestañas ahora son parte del Header FIJO */}
//       <Tabs
//         activeKey={activeKey}
//         onChange={(key) => setActiveKey(key)}
//         tabBarStyle={{
//           backgroundColor: "#FFFFFF",
//           margin: 0,
//           padding: "0 24px",
//           borderBottom: "1px solid #f0f0f0",
//         }}
//         items={[
//           { key: "details", label: "Details" },
//           { key: "history", label: "History" },
//         ]}
//       />
//     </div>
//   );

//   return (
//     <Drawer
//       title={customHeader} // El header ahora incluye los tabs
//       width={640}
//       onClose={onClose}
//       open={visible}
//       closable={true}
//       styles={{
//         body: {
//           backgroundColor: "#F5F5F5", // Fondo gris para el contenido
//           padding: "0px", // Quitamos padding para que el contenido no tenga huecos arriba
//         },
//         footer: {
//           backgroundColor: "#FFFFFF",
//         },
//         header: {
//           borderBottom: "none", // Quitamos la línea doble
//           title: {
//             alignItems: "baseline !important",
//           },
//         },
//       }}
//       footer={
//         <div style={STYLES.footer}>
//           <Flex gap="middle" justify="flex-start">
//             <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
//               Back
//             </Button>
//           </Flex>
//         </div>
//       }
//     >
//       {/* 2. El contenido cambia según la pestaña activa sin moverse el header */}
//       <div style={{ padding: "24px" }}>
//         {activeKey === "details" ? (
//           <DetailViewTab transactionData={transactionData} />
//         ) : (
//           <HistoryViewTab transactionData={transactionData} />
//         )}
//       </div>
//     </Drawer>
//   );
// };

// export default ReverseTransactionDrawer;

import { useState } from "react";
import { Drawer, Button, Typography, Tabs, Flex, Space } from "antd";
import DetailViewTab from "../tabs/detailViewTab";
import HistoryViewTab from "../tabs/historyViewTab";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

// Constantes
const DRAWER_CONFIG = {
  width: 640,
};

const STYLES = {
  headerContainer: {
    margin: "-16px -24px",
  },
  headerContent: {
    padding: "16px 24px",
  },
  titleSpace: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
    alignItems: "baseline",
  },
  title: {
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "normal",
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    margin: 0,
    padding: "0 24px",
    borderBottom: "1px solid #f0f0f0",
  },
  bodyContent: {
    padding: 24,
  },
  footer: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
};

const DRAWER_STYLES = {
  body: {
    backgroundColor: "#F5F5F5",
    padding: 0,
  },
  footer: {
    backgroundColor: "#FFFFFF",
  },
  header: {
    borderBottom: "none",
    title: {
      alignItems: "baseline !important",
    },
  },
};

const MESSAGES = {
  title: "Transaction Details",
  subtitle: "View complete information about this transaction.",
  backButton: "Back",
};

const TAB_ITEMS = [
  { key: "details", label: "Details" },
  { key: "history", label: "History" },
];

const TAB_KEYS = {
  DETAILS: "details",
  HISTORY: "history",
};

// Componente del Header personalizado
const DrawerHeader = ({ activeKey, onTabChange }) => (
  <div style={STYLES.headerContainer}>
    <div style={STYLES.headerContent}>
      <Space size={0} style={STYLES.titleSpace}>
        <Title level={5} style={STYLES.title}>
          {MESSAGES.title}
        </Title>
        <Text type="secondary" style={STYLES.subtitle}>
          {MESSAGES.subtitle}
        </Text>
      </Space>
    </div>

    <Tabs activeKey={activeKey} onChange={onTabChange} tabBarStyle={STYLES.tabBar} items={TAB_ITEMS} />
  </div>
);

// Componente del Footer
const DrawerFooter = ({ onClose }) => (
  <div style={STYLES.footer}>
    <Flex gap="middle" justify="flex-start">
      <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
        {MESSAGES.backButton}
      </Button>
    </Flex>
  </div>
);

// Componente del contenido según la pestaña activa
const TabContent = ({ activeKey, transactionData }) => {
  if (activeKey === TAB_KEYS.DETAILS) {
    return <DetailViewTab transactionData={transactionData} />;
  }

  return <HistoryViewTab transactionData={transactionData} />;
};

const ReverseTransactionDrawer = ({ visible, onClose, transactionData }) => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.DETAILS);

  if (!transactionData) return null;

  return (
    <Drawer
      title={<DrawerHeader activeKey={activeKey} onTabChange={setActiveKey} />}
      width={DRAWER_CONFIG.width}
      onClose={onClose}
      open={visible}
      closable
      styles={DRAWER_STYLES}
      footer={<DrawerFooter onClose={onClose} />}
    >
      <div style={STYLES.bodyContent}>
        <TabContent activeKey={activeKey} transactionData={transactionData} />
      </div>
    </Drawer>
  );
};

export default ReverseTransactionDrawer;
