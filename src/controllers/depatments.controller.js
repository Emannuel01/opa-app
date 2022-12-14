import { departmentSelect } from '../utils/utils.js'
import service from '../services/departments.service.js'

async function getDepartments(req, res) {
    const { token } = req.headers
    const { department } = req.query
    const response = departmentSelect(department)
    return res.status(200).json(response)
}

async function getUserDepartment(req, res) {
    const { token } = req.headers
    const { department } = req.query
    const response = await service.userDepartments(token, department)
    return res.status(200).json(response)
}

export default { getDepartments, getUserDepartment }