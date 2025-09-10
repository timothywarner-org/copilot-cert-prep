"""
gpu_stats.py

Reports NVIDIA GPU stats on Windows 11 using GPUtil.
Displays: GPU name, load, memory usage, temperature, and more.
"""

import time
import GPUtil
from tabulate import tabulate


def fetch_gpu_stats():
    gpus = GPUtil.getGPUs()
    stats = []
    for gpu in gpus:
        stats.append({
            "id": gpu.id,
            "name": gpu.name,
            "load (%)": f"{gpu.load * 100:.1f}",
            "memory used (MB)": f"{gpu.memoryUsed:.0f}",
            "memory free (MB)": f"{gpu.memoryFree:.0f}",
            "memory total (MB)": f"{gpu.memoryTotal:.0f}",
            "temp (°C)": gpu.temperature or "N/A"
        })
    return stats


def display_stats(stats):
    rows = []
    for s in stats:
        rows.append([s["id"], s["name"], s["load (%)"],
                     s["memory used (MB)"], s["memory free (MB)"],
                     s["memory total (MB)"], s["temp (°C)"]])
    headers = ["ID", "Name", "Load", "Used", "Free", "Total", "Temp"]
    print(tabulate(rows, headers=headers, tablefmt="github"))


def monitor(interval_secs: float = 1.0, duration_secs: float = 10):
    """Monitor GPU stats every interval for a total duration."""
    print(f"\nMonitoring GPU stats every {interval_secs}s for {duration_secs}s...\n")
    end_time = time.time() + duration_secs
    while time.time() < end_time:
        stats = fetch_gpu_stats()
        if not stats:
            print("No NVIDIA GPU detected.")
            return
        display_stats(stats)
        time.sleep(interval_secs)
        print("-" * 60)


if __name__ == "__main__":
    try:
        monitor(interval_secs=2, duration_secs=10)
    except KeyboardInterrupt:
        print("\nMonitoring interrupted by user.")
