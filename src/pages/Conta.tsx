import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useParams, Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { api } from "../api"
import CardInfo from "../components/CardInfo"
import { AppContext } from "../components/AppContext"

interface UserData {
    email: string
    password: string
    name: string
    balance: number
    id: string
}

const Conta = () => {
    const [ userData, setUserData ] = useState<null | UserData>()
    const { id } = useParams()

    const { isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        if (!isLoggedIn) return

        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [isLoggedIn])

    if (!isLoggedIn)
        return <Navigate to="/" replace />

    const actualData = new Date()

    if(userData && id !== userData.id)
        return <Navigate to="/" replace />
  
    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={`Bem vinda ${userData?.name}`} content={`${actualData.getDay()} / ${actualData.getMonth()} / ${actualData.getFullYear()} ${actualData.getHours()}:${actualData.getMinutes()}`} />
                            <CardInfo mainContent='Saldo' content={`R$ ${userData.balance}`}/>
                        </>
                    )
                }
            </SimpleGrid>    
        </Center>
    )
}

export default Conta
