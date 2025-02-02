from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name

@app.route('/')
def any_route():
   print("request: ", request)
   return 'Default route'

@app.route('/test')
def test():
   return jsonify({'message': 'Test!'})

if __name__ == '__main__':
   app.run(host="0.0.0.0", debug=True)

# TODO: 
# 1. Implement routes
# 2. Implement logic
# 3. Implement logging
# 4. Implement error handling
# 5. Implement tests
