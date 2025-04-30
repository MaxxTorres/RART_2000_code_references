from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime




app = Flask(__name__)
CORS(app, supports_credentials=True)

# SQLite configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rart2000.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'elektron-relaier'


db = SQLAlchemy(app)

# Updated User Model
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    
    # Relationship
    tests = db.relationship('Test', backref='user', lazy=True)

# Test Session Model
class Test(db.Model):
    __tablename__ = 'tests'
    
    test_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start = db.Column(db.DateTime, default=datetime.utcnow)
    end = db.Column(db.DateTime, nullable=True)
    
    # Relationship
    relays = db.relationship('Relay', backref='test', lazy=True)

# Relay Model
class Relay(db.Model):
    __tablename__ = 'relays'
    
    relay_id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('tests.test_id'), nullable=False)
    type = db.Column(db.String(100), nullable=True)
    
    # Relationship
    cycles = db.relationship('Cycle', backref='relay', lazy=True)

# Cycle Model
class Cycle(db.Model):
    __tablename__ = 'cycles'
    
    cycle_id = db.Column(db.Integer, primary_key=True)
    relay_id = db.Column(db.Integer, db.ForeignKey('relays.relay_id'), nullable=False)
    cycle_start = db.Column(db.DateTime, nullable=True)
    cycle_end = db.Column(db.DateTime, nullable=True)
    bounce_count = db.Column(db.Integer, default=0)
    
    # Relationships
    bounces = db.relationship('Bounce', backref='cycle', lazy=True)
    contact_resistances = db.relationship('ContactResistance', backref='cycle', lazy=True)

# Bounce Model
class Bounce(db.Model):
    __tablename__ = 'bounces'
    
    bounce_id = db.Column(db.Integer, primary_key=True)
    cycle_id = db.Column(db.Integer, db.ForeignKey('cycles.cycle_id'), nullable=False)
    count = db.Column(db.Integer, default=0)
    bounce_start = db.Column(db.DateTime, nullable=True)
    bounce_end = db.Column(db.DateTime, nullable=True)

# Contact Resistance Model
class ContactResistance(db.Model):
    __tablename__ = 'contact_resistances'
    
    contact_res_id = db.Column(db.Integer, primary_key=True)
    cycle_id = db.Column(db.Integer, db.ForeignKey('cycles.cycle_id'), nullable=False)
    resistance = db.Column(db.Float, nullable=True)


class DeviceData(db.Model):
    tablename = 'device_data'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    isFailed = db.Column(db.Boolean, default=False)
    progress = db.Column(db.Integer, default=0)
    memory = db.Column(db.Float, default=0.0)
    min_b_count = db.Column(db.Float, default=0.0)
    max_b_count = db.Column(db.Float, default=0.0)
    max_b_period = db.Column(db.Float, default=0.0)
    min_b_period = db.Column(db.Float, default=0.0)
    max_scr = db.Column(db.Float, default=0.0)
    min_scr = db.Column(db.Float, default=0.0)
    max_dcr = db.Column(db.Float, default=0.0)
    min_dcr = db.Column(db.Float, default=0.0)

@app.route('/api/devices', methods=['GET'])
def get_devices():
    devices = DeviceData.query.all()
    result = []

    for device in devices:
        result.append({
            "id": device.id,
            "name": device.name,
            "isFailed": device.isFailed,
            "progress": device.progress,
            "memory": device.memory,
            "min_b_count": device.min_b_count,
            "max_b_count": device.max_b_count,
            "max_b_period": device.max_b_period,
            "min_b_period": device.min_b_period,
            "max_scr": device.max_scr,
            "min_scr": device.min_scr,
            "max_dcr": device.max_dcr,
            "min_dcr": device.min_dcr
        })

    return jsonify(result)

# Create authentication routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    company = data.get('company')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'message': 'Username already exists'}), 400
        
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256') 
    new_user = User(username=username, company=company, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Successfully registered'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password, password):
        return jsonify({
            'success': True,
            'message': 'Successfully logged in',
            'user': {
                'username': user.username,
                'company': user.company
            }
        })
    
    return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    
    return jsonify({
        'success': True,
        'message': 'Successfully logged out'
    })


# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)