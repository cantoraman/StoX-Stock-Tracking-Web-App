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
      investedValue: "40627",
      noOfSharesHeld: "30",
      profitLoss:-4000 //This is X-Y
    },
    {
      stock: "AAPL",
      investedValue: "9880.4",
      noOfSharesHeld: "50",
      profitLoss:+890
    },

    {
      stock: "MSFT",
      investedValue: "3000",
      noOfSharesHeld: "30",
      profitLoss:+200
    },
    {
      stock: "FB",
      investedValue: "15000",
      noOfSharesHeld: "100",
      profitLoss:+3300
    },

    {
      stock: "AMZN",
      investedValue: "75500",
      noOfSharesHeld: "40",
      profitLoss:+464
    },
    {
      stock: "NKE",
      investedValue: "4750.5",
      noOfSharesHeld: "60",
      profitLoss:-223.5
    },

    {
      stock: "SBUX",
      investedValue: "5000",
      noOfSharesHeld: "100",
      profitLoss:+303
    }
  ]
  }
);
