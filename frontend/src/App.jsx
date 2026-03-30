import Router from './routes/Router'
import DynamicSignal from "./pages/DynamicSignal"

export default function App() {
return <Router />
return <Route path="/dynamic-signal" element={<DynamicSignal />} />
}