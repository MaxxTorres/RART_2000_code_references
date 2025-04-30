from flask import Flask
from server import app, db, User, Test, Relay, Cycle, Bounce, ContactResistance
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
import random

# Initialize the Flask app context
with app.app_context():
    # First, clear existing data (optional)
    db.session.query(ContactResistance).delete()
    db.session.query(Bounce).delete()
    db.session.query(Cycle).delete()
    db.session.query(Relay).delete()
    db.session.query(Test).delete()
    db.session.query(User).delete()
    db.session.commit()
    
    print("Creating sample data...")
    
    # Create sample users
    users = [
        User(username="admin", password=generate_password_hash("admin123"), company="Elektron Inc"),
        User(username="technician1", password=generate_password_hash("tech123"), company="Elektron Inc"),
        User(username="technician2", password=generate_password_hash("tech456"), company="Relay Systems"),
        User(username="tester", password=generate_password_hash("test123"), company="Testing Corp")
    ]
    
    for user in users:
        db.session.add(user)
    db.session.commit()
    print(f"Added {len(users)} users")
    
    # Create tests for each user
    tests = []
    for user in users:
        # Each user has 1-3 tests
        for i in range(random.randint(1, 3)):
            # Some tests are ongoing, some are completed
            start_time = datetime.utcnow() - timedelta(days=random.randint(1, 30))
            
            if random.choice([True, False]):
                # Completed test
                end_time = start_time + timedelta(hours=random.randint(1, 72))
            else:
                # Ongoing test
                end_time = None
                
            test = Test(user_id=user.id, start=start_time, end=end_time)
            tests.append(test)
            db.session.add(test)
    
    db.session.commit()
    print(f"Added {len(tests)} tests")
    
    # Create relays for each test
    relays = []
    relay_types = ["Electromechanical", "Reed", "Mercury-wetted", "Polarized", "Machine Tool", "Contactor", "Solid State", "Thermal", "Time Delay", "Buchholz"]
    
    for test in tests:
        # Each test has 2-16 relays
        for i in range(random.randint(2, 16)):
            relay_type = random.choice(relay_types)
            relay = Relay(test_id=test.test_id, type=relay_type)
            relays.append(relay)
            db.session.add(relay)
    
    db.session.commit()
    print(f"Added {len(relays)} relays")
    
    # Create cycles for each relay
    cycles = []
    for relay in relays:
        # Each relay has 10-100 cycles
        cycle_count = random.randint(10, 100)
        for i in range(cycle_count):
            cycle_start = datetime.utcnow() - timedelta(hours=random.randint(1, 200))
            cycle_end = cycle_start + timedelta(seconds=random.randint(1, 60))
            bounce_count = random.randint(0, 20)
            
            cycle = Cycle(
                relay_id=relay.relay_id,
                cycle_start=cycle_start,
                cycle_end=cycle_end,
                bounce_count=bounce_count
            )
            cycles.append(cycle)
            db.session.add(cycle)
    
    db.session.commit()
    print(f"Added {len(cycles)} cycles")
    
    # Create bounces for each cycle
    bounces = []
    for cycle in cycles:
        # Add the number of bounces specified in bounce_count
        for i in range(cycle.bounce_count):
            bounce_start = cycle.cycle_start + timedelta(milliseconds=random.randint(1, 100))
            bounce_end = bounce_start + timedelta(milliseconds=random.randint(1, 20))
            
            bounce = Bounce(
                cycle_id=cycle.cycle_id,
                count=i+1,
                bounce_start=bounce_start,
                bounce_end=bounce_end
            )
            bounces.append(bounce)
            db.session.add(bounce)
    
    db.session.commit()
    print(f"Added {len(bounces)} bounces")
    
    # Create contact resistances for each cycle
    contact_resistances = []
    for cycle in cycles:
        # Each cycle has 0-5 resistance measurements
        for i in range(random.randint(0, 5)):
            resistance = round(random.uniform(0.1, 100.0), 3)
            
            contact_res = ContactResistance(
                cycle_id=cycle.cycle_id,
                resistance=resistance
            )
            contact_resistances.append(contact_res)
            db.session.add(contact_res)
    
    db.session.commit()
    print(f"Added {len(contact_resistances)} contact resistance measurements")
    
    print("Sample data creation completed!")