import PropTypes from "prop-types";

export const transactionShape = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  method: PropTypes.string,
  value: PropTypes.number,
  date: PropTypes.string
});

export const financeShape = PropTypes.shape({
  totals: PropTypes.shape({
    incomes: PropTypes.number,
    expenses: PropTypes.number,
    realSavings: PropTypes.number
  }),
  byMethod: PropTypes.shape({
    expenses: PropTypes.shape({
      electronic: PropTypes.number,
      cash: PropTypes.number
    }),
    incomes: PropTypes.shape({
      electronic: PropTypes.number,
      cash: PropTypes.number
    })
  }),
  monthly: PropTypes.shape({
    index: PropTypes.number,
    incomes: PropTypes.number,
    expenses: PropTypes.number,
    savings: PropTypes.number,
    accumulation: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.number,
        income: PropTypes.number,
        expense: PropTypes.number,
        balance: PropTypes.number
      })
    )
  }),
  goal: PropTypes.shape({
    value: PropTypes.number,
    progress: PropTypes.number,
    delta: PropTypes.number,
    reached: PropTypes.bool
  })
});

export const settingsShape = PropTypes.shape({
  expenseCategories: PropTypes.arrayOf(PropTypes.string),
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  savingLocations: PropTypes.arrayOf(PropTypes.string)
});
