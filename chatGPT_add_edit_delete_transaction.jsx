import { useState } from "react";

// Funkcja do dodawania transakcji
function addTransaction(transactionData) {
  const db = firebase.firestore();

  db.collection("transactionsByBudget")
    .doc(transactionData.transactionsByBudgetId)
    .collection("transactionsYearMonth")
    .doc(transactionData.yearMonth)
    .collection("transactions")
    .add({
      name: transactionData.name,
      total_amount: transactionData.totalAmount,
      authorId: transactionData.authorId,
      date: transactionData.date,
      type: transactionData.type,
      categories: transactionData.categories,
      items: transactionData.items,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log("Transaction added with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding transaction: ", error);
    });
}

// Funkcja do edycji transakcji
function editTransaction(transactionId, updatedTransactionData) {
  const db = firebase.firestore();

  db.collection("transactionsByBudget")
    .doc(updatedTransactionData.transactionsByBudgetId)
    .collection("transactionsYearMonth")
    .doc(updatedTransactionData.yearMonth)
    .collection("transactions")
    .doc(transactionId)
    .update({
      name: updatedTransactionData.name,
      total_amount: updatedTransactionData.totalAmount,
      authorId: updatedTransactionData.authorId,
      date: updatedTransactionData.date,
      type: updatedTransactionData.type,
      categories: updatedTransactionData.categories,
      items: updatedTransactionData.items,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Transaction updated successfully");
    })
    .catch((error) => {
      console.error("Error updating transaction: ", error);
    });
}

// Funkcja do usuwania transakcji
function deleteTransaction(transactionId, transactionsByBudgetId, yearMonth) {
  const db = firebase.firestore();

  db.collection("transactionsByBudget")
    .doc(transactionsByBudgetId)
    .collection("transactionsYearMonth")
    .doc(yearMonth)
    .collection("transactions")
    .doc(transactionId)
    .delete()
    .then(() => {
      console.log("Transaction deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting transaction: ", error);
    });
}
