import React, { useState } from "react";
import { DateSelect } from "../component/CustomInputs";
import { Button, Table } from "react-bootstrap";

interface Transaction {
  id: number;
  type: string;
  title: string;
  amount: number;
  transaction_date: string;
}

const ReportComponent = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchReportData = async () => {
    const response = await fetch(
      `/api/transactions?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();

    const totalIncome = data
      .filter((t: Transaction) => t.type === "income")
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const totalExpense = data
      .filter((t: Transaction) => t.type === "expense")
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    setTransactions(data);
    setSummary({ totalIncome, totalExpense, balance });
  };

  return (
    <div>
      <h2>รายงานรายรับ-รายจ่าย</h2>
      <div className="d-flex gap-3 mb-4">
        <DateSelect
          label="จากวันที่"
          value={startDate}
          onChange={setStartDate}
        />
        <DateSelect label="ถึงวันที่" value={endDate} onChange={setEndDate} />
        <Button onClick={fetchReportData} variant="primary">
          แสดงรายงาน
        </Button>
      </div>

      <h4>สรุปรายงาน</h4>
      <ul>
        <li>
          <strong>รายรับทั้งหมด:</strong> {summary.totalIncome.toLocaleString()}{" "}
          บาท
        </li>
        <li>
          <strong>รายจ่ายทั้งหมด:</strong>{" "}
          {summary.totalExpense.toLocaleString()} บาท
        </li>
        <li>
          <strong>ยอดคงเหลือ:</strong> {summary.balance.toLocaleString()} บาท
        </li>
      </ul>

      <h4>รายการทั้งหมด</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>วันที่</th>
            <th>ชื่อรายการ</th>
            <th>ประเภท</th>
            <th>จำนวนเงิน</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.transaction_date}</td>
              <td>{t.title}</td>
              <td>{t.type === "income" ? "รายรับ" : "รายจ่าย"}</td>
              <td>{t.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportComponent;
