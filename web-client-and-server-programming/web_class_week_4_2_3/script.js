// Initialize student count when page loads
document.getElementById('student-count').textContent = '0';

// Get DOM elements
const studentNameInput = document.getElementById('student-name');
const studentIdInput = document.getElementById('student-id');
const studentGpaInput = document.getElementById('student-gpa');
const addStudentButton = document.getElementById('add-student');
const removeSelectedButton = document.getElementById('remove-selected-students');
const studentList = document.getElementById('student-list');
const studentCountSpan = document.getElementById('student-count');

// Add student event listener
addStudentButton.addEventListener('click', () => {
    // Get input values
    const name = studentNameInput.value.trim();
    const id = studentIdInput.value.trim();
    const gpa = parseFloat(studentGpaInput.value);

    // Validate name
    if (!name) {
        alert('Please enter a student name');
        return;
    }

    // Validate ID
    if (!id) {
        alert('Please enter a student ID');
        return;
    }

    // Validate GPA
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        alert('Please enter a valid GPA between 0 and 4');
        return;
    }

    // Create new list item
    const li = document.createElement('li');
    li.innerHTML = `${name}, id: ${id}, GPA ${gpa}`;

    // Add click event handler to toggle selected class
    li.addEventListener('click', () => {
        li.classList.toggle('selected');
    });

    // Add to list
    studentList.appendChild(li);

    // Clear input fields
    studentNameInput.value = '';
    studentIdInput.value = '';
    studentGpaInput.value = '';

    // Update student count
    updateStudentCount();
});

// Remove selected students event listener
removeSelectedButton.addEventListener('click', () => {
    const selectedStudents = document.querySelectorAll('#student-list li.selected');
    selectedStudents.forEach(student => student.remove());
    updateStudentCount();
});

// Helper function to update student count
function updateStudentCount() {
    const count = document.querySelectorAll('#student-list li').length;
    studentCountSpan.textContent = count;
}