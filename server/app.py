from flask_socketio import SocketIO, send
from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'

@socketio.on("message")
def handleMessage(msg):
    print (msg)
    send(msg, broadcast=True)
    return None


if __name__ == '__main__':
        socketio.run(app)
