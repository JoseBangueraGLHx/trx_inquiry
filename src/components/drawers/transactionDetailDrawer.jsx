import React, { useState } from "react";
import { Drawer, Alert, Tag, Typography, Row, Col, Collapse, Input, Select, Button } from "antd";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { mockTransactionDetailData } from "../../mockData";

const { Text, Title } = Typography;
const { TextArea } = Input;

// Drawer que muestra los detalles completos de una transacción seleccionada.
// Props:
// - open: controla la visibilidad del drawer.
// - onClose: callback para cerrar el drawer.
// - transaction: objeto de transacción seleccionada a mostrar.
const TransactionDetailDrawer = ({ open, onClose, transaction }) => {
  // Controla la visibilidad del aviso de alerta en el drawer.
  const [alertVisible, setAlertVisible] = useState(true);
  const data = mockTransactionDetailData;

  // Contenido del panel de información del caso (Case Information).
  const caseInformationContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <Text type="danger">* </Text>
        <Text style={{ fontWeight: 500 }}>Requester Name</Text>
        <Input
          value={data.caseInformation.requesterName}
          disabled
          style={{ marginTop: 4, background: "#F5F5F5", color: "#333" }}
        />
        <Text type="secondary" style={{ fontSize: 11, marginTop: 2, display: "block" }}>
          Enter the name of the person requesting this reversal
        </Text>
      </div>

      <div>
        <Text type="danger">* </Text>
        <Text style={{ fontWeight: 500 }}>Reason</Text>
        <Select
          value={data.caseInformation.reason}
          disabled
          style={{ width: "100%", marginTop: 4 }}
          options={[{ value: "customer_request", label: "customer_request" }]}
        />
      </div>

      <div>
        <Text type="danger">* </Text>
        <Text style={{ fontWeight: 500 }}>Comment</Text>
        <TextArea
          value={data.caseInformation.comment}
          disabled
          rows={3}
          style={{ marginTop: 4, background: "#F5F5F5", color: "#333" }}
        />
        <div style={{ textAlign: "right" }}>
          <Text type="secondary" style={{ fontSize: 11 }}>
            0 / 40
          </Text>
        </div>
      </div>

      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Reversed By
          </Text>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{data.caseInformation.reversedBy}</div>
        </Col>
        <Col span={12}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Reversed At
          </Text>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{data.caseInformation.reversedAt}</div>
        </Col>
      </Row>
    </div>
  );

  // Contenido del panel de Consolidate Processing Key.
  const consolidateKeyContent = (
    <Row justify="space-between">
      <Text style={{ color: "#333" }}>{data.consolidateKey.numberValue}</Text>
      <Text style={{ color: "#333" }}>{data.consolidateKey.taxValue}</Text>
    </Row>
  );

  // Contenido del panel de desglose financiero (Financial Breakdown).
  const financialBreakdownContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Row justify="space-between">
        <Text type="secondary">Amount:</Text>
        <Text style={{ fontWeight: 500 }}>{data.financialBreakdown.amount}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Charges:</Text>
        <Text style={{ fontWeight: 500 }}>{data.financialBreakdown.charges}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Fee:</Text>
        <Text style={{ fontWeight: 500 }}>{data.financialBreakdown.fee}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Commission:</Text>
        <Text style={{ fontWeight: 500 }}>{data.financialBreakdown.commission}</Text>
      </Row>
      <div style={{ borderTop: "1px dashed #E8E8E8", paddingTop: 8 }}>
        <Row justify="space-between" align="middle">
          <Text style={{ fontWeight: 600, fontSize: 14 }}>Net Amount:</Text>
          <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.financialBreakdown.netAmount}</Text>
        </Row>
      </div>
    </div>
  );

  // Contenido del panel de información de la transacción (Transaction Information).
  const transactionInfoContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Row justify="space-between">
        <Text type="secondary">External Reference:</Text>
        <Text style={{ fontWeight: 500 }}>{data.transactionInfo.externalReference}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Created By:</Text>
        <Text style={{ fontWeight: 500, fontSize: 12 }}>{data.transactionInfo.createdBy}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Source:</Text>
        <Text style={{ fontWeight: 500 }}>{data.transactionInfo.source}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Transaction Type:</Text>
        <Text style={{ fontWeight: 500 }}>{data.transactionInfo.transactionType}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">Description:</Text>
        <Text style={{ fontWeight: 500 }}>{data.transactionInfo.description}</Text>
      </Row>
      <Row justify="space-between">
        <Text type="secondary">System Reference:</Text>
        <Text style={{ fontWeight: 500 }}>{data.transactionInfo.systemReference}</Text>
      </Row>
    </div>
  );

  // Elementos del Collapse que agrupan las secciones de detalle.
  const collapseItems = [
    {
      key: "case_info",
      label: <Text style={{ fontWeight: 600 }}>Case Information</Text>,
      children: caseInformationContent,
    },
    {
      key: "consolidate_key",
      label: <Text style={{ fontWeight: 600 }}>Consolidate_Processing_Key</Text>,
      children: consolidateKeyContent,
    },
    {
      key: "financial_breakdown",
      label: <Text style={{ fontWeight: 600 }}>Financial Breakdown</Text>,
      children: financialBreakdownContent,
    },
    {
      key: "transaction_info",
      label: <Text style={{ fontWeight: 600 }}>Transaction Information</Text>,
      children: transactionInfoContent,
    },
  ];

  return (
    <Drawer
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
              Transaction Details
            </Title>
            <Text type="secondary" style={{ fontSize: 12, fontWeight: "normal" }}>
              View complete information about this transaction
            </Text>
          </div>
          {/*<Dropdown menu={{ items: exportMenuItems }}>
            <Button size="small" style={{ borderRadius: 6 }}>
              <Space size={4}>
                <ExportOutlined />
                Export
                <DownOutlined style={{ fontSize: 10 }} />
              </Space>
            </Button>
          </Dropdown>*/}
        </div>
      }
      placement="right"
      width={540}
      //style={{ zIndex: 1001 }} // Ajusta el margen superior para que no se superponga con el header
      onClose={onClose}
      open={open}
      destroyOnClose
      footer={
        <div style={{ padding: "12px 16px" }}>
          <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
            Back
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Warning Alert Banner */}
        {alertVisible && (
          <Alert
            message="Unfortunately, this invoice is overdue."
            description="The valid period for payment has closed because this invoice is overdue."
            type="warning"
            showIcon
            icon={<ExclamationCircleFilled style={{ color: "#FAAD14" }} />}
            closable
            onClose={() => setAlertVisible(false)}
            style={{
              backgroundColor: "#FFFBE6",
              borderColor: "#FFE58F",
              borderRadius: 8,
            }}
          />
        )}

        {/* Transaction ID & Status Bar */}
        <div
          style={{
            background: "#FAFAFA",
            border: "1px solid #F0F0F0",
            borderRadius: 8,
            padding: "12px 16px",
          }}
        >
          <Row justify="space-between" align="middle">
            <div>
              <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
                Transaction ID
              </Text>
              <Text style={{ fontWeight: 700, fontSize: 16 }}>{transaction?.transactionId || data.transactionId}</Text>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 11, display: "block", textAlign: "center" }}>
                Current Status
              </Text>
              <Tag color="blue" style={{ borderRadius: 12, padding: "2px 10px", margin: 0 }}>
                {transaction?.status || data.currentStatus}
              </Tag>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 11, display: "block", textAlign: "center" }}>
                Operation Stage
              </Text>
              <Tag style={{ borderRadius: 12, padding: "2px 10px", margin: 0, background: "#FFF" }}>
                {data.operationStage}
              </Tag>
            </div>
          </Row>
        </div>

        {/* Metadata Details Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
          <Row justify="space-between">
            <Text type="secondary">Control Signature:</Text>
            <Text style={{ fontWeight: 500 }}>{data.controlSignature}</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Orderer Business Reference:</Text>
            <Text style={{ fontWeight: 500 }}>{data.ordererBusinessReference}</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Beneficiary Business Reference:</Text>
            <Text style={{ fontWeight: 500 }}>{data.beneficiaryBusinessReference}</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Amount:</Text>
            <Text style={{ fontWeight: 600 }}>{data.amount}</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Payment Method:</Text>
            <Text style={{ fontWeight: 500 }}>{data.paymentMethod}</Text>
          </Row>
          <Row justify="space-between" align="middle">
            <Text type="secondary">Channel Status:</Text>
            <Tag color="success" style={{ borderRadius: 12, padding: "0 10px", margin: 0 }}>
              {data.channelStatus}
            </Tag>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Creation Date:</Text>
            <Text style={{ fontWeight: 500 }}>{data.creationDate}</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Due Date:</Text>
            <Text style={{ fontWeight: 500 }}>{data.dueDate}</Text>
          </Row>
        </div>

        {/* Accordion Panels */}
        <Collapse
          defaultActiveKey={["case_info"]}
          expandIconPosition="end"
          items={collapseItems}
          style={{ background: "#FFF", borderRadius: 8 }}
        />
      </div>
    </Drawer>
  );
};

export default TransactionDetailDrawer;
