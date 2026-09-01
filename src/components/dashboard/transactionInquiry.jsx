import React, { useState } from "react";
import { Typography, Card } from "antd";
import SearchFilterCard from "./searchFilterCard";
import AccountIdDrawer from "../drawers/accountIdDrawer";
import TransactionDetailDrawer from "../drawers/transactionDetailDrawer";
import TransactionTable from "../tables/transactionTable";
import ErrorBanner from "../shared/errorBanner";
import { mockTransactions } from "../../mockData";
import { Alert, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import DynamicBreadcrumb from "../menu/navigationBreadCrumd";

// Constantes de estilos reutilizables para el layout y las tarjetas del componente.
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

const { Text } = Typography;

// Componente principal de la página de consulta de transacciones.
// Muestra filtros de búsqueda, resultados en tabla, y dos drawers para seleccionar cuenta o ver detalles.
const TransactionInquiry = () => {
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchApplied, setSearchApplied] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);

  // Actualiza la cuenta seleccionada a partir del drawer de selección de cuenta.
  const handleConfirmAccount = (accountData) => {
    setSelectedAccount(accountData);
  };

  // Procesa la acción de aplicar búsqueda con los filtros proporcionados.
  // Si hay criterios válidos, marca como búsqueda aplicada y carga los datos de ejemplo.
  // Si no hay filtros, muestra el banner de búsqueda fallida.
  const handleApplySearch = (filters) => {
    if (filters.account || filters.dateRange || filters.transactionId || filters.branchId) {
      setSearchFailed(false);
      setSearchApplied(true);
      setTransactions(mockTransactions);
    } else {
      setSearchFailed(true);
      setSearchApplied(false);
    }
  };

  // Restablece el estado de búsqueda y la cuenta seleccionada a su estado inicial.
  const handleReset = () => {
    setSelectedAccount(null);
    setSearchApplied(false);
    setSearchFailed(false);
  };

  // Abre el drawer de detalle de transacción y guarda la transacción seleccionada.
  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailDrawerOpen(true);
  };

  return (
    <Layout style={STYLES.layout}>
      <Content style={STYLES.content}>
        <DynamicBreadcrumb pageName="Transaction Inquiry" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Search Filter Section */}
          <Card title="Search or Filter" style={STYLES.card}>
            <SearchFilterCard
              onOpenAccountDrawer={() => setAccountDrawerOpen(true)}
              selectedAccount={selectedAccount}
              onApplySearch={handleApplySearch}
              onReset={handleReset}
            />
          </Card>

          {/* Failed Search Alert Banner no data*/}
          {searchFailed && (
            <ErrorBanner
              title="Searching transaction Failed."
              message="It looks like the search didn't go through. Please Try again."
              onClose={() => setSearchFailed(false)}
            />
          )}

          {/* Main Content Area: Table or Initial Placeholder */}
          {searchApplied ? (
            <TransactionTable transactions={transactions} onViewDetail={handleViewDetail} />
          ) : (
            <Card
              bordered={false}
              style={{
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                textAlign: "center",
                padding: "36px 24px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text type="secondary" style={{ fontSize: 13 }}>
                Enter search criteria and click Apply to view transactions
              </Text>
            </Card>
          )}

          {/* Account ID Selection Drawer (drawer1.png & drawer2.png) */}
          <AccountIdDrawer
            open={accountDrawerOpen}
            onClose={() => setAccountDrawerOpen(false)}
            onConfirm={handleConfirmAccount}
          />

          {/* Transaction Details Drawer (detail1.png) */}
          <TransactionDetailDrawer
            open={detailDrawerOpen}
            onClose={() => setDetailDrawerOpen(false)}
            transaction={selectedTransaction}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default TransactionInquiry;
