import { Clients } from "./features/clients/Clients"

import { SnackbarProvider } from "notistack";

import "./App.scss"

const App = () => {
  return (
    <div className="app">
      <Clients />
      <SnackbarProvider />
    </div>
  )
}

export default App
