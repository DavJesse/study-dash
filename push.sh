#!/bin/bash

# This script pushes the current branch to both Gitea and GitHub repositories.
# It takes one argument: the branch name to push.
#
# Usage: ./push.sh <branch_name>
#
# Example: ./push.sh main
#
# It assumes that the remotes 'gitea' and 'github' are already configured in the local git repository.
# Ensure that the remotes are properly set up before running this script.
#
# Exit codes:
#   0: Success.
#   1: Failure (if any of the git push commands fail).

# Check if a branch name is provided as an argument.
if [ -z "$1" ]; then
    echo "Error: Branch name is required as an argument."
    echo "Usage: ./push.sh <branch_name>"
    exit 1
fi

# Push the specified branch to the Gitea remote.
echo "Pushing to Gitea..."
git push gitea "$1" || {
    echo "Error: Failed to push to Gitea."
    exit 1
}

# Push the specified branch to the GitHub remote.
echo "Pushing to GitHub..."
git push github "$1" || {
    echo "Error: Failed to push to GitHub."
    exit 1
}

echo "Successfully pushed to both Gitea and GitHub."
exit 0