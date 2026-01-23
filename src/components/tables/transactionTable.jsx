import React from "react";
import { Table, Tag, Button, Space } from "antd";

const TransactionTable = ({ data, loading, typeSearch }) => {
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
        if (status === "Completed") color = "success";
        if (status === "Reversed") color = "blue";
        if (status === "Pending") color = "warning";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small" danger disabled={record.status !== "Completed"}>
            Reverse
          </Button>
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
