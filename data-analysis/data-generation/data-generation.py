import csv
import random
import time
import matplotlib.pyplot as plt
from datetime import datetime

def generate_sample_data(num_samples=100):
    """
    Generate fake sample SCR and DCR measurement data for a reed relay.

    :param int num_samples: Number of samples need, default value is 100
    :return data list: Returns sample data in the form of list that will later be stored in CSV
    """
    data = []
    
    for i in range(num_samples):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cycle = i + 1
        scr_value = round(random.uniform(50, 300), 2)  # Simulating SCR in milliohms
        dcr_value = round(random.uniform(0.1, 5.0), 3)  # Simulating DCR in ohms
        mcu_voltage = round(random.uniform(3.0, 3.3), 3)  # Simulating MCU operating voltage
        mcu_current = round(random.uniform(5, 20), 2)  # Simulating current in mA
        
        data.append([timestamp, cycle, scr_value, dcr_value, mcu_voltage, mcu_current])
        
        time.sleep(0.01)  # Simulating time delay between measurements
    
    return data

def generate_trending_series(start=300, end=50, steps=100, fluctuation=10):
    """
    Generates a series that gradually decreases while fluctuating.
    
    :param start int: Initial value of the series
    :param end int: Minimum target value
    :param steps int: Number of data points
    :param fluctuation int: Maximum random fluctuation per step
    :return values list: List of generated values
    """
    values = []
    current_value = start
    decrement = (start - end) / steps  # Base decrement per step
    reached_end = False

    for _ in range(steps):
        # Apply the decreasing trend with fluctuation
        noise = random.uniform(-fluctuation/1.1, fluctuation)
        if not reached_end:
            current_value -= (decrement + noise)
        else:
            # Stablize the trend at the end value, mimicking how SCR value look like
            current_value = end - (decrement + noise)
            
        # Ensure it doesn’t drop below the target end value
        if current_value < end:
            # current_value = end + random.uniform(-fluctuation, fluctuation)
            reached_end = True
        
        values.append(current_value)

    return values

def save_to_csv(data, filepath="/Users/wng/Desktop/reed_relay_measurements.csv"):
    """
    Save the generated data to a CSV file.

    :param data list: List of data that will be stored to the CSV file
    :param filename str: Filepath of the stored file
    """
    headers = ["Timestamp", "Cycle", "SCR (mΩ)", "DCR (Ω)", "MCU Voltage (V)", "MCU Current (mA)"]
    
    with open(filepath, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        writer.writerows(data)
    
    print(f"Data saved to {filepath}")

def save_to_text_file(entry_count=800, filepath="/Users/wng/Desktop/Data Generation/reed_relay_measurements.txt"):
    """
    Save the generated data to a text file.

    :param filename str: Filepath of the stored file
    """
    with open(filepath, "a") as file:
        for i in range(entry_count):
            # Bounce count and bounce period generation
            bounce_count = int(random.uniform(2, 4.5))
            bounce_start_time = [0 for _ in range(bounce_count)]
            bounce_end_time = [0 for _ in range(bounce_count)]
            for i in range(bounce_count):
                if i == 0:
                    bounce_start_time[i] = 140000 + int(random.uniform(2, 30))
                else:
                    bounce_start_time[i] = bounce_end_time[i - 1] + int(random.uniform(2, 30))
                bounce_end_time[i] = bounce_start_time[i] + int(random.uniform(2, 30))

            # Generating SCR and DCR
            data = generate_trending_series(500, 50, entry_count, 10)
        
            # Saving to text file
            data_line = f"### {bounce_count} "
            for i in range(bounce_count):
                data_line += f"{bounce_start_time[i]} {bounce_end_time[i]} "
            data_line += "\n"
            file.write(data_line)
            file.flush()

            data_line = ""
            value_count = 0
            for i in range(len(data)):
                data_line += f"{data[i]} "
                value_count += 1
                
                if value_count == 10:
                    value_count = 0
                    data_line += "\n"
                    file.write(data_line)
                    file.flush()
                    data_line = ""
        file.close()
            
def plot_data(data):
    """
    Plot the generated data

    :param data list: List of generated data to plot
    """
    plt.plot(data, marker='o', linestyle='dashed')
    plt.xlabel("Time Steps")
    plt.ylabel("Value")
    plt.title("Gradually Decreasing Series with Fluctuations")
    plt.show()

def test():
    count = int(random.uniform(2, 4.5))
    bounce_count = f"{count}"
    bounce_start_time = [0 for _ in range(count)]
    bounce_end_time = [0 for _ in range(count)]
    print(bounce_count)
    for i in range(count):
        if i == 0:
            bounce_start_time[i] = 140000 + int(random.uniform(2, 30))
        else:
            bounce_start_time[i] = bounce_end_time[i - 1] + int(random.uniform(2, 30))
        bounce_end_time[i] = bounce_start_time[i] + int(random.uniform(2, 30))
    print(bounce_start_time)
    print(bounce_end_time)


if __name__ == "__main__":
    # num_samples = 100  # Adjust as needed
    # fake_data = generate_fake_data(num_samples)
    # save_to_csv(fake_data)
    # Generate and plot the series

    # data = generate_trending_series(500, 50, 800, 10)
    # plot_data(data)

    # test()
    
    save_to_text_file()
    