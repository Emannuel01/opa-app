import { useEffect, useState, KeyboardEvent } from "react"
import styled from "styled-components"
import { InputDate, DateContent } from "../components/dateContent"
import { DataGraphBar, GraphicBar } from "../components/graphics/bar"
import { SideBar } from "../components/sideBar"
import { dateFilterDefaul } from "../config/config"
import { api } from "../hooks/useEffect"
import { dateFormat } from "../utils/utils"

interface ListData {
    id: string,
    name: string
}

interface Attendances {
    _id: {
        day: string,
        month: string,
        year: string
    },
    count: number,
    description: string
}

interface DataAttendances {
    data: [{
        _id: {
            day: string,
            month: string,
            year: string
        },
        count: number
    }]
    description: string
}

export function Attendance() {
    if (!window.sessionStorage.getItem("token")) {
        window.location.replace('/');
    }

    const [gestor, setGestor] = useState('')
    const [listSetor, setListSetor] = useState<ListData[]>()
    const [listAttendant, setListAttendant] = useState<ListData[]>()
    const [setor, setSetor] = useState("")
    const [attendant, setAttendant] = useState("")
    const [dateStart, setDateStart] = useState(dateFilterDefaul.startDate)
    const [dateFinal, setDateFinal] = useState(dateFilterDefaul.finalDate)
    const [isSheach, setIsSheach] = useState<boolean>(false)

    const [assumingData, setAssumingData] = useState<DataGraphBar>()
    const [finishData, setFinishData] = useState<DataGraphBar>()

    useEffect(() => {
        async function loadDepartments() {
            await api.get(`/departments?department=${gestor}`)
                .then(response => {
                    if (response.data == false) return
                    setListSetor(response.data)
                })
                .catch(err => console.log(err))
        }

        if (gestor !== '') {
            loadDepartments()
        }

    }, [gestor])

    useEffect(() => {
        async function loadAttendant() {
            await api.get(`/user-department?department=${setor}`)
                .then(response => {
                    if (response.data == false) return
                    setListAttendant(response.data)
                })
                .catch(err => console.log(err))
        }

        if (setor !== '') {
            loadAttendant()
        }
    }, [setor])

    useEffect(() => {
        async function loadDataAttendant() {
            try {
                await api.get<DataAttendances>(`/atendente-assuming?attendant=${attendant}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                    .then(response => {
                        if (response.data) {
                            let label: String[] = []
                            let dataSets: number[] = []

                            response.data.data.map((data) => {
                                const date = dateFormat(data._id.day, data._id.month, data._id.year)
                                label.push(date)
                                dataSets.push(data.count)

                            })
                            setAssumingData({
                                data: dataSets,
                                description: response.data.description,
                                label: label
                            })
                        }
                    })

                await api.get<DataAttendances>(`/atendente-finished?attendant=${attendant}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                    .then(response => {
                        if (response.data) {
                            let label: String[] = []
                            let dataSets: number[] = []

                            response.data.data.map((data) => {
                                const date = dateFormat(data._id.day, data._id.month, data._id.year)
                                console.log(data._id.day)
                                console.log(date)
                                label.push(date)
                                dataSets.push(data.count)

                            })
                            setFinishData({
                                data: dataSets,
                                description: response.data.description,
                                label: label
                            })
                        }
                    })

            } catch (err) {
                console.log(err)
            }
        }
        if (isSheach === true) {
            loadDataAttendant()
            setIsSheach(false)
        }
    }, [isSheach])

    const handleChangeGestor = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setGestor(target.value)
        }
    }
    return (
        <>
            <SideBar selected="Atendente" />
            <Main>
                <ContentTop>
                    <Sheach>
                        <SheachDepartment type={"text"} placeholder={"Digite o departamento"} onKeyDown={handleChangeGestor} />
                        <Icon className="fa fa-search" />
                    </Sheach>

                    <DateContent>
                        <Description>Inicial:</Description>
                        <InputDate value={dateStart} id="dateStart" type={"date"} onChange={event => setDateStart(event.target.value)} />
                    </DateContent>

                    <DateContent>
                        <Description>Final:</Description>
                        <InputDate value={dateFinal} id="dateFinal" type={"date"} onChange={event => setDateFinal(event.target.value)} />
                    </DateContent>

                </ContentTop>
                <Department value={setor} onChange={event => setSetor(event.target.value)}>
                    <OptionDepartment>Selecione um setor</OptionDepartment>
                    {listSetor?.map((setor, index) => (
                        <OptionDepartment key={index} value={setor.id}>{setor.name}</OptionDepartment>
                    ))}
                </Department>

                <Setor value={attendant} onChange={event => setAttendant(event.target.value)}>
                    <OptionDepartment>Selecione um atendente</OptionDepartment>
                    {listAttendant?.map((setor, index) => (
                        <OptionDepartment key={index} value={setor.id}>{setor.name}</OptionDepartment>
                    ))}
                </Setor>
                <ProcessSheach onClick={e => setIsSheach(true)}>
                    Pesquisar
                </ProcessSheach>
                <ContentGraphics>
                    {assumingData?.data && <GraphicBar
                        dataSets={assumingData?.data}
                        description={assumingData?.description}
                        labels={assumingData?.label} />
                    }
                    {finishData?.data && <GraphicBar
                        dataSets={finishData?.data}
                        description={finishData?.description}
                        labels={finishData?.label} />
                    }
                </ContentGraphics>
            </Main>
        </>
    )
}

const Main = styled.div`
    margin: 0 45px 0 290px;
    padding: 35px 25px 0;
`
const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    animation: animateLeft 2s;
`
const Sheach = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 5px 15px 5px 0;
`

const SheachDepartment = styled.input`
    border-radius: 10px;
    width: 220px;
    font-size: 16px;
    padding: 10px 0 10px 20px;
    color: #252525;
    background-color: transparent;
    display: inline;
`

const Department = styled.select`
    width: 210px;
    height: 42px;
    border-radius: 15px;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    color: #252525;
    margin: 0 10px 0 0;
    animation: animateLeft 2s;
`

const Setor = styled(Department)`
    width: 210px;
`

const OptionDepartment = styled.option`
    
`
const Description = styled.span`
    color: #252525;
    padding: 10px;
`
const Icon = styled.i`
    cursor: pointer;
    color: #252525;
    font-size: 24px;
`
const ContentGraphics = styled.div`
    padding: 25px 2px 50px;
    max-width: 2000px;
`
const ProcessSheach = styled.button`
    width: 120px;
    height: 40px;
    color: #ffffff;
    font-size: 16px;
    background-color: #794ef4;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
`