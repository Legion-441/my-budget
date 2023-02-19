// Inicjalizujemy bazę danych Firestore.
const db = firebase.firestore();
// Definiujemy nazwę kategorii, dla której chcemy zobaczyć sumę wydatków.
const categoryName = "samochód";
// Definiujemy rok i miesiąc, dla którego chcemy zobaczyć sumę wydatków w formacie "YYYYMM".
const yearMonth = "202206";

// Tworzymy zapytanie do bazy danych, które zwróci dokumenty z kolekcji "transactions" w ramach konkretnego dokumentu z kolekcji "transactionsYearMonth", 
// który zawiera kategorie o nazwie "categoryName" i jest typu "expense" (wydatek) oraz daty transakcji pomiędzy pierwszym i ostatnim dniem miesiąca "yearMonth".
db.collection("transactionsByBudget")
  .doc(transactionsByBudgetId)
  .collection("transactionsYearMonth")
  .doc(yearMonth)
  .collection("transactions")
  .where(`categories.${categoryName}`, "!=", null) // Tylko dokumenty z kategorią "categoryName".
  .where("type", "==", "expense") // Tylko dokumenty typu "expense".
  .where("date", ">=", new Date(`${yearMonth}-01`)) // Tylko dokumenty z datą transakcji pomiędzy pierwszym dniem miesiąca a...
  .where("date", "<=", new Date(`${yearMonth}-31`)) // ...ostatnim dniem miesiąca.

  .get() // Wykonujemy zapytanie do bazy danych.
  .then((querySnapshot) => {
    let totalAmount = 0; // Inicjalizujemy sumę wydatków.
    
    // Przechodzimy przez każdy dokument z wyników zapytania.
    querySnapshot.forEach((transactionDoc) => {  
      const transactionData = transactionDoc.data(); // Pobieramy dane z dokumentu.
      
      // Jeśli dokument zawiera kategorie i kategoria "categoryName" jest zdefiniowana, to...
      if (transactionData.categories && transactionData.categories[categoryName]) {
        
        // Tworzymy pustą tablicę "items", jeśli nie ma jej w danych transakcji.
        const items = transactionData.items || [];
        
        // Przechodzimy przez każdą pozycję w tablicy "items".
        items.forEach((item) => {
          
          // Jeśli id kategorii jest równe "category", to dodajemy kwotę z tej pozycji do sumy wydatków.
          if (item.categoryId === categoryName) {
            totalAmount += item.amount || 0;
          }
        });
      }
    });
    
    // Logujemy sumę wydatków dla kategorii "categoryName" w miesiącu "yearMonth".
    console.log(`Total expenses for ${categoryName} in ${yearMonth}: ${totalAmount}`);
  })
  
  // Obsługujemy błędy.
  .catch((error) => {
    console.log("Error getting transactions:", error);
  });