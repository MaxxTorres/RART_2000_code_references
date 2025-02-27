import numpy as np
import matplotlib.pyplot as plt

def parse_relay_data(file_path):
    """
    Parses the relay test data from a TXT file.

    Parameters:
        file_path (str): Path to the TXT file.

    Returns:
        list: A list of dictionaries, each representing a test cycle.
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    cycles = []
    current_cycle = None
    is_scr_line = True  # Alternates between SCR and DCR
    
    for line in lines:
        line = line.strip()
        if line.startswith("###"):
            if current_cycle:
                cycles.append(current_cycle)  # Save previous cycle
            parts = line.split()
            bounce_time = int(parts[1])  # First number is bounce time
            start_end_times = list(map(float, parts[2:2 + (2 * bounce_time)]))  # Next 2*bounce_time values
            current_cycle = {
                "bounce_time": bounce_time,
                "start_end_times": start_end_times,
                "scr_values": [],
                "dcr_values": []
            }
            is_scr_line = True  # Reset flag
        else:
            if current_cycle is not None:
                values = list(map(float, line.split()))
                if is_scr_line:
                    current_cycle["scr_values"].extend(values)
                else:
                    current_cycle["dcr_values"].extend(values)
                is_scr_line = not is_scr_line  # Alternate between SCR and DCR
    
    if current_cycle:
        cycles.append(current_cycle)  # Save last cycle
    
    return cycles

def plot_scatter(cycles):
    """
    Plots SCR and DCR values for each cycle using scatter plots.
    
    Parameters:
        cycles (list): List of parsed cycles.
    """
    for i, cycle in enumerate(cycles):
        time_steps = np.arange(len(cycle["scr_values"]))
        
        plt.figure(figsize=(10, 5))
        plt.scatter(time_steps, cycle["scr_values"], label="SCR", s=10, alpha=0.7)
        plt.scatter(time_steps, cycle["dcr_values"], label="DCR", s=10, alpha=0.7)
        plt.axvline(x=len(cycle["scr_values"])//2, color='r', linestyle='--', label="Midpoint")
        plt.title(f"Cycle {i+1} - SCR and DCR Scatter Plot")
        plt.xlabel("Time Steps")
        plt.ylabel("Value")
        plt.legend()
        plt.show()

def plot_line(cycles):
    """
    Plots SCR and DCR values for each cycle using line plots.
    
    Parameters:
        cycles (list): List of parsed cycles.
    """
    for i, cycle in enumerate(cycles):
        time_steps = np.arange(len(cycle["scr_values"]))
        
        plt.figure(figsize=(10, 5))
        plt.plot(time_steps, cycle["scr_values"], label="SCR", linestyle='-', marker='o', markersize=3)
        plt.plot(time_steps, cycle["dcr_values"], label="DCR", linestyle='-', marker='x', markersize=3)
        plt.axvline(x=len(cycle["scr_values"])//2, color='r', linestyle='--', label="Midpoint")
        plt.title(f"Cycle {i+1} - SCR and DCR Line Plot")
        plt.xlabel("Time Steps")
        plt.ylabel("Value")
        plt.legend()
        plt.show()

def plot_histogram(cycles):
    """
    Plots histogram distributions of SCR and DCR values.
    
    Parameters:
        cycles (list): List of parsed cycles.
    """
    for i, cycle in enumerate(cycles):
        plt.figure(figsize=(10, 5))
        plt.hist(cycle["scr_values"], bins=20, alpha=0.7, label="SCR", color="blue")
        plt.hist(cycle["dcr_values"], bins=20, alpha=0.7, label="DCR", color="orange")
        plt.title(f"Cycle {i+1} - SCR and DCR Histogram")
        plt.xlabel("Value")
        plt.ylabel("Frequency")
        plt.legend()
        plt.show()

def plot_avg_dcr(cycles):
    """
    Plots the average DCR values across cycles.
    
    Parameters:
        cycles (list): List of parsed cycles.
    """
    avg_dcr_values = [np.mean(cycle["dcr_values"]) for cycle in cycles]

    plt.figure(figsize=(10, 5))
    plt.plot(range(1, len(avg_dcr_values) + 1), avg_dcr_values, marker='o', linestyle='-', color='green')
    plt.title("Average DCR Values Across Cycles")
    plt.xlabel("Cycle Number")
    plt.ylabel("Average DCR")
    plt.show()

def main():
    file_path = "relay_test_data.txt"  # Change this to your actual file path
    cycles = parse_relay_data(file_path)
    
    print(f"Processed {len(cycles)} cycles.")

    # Choose a graphing option:
    print("1. Scatter Plot")
    print("2. Line Plot")
    print("3. Histogram")
    print("4. Average DCR Plot")

    choice = input("Select a graph type (1-4): ").strip()
    
    if choice == "1":
        plot_scatter(cycles)
    elif choice == "2":
        plot_line(cycles)
    elif choice == "3":
        plot_histogram(cycles)
    elif choice == "4":
        plot_avg_dcr(cycles)
    else:
        print("Invalid choice. No graph displayed.")

if __name__ == "__main__":
    main()
