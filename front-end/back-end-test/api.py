from flask import Flask, request, jsonify
import data
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # to enable React and Flask requests

## TO DISPLAY DATA: http://localhost:5000/users
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify({"users": data.users})

# user registration
@app.route("/register", methods=["POST"])
def register():
    input_data = request.json

    name = input_data.get("name")
    company = input_data.get("company")
    email = input_data.get("email")
    password = input_data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required!"}), 400

    if any(user["email"] == email for user in data.users):
        return jsonify({"error": "User already exists!"}), 400

    data.users.append({"name": name, "company": company, "email": email, "password": password})

    return jsonify({"message": "User registered successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
