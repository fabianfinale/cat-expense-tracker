import {Fragment, useState} from 'react'
import type {Expense} from "./types.ts";
import AddExpenseDialog from "./components/AddExpenseDialog.tsx";

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [showExpenseDialog, setShowExpenseDialog] = useState(false);

    return (
        <Fragment>
            <div>
                <h1>Cat Expense Tracker</h1>

                <div className="button-group">
                    <button onClick={() => setShowExpenseDialog(true)}>Add Expense</button>
                    <button>Delete Selected</button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{textAlign: 'center'}}>
                                No expenses yet
                            </td>
                        </tr>
                    ) : (
                        expenses.map((expense) => (
                            <tr key={expense.id} className={expense.selected ? 'highlight' : ''}>
                                <td><input type="checkbox"/></td>
                                <td>{expense.item}</td>
                                <td>{expense.category}</td>
                                <td>{expense.amount}$</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            {showExpenseDialog && (
                <AddExpenseDialog
                    onClose={() => setShowExpenseDialog(false)}
                    onSubmit={(newExpense) => {
                        setExpenses(prev => [...prev, newExpense]);
                    }}
                />
            )}
        </Fragment>
    )
}

export default App
