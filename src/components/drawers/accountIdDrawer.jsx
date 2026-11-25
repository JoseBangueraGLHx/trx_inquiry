// ============================================================================
// LEYENDA (comparado con tu versión original que usaba el mock)
//   🟢 AGREGADO    → código nuevo
//   🟡 MODIFICADO  → existía, pero cambió
//   🔴 ELIMINADO   → estaba en la versión original y se quitó
//   Sin marca      → igual que tu versión original
// ============================================================================

// 🟡 MODIFICADO: se agrega useRef
import React, { useState, useRef } from "react";
// 🟡 MODIFICADO: se quita Collapse y se agregan Spin, Empty y notification
import { Drawer, Radio, Input, Table, Button, Typography, Space, Spin, Empty, notification } from "antd";
import { CheckOutlined, ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
// 🔴 ELIMINADO: import { mockAccountSearchResults } from "../../mockData";
// 🟢 AGREGADO: servicios reales
//import { getAccountByCuit, getAccountByWorkstation } from "../../services/trxInquiryServices";

const { Text, Title } = Typography;

// 🟢 AGREGADO: arma el mensaje de error a partir de la respuesta del back.
// Los 400 / 401 / 500 vienen con: { name, message, errorCode, correlationId, issues: [{ field, issue }] }
// Funciona con el error completo de axios (err.response.data) o si un interceptor rechaza solo con el body.
const getErrorInfo = (err) => {
  const status = err?.response?.status ?? err?.status;
  const data = err?.response?.data ?? err;

  // La petición salió pero no hubo respuesta (servidor caído, sin red, CORS, timeout)
  if (!status && err?.request) {
    return { message: "Could not connect to the server. Please try again.", correlationId: null };
  }

  // Error de código antes de enviar la petición (import, interceptor, etc.)
  if (!status && !data?.issues) {
    return { message: err?.message || "Unexpected error. Please try again.", correlationId: null };
  }

  const correlationId = data?.correlationId ?? null;

  if (status === 401) {
    return { message: "Your session has expired. Please log in again.", correlationId };
  }

  if (status >= 500) {
    return { message: "Unexpected server error. Please try again later.", correlationId };
  }

  // 400: detalle de validación si viene; si no, el message general
  const issues = data?.issues?.map((i) => i.issue).filter(Boolean) ?? [];
  return {
    message: issues.length ? issues.join(". ") : data?.message || "Invalid request.",
    correlationId,
  };
};

// 🟢 AGREGADO: reglas de validación por tipo de búsqueda
const SEARCH_RULES = {
  Workstation: {
    placeholder: "Search by Workstation ID...",
    maxLength: undefined,
    // Solo letras y números: no deja escribir espacios ni símbolos
    sanitize: (value) => value.replace(/[^a-zA-Z0-9]/g, ""),
    validate: (value) => {
      if (!value || !value.trim()) return "Workstation is required.";
      if (!/^[a-zA-Z0-9]+$/.test(value)) return "Workstation must contain only letters and numbers.";
      return null;
    },
  },
  CUIT: {
    placeholder: "Search by CUIT (11 digits)...",
    maxLength: 11,
    // Solo números
    sanitize: (value) => value.replace(/\D/g, ""),
    validate: (value) => {
      if (!value) return "CUIT is required.";
      if (value.length !== 11) return "CUIT must contain exactly 11 digits.";
      return null;
    },
  },
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

  // 🟢 AGREGADO: estado de la búsqueda real y de la validación
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationError, setValidationError] = useState(null);

  // 🟢 AGREGADO: hook de notificaciones de antd (el contextHolder va dentro del Drawer)
  const [notificationApi, contextHolder] = notification.useNotification();

  // 🟢 AGREGADO: evita que una respuesta vieja pise a una más reciente
  const lastRequest = useRef(0);

  // 🟢 AGREGADO: muestra los errores del servicio como notification.error
  const showError = (err) => {
    const { message = "Unexpected error. Please try again.", correlationId } = getErrorInfo(err) || {};

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

  // 🟢 AGREGADO: limpia resultados y selección
  const resetSearch = () => {
    lastRequest.current += 1; // invalida cualquier petición en curso
    setAccounts([]);
    setHasSearched(false);
    setLoading(false);
    setSelectedRowKey(null);
    setSelectedAccountData(null);
  };

  // 🟡 MODIFICADO: ya no filtra mientras escribes.
  // Solo deja pasar los caracteres permitidos según el radio y guarda el texto.
  // Si el usuario pulsa la X (allowClear), el valor llega vacío y se limpia todo.
  const handleSearchChange = (e) => {
    const value = SEARCH_RULES[searchBy].sanitize(e.target.value);
    setSearchTerm(value);

    if (value === "") {
      // Campo vacío (o pulsó la X): sin mensaje; el "requerido" sale solo al presionar Enter
      setValidationError(null);
      resetSearch();
      return;
    }

    // 🟢 AGREGADO: validación en vivo mientras escribe
    // (en CUIT muestra "exactly 11 digits" hasta que complete los 11)
    setValidationError(SEARCH_RULES[searchBy].validate(value));
  };

  // 🟢 AGREGADO: valida y busca en el back al presionar Enter o hacer clic en la lupa
  const handleSearch = async () => {
    const term = searchTerm.trim();

    // Validación (requerido, formato, longitud) antes de llamar al servicio
    const error = SEARCH_RULES[searchBy].validate(term);
    if (error) {
      setValidationError(error);
      return;
    }

    const requestId = ++lastRequest.current;
    setLoading(true);
    setSelectedRowKey(null);
    setSelectedAccountData(null);

    try {
      //const data = searchBy === "CUIT" ? await getAccountByCuit(term) : await getAccountByWorkstation(term);

      if (requestId !== lastRequest.current) return;
      // Respuesta 200: { agentAccounts: [{ accountId, accountName, accountCd }] }
      setAccounts([]);
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

  // 🟢 AGREGADO: al cambiar Workstation/CUIT se limpian input, error y resultados
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchTerm("");
    setValidationError(null);
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
    setValidationError(null);
    resetSearch();
    onClose();
  };

  // 🔴 ELIMINADO: const filteredOrganizations = ... (filtrado local sobre el mock)

  // 🟡 MODIFICADO: columnas con los campos que devuelve el back
  // (antes: record.key, dataIndex "account" y "name")
  const columns = [
    {
      title: "",
      dataIndex: "radio",
      width: 40,
      render: (_, record) => (
        <Radio checked={selectedRowKey === record.accountId} onChange={() => handleRadioChange(record)} />
      ),
    },
    {
      title: "Account",
      dataIndex: "accountCd",
      key: "accountCd",
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: "Name",
      dataIndex: "accountName",
      key: "accountName",
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
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

    // (este bloque ya existía en tu versión; solo se movió aquí)
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
        {/* 🟢 AGREGADO: div contenedor para que el mensaje de validación quede pegado al input */}
        <div>
          <Input
            placeholder={SEARCH_RULES[searchBy].placeholder} // 🟡 MODIFICADO: cambia según el radio
            maxLength={SEARCH_RULES[searchBy].maxLength} // 🟢 AGREGADO: 11 para CUIT
            status={validationError ? "error" : ""} // 🟢 AGREGADO: borde rojo si no es válido
            value={searchTerm}
            onChange={handleSearchChange}
            onPressEnter={handleSearch} // 🟢 AGREGADO: busca solo al presionar Enter
            allowClear // muestra la X al final; al pulsarla se limpia todo
            disabled={loading} // 🟢 AGREGADO
            suffix={
              // 🟡 MODIFICADO: la lupa ahora también dispara la búsqueda
              <SearchOutlined onClick={handleSearch} style={{ color: "#BFBFBF", cursor: "pointer" }} />
            }
            style={{ borderRadius: 6, height: 40 }}
          />
          {/* 🟢 AGREGADO: mensaje de validación */}
          {validationError && (
            <Text type="danger" style={{ fontSize: 12, display: "block", marginTop: 4 }}>
              {validationError}
            </Text>
          )}
        </div>

        {/* 🟡 MODIFICADO: antes aquí estaba el ternario con searchTerm.trim() === "" y el
            <Collapse> con filteredOrganizations.map(...). Ahora todo lo resuelve renderContent() */}
        {renderContent()}
      </div>
    </Drawer>
  );
};

export default AccountIdDrawer;
