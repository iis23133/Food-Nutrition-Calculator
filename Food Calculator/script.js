// script.js
document.addEventListener('DOMContentLoaded', function () {
    // fetchAndPopulateFoodData().then(() => {
        renderFoodList();
        loadData();
    });
// });

// Sample data to simulate a database of food items
const foodData = [
{'name': 'Ψωμί Λευκό', 'grams': 25, 'carbs': 12.0, 'protein': 2.5, 'fat': 0.8333333333333334, 'calories': 66.66666666666667}, 
{'name': 'Ψωμί Ολικής', 'grams': 30, 'carbs': 12.0, 'protein': 3.0, 'fat': 1.0, 'calories': 80.0}, 
{'name': 'Λευκό ρύζι', 'grams': 50, 'carbs': 12.0, 'protein': 1.35, 'fat': 0.15, 'calories': 65.0}, 
{'name': 'Καστανό ρύζι', 'grams': 100, 'carbs': 17.142857142857142, 'protein': 2.6, 'fat': 0.9, 'calories': 111.0}, 
{'name': 'Κριθαράκι', 'grams': 60, 'carbs': 12.0, 'protein': 7.199999999999999, 'fat': 0.8999999999999999, 'calories': 212.4}, 
{'name': 'Κριθαράκι ολικής', 'grams': 70, 'carbs': 12.0, 'protein': 8.399999999999999, 'fat': 1.0499999999999998, 'calories': 247.79999999999998}, 
{'name': 'Μακαρόνια λευκά', 'grams': 70, 'carbs': 12.0, 'protein': 3.5, 'fat': 0.13999999999999999, 'calories': 98.0}, 
{'name': 'Μακαρόνια ολικής', 'grams': 80, 'carbs': 12.0, 'protein': 4.0, 'fat': 0.16, 'calories': 112.0}, 
{'name': 'Πατάτες Φούρνου', 'grams': 80, 'carbs': 12.0, 'protein': 1.536, 'fat': 5.152, 'calories': 97.60000000000001}, 
{'name': 'Πατάτες τηγανητές', 'grams': 40, 'carbs': 12.0, 'protein': 1.32, 'fat': 6.2, 'calories': 112.0}, 
{'name': 'Αρακάς γιαχνί', 'grams': 110, 'carbs': 12.0, 'protein': 4.8839999999999995, 'fat': 6.204, 'calories': 127.16}, 
{'name': 'Φασολάκια γιαχνί', 'grams': 100, 'carbs': 5.0, 'protein': 1.3666666666666665, 'fat': 3.6333333333333333, 'calories': 58.33333333333333}, 
{'name': 'Φακές', 'grams': 250, 'carbs': 35.0, 'protein': 16.2, 'fat': 6.6, 'calories': 253.0}, 
{'name': 'Φασολάδα', 'grams': 250, 'carbs': 25.0, 'protein': 11.4, 'fat': 5.8, 'calories': 224.0}, 
{'name': 'Ρεβίθια', 'grams': 250, 'carbs': 50.0, 'protein': 12.3, 'fat': 9.9, 'calories': 285.0}, 
{'name': 'Γεμιστά ', 'grams': 100, 'carbs': 12.0, 'protein': 2.3600000000000003, 'fat': 4.88, 'calories': 120.4}, 
{'name': 'Σπανακόρυζο', 'grams': 100, 'carbs': 12.0, 'protein': 2.68, 'fat': 4.5200000000000005, 'calories': 78.0}, 
{'name': 'Γιαούρτι', 'grams': 200, 'carbs': 8.0, 'protein': 13.2, 'fat': 20.0, 'calories': 264.0}, 
{'name': 'Κοτόσουπα ', 'grams': 300, 'carbs': 25.0, 'protein': 22.9, 'fat': 10.8, 'calories': 254.0}, 
{'name': 'Γιουβαρλάκια', 'grams': 100, 'carbs': 10.0, 'protein': 7.6, 'fat': 3.1999999999999997, 'calories': 94.0}, 
{'name': 'Μοσχοράκι κοκκινιστό', 'grams': 200, 'carbs': 4.1, 'protein': 27.8, 'fat': 12.0, 'calories': 240.6}, 
{'name': 'Μπιφτέκι', 'grams': 150, 'carbs': 6.6, 'protein': 22.8, 'fat': 14.8, 'calories': 253.0}, 
{'name': 'Κοτόπουλο λεμονάτο', 'grams': 150, 'carbs': 0.2, 'protein': 32.4, 'fat': 8.8, 'calories': 217.0}, 
{'name': 'Κοτόπουλο  κοκκινιστό', 'grams': 200, 'carbs': 3.1, 'protein': 32.4, 'fat': 8.8, 'calories': 227.0}, 
{'name': 'Μπανάνα με φλούδα', 'grams': 90, 'carbs': 12.0, 'protein': 0.9, 'fat': 0.27, 'calories': 55.800000000000004}, 
{'name': 'Μήλο', 'grams': 100, 'carbs': 12.0, 'protein': 0.3, 'fat': 0.17, 'calories': 52.0}, 
{'name': 'Μανταρίνια', 'grams': 120, 'carbs': 12.0, 'protein': 0.6, 'fat': 0.2, 'calories': 40.0}, 
{'name': 'Πορτοκάλι ', 'grams': 150, 'carbs': 12.0, 'protein': 0.5, 'fat': 0.2, 'calories': 70.0}, 
{'name': 'Καρύδια', 'grams': 100, 'carbs': 12.0, 'protein': 15.0, 'fat': 65.0, 'calories': 654.0}, 
{'name': 'Αμύγδαλα', 'grams': 100, 'carbs': 9.6, 'protein': 21.0, 'fat': 49.0, 'calories': 575.0}, 
{'name': 'Αυγό', 'grams': 100, 'carbs': 1.1, 'protein': 13.0, 'fat': 11.0, 'calories': 165.0}, 
{'name': 'Σαλάτα μαρούλι', 'grams': 250, 'carbs': 13.2, 'protein': 4.1, 'fat': 9.7, 'calories': 140.0}, 
{'name': 'Γαρίδες ψητές', 'grams': 150, 'carbs': 0.0, 'protein': 31.4, 'fat': 1.6, 'calories': 149.0}, 
{'name': 'Γλώσσες ψητές', 'grams': 150, 'carbs': 0.0, 'protein': 36.2, 'fat': 2.3, 'calories': 176.0}, 
{'name': 'Λαβράκι ψητό', 'grams': 150, 'carbs': 0.0, 'protein': 35.5, 'fat': 3.8, 'calories': 186.0}, 
{'name': 'Σολομός ψητός', 'grams': 150, 'carbs': 0.0, 'protein': 41.0, 'fat': 11.3, 'calories': 276.0}, 
{'name': 'Nut BAR Chocolate', 'grams': 35, 'carbs': 10.0, 'protein': 5.2, 'fat': 13.0, 'calories': 186.0}, 
{'name': 'Corny Big Chocolate ', 'grams': 50, 'carbs': 66.1, 'protein': 6.2, 'fat': 16.3, 'calories': 443.0}, 
{'name': 'Παυλίδου 70% κακάο', 'grams': 22, 'carbs': 7.1, 'protein': 1.9, 'fat': 8.3, 'calories': 118.0}, 
{'name': 'High Protein ακτινίδιο,μήλο,σπόροι,δημητριακά', 'grams': 170, 'carbs': 19.0, 'protein': 15.0, 'fat': 0.0, 'calories': 136.0}, 
{'name': 'High Protein μύρτιλο,βατόμουρο,φραγκοστάφυλο,cranberry', 'grams': 170, 'carbs': 19.0, 'protein': 15.0, 'fat': 0.0, 'calories': 136.0}, 
{'name': 'High Protein μπανάνα,μάνγκο,λιναρόσπορος,δημητριακά', 'grams': 170, 'carbs': 17.0, 'protein': 15.0, 'fat': 0.0, 'calories': 129.0}, 
{'name': 'Life καρότο', 'grams': 400, 'carbs': 44.8, 'protein': 2.8, 'fat': 0.0, 'calories': 192.0}, 
{'name': 'παξιμάδια "Μάνα"', 'grams': 100, 'carbs': 62.8, 'protein': 10.1, 'fat': 19.5, 'calories': 475.0}, 
{'name': 'Σαλάτα λευκό λάχανο καρότο', 'grams': 200, 'carbs': 14.8, 'protein': 2.4, 'fat': 10.0, 'calories': 149.0}, 
{'name': 'Φράουλα', 'grams': 220, 'carbs': 12.0, 'protein': 0.9, 'fat': 0.3, 'calories': 50.0}, 
{'name': 'Βlueberry αποξηραμένα', 'grams': 160, 'carbs': 128.0, 'protein': 4.0, 'fat': 4.0, 'calories': 507.0}, 
{'name': 'Cranberries αποξηραμένα', 'grams': 100, 'carbs': 82.36, 'protein': 0.17, 'fat': 1.09, 'calories': 308.0}, 
{'name': 'Τσουρέκι ', 'grams': 100, 'carbs': 63.2, 'protein': 7.4, 'fat': 12.4, 'calories': 386.0}, 
{'name': 'Αχλάδι', 'grams': 120, 'carbs': 12.0, 'protein': 0.456, 'fat': 0.192, 'calories': 70.0}, 
{'name': 'Γάλα αμύγδαλο Delta ', 'grams': 250, 'carbs': 11.0, 'protein': 1.8, 'fat': 4.3, 'calories': 386.0}, 
{'name': 'Ανανάς ', 'grams': 90, 'carbs': 12.0, 'protein': 0.414, 'fat': 0.189, 'calories': 54.0}, 
{'name': 'Βατόμουρο', 'grams': 200, 'carbs': 12.0, 'protein': 2.78, 'fat': 0.98, 'calories': 86.0}, 
{'name': 'Βερίκοκο', 'grams': 120, 'carbs': 12.0, 'protein': 0.168, 'fat': 0.468, 'calories': 57.6}, 
{'name': 'Δαμάσκηνο', 'grams': 110, 'carbs': 12.0, 'protein': 0.7058333333333333, 'fat': 0.3, 'calories': 50.0}, 
{'name': 'Καρπούζι ', 'grams': 150, 'carbs': 12.0, 'protein': 0.915, 'fat': 0.225, 'calories': 45.0}, 
{'name': 'Κεράσια', 'grams': 100, 'carbs': 12.0, 'protein': 1.06, 'fat': 0.2, 'calories': 63.0}, 
{'name': 'Μάνγκο', 'grams': 90, 'carbs': 12.0, 'protein': 0.738, 'fat': 0.342, 'calories': 54.0}, 
{'name': 'Νεκταρίνια', 'grams': 120, 'carbs': 12.0, 'protein': 1.272, 'fat': 0.384, 'calories': 52.8}, 
{'name': 'Πεπόνι', 'grams': 100, 'carbs': 12.0, 'protein': 0.84, 'fat': 0.19, 'calories': 34.0}, 
{'name': 'Ροδάκινο', 'grams': 130, 'carbs': 12.0, 'protein': 1.183, 'fat': 0.325, 'calories': 44.2}, 
{'name': 'Καλαμπόκι', 'grams': 200, 'carbs': 40.0, 'protein': 6.0, 'fat': 2.0, 'calories': 83.0}, 
{'name': 'Γιαούρτι Νουνού 5% στραγγιστό', 'grams': 200, 'carbs': 8.2, 'protein': 18.8, 'fat': 10.0, 'calories': 198.0}, 
{'name': 'Αυγά  6XL πολύ μεγάλα', 'grams': 73, 'carbs': 0.7, 'protein': 9.1, 'fat': 6.9, 'calories': 101.0}, 
{'name': 'Παστίτσιο', 'grams': 250, 'carbs': 36.8, 'protein': 21.2, 'fat': 20.8, 'calories': 423.0}, 
{'name': 'Σταφύλια', 'grams': 100, 'carbs': 14.4, 'protein': 0.7, 'fat': 0.0, 'calories': 476.0}, 
{'name': 'Ογκρατέν', 'grams': 100, 'carbs': 18.6, 'protein': 14.4, 'fat': 15.4, 'calories': 266.0}, 
{'name': 'Λωτός', 'grams': 90, 'carbs': 12.0, 'protein': 1.0, 'fat': 0.05, 'calories': 250.0}
    // Add more food items here as needed
];

