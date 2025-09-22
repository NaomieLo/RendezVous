document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("schedule-grid-container");

  // --- Configuration ---
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const startTime = 9; // 9 AM
  const endTime = 17; // 5 PM (military time)
  const timeIncrement = 30; // in minutes

  let isMouseDown = false;

  // --- Grid Generation ---
  function generateGrid() {
    // 1. Create Header Row
    const headerRow = document.createElement("div"); // Dummy cell for top-left corner
    headerRow.className = "grid-cell";
    gridContainer.appendChild(headerRow);

    days.forEach((day) => {
      const dayCell = document.createElement("div");
      dayCell.className = "grid-cell header-cell";
      dayCell.textContent = day;
      gridContainer.appendChild(dayCell);
    });

    // 2. Create Time Slots and Cells
    for (let hour = startTime; hour < endTime; hour++) {
      for (let min = 0; min < 60; min += timeIncrement) {
        // Time Label Column
        const timeLabel = document.createElement("div");
        timeLabel.className = "grid-cell time-label-cell";
        const formattedMin = min === 0 ? "00" : min;
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        timeLabel.textContent = `${displayHour}:${formattedMin} ${ampm}`;
        gridContainer.appendChild(timeLabel);

        // Create a selectable cell for each day in this time slot row
        days.forEach((day) => {
          const cell = document.createElement("div");
          cell.className = "grid-cell selectable-cell";
          // Store data about the cell for later use
          cell.dataset.day = day;
          cell.dataset.time = `${hour}:${formattedMin}`;
          gridContainer.appendChild(cell);
        });
      }
    }
  }

  // --- Event Handling for Click-and-Drag ---

  // Start selecting when mouse is pressed down
  gridContainer.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("selectable-cell")) {
      isMouseDown = true;
      e.target.classList.toggle("available"); // Toggle on first click
      e.preventDefault(); // Prevent default text selection behavior
    }
  });

  // Continue selecting when mouse is moving over other cells
  gridContainer.addEventListener("mouseover", (e) => {
    if (isMouseDown && e.target.classList.contains("selectable-cell")) {
      // To prevent re-toggling on the same drag, you might check if the state is already set
      // For simplicity, we just add the class. To make it a "painting" tool, you'd check the state of the first cell clicked.
      e.target.classList.add("available");
    }
  });

  // Stop selecting when mouse is released, anywhere on the page
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  // --- Initialize ---
  generateGrid();
});
