import bcrypt from 'bcryptjs';

const data = {
    companies: {
        companyName: "ABC Tech",
        servicesList: [],
        users: [{
            email: "shayan@gmail.com",
            password: "$2a$08$2b9/uoGosX6xQHBSS/1jIeT33b0fflqfJ0WQqz4ktr0lnDpargmoi",
            loggedIn: false,
            pinCodeSetup: false
        }],
        clients: [],
        invoices: [],
        settings: {},
        paymentData: {}
    }
};
export default data;