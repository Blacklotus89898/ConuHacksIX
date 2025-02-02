import './App.css'
import { Sandbox } from './components/sandbox'
import { Container } from './components/container'
import Download from './components/download'
import Chat from './components/chat'
import ChatGPTRequest from './components/gpt'
import Weather from './components/weather'
import ScreenShare from './components/screenShare'

function App() {

  return (
    <>
      <Container>
        <Sandbox></Sandbox>
      </Container>
      <Container>
        <Download></Download>
      </Container>
      <Container>
        <Chat></Chat>
      </Container>
      <Container>
        <Weather></Weather>
      </Container>
      <Container>
        <ChatGPTRequest></ChatGPTRequest>
      </Container>

      <Container>
        <ScreenShare></ScreenShare>
      </Container>

    </>
  )
}

export default App
