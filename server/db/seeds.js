use user;
db.dropDatabase();

db.user_data.insertOne(
  {
    watchList: ["GOOGL","AAPL","MSFT","FB","AMZN","NKI","SBUX"],
    holdings:
    [
      {
      // original shares value (X) = 5 x £10 = stockholding value £50
      //
      // now shares are worth (Y)  5 x £15 = £75

      stock: "GOOGL",
      investedValue: "50",
      noOfSharesHeld: "25",
      profitLoss:+25 //This is X-Y
    },
    {
      stock: "AAPL",
      investedValue: "300",
      noOfSharesHeld: "20",
      profitLoss:+100
    },

    {
      stock: "MSFT",
      investedValue: "3000",
      noOfSharesHeld: "50",
      profitLoss:-20
    },
    {
      stock: "FB",
      investedValue: "600",
      noOfSharesHeld: "20",
      profitLoss:+567
    },

    {
      stock: "AMZN",
      investedValue: "4500",
      noOfSharesHeld: "50",
      profitLoss:+900
    },
    {
      stock: "NKI",
      investedValue: "250",
      noOfSharesHeld: "20",
      profitLoss:+58
    },

    {
      stock: "SBUX",
      investedValue: "4000",
      noOfSharesHeld: "50",
      profitLoss:+50
    }
  ]
  }
);
