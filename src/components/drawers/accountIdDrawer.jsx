import React, { useState } from "react";
import { Drawer, Radio, Input, Collapse, Table, Button, Typography, Space } from "antd";
import { CheckOutlined, ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { mockAccountSearchResults } from "../../mockData";

const { Text, Title } = Typography;

// Drawer para buscar y seleccionar un Account ID dentro de las cuentas disponibles.
// Props:
// - open: controla si el drawer está abierto.
// - onClose: callback para cerrar el drawer.
// - onConfirm: callback para confirmar la cuenta seleccionada.
const AccountIdDrawer = ({ open, onClose, onConfirm }) => {
  const [searchBy, setSearchBy] = useState("Workstation");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedAccountData, setSelectedAccountData] = useState(null);

  // Actualiza el término de búsqueda conforme el usuario escribe.
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Marca la fila seleccionada y almacena los datos de la cuenta seleccionada.
  const handleRadioChange = (accountObj) => {
    setSelectedRowKey(accountObj.key);
    setSelectedAccountData(accountObj);
  };

  // Confirma la selección actual y cierra el drawer.
  const handleConfirm = () => {
    if (selectedAccountData) {
      onConfirm(selectedAccountData);
      onClose();
    }
  };

  // Filtra las organizaciones y cuentas según el término ingresado.
  const filteredOrganizations = searchTerm.trim()
    ? mockAccountSearchResults.filter(
        (org) =>
          org.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          org.accounts.some(
            (acc) =>
              acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              acc.account.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    : [];

  // Columnas de la tabla de resultados para seleccionar el Account ID.
  const columns = [
    {
      title: "",
      dataIndex: "radio",
      width: 40,
      render: (_, record) => (
        <Radio checked={selectedRowKey === record.key} onChange={() => handleRadioChange(record)} />
      ),
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
  ];

  return (
    <Drawer
      title={
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            Account ID
          </Title>
          <Text type="secondary" style={{ fontSize: 13, fontWeight: "normal" }}>
            For the Biller account, please choose a data type to filter.
          </Text>
        </div>
      }
      placement="right"
      width={500}
      onClose={onClose}
      open={open}
      destroyOnClose
      footer={
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-start", padding: "12px 16px" }}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleConfirm}
            disabled={!selectedAccountData}
            style={{
              backgroundColor: selectedAccountData ? "#FFC72C" : "#E5E5E5",
              borderColor: selectedAccountData ? "#FFC72C" : "#E5E5E5",
              color: selectedAccountData ? "#000000" : "#A0A0A0",
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Confirm
          </Button>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={onClose}
            style={{
              borderColor: "#D9D9D9",
              color: "#333",
            }}
          >
            Back
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Search By Radio */}
        <div>
          <Space size="middle" align="center">
            <Text style={{ fontWeight: 500, color: "#333" }}>Search By :</Text>
            <Radio.Group onChange={(e) => setSearchBy(e.target.value)} value={searchBy}>
              <Radio value="Workstation">Workstation</Radio>
              <Radio value="CUIT">CUIT</Radio>
            </Radio.Group>
          </Space>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search by Organization Name or CUIT..."
          suffix={<SearchOutlined style={{ color: "#BFBFBF" }} />}
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ borderRadius: 6, height: 40 }}
          allowClear
        />

        {/* Content area */}
        {searchTerm.trim() === "" ? (
          <div
            style={{
              background: "#FAFAFA",
              borderRadius: 6,
              padding: "24px 16px",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <Text type="secondary" style={{ fontSize: 13 }}>
              Enter search term and press Enter to search
            </Text>
          </div>
        ) : (
          <div style={{ marginTop: 8 }}>
            <Collapse
              defaultActiveKey={["personal", "movistar", "telecom"]}
              expandIconPosition="end"
              ghost={false}
              bordered={true}
              style={{ background: "#FFF" }}
              items={filteredOrganizations.map((org) => ({
                key: org.key,
                label: <Text style={{ fontWeight: 600, fontSize: 14 }}>{org.organization}</Text>,
                children: (
                  <Table
                    dataSource={org.accounts}
                    columns={columns}
                    pagination={false}
                    size="small"
                    rowKey="key"
                    onRow={(record) => ({
                      onClick: () => handleRadioChange(record),
                      style: { cursor: "pointer" },
                    })}
                  />
                ),
              }))}
            />
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default AccountIdDrawer;
