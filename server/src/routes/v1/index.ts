import express from 'express'
import userRoute from './user'
import movieRoute from './movie'
import authRoute from './auth'


const router = express.Router()

const appRoutes = [
    {
        path:'/users',
        route: userRoute
    },
    {
        path:'/movies',
        route: movieRoute
    },
    {
        path:'/auth',
        route: authRoute
    },
]

appRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// default route
router.use('/', (req, res) => {
    res.json({statusCode:200, status:"success", message:"App up and Running"})
})

export default router;