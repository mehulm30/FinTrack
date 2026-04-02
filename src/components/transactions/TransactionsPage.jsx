import FiltersBar from "./FiltersBar";
import TransactionTable from "./TransactionTable";

export default function TransactionsPage() {
  return (
    <div className="transactions-page">
      <FiltersBar />
      <TransactionTable />
    </div>
  );
}
