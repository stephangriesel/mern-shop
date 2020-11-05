import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Piet Pompies',
        email: 'piet@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Sannie Pompies',
        email: 'sannie@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;