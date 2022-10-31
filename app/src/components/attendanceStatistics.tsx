import { useEffect, useState, KeyboardEvent } from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import styled from "styled-components"
import { api } from "../hooks/useEffect"
import { Sheach } from "./sheach"
import { defaultGrid, stylesGlobal } from "../config/config"
import { Description } from "./Description"
import { DateContent, InputDate } from "./dateContent"
import { Button } from "./Button"
import { CSVLink } from "react-csv"
import { Title } from "./title"
import { DataGraphBar, GraphicBar } from "./graphics/bar"

interface DataGraphicsByReasons {
    motivo: string,
    quantidade: number
}

interface DataGraphicsByBumberCallsWaitingTime {
    motivo: string,
    quantidade: number
}

interface DataGraphicsTimeWaitingAttendances {
    tempo: number,
    chamados: number,
    departamentos: string
}

const headersCsv = {
    reasons: [
        { label: "Motivo", key: "motivo" },
        { label: "Quantidade", key: "quantidade" }
    ],
    numberCallsWaitingTime: [
        { label: "Setor", key: "setor" },
        { label: "Cinco", key: "cinco" },
        { label: "Dez", key: "dez" },
        { label: "Quinze", key: "quinze" },
        { label: "Vinte", key: "vinte" },
        { label: "Trinta", key: "trinta" },
        { label: "Trinta+", key: "maior" },
    ]
}

const columnsGridByReason: GridColDef[] = [
    { field: "motivo", headerName: "Motivo", width: 400 },
    { field: "quantidade", headerName: "Quantidade", width: 150 }
]

const columnsGridByNumberCallsWaitingTime: GridColDef[] = [
    { field: "setor", headerName: "Setor", width: 230 },
    { field: "cinco", headerName: "Cinco", width: 91.666666667 },
    { field: "dez", headerName: "Dez", width: 91.666666667 },
    { field: "quinze", headerName: "Quinze", width: 91.666666667 },
    { field: "vinte", headerName: "Vinte", width: 91.666666667 },
    { field: "trinta", headerName: "Trinta", width: 91.666666667 },
    { field: "maior", headerName: "Trinta +", width: 91.666666667 }
]

/* `/call-time-by-department/${rota}?dateStart=${dateStart.value}&dateFinal=${dateFinal.value}`
 */
export function AttendanceByReason() {
    const [gestor, setGestor] = useState('')
    const [isFeching, setIsFeching] = useState<boolean>(false)

    const [dateStart, setDateStart] = useState("2022-09-01")
    const [dateFinal, setDateFinal] = useState("2022-09-30")

    const [reload, setReload] = useState(true)

    const [listByReasons, setListByReasons] = useState<GridRowsProp>(defaultGrid)
    const [csvByReasons, setCsvByReasons] = useState<DataGraphicsByReasons[]>([{ motivo: "", quantidade: 0 }])

    const [listByBumberCallsWaitingTime, setListByBumberCallsWaitingTime] = useState<GridRowsProp>(defaultGrid)
    const [csvByBumberCallsWaitingTime, setCsvByBumberCallsWaitingTime] = useState<DataGraphicsByBumberCallsWaitingTime[]>(
        [{ motivo: "", quantidade: 0 }])

    const [dataTimeWaitingAttendances, setDataTimeWaitingAttendances] = useState<DataGraphBar>({
        data: [],
        description: "",
        label: []
    })

    useEffect(() => {
        async function loadAttendancesByReason() {
            setIsFeching(true)
            await api.get<DataGraphicsTimeWaitingAttendances[]>(`/call-time-by-department/${gestor}?dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        let label: String[] = []
                        let dataSets: number[] = []

                        response.data.map((data) => {
                            label.push(data.departamentos)
                            dataSets.push(data.tempo)
                        })
                        setDataTimeWaitingAttendances({
                            data: dataSets,
                            description: "Dados em minutos.",
                            label: label
                        })
                    }
                }).catch(error => console.log(error))


            await api.get<DataGraphicsByBumberCallsWaitingTime[]>(`/attendance-number?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListByBumberCallsWaitingTime(response.data)
                        setCsvByBumberCallsWaitingTime(response.data)
                    }
                }).catch(error => console.log(error))

            await api.get<DataGraphicsByReasons[]>(`/attendance-reasons?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListByReasons(response.data)
                        setCsvByReasons(response.data)
                    }
                }).catch(error => console.log(error))
            setIsFeching(false)
        }
        if (gestor !== '') {
            loadAttendancesByReason()
        }
    }, [reload])

    const styles = [{
        te: {
            margin: "20px"
        }
    }]
    return (
        <Main>
            <ContentTop>
                <Sheach type="text" placeholder="Gestor" onChange={e => setGestor(e.target.value)} />
                <DateContent>
                    <Description style={stylesGlobal.Description}>Inicial:</Description>
                    <InputDate value={dateStart} id="dateStart" type={"date"} onChange={event => setDateStart(event.target.value)} />
                </DateContent>

                <DateContent>
                    <Description style={stylesGlobal.Description}>Final:</Description>
                    <InputDate value={dateFinal} id="dateFinal" type={"date"} onChange={event => setDateFinal(event.target.value)} />
                </DateContent>

                <Button style={stylesGlobal.Button} onClick={e => setReload(!reload)}>Pesquisar</Button>
            </ContentTop>

            <Content>
                {isFeching && <><Loading>Carregando...</Loading> <br /></>}

                {dataTimeWaitingAttendances?.data.length > 0 && <>
                    <Title style={{ display: "inline-block", padding: "20px", color: "#701ec7" }} title="Media de tempo por departamento:" />
                    <ContentGraphics>
                        <GraphicBar dataSets={dataTimeWaitingAttendances?.data} description={dataTimeWaitingAttendances?.description} labels={dataTimeWaitingAttendances?.label} />
                    </ContentGraphics>
                </>}

                {listByBumberCallsWaitingTime?.length > 0 && <>
                    <Title style={{ display: "inline-block", padding: "20px", color: "#701ec7" }} title="Quantidade de chamados por tempo médio:" />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={csvByBumberCallsWaitingTime}
                        headers={headersCsv.numberCallsWaitingTime}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid>
                        <DataGrid
                            rows={listByBumberCallsWaitingTime}
                            columns={columnsGridByNumberCallsWaitingTime} />
                    </ContentGrid>
                </>}

                {listByReasons?.length > 0 && <>
                    <Title style={{ display: "inline-block", padding: "20px", color: "#701ec7" }} title="Atendimentos por motivo:" />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={csvByReasons}
                        headers={headersCsv.reasons}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid>
                        <DataGrid
                            initialState={{ sorting: { sortModel: [{ field: 'quantidade', sort: 'desc' }] } }}
                            rows={listByReasons}
                            columns={columnsGridByReason} />
                    </ContentGrid>
                </>}
            </Content>
            <br /><br />
        </Main>
    )
}

const Main = styled.div`
    display: inline;
    width: 100vw;
    height: 100vh;
    margin: 0 10px 40px 0;
    animation: animateLeft 2s;
`
const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;
`

const Content = styled.div`
    margin: 20px 0;
`
const ContentGrid = styled.div`
    width: 800px;
    height: 77vh;
    border-radius: 10px;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    background-color: #f1f1f1;
    color: gray;
    margin: 0 0 35px 0;
`

const ContentGraphics = styled.div`
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    padding: 25px 2px 50px;
    width: 800px;
    margin: 0 0 20px 0;
`

const Loading = styled.span`
    color: #5e005e;
    padding: 25px;
`
const Icon = styled.span`
    margin: 0 0 0 6px;
`