const apiKey = 'a844ce3a275649c0aa32239418aee8b1';

// State to keep track of selected foods
let selectedFoods = {};
let carbsCounter = 0;

var greekUtils = require("greek-utils");
// Function to render the list of food items based on the search input
function renderFoodList() {
    const searchInput = document.getElementById('search-input').value;
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    foodData.forEach(food => {
        let foodNameL = food.name.toLowerCase();
        let searchInputL = searchInput.toLowerCase();
        var foodNamesanitized = greekUtils.sanitizeDiacritics(foodNameL);
        var searchInputsanitized = greekUtils.sanitizeDiacritics(searchInputL);
        var foodNametogreek = greekUtils.toGreek(foodNamesanitized);
        var searchInputtogreek = greekUtils.toGreek(searchInputsanitized);

        if ((foodNameL.includes(searchInputL))||(foodNamesanitized.includes(searchInputsanitized))||(foodNametogreek.includes(searchInputtogreek))) {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';

            const baseIdName = food.name.replace(/\s+/g, '-').toLowerCase();
            const gramsId = `grams-${baseIdName}`;
            const selectCheckboxId = `select-${baseIdName}`;
            const addCheckboxId = `add-${baseIdName}`;

            const foodDetails = `
            <div>
                <strong>${food.name}</strong><br>
                Υδατάνθρακες: <span class="carbs-value">${food.carbs.toFixed(0)}</span>g, 
                Πρωτείνη: <span class="protein-value">${food.protein.toFixed(0)}</span>g, 
                Λίπος: <span class="fat-value">${food.fat.toFixed(0)}</span>g, 
                Θερμίδες: <span class="calories-value">${food.calories.toFixed(0)}</span>
            </div>
            <div>
                Γραμμάρια: <input type="number" value="${food.grams}" 
                              class="grams-input" 
                              data-name="${food.name}" 
                              id="${gramsId}" 
                              name="${gramsId}" 
                              min="1" 
                              onchange="updateFood('${food.name}')">
                <br>
                <label>
                    Επιλογή: <input type="checkbox" 
                                   class="select-checkbox" 
                                   data-name="${food.name}" 
                                   id="${selectCheckboxId}" 
                                   name="${selectCheckboxId}" 
                                   onchange="toggleSelect('${food.name}')">
                </label>
                <br>
                <label>
                    Πρόσθεσε στους υδατάνθρακες: <input type="checkbox" 
                                         class="add-checkbox" 
                                         data-name="${food.name}" 
                                         id="${addCheckboxId}" 
                                         name="${addCheckboxId}" 
                                         onchange="toggleAdd('${food.name}')">
                </label>
            </div>
        `;

            foodItem.innerHTML = foodDetails;
            foodList.appendChild(foodItem);
        }
    });
}

