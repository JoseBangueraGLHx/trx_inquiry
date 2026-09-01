import React, { useState } from "react";
import { Card, Row, Col, Input, Select, DatePicker, Button, Typography, Tooltip, Space } from "antd";
import { SearchOutlined, CheckCircleFilled, QuestionCircleOutlined, HomeOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { RangePicker } = DatePicker;

// Componente de tarjeta de búsqueda y filtros para la consulta de transacciones.
// Props:
// - onOpenAccountDrawer: abre el drawer para seleccionar Account ID.
// - selectedAccount: cuenta actualmente seleccionada.
// - onApplySearch: callback para ejecutar la búsqueda con los filtros existentes.
// - onReset: callback para restablecer los filtros a su estado inicial.
const SearchFilterCard = ({ onOpenAccountDrawer, selectedAccount, onApplySearch, onReset }) => {
  const [transactionId, setTransactionId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [status, setStatus] = useState("All");
  const [currencyType, setCurrencyType] = useState("ARS (Argentine Pesos)");
  const [dateRange, setDateRange] = useState(null);

  // Normaliza y valida el input del Transaction ID para mantener el formato TXN-XXXXXXXX.
  const handleTransactionIdChange = (e) => {
    let inputVal = e.target.value.toUpperCase();
    if (!inputVal) {
      setTransactionId("");
      return;
    }
    let rawContent = inputVal;
    if (rawContent.startsWith("TXN-")) {
      rawContent = rawContent.slice(4);
    } else if (rawContent.startsWith("TXN")) {
      rawContent = rawContent.slice(3);
    }
    let cleanContent = rawContent.replace(/[^A-Z0-9-]/g, "").slice(0, 8);
    setTransactionId(cleanContent ? `TXN-${cleanContent}` : "");
  };

  // Normaliza y valida el input del Branch ID para mantener el formato INV-XXXXXXXX.
  const handleBranchIdChange = (e) => {
    let inputVal = e.target.value.toUpperCase();
    if (!inputVal) {
      setBranchId("");
      return;
    }
    let rawContent = inputVal;
    if (rawContent.startsWith("INV-")) {
      rawContent = rawContent.slice(4);
    } else if (rawContent.startsWith("INV")) {
      rawContent = rawContent.slice(3);
    }
    let cleanContent = rawContent.replace(/[^A-Z0-9-]/g, "").slice(0, 8);
    setBranchId(cleanContent ? `INV-${cleanContent}` : "");
  };

  // Deshabilita el botón Apply si no están completados los campos requeridos.
  const isApplyDisabled = !selectedAccount || !dateRange || !status || !currencyType;

  // Checkmark validations
  const isAccountValid = !!selectedAccount;
  const txBody = transactionId.startsWith("TXN-") ? transactionId.slice(4) : "";
  const isTransactionValid = txBody.length === 8;

  const branchBody = branchId.startsWith("INV-") ? branchId.slice(4) : "";
  const isBranchValid = branchBody.length === 8;

  // Restablece todos los campos del formulario y notifica al componente padre.
  const handleReset = () => {
    setTransactionId("");
    setBranchId("");
    setPaymentMethod("All");
    setStatus("All");
    setCurrencyType("ARS (Argentine Pesos)");
    setDateRange(null);
    if (onReset) onReset();
  };

  // Envía los datos de filtro al componente padre para ejecutar la búsqueda.
  const handleApply = () => {
    if (onApplySearch) {
      onApplySearch({
        account: selectedAccount,
        transactionId,
        branchId,
        paymentMethod,
        status,
        currencyType,
        dateRange,
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Breadcrumb Header 
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
        <HomeOutlined style={{ color: "#8C8C8C" }} />
        <Text type="secondary">/</Text>
        <QuestionCircleOutlined style={{ color: "#8C8C8C" }} />
        <Text style={{ fontWeight: 500, color: "#141414" }}>Transaction Inquiry</Text>
      </div>*/}

      {/* Main Search/Filter Card */}

      <Row gutter={[24, 20]}>
        {/* Account ID */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text type="danger">* </Text>
              <Text style={{ fontWeight: 500, color: "#333" }}>Account ID</Text>
            </div>
            <Input
              readOnly
              placeholder="AID-8 characters"
              value={selectedAccount ? selectedAccount.account || selectedAccount : ""}
              onClick={onOpenAccountDrawer}
              suffix={
                isAccountValid ? (
                  <CheckCircleFilled style={{ color: "#389E0D", fontSize: 16 }} />
                ) : (
                  <SearchOutlined style={{ color: "#8C8C8C", cursor: "pointer" }} onClick={onOpenAccountDrawer} />
                )
              }
              style={{
                borderRadius: 6,
                height: 40,
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
              }}
            />
            <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
              Must be exactly 8 characters
            </Text>
          </div>
        </Col>

        {/* Transaction ID */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, color: "#333" }}>Transaction ID</Text>
            </div>
            <Input
              placeholder="TXN-8 characters"
              value={transactionId}
              onChange={handleTransactionIdChange}
              suffix={isTransactionValid ? <CheckCircleFilled style={{ color: "#389E0D", fontSize: 16 }} /> : null}
              style={{ borderRadius: 6, height: 40 }}
            />
            <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
              Must be exactly 8 characters
            </Text>
          </div>
        </Col>

        {/* Branch ID */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, color: "#333" }}>Branch ID</Text>
            </div>
            <Input
              placeholder="INV-8 characters"
              value={branchId}
              onChange={handleBranchIdChange}
              suffix={
                isBranchValid ? (
                  <CheckCircleFilled style={{ color: "#389E0D", fontSize: 16 }} />
                ) : (
                  <SearchOutlined style={{ color: "#8C8C8C" }} />
                )
              }
              style={{ borderRadius: 6, height: 40 }}
            />
            <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
              Must be exactly 8 characters
            </Text>
          </div>
        </Col>

        {/* Payment Method */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 500, color: "#333" }}>Payment method</Text>
            </div>
            <Select
              value={paymentMethod}
              onChange={(val) => setPaymentMethod(val)}
              style={{ width: "100%", height: 40 }}
              options={[
                { value: "All", label: "All" },
                { value: "Cash", label: "Cash" },
                { value: "Debit", label: "Debit" },
                { value: "QR", label: "QR" },
              ]}
            />
          </div>
        </Col>

        {/* Status */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text type="danger">* </Text>
              <Text style={{ fontWeight: 500, color: "#333" }}>Status</Text>
            </div>
            <Select
              value={status}
              onChange={(val) => setStatus(val)}
              style={{ width: "100%", height: 40 }}
              options={[
                { value: "All", label: "All" },
                { value: "Completed", label: "Completed" },
                { value: "Reverse", label: "Reverse" },
                { value: "Rejected", label: "Rejected" },
              ]}
            />
          </div>
        </Col>

        {/* Currency Type */}
        <Col xs={24} sm={12} md={8}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Text type="danger">* </Text>
              <Text style={{ fontWeight: 500, color: "#333" }}>Currency Type</Text>
            </div>
            <Select
              value={currencyType}
              onChange={(val) => setCurrencyType(val)}
              style={{ width: "100%", height: 40 }}
              options={[
                { value: "ARS (Argentine Pesos)", label: "ARS (Argentine Pesos)" },
                { value: "$ARS (Argentine Pesos)", label: "$ARS (Argentine Pesos)" },
                { value: "USD (US Dollars)", label: "USD (US Dollars)" },
              ]}
            />
          </div>
        </Col>

        {/* Date */}
        <Col xs={24} sm={16} md={10}>
          <div>
            <div style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <Text type="danger">* </Text>
              <Text style={{ fontWeight: 500, color: "#333" }}>Date</Text>
              <Tooltip title="Transactions displayed are limited to a maximum of 30 days old">
                <QuestionCircleOutlined style={{ color: "#8C8C8C", fontSize: 13 }} />
              </Tooltip>
            </div>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              placeholder={["Start date", "End date"]}
              style={{ width: "100%", height: 40, borderRadius: 6 }}
            />
            <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
              Transactions displayed are limited to a maximum of 30 days old
            </Text>
          </div>
        </Col>

        {/* Action Buttons */}
        <Col xs={24} sm={8} md={6} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
          <Space size="middle">
            <Button
              type="primary"
              onClick={handleApply}
              disabled={isApplyDisabled}
              style={{
                backgroundColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                borderColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                color: isApplyDisabled ? "#A0A0A0" : "#000000",
                fontWeight: 600,
                height: 40,
                padding: "0 24px",
                borderRadius: 6,
                boxShadow: "none",
              }}
            >
              Apply
            </Button>
            <Tooltip title="Reset all filters to default values ​​to perform new searches.">
              <Button
                onClick={handleReset}
                style={{
                  height: 40,
                  padding: "0 24px",
                  borderRadius: 6,
                  borderColor: "#D9D9D9",
                }}
              >
                Reset
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilterCard;
