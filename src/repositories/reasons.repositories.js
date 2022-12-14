import model from '../models/models2.js'
import { mongoose } from '../db/db.js'


async function reasonsByDepartment(department) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const reasons = conn.model('motivo_atendimentos', model.motivoAtendimentos)

        const response = await reasons.find({
            departamentos: { $in: department }
        }, {
            _id: 1,
            motivo: 1,
            departamentos: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return error
    }
}

export default { reasonsByDepartment }