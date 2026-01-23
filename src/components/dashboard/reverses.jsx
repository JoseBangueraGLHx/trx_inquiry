// import React, { useEffect, useState } from "react";
// import { Alert, Card, Layout } from "antd";
// import { Content } from "antd/es/layout/layout";
// import DynamicBreadcrumb from "../menu/navigationBreadCrumd";
// import SearchForm from "../forms/searchForms";
// import TransactionTable from "../tables/transactionTable";
// import { mockTransactions } from "../../mockData";

// const ReversesTransaction = () => {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [typeSearch, setTypeSearch] = useState("workstation");

//   // Función para recibir el tipo de búsqueda desde el formulario hijo
//   const handleTypeSearch = (type) => {
//     console.log("Tipo de búsqueda seleccionado:", type);
//     setTypeSearch(type);
//   };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     console.log("ReversesTransaction component mounted");
//   //   };

//   //   fetchData();
//   // });

//   const handleSearch = async (values) => {
//     setLoading(true);
//     try {
//       // Aquí realizas la llamada a la API o filtrado
//       // const response = await api.getTransactions(values);
//       // setTableData(response.data);

//       console.log("Filtros recibidos del hijo:", values);

//       // Simulación de carga
//       setTimeout(() => {
//         setTableData(mockTransactions);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const handleResetTable = () => {
//     setTableData([]); // Limpiamos los datos para volver al "Empty State"
//   };

//   return (
//     <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
//       <Content style={{ padding: "24px" }}>
//         <DynamicBreadcrumb pageName="Transaction Inquiry" />
//         {/* 🔹 Filtros */}
//         {/* <Card title="Search or Filter" style={{ marginBottom: 24 }} extra={<LogoutButton />}> */}
//         <Card title="Search or Filter" style={{ marginBottom: 24 }}>
//           <SearchForm
//             onSearch={handleSearch}
//             onReset={handleResetTable} // Pasamos la función como prop
//             loading={loading}
//             onTypeSearch={handleTypeSearch}
//           />
//         </Card>

//         {!loading && tableData.length > 0 && (
//           <Alert
//             message="Reverse a transaction only available if it was made within the current business day, which usually spans a 24-hour period."
//             type="info"
//             showIcon
//             closable
//             style={{ marginBottom: 16, fontSize: 21 }}
//           />
//         )}
//         {!loading && tableData.length === 0 && (
//           <Card style={{ marginBottom: 24 }}>
//             <div style={{ textAlign: "center", backgroundColor: "#fff", borderRadius: "8px" }}>
//               <p style={{ color: "#999" }}>Enter search criteria and click Apply to view transactions</p>
//             </div>
//           </Card>
//         )}

//         {/* 🔹 Tabla */}
//         {!loading && tableData.length > 0 && (
//           <Card title="Transactions">
//             <TransactionTable data={tableData} loading={loading} typeSearch={typeSearch} />
//           </Card>
//         )}
//       </Content>
//     </Layout>
//   );
// };

// export default ReversesTransaction;

import { useEffect, useState } from "react";
import { Alert, Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import DynamicBreadcrumb from "../menu/navigationBreadCrumd";
import SearchForm from "../forms/searchForms";
import TransactionTable from "../tables/transactionTable";
import { mockTransactions } from "../../mockData";

// Constantes
const STYLES = {
  layout: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  content: {
    padding: 24,
  },
  card: {
    marginBottom: 24,
  },
  alert: {
    marginBottom: 16,
    fontSize: 21,
  },
  emptyState: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  emptyStateText: {
    color: "#999",
  },
};

const MESSAGES = {
  alertInfo:
    "Reverse a transaction only available if it was made within the current business day, which usually spans a 24-hour period.",
  emptyState: "Enter search criteria and click Apply to view transactions",
};

const SEARCH_DELAY = 1000; // ms

// Componente para el estado vacío
const EmptyState = () => (
  <Card style={STYLES.card}>
    <div style={STYLES.emptyState}>
      <p style={STYLES.emptyStateText}>{MESSAGES.emptyState}</p>
    </div>
  </Card>
);

// Componente para el Alert informativo
const InfoAlert = () => <Alert message={MESSAGES.alertInfo} type="info" showIcon closable style={STYLES.alert} />;

const ReversesTransaction = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typeSearch, setTypeSearch] = useState("workstation");

  const hasData = tableData.length > 0;

  // Maneja el tipo de búsqueda desde el formulario
  const handleTypeSearch = (type) => {
    setTypeSearch(type);
  };

  // Maneja la búsqueda con los filtros
  const handleSearch = async (values) => {
    setLoading(true);

    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await api.getTransactions(values);
      // setTableData(response.data);

      // Simulación de carga
      await new Promise((resolve) => setTimeout(resolve, SEARCH_DELAY));
      setTableData(mockTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Resetea la tabla al estado vacío
  const handleResetTable = () => {
    setTableData([]);
  };

  return (
    <Layout style={STYLES.layout}>
      <Content style={STYLES.content}>
        <DynamicBreadcrumb pageName="Transaction Inquiry" />

        {/* Filtros */}
        <Card title="Search or Filter" style={STYLES.card}>
          <SearchForm
            onSearch={handleSearch}
            onReset={handleResetTable}
            loading={loading}
            onTypeSearch={handleTypeSearch}
          />
        </Card>

        {/* Alerta informativa - solo si hay datos */}
        {!loading && hasData && <InfoAlert />}

        {/* Estado vacío - solo si no hay datos */}
        {!loading && !hasData && <EmptyState />}

        {/* Tabla de transacciones - solo si hay datos */}
        {!loading && hasData && (
          <Card title="Transactions">
            <TransactionTable data={tableData} loading={loading} typeSearch={typeSearch} />
          </Card>
        )}
      </Content>
    </Layout>
  );
};

export default ReversesTransaction;
