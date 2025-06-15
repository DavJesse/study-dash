#!/bin/bash
# This script automates the process of adding all changes to the git staging area and committing them with a provided message.

# Check if a commit message is provided as an argument
if [ -z "$1" ]; then
    echo "Error: Commit message is required." >&2 # Print error message to stderr
    exit 1 # Exit with a non-zero status code to indicate an error
fi

# Add all changes to the staging area
git add .

# Commit the changes with the provided message
git commit -m "$1"