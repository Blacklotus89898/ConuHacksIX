#!/bin/bash

# Function to display instructions
show_instructions() {
    echo "Usage: $0 [option]"
    echo "Options:"
    echo "  -i    Install"
    echo "  -r    Run"
    echo "  -s    Shutdown"
    echo "  -h    Help"
}

# Function to handle install
install() {
    echo "Installing..."
    # Add your installation commands here
    cd react-frontend
    npm i 
}

# Function to handle run
run() {
    echo "Running..."
    # Add your run commands here
    cd react-frontend
    npm run dev &
    npm_pid=$!
    node chatServer.cjs &
    chat_pid=$!
    node peerServer.cjs &
    peer_pid=$!
    echo $npm_pid $chat_pid $peer_pid > pids.txt
}

# Function to handle shutdown
shutdown() {
    echo "Shutting down..."
    if [ -f pids.txt ]; then
        while read -r pid; do
            kill $pid
        done < pids.txt
        rm pids.txt
    else
        echo "No running processes found."
    fi
}

# Check for flags
if [ $# -eq 0 ]; then
    show_instructions
    exit 1
fi

while getopts ":irsh" opt; do
    case ${opt} in
        i )
            install
            ;;
        r )
            run
            ;;
        s )
            shutdown
            ;;
        h )
            show_instructions
            ;;
        \? )
            echo "Invalid option: -$OPTARG" 1>&2
            show_instructions
            exit 1
            ;;
    esac
done