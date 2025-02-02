let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let chartInstance = null;  
function addWorkout() {
    let userName = document.getElementById("userName").value;
    let workoutType = document.getElementById("workoutType").value;
    let minutes = parseInt(document.getElementById("minutes").value);

    if (userName && minutes) {
        let workout = { userName, workoutType, minutes };
        workouts.push(workout);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        displayWorkouts();
        updateChart();
    }
}

function displayWorkouts() {
    let table = document.getElementById("workoutTable");
    table.innerHTML = "";
    workouts.forEach(workout => {
        let row = `<tr>
            <td>${workout.userName}</td>
            <td>${workout.workoutType}</td>
            <td>${workout.minutes} min</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function updateChart() {
    let userNames = workouts.map(w => w.userName);
    let workoutMinutes = workouts.map(w => w.minutes);

    if (chartInstance) {
        chartInstance.destroy();
    }

    let ctx = document.getElementById("workoutChart").getContext("2d");
    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: userNames,
            datasets: [{
                label: "Workout Minutes",
                data: workoutMinutes,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function searchByName() {
    let searchValue = document.getElementById("searchName").value.toLowerCase();
    let filteredWorkouts = workouts.filter(workout => 
        workout.userName.toLowerCase().includes(searchValue)
    );

    let table = document.getElementById("workoutTable");
    table.innerHTML = "";
    filteredWorkouts.forEach(workout => {
        let row = `<tr>
            <td>${workout.userName}</td>
            <td>${workout.workoutType}</td>
            <td>${workout.minutes} min</td>
        </tr>`;
        table.innerHTML += row;
    });
}

window.onload = function() {
    displayWorkouts();
    updateChart();
};