// Function to update the food nutritional values based on the grams input
function updateFood(foodName) {
    const gramsInput = document.querySelector(`input[data-name="${foodName}"].grams-input`).value;
    const food = foodData.find(f => f.name === foodName);

    const updatedCarbs = (food.carbs / food.grams) * gramsInput;
    const updatedProtein = (food.protein / food.grams) * gramsInput;
    const updatedFat = (food.fat / food.grams) * gramsInput;
    const updatedCalories = (food.calories / food.grams) * gramsInput;

    selectedFoods[foodName] = {
        ...food,
        grams: gramsInput,
        carbs: updatedCarbs,
        protein: updatedProtein,
        fat: updatedFat,
        calories: updatedCalories
    };

    const foodItem = document.querySelector(`input[data-name="${foodName}"].grams-input`).closest('.food-item');
    foodItem.querySelector('.carbs-value').textContent = updatedCarbs.toFixed(0);
    foodItem.querySelector('.protein-value').textContent = updatedProtein.toFixed(0);
    foodItem.querySelector('.fat-value').textContent = updatedFat.toFixed(0);
    foodItem.querySelector('.calories-value').textContent = updatedCalories.toFixed(0);

    if (document.querySelector(`input[data-name="${foodName}"].select-checkbox`).checked) {
        updateNutritionTarget();
    }

    if (document.querySelector(`input[data-name="${foodName}"].add-checkbox`).checked) {
        updateCarbsCounter();
    }
    saveData();  // Save data after updating food
}

