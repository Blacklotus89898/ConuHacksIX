import './App.css'
import { Sandbox } from './components/sandbox'
import { Container } from './components/container'
import JSONCOMPONENT from './components/json'
import Chat from './components/chat'
import Weather from './components/weather'
import ScreenShare from './components/screenShare'
import VideoChat from './components/videoChat'
import { CSV } from './components/csv'

window.global = window;
function App() {

  return (
    <>
      <Container>
        <Sandbox></Sandbox>
      </Container>
      <Container>
        <CSV></CSV>
      </Container>
      <Container>
        <JSONCOMPONENT></JSONCOMPONENT>
      </Container>
      <Container>
        <Chat></Chat>
      </Container>
      <Container>
        <Weather></Weather>
      </Container>

      <Container>
        <ScreenShare></ScreenShare>
      </Container>

      <Container>
        <VideoChat></VideoChat>
      </Container>

    </>
  )
}

export default App
