import './App.css'
import { Sandbox } from './components/sandbox'
import { Container } from './components/container'
import Download from './components/download'
import Chat from './components/chat'
import Weather from './components/weather'
import ScreenShare from './components/screenShare'
import VideoChat from './components/videoChat'

window.global = window;
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
        <ScreenShare></ScreenShare>
      </Container>

      <Container>
        <VideoChat></VideoChat>
      </Container>

    </>
  )
}

export default App
