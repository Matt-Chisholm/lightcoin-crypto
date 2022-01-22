let balance = 500;


class Account {

  constructor(username) {
    this.username = username;
    // this.balance = 0;
    this.transactions = []
  }
  get balance() {
    let sum = 0;
    this.transactions.map(value => { sum += value; })
    return sum;
  }
  addTransaction(value) { this.transactions.push(value); }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this.value());
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

}

class Withdrawal extends Transaction {
  value() {

    return -this.amount;
  }
  commit() {
    if ((this.account.balance - this.amount) < 0) {
      return false;
    }
    else { super.commit() }
  }
}


// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
