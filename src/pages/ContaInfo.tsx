import { Flex, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserData } from "./Conta"
import { AppContext } from "../components/AppContext"
import { api } from "../api"

const ContaInfo = () => { 

	const [ userData, setUserData ] = useState<null | UserData>()

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

    return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			textAlign="center"
			gap={10}
			minH="calc(100vh - 64px)"
			color={"white"}
		>
            <Text fontSize='7xl' fontWeight='bold'>
                Informações da conta
            </Text>
            <Text fontSize='2xl' fontWeight='normal'>
                Nome: {userData?.name}
            </Text>
            <Text fontSize='2xl' fontWeight='normal'>
                E-mail: {userData?.email}
            </Text>
		</Flex>
    )
}

export default ContaInfo
