# AutoReconLite – Reconnaissance & Vulnerability Scanner

## Project Overview
AutoReconLite is a modular, Bash-based penetration testing framework designed to automate common reconnaissance and vulnerability scanning tasks. Built for security practitioners who need a lightweight, extensible tool for initial target assessment without heavy dependencies.

## Problem Statement
Manual reconnaissance is time-consuming and error-prone. Existing tools often require complex setups or lack modularity for custom workflows. AutoReconLite addresses this by providing a single-script solution with clear output, logging, and extensible architecture.

## Key Features
- **TCP SYN Scanning**: Fast port discovery with Nmap `-sS` flag
- **Service Detection**: Version identification via `-sV`
- **OS Fingerprinting**: Remote OS detection using `-O`
- **NSE Vulnerability Checks**: Automated execution of relevant Nmap Scripting Engine scripts
- **Modular Design**: Functions for each scan type enable easy extension
- **Color-Coded CLI Output**: Visual distinction between info, warning, and critical findings
- **Automated Report Generation**: Timestamped text reports saved to `reports/` directory
- **Scan Modes**: `quick` (top 100 ports) and `full` (all 65535 ports) options
- **Audit Logging**: All commands and outputs logged for compliance and review

## Technical Implementation
```bash
# Core scanning function example
scan_ports() {
    local target=$1
    local mode=$2
    local ports="-p-"
    
    [[ "$mode" == "quick" ]] && ports="--top-ports 100"
    
    nmap -sS $ports -sV -O --script vuln $target -oN "reports/${target}_scan.txt"
}

Repository
🔗 https://github.com/kushaniC/AutoReconLite
Stack
Bash, Nmap, Linux CLI tools
Git for version control
Tested on Kali Linux 2024.x, Ubuntu 22.04