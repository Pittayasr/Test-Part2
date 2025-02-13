"use client";
import React, { useState } from "react";
import {
  SelectInput,
  TextInput,
  DateSelect,
  getCurrentDateTime,
} from "../component/CustomInputs";
import { Button } from "react-bootstrap";
import ReportComponent from "@/component/ReportComponent";

export default function Home() {
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [createdAt] = useState(getCurrentDateTime());
  const [updatedAt] = useState(getCurrentDateTime());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      type,
      title,
      amount,
      transactionDate,
      createdAt,
      updatedAt,
    };

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("บันทึกข้อมูลสำเร็จ!");
        setType("income");
        setTitle("");
        setAmount("");
        setTransactionDate("");
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <div>
      <main>
        <h1>บันทึกรายรับ/รายจ่าย</h1>
        <form onSubmit={handleSubmit}>
          <SelectInput
            label="ประเภท"
            options={["รายรับ", "รายจ่าย"]}
            value={type}
            onChange={setType}
          />
          <TextInput
            label="ชื่อรายการใช้จ่าย"
            value={title}
            onChange={setTitle}
          />
          <TextInput
            label="จำนวนเงิน (ทศนิยม 2 ตำแหน่ง)"
            type="text"
            value={amount}
            onChange={(newValue: string) => {
              if (/^\d*\.?\d{0,2}$/.test(newValue)) {
                setAmount(newValue);
              }
            }}
          />
          <DateSelect
            label="วันที่ใช้จ่าย"
            value={transactionDate}
            onChange={setTransactionDate}
          />
          <Button type="submit" variant="primary">
            บันทึกข้อมูล
          </Button>
        </form>
        <hr className="my-5" />
        <ReportComponent />
      </main>
    </div>
  );
}
