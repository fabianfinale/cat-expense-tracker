import {useState} from 'react'
import type {Expense} from "./types.ts";

function App() {
    const [expenses] = useState<Expense[]>([]);

    return (
        <div>
            <h1>Cat Expense Tracker</h1>

            <div className="button-group">
                <button>Add Expense</button>
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
    )
}

export default App
