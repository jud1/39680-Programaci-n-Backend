import passport from 'passport'
import { strategyJWT } from './strategies/jwtStrategy.js'

const initializePassport = () => {
    passport.use(strategyJWT)
}

export default initializePassport