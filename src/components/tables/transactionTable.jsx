import React from "react";
import { Table, Tag, Button, Space, Tooltip } from "antd";

const TransactionTable = ({ data, loading, typeSearch, onView }) => {
  console.log("TransactionTable data:", data);
  console.log("TransactionTable typeSearch:", typeSearch);
  const columns = [
    { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
    { title: "Control Signature", dataIndex: "controlSignature", key: "controlSignature" },
    // { title: "Workstation", dataIndex: "workstation", key: "workstation" },
    typeSearch === "workstation"
      ? { title: "Workstation", dataIndex: "workstation", key: "workstation" }
      : { title: "Agent Account", dataIndex: "agentAccount", key: "agentAccount" },
    { title: "Paycode", dataIndex: "paycode", key: "paycode" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `ARS ${amount.toLocaleString("es-AR")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Completed") color = "#016630";
        if (status === "Reversed") color = "#2F54EB";
        if (status === "Pending") color = "#FA541C";
        if (status === "CompletedError") color = "#016630";
        return (
          <Tag color={color} variant="outlined">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onView(record)}>
            View
          </Button>
          <Tooltip
            // title={
            //   record.status !== "Completed" ? "The transaction can not be reversed. Please check view details" : ""
            // }
            title={
              record.status === "Pending"
                ? "The transaction is being reversed. Please check view details"
                : record.status === "CompletedError"
                ? "The transaction can not be reversed. Please check view details" //
                : record.status === "Reversed"
                ? "The transaction has already been reversed. Please check view details"
                : "" //
            }
            placement="top"
          >
            <Button type="link" size="small" danger disabled={record.status !== "Completed"}>
              Reverse
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "8px" }}>
        <Table columns={columns} dataSource={data} loading={loading} pagination={false} />
      </div>
    </div>
  );
};

export default TransactionTable;
