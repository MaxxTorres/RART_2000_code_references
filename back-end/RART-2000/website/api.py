# Create a new file called api.py in your website folder
from flask import request, Blueprint, jsonify # type: ignore
from flask_login import login_required, current_user # type: ignore
from .models import Note, User
from werkzeug.security import check_password_hash, generate_password_hash # type: ignore
from . import db

api = Blueprint('api', __name__)

@api.route('/test', methods=['GET'])
def test_api():
    return jsonify({"message": "API is working!"})

@api.route('/notes', methods=['GET'])
@login_required
def get_notes():
    notes = [{'id': note.id, 'data': note.data, 'date': str(note.date)} 
             for note in current_user.notes]
    return jsonify(notes)


# Add these new routes to your existing api.py

@api.route('/login', methods=['POST'])
def api_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email does not exist"}), 401
    
    if check_password_hash(user.password, password):
        # Return user info (in a real app, you'd return a token)
        return jsonify({
            "id": user.id,
            "email": user.email,
            "firstName": user.first_name
        })
    else:
        return jsonify({"error": "Password is incorrect"}), 401

@api.route('/register', methods=['POST'])
def api_register():
    data = request.json
    email = data.get('email')
    first_name = data.get('firstName')
    password = data.get('password')
    
    # Validation
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    
    if len(email) < 4:
        return jsonify({"error": "Email must be longer than 3 characters"}), 400
    
    if len(first_name) < 2:
        return jsonify({"error": "First name must be longer than 1 character"}), 400
    
    if len(password) < 7:
        return jsonify({"error": "Password must be at least 7 characters"}), 400
    
    # Create new user
    new_user = User(
        email=email,
        first_name=first_name,
        password=generate_password_hash(password, method='pbkdf2:sha256')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "message": "User created successfully",
        "id": new_user.id
    }), 201