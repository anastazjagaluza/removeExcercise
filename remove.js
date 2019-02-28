const allAnimals = [
  { name: "Mandu", desc: "amazing", type: "cat", age: 9 },
  { name: "Mia", desc: "black", type: "cat", age: 9 },
  { name: "Leeloo", desc: "growing", type: "dog", age: 1 },
  { name: "Toothless", desc: "trained", type: "dragon", age: 14 },
  { name: "ScoobyDoo", desc: "wondering", type: "dog", age: 58 },
  { name: "Horsey", desc: "horsing", type: "horse", age: 10 }
];

let sorting = "";
let sorting_direction = "asc";

window.addEventListener("DOMContentLoaded", init);

function init() {
  // register sort-buttons
  document.querySelector("#sorting").addEventListener("click", clickSort);

  // register remove-button
  document.querySelector("#list").addEventListener("click", clickList);

  displayAnimals(allAnimals);
}

function clickSort(event) {
  const action = event.target.dataset.action;

  if (action === "sort_age_asc") {
    event.preventDefault();
    sorting = "sortByAge";
    sorting_direction = "asc";
    displayAnimals();
  } else if (action === "sort_age_desc") {
    event.preventDefault();
    sorting = "sortByAge";
    sorting_direction = "desc";
    displayAnimals();
  }
}

function sortByAge(direction) {
  allAnimals.sort((a, b) => {
    if (direction === "asc") {
      if (a.age < b.age) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (a.age < b.age) {
        return 1;
      } else {
        return -1;
      }
    }
  });
}

function clickList(event) {
  // TODO: Figure out if a button was clicked
  // TODO: Figure out if it was a remove-button
  // TODO: If so, call clickRemove
}

function clickRemove(event) {
  let obj = allAnimals.find(obj => obj.name === event.target.dataset.id);
  let pos = allAnimals.indexOf(obj);
  allAnimals.splice(pos, 1);
  displayAnimals();
}

function displayAnimals() {
  if (sorting === "sortByAge") {
    sortByAge(sorting_direction);
  }

  displayList(allAnimals);
}

function displayList(animals) {
  document.querySelector("#list tbody").innerHTML = "";
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);
  //button has id;
  clone.querySelector("[data-action=remove]").dataset.id = animal.name;

  clone
    .querySelector("[data-action=remove]")
    .addEventListener("click", clickRemove);

  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
