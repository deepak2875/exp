document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = [];

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

        if (expenseName && expenseAmount > 0) {
            const expense = {
                name: expenseName,
                amount: expenseAmount,
            };

            expenses.push(expense);
            updateExpenseList();
            updateTotalAmount();
            expenseForm.reset();
        }
    });

    function updateExpenseList() {
        expenseList.innerHTML = '';

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${expense.name} <span>$${expense.amount.toFixed(2)}</span> <button class="btn btn-danger btn-sm" onclick="removeExpense(${index})">Remove</button>`;
            expenseList.appendChild(li);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    window.removeExpense = (index) => {
        expenses.splice(index, 1);
        updateExpenseList();
        updateTotalAmount();
    };
});
