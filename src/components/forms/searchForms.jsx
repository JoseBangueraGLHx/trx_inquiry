import { useState } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col, Tooltip } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import AgentSearchDrawer from "./agentSearchDrawer";
import { stylesApplyButton } from "../constants";

// Constantes
const FORM_CONFIG = {
  initialValues: {
    date: dayjs("2026-01-23"),
    currency: "ARS",
  },
  validation: {
    agentAccountLength: 11,
    controlSignatureLength: 8,
  },
};

const CURRENCY_OPTIONS = [
  { value: "ARS", label: "ARS (Argentine Pesos)" },
  { value: "USD", label: "USD (US Dollars)" },
];

const STYLES = {
  form: {
    padding: 20,
    backgroundColor: "#fff",
  },
  applyButton: {
    marginRight: 8,
  },
  buttonsContainer: {
    marginBottom: 24,
    textAlign: "left",
  },
};

// Componente del botón Apply con estilos dinámicos
const ApplyButton = ({ disabled, loading, onClick }) => {
  return (
    <Button type="default" disabled={disabled} style={stylesApplyButton(disabled)} onClick={onClick} loading={loading}>
      Apply
    </Button>
  );
};

// Utilidad para extraer el ID del formato "WS-XXXXX" o "AG-XXXXX"
const extractAccountId = (value) => {
  if (!value || !value.includes("-")) return value;
  return value.split("-")[1];
};

// Utilidad para formatear el tipo de búsqueda
const formatTypeSearch = (searchBy, account) => {
  const prefix = searchBy === "workstation" ? "WS" : "AG";
  return `${prefix}-${account}`;
};

const SearchForm = ({ onSearch, onReset, loading, onTypeSearch }) => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("workstation");
  const [drawerKey, setDrawerKey] = useState(0);

  const agentAccount = Form.useWatch("agentAccount", form);
  const isDisabled = !agentAccount;

  // Maneja la selección del Agent Account desde el drawer
  const handleAgentSelect = (value) => {
    const formattedValue = formatTypeSearch(value.searchBy, value.account);
    form.setFieldsValue({ agentAccount: formattedValue });
    setSearchBy(value.searchBy);
  };

  // Maneja el submit del formulario
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const cleanValues = {
          ...values,
          agentAccount: extractAccountId(values.agentAccount),
        };

        onSearch(cleanValues);
        onTypeSearch(searchBy);
      })
      .catch((error) => {
        console.log("Validate Failed Form:", error);
      });
  };

  // Resetea el formulario
  const handleResetForm = () => {
    form.resetFields();
    setDrawerKey((prev) => prev + 1);
    onReset?.();
  };

  // Maneja la apertura y cierre del drawer
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleDrawerOpen = () => setDrawerOpen(true);

  return (
    <div>
      <Form form={form} layout="vertical" initialValues={FORM_CONFIG.initialValues} style={STYLES.form}>
        <Row gutter={[24, 16]}>
          {/* Agent Account */}
          <Col span={8}>
            <Form.Item
              label="Agent Account"
              name="agentAccount"
              required
              extra="Must be exactly 8 characters"
              rules={[
                {
                  len: FORM_CONFIG.validation.agentAccountLength,
                  message: "Must be exactly 8 characters",
                },
              ]}
            >
              <Input
                placeholder="AG-8 characters"
                readOnly
                onClick={handleDrawerOpen}
                suffix={<SearchOutlined onClick={handleDrawerOpen} />}
              />
            </Form.Item>
          </Col>

          {/* Control Signature */}
          <Col span={8}>
            <Form.Item
              label="Control signature"
              name="controlSignature"
              extra="Must be exactly 8 characters"
              rules={[
                {
                  len: FORM_CONFIG.validation.controlSignatureLength,
                  message: "Must be exactly 8 characters",
                },
              ]}
            >
              <Input placeholder="CS-8 characters" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]} align="bottom">
          {/* Date */}
          <Col span={8}>
            <Form.Item
              label={
                <span>
                  Date{" "}
                  <Tooltip title="The date is set based on the 24-hour transaction reversal rule">
                    <QuestionCircleOutlined style={{ fontSize: 12 }} />
                  </Tooltip>
                </span>
              }
              name="date"
            >
              <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" />
            </Form.Item>
          </Col>

          {/* Currency Type */}
          <Col span={8}>
            <Form.Item label="Currency Type" name="currency">
              <Select placeholder="ARS (Argentine Pesos)">
                {CURRENCY_OPTIONS.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Botones */}
          <Col span={8} style={STYLES.buttonsContainer}>
            <ApplyButton disabled={isDisabled} loading={loading} onClick={handleSubmit} />
            <Button type="default" onClick={handleResetForm}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      <AgentSearchDrawer
        key={drawerKey}
        visible={drawerOpen}
        onClose={handleDrawerClose}
        onSelect={handleAgentSelect}
        style={{ marginTop: 64 }}
      />
    </div>
  );
};

export default SearchForm;
