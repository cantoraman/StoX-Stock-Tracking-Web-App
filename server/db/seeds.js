use user;
db.dropDatabase();

db.user_data.insertOne(
  {
    watchList: ["GOOGL","AAPL", "GOLD"],
    holdings:
    [
      {
      stock: "GOOGL",
      cost: "300",
      sharesHeld: "20"
    },
    {
      stock: "BRENT",
      cost: "300",
      sharesHeld: "20"
    }
  ]
  }
);
