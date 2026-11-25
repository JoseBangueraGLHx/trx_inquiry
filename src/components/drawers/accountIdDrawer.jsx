// ============================================================================
// LEYENDA
//   🟢 AGREGADO    → código nuevo
//   🟡 MODIFICADO  → existía, pero cambió
//   🔴 ELIMINADO   → estaba en tu versión original (se deja comentado para que
//                    veas qué era; puedes borrar estos comentarios después)
//   Sin marca      → igual que tu versión original
// ============================================================================

// 🟡 MODIFICADO: se agrega useRef
import React, { useState, useRef } from "react";
// 🟡 MODIFICADO: se quita Collapse y se agregan Spin, Empty y notification
import { Drawer, Radio, Input, Table, Button, Typography, Space, Spin, Empty, notification } from "antd";
import { CheckOutlined, ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
// 🔴 ELIMINADO: import { mockAccountSearchResults } from "../../mockData";
// 🟢 AGREGADO: servicios reales (⚠️ ajusta la ruta a la de tu proyecto)
import { getAccountByCuit, getAccountByWorkstation } from "../../services/trxInquiryServices";

const { Text, Title } = Typography;

// 🟢 AGREGADO: arma el mensaje de error a partir de la respuesta del back.
// Los 400 / 401 / 500 vienen con: { name, message, errorCode, correlationId, issues: [{ field, issue }] }
const getErrorInfo = (err) => {
  // Sin respuesta del servidor (caído, sin red, CORS, timeout)
  if (!err?.response) {
    return { message: "Could not connect to the server. Please try again.", correlationId: null };
  }

  const { status, data } = err.response;
  const correlationId = data?.correlationId ?? null;

  if (status === 401) {
    return { message: "Your session has expired. Please log in again.", correlationId };
  }

  if (status >= 500) {
    return { message: "Unexpected server error. Please try again later.", correlationId };
  }

  // 400: se muestra el detalle de validación si viene, si no el message general
  const issues = data?.issues?.map((i) => i.issue).filter(Boolean) ?? [];
  return {
    message: issues.length ? issues.join(". ") : data?.message || "Invalid request.",
    correlationId,
  };
};

// Drawer para buscar y seleccionar un Account ID.
// Props:
// - open: controla si el drawer está abierto.
// - onClose: callback para cerrar el drawer.
// - onConfirm: callback para confirmar la cuenta seleccionada.
const AccountIdDrawer = ({ open, onClose, onConfirm }) => {
  const [searchBy, setSearchBy] = useState("Workstation");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedAccountData, setSelectedAccountData] = useState(null);

  // 🟢 AGREGADO: estado de la búsqueda real
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 🟢 AGREGADO: hook de notificaciones de antd (respeta el tema/ConfigProvider).
  // El contextHolder se renderiza dentro del Drawer (ver más abajo).
  const [notificationApi, contextHolder] = notification.useNotification();

  // 🟢 AGREGADO: muestra el error como notification.error
  const showError = (err) => {
    const { message, correlationId } = getErrorInfo(err);
    notificationApi.error({
      message: "Search failed",
      description: correlationId ? (
        <>
          <div>{message}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Reference: {correlationId}
          </Text>
        </>
      ) : (
        message
      ),
      placement: "topRight",
      duration: 5,
    });
  };

  // 🟢 AGREGADO: evita que una respuesta vieja pise a una más reciente
  const lastRequest = useRef(0);

  // 🟢 AGREGADO: limpia resultados, errores y selección
  const resetSearch = () => {
    lastRequest.current += 1; // invalida cualquier petición en curso
    setAccounts([]);
    setHasSearched(false);
    setLoading(false);
    setSelectedRowKey(null);
    setSelectedAccountData(null);
  };

  // 🟡 MODIFICADO: ya no filtra mientras escribes; solo guarda el texto.
  // Si el usuario pulsa la X (allowClear), el valor llega vacío y se limpia todo.
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") resetSearch(); // 🟢 AGREGADO
  };

  // 🟢 AGREGADO: busca en el back al presionar Enter o hacer clic en la lupa
  const handleSearch = async () => {
    let term = searchTerm.trim();
    if (!term) return;

    // El CUIT suele escribirse con guiones (20-12345678-9): se envían solo los dígitos
    if (searchBy === "CUIT") term = term.replace(/\D/g, "");

    const requestId = ++lastRequest.current;
    setLoading(true);
    setSelectedRowKey(null);
    setSelectedAccountData(null);

    try {
      const data = searchBy === "CUIT" ? await getAccountByCuit(term) : await getAccountByWorkstation(term);

      if (requestId !== lastRequest.current) return;
      // Respuesta 200: { agentAccounts: [{ accountId, accountName, accountCd }] }
      setAccounts(data?.agentAccounts ?? []);
      setHasSearched(true);
    } catch (err) {
      if (requestId !== lastRequest.current) return;
      setAccounts([]);
      // Con error no se marca hasSearched: el drawer vuelve al mensaje inicial
      // en vez de mostrar "No accounts found", que sería engañoso.
      setHasSearched(false);
      showError(err);
    } finally {
      if (requestId === lastRequest.current) setLoading(false);
    }
  };

  // 🟢 AGREGADO: al cambiar Workstation/CUIT se limpian input y resultados
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchTerm("");
    resetSearch();
  };

  // 🟡 MODIFICADO: la llave de la fila ahora es accountId (antes accountObj.key)
  const handleRadioChange = (accountObj) => {
    setSelectedRowKey(accountObj.accountId);
    setSelectedAccountData(accountObj);
  };

  // 🟡 MODIFICADO: llama a handleClose en vez de onClose para dejar el drawer limpio
  const handleConfirm = () => {
    if (selectedAccountData) {
      onConfirm(selectedAccountData);
      handleClose();
    }
  };

  // 🟢 AGREGADO: cierra y resetea todo para la próxima vez que se abra
  const handleClose = () => {
    setSearchTerm("");
    setSearchBy("Workstation");
    resetSearch();
    onClose();
  };

  // 🔴 ELIMINADO: filtrado local sobre el mock
  // const filteredOrganizations = searchTerm.trim()
  //   ? mockAccountSearchResults.filter(
  //       (org) =>
  //         org.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         org.accounts.some(
  //           (acc) =>
  //             acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //             acc.account.toLowerCase().includes(searchTerm.toLowerCase()),
  //         ),
  //     )
  //   : [];

  // 🟡 MODIFICADO: columnas con los campos que devuelve el back.
  // (Si tus columnas originales tenían otros estilos, cópialos aquí;
  //  lo importante es usar accountName / accountCd / accountId.)
  const columns = [
    {
      title: "",
      key: "select",
      width: 40,
      render: (_, record) => (
        <Radio checked={selectedRowKey === record.accountId} onChange={() => handleRadioChange(record)} />
      ),
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Account",
      dataIndex: "accountCd",
      key: "accountCd",
    },
  ];

  // 🟢 AGREGADO: decide qué mostrar según el estado de la búsqueda
  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin />
        </div>
      );
    }

    // (este bloque ya existía en tu versión, solo se movió aquí)
    if (!hasSearched) {
      return (
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
      );
    }

    if (accounts.length === 0) {
      return <Empty description="No accounts found" style={{ marginTop: 16 }} />;
    }

    // 🟡 MODIFICADO: antes era un <Collapse> agrupado por organización (datos del mock).
    // El back devuelve una lista plana de cuentas, así que se muestra una sola tabla.
    return (
      <Table
        dataSource={accounts}
        columns={columns}
        pagination={false}
        size="small"
        rowKey="accountId"
        style={{ marginTop: 8 }}
        onRow={(record) => ({
          onClick: () => handleRadioChange(record),
          style: { cursor: "pointer" },
        })}
      />
    );
  };

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
      onClose={handleClose} // 🟡 MODIFICADO: antes onClose
      open={open}
      destroyOnHidden // 🟡 MODIFICADO: antes destroyOnClose (obsoleto en antd v5)
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
            onClick={handleClose} // 🟡 MODIFICADO: antes onClose
            style={{ borderColor: "#D9D9D9", color: "#333" }}
          >
            Back
          </Button>
        </div>
      }
    >
      {/* 🟢 AGREGADO: necesario para que se vean las notificaciones del hook */}
      {contextHolder}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Search By Radio */}
        <div>
          <Space size="middle" align="center">
            <Text style={{ fontWeight: 500, color: "#333" }}>Search By :</Text>
            {/* 🟡 MODIFICADO: onChange usa handleSearchByChange (antes setSearchBy directo) */}
            <Radio.Group onChange={handleSearchByChange} value={searchBy}>
              <Radio value="Workstation">Workstation</Radio>
              <Radio value="CUIT">CUIT</Radio>
            </Radio.Group>
          </Space>
        </div>

        {/* Search Input */}
        <Input
          // 🟡 MODIFICADO: el placeholder cambia según la opción elegida
          placeholder={searchBy === "CUIT" ? "Search by CUIT..." : "Search by Workstation ID..."}
          value={searchTerm}
          onChange={handleSearchChange}
          onPressEnter={handleSearch} // 🟢 AGREGADO: busca solo al presionar Enter
          allowClear // muestra la X al final; al pulsarla se limpia todo (ver handleSearchChange)
          disabled={loading} // 🟢 AGREGADO
          suffix={
            // 🟡 MODIFICADO: la lupa ahora también dispara la búsqueda
            <SearchOutlined onClick={handleSearch} style={{ color: "#BFBFBF", cursor: "pointer" }} />
          }
          style={{ borderRadius: 6, height: 40 }}
        />

        {/* 🟡 MODIFICADO: antes aquí estaba el ternario con searchTerm.trim() === "" y el
            <Collapse> con filteredOrganizations.map(...). Ahora todo lo resuelve renderContent() */}
        {renderContent()}

        {/* 🔴 ELIMINADO:
            <Collapse
              defaultActiveKey={["personal", "movistar", "telecom"]}
              ...
              items={filteredOrganizations.map((org) => ({ ... }))}
            />
        */}
      </div>
    </Drawer>
  );
};

export default AccountIdDrawer;
