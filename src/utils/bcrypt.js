import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT_ROUNDS))

export const validatePassword = (paswordSend, passwordDB) => bcrypt.compareSync(paswordSend, passwordDB)

/* test */
/* const pass = createHash("judjud")
console.log(validatePassword("judjud", pass)) */