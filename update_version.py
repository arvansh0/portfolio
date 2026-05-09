#!/usr/bin/env python3
"""
Simple script to update the version number for cache busting.
Run this after uploading new content to drive.
"""

import os
from datetime import datetime

def update_version():
    """Update the version file with current timestamp."""
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    
    with open('version.txt', 'w') as f:
        f.write(current_time)
    
    print(f"Version updated to: {current_time}")
    print("Upload this version.txt file to your drive hosting to trigger cache refresh.")

if __name__ == "__main__":
    update_version()
