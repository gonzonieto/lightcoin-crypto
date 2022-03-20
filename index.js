class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [new Deposit(0, this.account)];
  }
  get balance() {
    // starting with an array of transaction objects with the following keys: amount, account, and time
    // making a new array with just the transaction values
    // summing all elements of the array
    return this.transactions
      .map(transaction => transaction.value)
      .reduce((a, b) => a + b);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return "Successful.";
    } else {
      return "Rejected — would result in negative balance.";
    }
  }

  isAllowed() {
    return (this.account.balance + this.value < 0) ? false : true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
const t2 = new Withdrawal(9.99, myAccount);
const t3 = new Deposit(120.00, myAccount);

console.log('Transaction 1:', t1.commit());
console.log('Transaction 2:', t2.commit());
console.log('Transaction 3:', t3.commit());

console.log('Balance:');
console.log(myAccount.balance);
