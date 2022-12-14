import { mongoose } from '../db/db.js'

const ObjectId = mongoose.Types.ObjectId

const clienteSchema = new mongoose.Schema({
    _id: ObjectId,
    nome: String,
    fantasia: String,
    cpf_cnpj: String,
    status: String,
    prospect: Array,
    cliente: String,
    fornecedor: ObjectId,
    tags: ObjectId
}, { collection: 'clientes' }
)

const atendimentosSchema = new mongoose.Schema({
    _id: ObjectId,
    id_atendimento: Number,
    id_cliente: ObjectId,
    id_user: ObjectId,
    id_atendente: ObjectId,
    abertoPor: String,
    finalizadoPor: String,
    setor: ObjectId,
    descricao: String,
    status: String,
    canal: String,
    canal_id: String,
    canal_cliente: String,
    date: Date,
    inicio: Date,
    fim: Date,
    update: Date,
    protocolo: String,
    tags: Array,
    usuarios_acompanhar: Array,
    atendentes: [
        {
            _id: ObjectId,
            atendente: ObjectId,
            departamento: ObjectId,
            fim: Date,
            atendimentoHumano: String,
            inicio: Date
        }
    ],
    avaliacoes: Array,
    observacoes: Array,
    nivelPrioridadeListagem: Number,
    abertoViaApi: Boolean,
    ultimaTransferencia: Date,
    ultimaTransferenciaFilaDepartamento: Date,
    data_fixacao: Date,
    transferenciasCallCenter: Array,
    solicitacoes: Array,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    estrelas_atend: Number,
    id_motivo_atendimento: ObjectId
}, { collection: 'atendimentos' }
)

const usuariosSchema = new mongoose.Schema({
    _id: ObjectId,
    empresa: ObjectId,
    token: Number,
    nome: String,
    status: String,
    email: String,
    senha: String,
    imagem: String,
    tipo: String,
    genero: String,
    perfil_permissoes: ObjectId,
    siga_me: String,
    siga_me_fone: String,
    permiteAcessoApi: Boolean,
    perfilPermissoesApi: Boolean,
    conexoes: Array,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    ultimo_status: String,
    online: String
}, { collection: 'usuarios' }
);

const departamentosUsuariosSchema = new mongoose.Schema({
    _id: ObjectId,
    departamento: ObjectId,
    usuario: ObjectId,
    statusVinculo: String
}, { collection: 'departamentos_usuarios' }
);

const tagsSchema = new mongoose.Schema({
    _id: ObjectId,
    empresa: ObjectId,
    id_criador: ObjectId,
    nome: String,
    cor: String,
    _v: String
}, { collection: 'tags' }
);

const motivoAtendimentoSchema = new mongoose.Schema({
    _id: ObjectId,
    motivo: String,
    departamentos: ObjectId,
    createdAt: String,
    cor: String,
    updateAt: String,
    _v: String
}, { collection: 'motivo_atendimentos' }
);


const mensagemAtendimentosSchema = new mongoose.Schema({
    _id: ObjectId,
    id_rota: ObjectId,
    id_atend: ObjectId,
    mensagem: String,
    objeto: String,
    chamada: String,
    envioForaJanela24h: Boolean,
    data: Date,
    statusEnvio: {
        status: String,
        observacao: String
    },
    createdAt: Date,
    updatedAt: Date,
    __v: 0,
    idMensagemCanal: String
}, { collection: 'atendimentos_mensagens' }
)

export default {
    atendimentos: atendimentosSchema,
    departamentosUsuarios: departamentosUsuariosSchema,
    usuario: usuariosSchema,
    tags: tagsSchema,
    cliente: clienteSchema,
    motivoAtendimentos: motivoAtendimentoSchema,
    mensagemAtendimentos: mensagemAtendimentosSchema,
    ObjectId: ObjectId
}