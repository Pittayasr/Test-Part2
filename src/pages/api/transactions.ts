import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Tun.764949",
      database: "income_expense_tracker",
    });

    if (req.method === "POST") {
      const { type, title, amount, transactionDate, createdAt, updatedAt } =
        req.body;

      const query = `
        INSERT INTO transactions (type, title, amount, transaction_date, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        type,
        title,
        parseFloat(amount),
        transactionDate,
        createdAt,
        updatedAt,
      ];
      await connection.execute(query, values);
      res.status(200).json({ message: "Transaction added successfully!" });
    } else if (req.method === "GET") {
      const { startDate, endDate } = req.query;

      const query = `
        SELECT * FROM transactions 
        WHERE transaction_date BETWEEN ? AND ?
        ORDER BY transaction_date ASC
      `;
      const values = [startDate, endDate];
      const [rows] = await connection.execute(query, values);

      res.status(200).json(rows);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }

    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
