import React, { useContext } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { Spinner } from "@chakra-ui/react"
import { AppContext } from "./components/AppContext"
import Conta from "./pages/Conta"
import ContaInfo from "./pages/ContaInfo"
import Home from "./pages/Home"

const RequireAuth = () => {
	const { isLoggedIn } = useContext(AppContext)
	return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}

const MainRoutes = () => {
	const { isLoggedIn, loading } = useContext(AppContext)

	if (loading) return <Spinner size="xl" />

	return (
		<Routes>
			<Route
				path="/"
				element={isLoggedIn ? <Navigate to="/conta/1" replace /> : <Home />}
			/>
			<Route element={<RequireAuth />}>
				<Route path="/conta/:id" element={<Conta />} />
				<Route path="/infoconta" element={<ContaInfo />} />
			</Route>
		</Routes>
	)
}

export default MainRoutes
