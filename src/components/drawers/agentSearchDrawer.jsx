import { useState, useEffect } from "react";
import { Drawer, Radio, Input, Table, Button, Space, Typography, Flex, Alert } from "antd";
import { SearchOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { mockDataAccountId, mockDataWorkstation } from "../../mockData";
import { stylesApplyButton } from "../constants";

const { Text } = Typography;

// Constantes
const SEARCH_TYPES = {
  WORKSTATION: "workstation",
  ACCOUNT: "account",
};

const DRAWER_CONFIG = {
  width: 640,
  marginTop: 64,
};

const STYLES = {
  headerText: {
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: "#FFDD00",
    color: "#1F1F1F",
    border: "none",
    flex: 1,
    fontWeight: "bold",
  },
  backButton: {
    flex: 1,
  },
  footer: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    marginTop: 15,
  },
  searchInput: {
    marginBottom: 5,
  },
  helperText: {
    fontSize: 12,
    display: "block",
    marginBottom: 20,
  },
  alert: {
    marginBottom: 20,
  },
};

const MESSAGES = {
  title: "Agent Account",
  selectAccount: "Select one Account to Filter",
  searchBy: "Search By: ",
  searchPlaceholder: "Search...",
  helperText: "Must be exactly 8 characters",
  emptyTable: "Enter search term and press Enter to search",
  alertTitle: "Reversing a transaction will:",
  alertDescription: [
    "Credit or debit the amount back to the agent account.",
    "Create an audit trail entry.",
    "This action can not be undone.",
  ],
};

const TABLE_COLUMNS = [
  { title: "Account", dataIndex: "account", key: "account" },
  { title: "Name", dataIndex: "name", key: "name" },
];

// Función para filtrar datos
const filterData = (data, searchText) => {
  if (!searchText) return [];

  const lowerSearchText = searchText.toLowerCase();
  return data.filter(
    (item) => item.account.toString().includes(searchText) || item.name.toLowerCase().includes(lowerSearchText)
  );
};

// Componente del Header
const DrawerHeader = () => (
  <Space>
    <Text strong style={STYLES.headerText}>
      {MESSAGES.title}
    </Text>
  </Space>
);

// Componente del Footer
const DrawerFooter = ({ onConfirm, onBack, disabled }) => (
  <div style={STYLES.footer}>
    <Flex gap="middle" justify="flex-end">
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={onConfirm}
        disabled={disabled}
        style={stylesApplyButton(disabled)}
      >
        Confirm
      </Button>
      <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={STYLES.backButton}>
        Back
      </Button>
    </Flex>
  </div>
);

// Componente de búsqueda y filtros
const SearchSection = ({ searchBy, onSearchByChange, searchText, onSearchTextChange, hasError }) => (
  <>
    <div style={STYLES.searchContainer}>
      <Text type="secondary">{MESSAGES.selectAccount}</Text>
      <div style={STYLES.radioContainer}>
        <Text strong>{MESSAGES.searchBy}</Text>
        <Radio.Group value={searchBy} onChange={(e) => onSearchByChange(e.target.value)}>
          <Radio value={SEARCH_TYPES.WORKSTATION}>Workstation</Radio>
          <Radio value={SEARCH_TYPES.ACCOUNT}>Account ID</Radio>
        </Radio.Group>
      </div>
    </div>

    <Input
      placeholder={MESSAGES.searchPlaceholder}
      suffix={<SearchOutlined />}
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
      style={STYLES.searchInput}
      status={hasError ? "error" : ""}
    />
    <Text type="secondary" style={STYLES.helperText}>
      {MESSAGES.helperText}
    </Text>
  </>
);

// Componente del Alert de advertencia
const WarningAlert = () => (
  <Alert
    message={MESSAGES.alertTitle}
    description={
      <div>
        {MESSAGES.alertDescription.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    }
    type="warning"
    showIcon
    closable
    style={STYLES.alert}
  />
);

const AgentSearchDrawer = ({ visible, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [searchBy, setSearchBy] = useState(SEARCH_TYPES.WORKSTATION);
  const [hasSearched, setHasSearched] = useState(false);

  // Filtrado de datos cuando cambia el texto de búsqueda o el tipo de búsqueda
  useEffect(() => {
    const sourceData = searchBy === SEARCH_TYPES.WORKSTATION ? mockDataWorkstation : mockDataAccountId;

    const filtered = filterData(sourceData, searchText);
    setDataSource(filtered);

    // Marca que se ha realizado una búsqueda
    if (searchText.length > 0) {
      setHasSearched(true);
    }
  }, [searchText, searchBy]);

  // Determina si no hay resultados después de buscar
  const noResultsFound = hasSearched && searchText.length > 0 && dataSource.length === 0;

  // Confirma la selección
  const handleConfirm = () => {
    if (selectedRowKey) {
      onSelect({ account: selectedRowKey, searchBy });
      onClose();
    }
  };

  // Maneja el cambio de selección de fila
  const handleRowSelectionChange = (keys) => {
    setSelectedRowKey(keys[0] || null);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRowKey ? [selectedRowKey] : [],
    onChange: handleRowSelectionChange,
  };

  return (
    <Drawer
      title={<DrawerHeader />}
      headerStyle={{ borderBottom: "none" }}
      closable
      width={DRAWER_CONFIG.width}
      marginTop={DRAWER_CONFIG.marginTop}
      onClose={onClose}
      open={visible}
      footer={<DrawerFooter onConfirm={handleConfirm} onBack={onClose} disabled={!selectedRowKey || noResultsFound} />}
    >
      <SearchSection
        searchBy={searchBy}
        onSearchByChange={setSearchBy}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        hasError={noResultsFound}
      />

      {/* Muestra el alert cuando no hay resultados */}
      {noResultsFound && <WarningAlert />}

      <Table
        rowKey="account"
        rowSelection={rowSelection}
        columns={TABLE_COLUMNS}
        dataSource={dataSource}
        pagination={false}
        locale={{ emptyText: MESSAGES.emptyTable }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRowKey(record.account);
          },
        })}
      />
    </Drawer>
  );
};

export default AgentSearchDrawer;
