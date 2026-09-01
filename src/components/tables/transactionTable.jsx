import React, { useState } from "react";
import { Table, Button, Tag, Typography, Space, Dropdown, Row, Col } from "antd";
import { ExportOutlined, DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

// Componente de tabla que muestra la lista de transacciones y acciones asociadas.
// Props:
// - transactions: arreglo de transacciones a mostrar.
// - onViewDetail: callback para ver el detalle de una transacción.
const TransactionTable = ({ transactions = [], onViewDetail }) => {
  // Moneda seleccionada en el encabezado y filas actualmente seleccionadas.
  const [selectedCurrency, setSelectedCurrency] = useState("ARS");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Selecciona todas las filas de transacción en la tabla.
  const handleSelectAll = () => {
    setSelectedRowKeys(transactions.map((t) => t.key));
  };

  // Deselecciona todas las filas.
  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  // Actualiza la selección de filas cuando cambia el checkbox.
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const exportMenuItems = [
    { key: "1", label: "Export as CSV" },
    { key: "2", label: "Export as Excel" },
  ];

  // Renderiza una etiqueta de estado con estilo según el estado de la transacción.
  const renderStatusTag = (status) => {
    switch (status) {
      case "Reversed":
        return (
          <Tag
            style={{
              backgroundColor: "#EFF8FF",
              borderColor: "#B2DDFF",
              color: "#175CD3",
              borderRadius: 12,
              padding: "2px 12px",
              fontWeight: 500,
            }}
          >
            Reversed
          </Tag>
        );
      case "Rejected":
        return (
          <Tag
            style={{
              backgroundColor: "#FEF3F2",
              borderColor: "#FECDCA",
              color: "#F04438",
              borderRadius: 12,
              padding: "2px 12px",
              fontWeight: 500,
            }}
          >
            Rejected
          </Tag>
        );
      case "Completed":
        return (
          <Tag
            style={{
              backgroundColor: "#ECFDF3",
              borderColor: "#ABEFC6",
              color: "#12B76A",
              borderRadius: 12,
              padding: "2px 12px",
              fontWeight: 500,
            }}
          >
            Completed
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
      render: (text) => <Text style={{ fontSize: 13, color: "#333" }}>{text}</Text>,
    },
    {
      title: "Biller Account",
      dataIndex: "billerName",
      key: "billerAccount",
      sorter: (a, b) => a.billerName.localeCompare(b.billerName),
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{record.billerName || "Personal Movil"}</div>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {record.billerAccount || "BAC - 00101010101010110"}
          </Text>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "transactionDttm",
      key: "transactionDttm",
      sorter: (a, b) => a.transactionDttm.localeCompare(b.transactionDttm),
      render: (text) => <Text style={{ fontSize: 13, color: "#333" }}>{text}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "transactionAmt",
      key: "transactionAmt",
      sorter: (a, b) => a.transactionAmt - b.transactionAmt,
      render: (val, record) => (
        <Text style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>
          {record.currency || "ARS"}{" "}
          {typeof val === "number" ? val.toLocaleString("es-AR", { minimumFractionDigits: 2 }) : val}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => onViewDetail(record)}
          style={{ padding: 0, fontWeight: 500, color: "#1890FF" }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 8,
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top Filter Summary Header Bar */}
      <Row
        justify="space-between"
        align="middle"
        style={{
          borderBottom: "1px solid #F0F0F0",
          paddingBottom: 16,
          marginBottom: 16,
        }}
      >
        <Col>
          <Space size="large" align="center">
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#141414" }}>Transactions</Text>

            <Space size={6} align="center">
              <Text type="secondary" style={{ fontSize: 13 }}>
                Currency
              </Text>
              {["All", "ARS", "USD"].map((curr) => {
                const isActive = selectedCurrency === curr;
                return (
                  <Button
                    key={curr}
                    size="small"
                    onClick={() => setSelectedCurrency(curr)}
                    style={{
                      borderRadius: 16,
                      fontSize: 12,
                      borderColor: isActive ? "#1890FF" : "#D9D9D9",
                      color: isActive ? "#1890FF" : "#595959",
                      backgroundColor: isActive ? "#E6F7FF" : "#FFF",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {curr}
                  </Button>
                );
              })}
            </Space>

            <Space size={4}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Payment method
              </Text>
              <Tag style={{ borderRadius: 12, background: "#F5F5F5", color: "#333", margin: 0 }}>All</Tag>
            </Space>
          </Space>
        </Col>

        <Col>
          <Space size={6} align="center">
            <Text type="secondary" style={{ fontSize: 13 }}>
              Total amount
            </Text>
            <Tag
              style={{
                borderRadius: 12,
                background: "#F5F5F5",
                color: "#141414",
                fontWeight: 600,
                fontSize: 13,
                padding: "2px 10px",
                margin: 0,
              }}
            >
              ARS 6.719.000,00
            </Tag>
          </Space>
        </Col>
      </Row>

      {/* Action Toolbar (Select All / Unselect All / Export) 
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space size="middle">
            <Button
              type="primary"
              onClick={handleSelectAll}
              style={{
                backgroundColor: "#FFC72C",
                borderColor: "#FFC72C",
                color: "#000000",
                fontWeight: 600,
                borderRadius: 6,
                boxShadow: "none",
              }}
            >
              Select All
            </Button>
            <Button
              onClick={handleUnselectAll}
              disabled={selectedRowKeys.length === 0}
              style={{
                borderRadius: 6,
                borderColor: "#D9D9D9",
              }}
            >
              Unselect All
            </Button>
          </Space>
        </Col>

        <Col>
          {/*<Dropdown menu={{ items: exportMenuItems }}>
            <Button style={{ borderRadius: 6 }}>
              <Space size={4}>
                <ExportOutlined />
                Export
                <DownOutlined style={{ fontSize: 10 }} />
              </Space>
            </Button>
          </Dropdown>*}
        </Col>
      </Row>*/}

      {/* Transactions Table */}
      <Table
        //rowSelection={rowSelection}
        columns={columns}
        dataSource={transactions}
        pagination={{
          pageSize: 8,
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
        size="middle"
      />

      {/* Footer Note */}
      <div style={{ marginTop: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          * Fees and exchange rates may vary depending on the exact time of transaction.
        </Text>
      </div>
    </div>
  );
};

export default TransactionTable;
