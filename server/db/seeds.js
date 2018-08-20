use user;
db.dropDatabase();

db.user_data.insertOne(
  {
    watchList: ["GOOGL","AAPL","BTC"],
    holdings:
    [
      {
      // original shares value (X) = 5 x £10 = stockholding value £50
      //
      // now shares are worth (Y)  5 x £15 = £75

      stock: "GOOGL",
      investedValue: "50",
      noOfSharesHeld: "10",
      profitLoss:+25 //This is X-Y
    },
    {
      stock: "APPL",
      investedValue: "300",
      noOfSharesHeld: "20",
      profitLoss:+25
    },
    {
      stock: "MSFT",
      investedValue: "10000",
      noOfSharesHeld: "120",
      profitLoss:+25
    }
  ]
  }
);
