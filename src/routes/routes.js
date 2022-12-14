import express from 'express'

const router = express.Router();
import attedances from '../controllers/attedances.controller.js'
import departments from '../controllers/depatments.controller.js'
import attendant from '../controllers/attendant.controller.js'
import client from '../controllers/clients.controller.js'
import { Login } from '../controllers/session.controller.js';


router.get('/call-time-all', attedances.getTimeAttendancesAll)
router.get('/call-time-by-department/:department', attedances.getTimeAttendancesByDepartment)
router.get('/attendance-statistics', attedances.getTotalAttendancesAll)
router.get('/attendance-reasons', attedances.getAttendancesByReason)
router.get('/attendance-number', attedances.getnumberAttendancesByTime)
router.get('/call-time-medium-reasons', attedances.getTimeOfCallsByReason)
router.get('/number-call-by-hours', attedances.getNumberOfCallsHours)


router.get('/departments', departments.getDepartments)

router.get('/atendente-assuming', attendant.getAttendatCountDaysAssumin)
router.get('/atendente-finished', attendant.getAttendatCountDaysFinished)

router.get('/user-department', departments.getUserDepartment)

router.get('/clients-by-tags', client.getClientsTag)
router.get('/customer-review-media', client.getCustomerReviewMedia)
router.get('/customer-message-attendances', client.getClientByMessageAttendaces)

router.post('/auth/login', Login)

export { router }