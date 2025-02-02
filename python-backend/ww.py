import asyncio
import json
import cv2
import numpy as np
from aiohttp import web
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaPlayer, MediaStreamTrack
from aiortc import VideoStreamTrack

pcs = set()  # set of all pc

class ScreenCaptureTrack(MediaStreamTrack):
    def __init__(self, track_id):
        super().__init__()  # Initialize the base class
        self.track_id = track_id
        self.cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Screen capture code

    async def recv(self):
        ret, frame = self.cap.read()
        if not ret:
            raise Exception("Failed to grab frame")

        # Convert the frame to the correct format for WebRTC
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        return frame

# logging.basicConfig(level=logging.DEBUG) #enable logging
async def offer(request):
    print(request)
    id = request.rel_url.query["id"]

    params = await request.json()
    offer = RTCSessionDescription(sdp=params["sdp"], type=params["type"])

    pc = RTCPeerConnection()
    pcs.add(pc)

    @pc.on("iceconnectionstatechange")
    async def on_iceconnectionstatechange():
        print("ICE connection state is %s" % pc.iceConnectionState)
        if pc.iceConnectionState == "failed":
            await pc.close()
            pcs.discard(pc)

    # Create a ScreenCaptureTrack instance to capture the screen
    player = ScreenCaptureTrack(id)

    await pc.setRemoteDescription(offer)
    for t in pc.getTransceivers():
        if t.kind == "video" and player:
            pc.addTrack(player)

    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    response = web.Response(
        content_type="application/json",
        text=json.dumps(
            {"sdp": pc.localDescription.sdp, "type": pc.localDescription.type}
        ),
    )

    # Add CORS headers
    response.headers['Access-Control-Allow-Origin'] = '*'  # Replace '*' with your specific allowed origins if necessary
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return response


async def handle_options(request):
    # Get the requested headers from the request
    requested_headers = request.headers.get('Access-Control-Request-Headers', '')

    # Respond to preflight requests
    return web.Response(
        status=200,
        headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': requested_headers,  # Use the requested headers in the response
        }
    )

async def on_shutdown(app):
    # Close peer connections
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear()

if __name__ == "__main__":
    app = web.Application()
    app.on_shutdown.append(on_shutdown)
    app.router.add_options("/offer", handle_options)
    app.router.add_post("/offer", offer)
    web.run_app(app, host="0.0.0.0", port=8081, ssl_context=None)