// Function to update the nutrition target based on selected foods
function updateNutritionTarget() {
    let totalCarbs = 0, totalProtein = 0, totalFat = 0, totalCalories = 0;

    for (let food in selectedFoods) {
        totalCarbs += selectedFoods[food].carbs;
        totalProtein += selectedFoods[food].protein;
        totalFat += selectedFoods[food].fat;
        totalCalories += selectedFoods[food].calories;
    }

    const remainingCarbs = document.getElementById('remaining-carbs');
    const remainingProtein = document.getElementById('remaining-protein');
    const remainingFat = document.getElementById('remaining-fat');
    const remainingCalories = document.getElementById('remaining-calories');

    const targetCarbs = parseFloat(document.getElementById('target-carbs').textContent);
    const targetProtein = parseFloat(document.getElementById('target-protein').textContent);
    const targetFat = parseFloat(document.getElementById('target-fat').textContent);
    const targetCalories = parseFloat(document.getElementById('target-calories').textContent);

    remainingCarbs.textContent = (targetCarbs - totalCarbs).toFixed(0);
    remainingProtein.textContent = (targetProtein - totalProtein).toFixed(0);
    remainingFat.textContent = (targetFat - totalFat).toFixed(0);
    remainingCalories.textContent = (targetCalories - totalCalories).toFixed(0);

    saveData();  // Save data after updating nutrition target
}

