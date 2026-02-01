export const validateStudent = (data, isPatch = false) => {
    const errors = [];
    const { email, gpa, semester, first_name, last_name, major, enrollment_date } = data;

    if (!isPatch) {
        if (!first_name || !last_name || !email || !major || !enrollment_date) {
            errors.push("Missing required fields");
        }
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format");
    if (gpa !== undefined && (gpa < 0 || gpa > 4)) errors.push("GPA must be between 0.0 and 4.0");
    if (semester !== undefined && (semester < 1 || semester > 12)) errors.push("Semester must be between 1 and 12");

    return {
        isValid: errors.length === 0,
        errors
    };
};