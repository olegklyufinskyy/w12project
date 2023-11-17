
 const port = 3000; // The port you want your server to listen on
​
document.addEventListener("DOMContentLoaded", function () {
  loadExistingItems();
  const port = 3000; // The port you want your server to listen on
​
  const submitSellItemButton = document.getElementById("submitSellItem");
​
  submitSellItemButton.addEventListener("click", function () {
    const itemType = document.getElementById("itemType").value;
    const itemName = document.getElementById("itemName").value;
    const yearMade = document.getElementById("yearMade").value;
    const condition = document.getElementById("condition").value;
​
    $.ajax({
        // The URL is using Template Literal to have the port number easily changeable. 
      url: `http://localhost:${port}/items`,
      type: "POST",
      data: {
        itemType: itemType,
        itemName: itemName,
        yearMade: yearMade,
        condition: condition,
      },
      success: function (data) {
        loadExistingItems();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("error", jqXHR, textStatus, errorThrown);
      },
    });
  });
​
  const resetButton = document.querySelector("input[type='reset']");
  resetButton.addEventListener("click", function () {
    document.getElementById("itemType").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("yearMade").value = "";
    document.getElementById("condition").value = "";
  });
});
​
function loadExistingItems() {
  $.ajax({
    url: `http://localhost:${port}/items`,
    type: "GET",
    success: function (data) {
      const existingItemsTable = document.getElementById("existingItemsTable");
      existingItemsTable.innerHTML = "";
​
      data.forEach(function (item) {
        const row = existingItemsTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = item.itemType;
        cell2.innerHTML = item.itemName;
        cell3.innerHTML = item.yearMade;
        cell4.innerHTML = item.condition;
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("error", jqXHR, textStatus, errorThrown);
    },
  });
}
// server.js
​
const express = require("express");
const app = express();
​
app.use(express.json()); // Parse JSON requests
​
// Sample data store for existing items
const existingItems = [];
​
// POST endpoint to submit an item
app.post("/submitItem", (req, res) => {
  const { itemType, itemName, yearMade, condition } = req.body;
  const newItem = { itemType, itemName, yearMade, condition };
  existingItems.push(newItem);
  res.json({ message: "Item submitted successfully" });
});
​
// GET endpoint to retrieve existing items
app.get("/getItems", (req, res) => {
  res.json(existingItems);
});
​
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