// Function to toggle food selection in the nutrition target
function toggleSelect(foodName) {
    const isChecked = document.querySelector(`input[data-name="${foodName}"].select-checkbox`).checked;

    if (isChecked) {
        updateFood(foodName);  // Ensure the food data is up-to-date
        updateNutritionTarget();
    } else {
        delete selectedFoods[foodName];
        updateNutritionTarget();
    }
    saveData();  // Save data after selecting food
}

// Function to update the carbs counter based on selected foods
function updateCarbsCounter() {
    let totalCarbs = 0;

    for (let food in selectedFoods) {
        if (document.querySelector(`input[data-name="${food}"].add-checkbox`).checked) {
            totalCarbs += selectedFoods[food].carbs;
        }
    }

    document.getElementById('carbs-counter').textContent = totalCarbs;
    saveData();  // Save data after updating carbs counter

}

// Function to toggle the addition of carbs to the carbs counter
function toggleAdd(foodName) {
    updateCarbsCounter();
    saveData();  // Save data after adding to carbs counter
}

// Event listener for the search bar
document.getElementById('search-input').addEventListener('input', renderFoodList);

function saveData() {
    // Prepare data to be saved
    const foodsToSave = {};
    for (const [foodName, foodData] of Object.entries(selectedFoods)) {
        const selectCheckbox = document.querySelector(`input[data-name="${foodName}"].select-checkbox`);
        const addCheckbox = document.querySelector(`input[data-name="${foodName}"].add-checkbox`);

        foodsToSave[foodName] = {
            ...foodData,
            isSelected: selectCheckbox.checked,  // Save the state of the "Select" checkbox
            isAdded: addCheckbox.checked  // Save the state of the "Add" checkbox
        };
    }

    localStorage.setItem('selectedFoods', JSON.stringify(foodsToSave));
    localStorage.setItem('carbsCounter', document.getElementById('carbs-counter').textContent);
    localStorage.setItem('nutritionTarget', JSON.stringify({
        carbs: document.getElementById('remaining-carbs').textContent,
        protein: document.getElementById('remaining-protein').textContent,
        fat: document.getElementById('remaining-fat').textContent,
        calories: document.getElementById('remaining-calories').textContent
    }));
}

function loadData() {
    const savedFoods = JSON.parse(localStorage.getItem('selectedFoods'));
    const savedCarbsCounter = localStorage.getItem('carbsCounter');
    const savedNutritionTarget = JSON.parse(localStorage.getItem('nutritionTarget'));

    if (savedFoods) {
        for (const [foodName, foodData] of Object.entries(savedFoods)) {
            selectedFoods[foodName] = foodData;

            // Set the grams input value
            const gramsInput = document.querySelector(`input[data-name="${foodName}"].grams-input`);
            gramsInput.value = foodData.grams;

            // Update the displayed nutritional values
            const foodItem = gramsInput.closest('.food-item');
            foodItem.querySelector('.carbs-value').textContent = foodData.carbs.toFixed(1);
            foodItem.querySelector('.protein-value').textContent = foodData.protein.toFixed(1);
            foodItem.querySelector('.fat-value').textContent = foodData.fat.toFixed(1);
            foodItem.querySelector('.calories-value').textContent = foodData.calories.toFixed(1);

            // Update the state of the "Select" and "Add to Carbs" checkboxes
            document.querySelector(`input[data-name="${foodName}"].select-checkbox`).checked = foodData.isSelected;
            document.querySelector(`input[data-name="${foodName}"].add-checkbox`).checked = foodData.isAdded;

            // If the food is selected, update the nutrition target
            if (foodData.isSelected) {
                updateNutritionTarget();
            }

            // If the food is added to carbs, update the carbs counter
            if (foodData.isAdded) {
                updateCarbsCounter();
            }
        }
    }

    if (savedCarbsCounter) {
        document.getElementById('carbs-counter').textContent = savedCarbsCounter;
    }

    if (savedNutritionTarget) {
        document.getElementById('remaining-carbs').textContent = savedNutritionTarget.carbs;
        document.getElementById('remaining-protein').textContent = savedNutritionTarget.protein;
        document.getElementById('remaining-fat').textContent = savedNutritionTarget.fat;
        document.getElementById('remaining-calories').textContent = savedNutritionTarget.calories;
    }
}