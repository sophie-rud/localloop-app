export const validators = {
    // Email validation
    email: (value) => {
        if (!value || value.trim() === '') {
            return "L'email est obligatoire";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return "Email invalide";
        }
        return null;
    },

    // Username validation
    username: (value) => {
        if (!value || value.trim() === '') {
            return "Le nom d'utilisateur est obligatoire";
        }
        if (value.trim().length < 3) {
            return "Le nom d'utilisateur doit contenir au moins 3 caractères";
        }
        return null;
    },

    // Password validation
    password: (value) => {
        if (!value) {
            return "Le mot de passe est obligatoire";
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(value)) {
            return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre";
        }
        return null;
    },

    // Confirm password
    confirmPassword: (password) => (confirm) => {
        if (!confirm) return "Confirmer votre mot de passe";
        if (confirm !== password) return "Les mots de passe ne correspondent pas";

        return null;
    },

    // Title and name validation
    title: (value) => {
        if (!value || value.trim() === '') {
            return "Le titre est obligatoire";
        }
        if (value.trim().length < 3) {
            return "Le titre doit contenir au moins 3 caractères";
        }
        return null;
    },

    // Distance validation
    distance: (value) => {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const num = Number(value);
        if (isNaN(num)) {
            return "La distance doit être un nombre";
        }
        if (num < 0) {
            return "La distance doit être positive";
        }
        return null;
    },

    // Duration validation (string)
    durationString: (value) => {
        if (!value) {
            return null;
        }
        if (!/^\d{1,2}:\d{2}$/.test(value)) {
            return "Durée invalide";
        }
        return null;
    },


    // Difficulty validation
    difficulty: (value) => {
        if (!value || value.trim() === '') {
            return "La difficulté est obligatoire";
        }
        return null;
    },

    // Presentation validation (textarea)
    presentation: (value) => {
        if (!value || value.trim() === '') {
            return "La présentation est obligatoire";
        }
        if (value.trim().length < 10) {
            return "La présentation doit contenir au moins 10 caractères";
        }
        return null;
    },

    // ThemeId validation
    themeId: (value) => {
        if (!value) {
            return "Le thème est obligatoire";
        }
        const num = Number(value);
        if (isNaN(num) || num < 1) {
            return "Thème invalide";
        }
        return null;
    },

    // PlaceId validation
    placeId: (value) => {
        if (!value) {
            return "Le lieu est obligatoire";
        }
        const num = Number(value);
        if (isNaN(num) || num < 1) {
            return "Lieu invalide";
        }
        return null;
    },

    // DepartmentId validation
    departmentId: (value) => {
        if (!value) {
            return "Le département est obligatoire";
        }
        const num = Number(value);
        if (isNaN(num) || num < 1) {
            return "Département invalide";
        }
        return null;
    },

    // Latitude validation
    latitude:(value) => {
        if (value === "" || value === null || value === undefined) {
            return "Indiquer une latitude";
        }

        const num = Number(value);
        if (isNaN(num) || num < -90 || num > 90) {
            return "Latitude invalide (doit être entre -90 et 90)";
        }
        return null;
    },

    // Longitude validation
    longitude: (value) => {
        if (value === "" || value === null || value === undefined) {
            return "La longitude est obligatoire";
        }

        const num = Number(value);
        if (isNaN(num) || num < -180 || num > 180) {
            return "Longitude invalide (doit être entre -180 et 180)";
        }
        return null;
    },

    // Photo validation
    photo: (file) => {
        if (!file) {
            return "Compléter votre publication avec une photo";
        }

        const maxSize = 5 * 1024 * 1024; // 5 Mo

        if (!(file instanceof File)) {
            return "Fichier invalide";
        }

        if (file.size > maxSize) {
            return "La photo ne doit pas dépasser 5 Mo";
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            return "Format d'image non supporté";
        }


        return null;
    },

    // Required field validation
    required: (fieldName) => (value) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            return `${fieldName} est obligatoire`;
        }
        return null;
    },

    // Minimum length validation
    minLength: (min, fieldName) => (value) => {
        if (value && value.trim().length < min) {
            return `${fieldName} doit contenir au moins ${min} caractères`;
        }
        return null;
    },

    // Positive number validation
    positiveNumber: (value) => {
        if (value === undefined || value === null || value === '') {
            return 'Ce champ est obligatoire';
        }
        const num = Number(value);
        if (isNaN(num)) {
            return 'Merci de renseigner un nombre';
        }
        if (num < 0) {
            return 'Le nombre renseigné doit être positif';
        }
        return null;
    }
};


// Method to validate a complete object with rules
export const validateForm = (data, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
        const validator = rules[field];
        const error = validator(data[field]);
        if (error) {
            errors[field] = error;
        }
    });

    return errors;
};

// Check if an error object contains errors
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};
